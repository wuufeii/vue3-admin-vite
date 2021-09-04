/**
 *  @From https://github.com/JetBrains/svg-sprite-loader/issues/434
 *  @Better https://github.com/anncwb/vite-plugin-svg-icons
 */
import { readFileSync, readdirSync } from 'fs'

let idPrefix = ''

const hasViewBox = /(viewBox="[^>+].*?")/g

const clearHeightWidth = /(width|height)="([^>+].*?)"/g

const svgTitle = /<svg([^>+].*?)>/

const clearReturn = /(\r)|(\n)/g

// dir需以/结尾
function findSvgFile(dir) {
  const svgRes = []
  // 读取目标目录
  const dirents = readdirSync(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      // 是目录则递归遍历目录
      svgRes.push(...findSvgFile(dir + dirent.name + '/'))
    } else {
      if (!dirent.name.endsWith('.svg')) continue
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace('<?xml version="1.0" standalone="no"?>', '')
        .replace(clearReturn, '')
        //提取出svg标签,并根据id规则生成<symbol id="xxx">
        .replace(svgTitle, ($1, $2) => {
          let width = 0
          let height = 0
          // 获取svg标签里的属性 如 xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1024 1024"
          let content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
            if (s2 === 'width') {
              width = s3
            } else if (s2 === 'height') {
              height = s3
            }
            return ''
          })
          // 用 width/height属性来替换viewBox的值
          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`
          }
          // 将svg的文件名和id-prefix拼接成<symbol>标签的id
          return `<symbol id="${idPrefix}-${dirent.name.replace('.svg', '')}" ${content}>`
        })
        // 将闭合标签/svg也换成symbol
        .replace('</svg>', '</symbol>')
      svgRes.push(svg)
    }
  }
  return svgRes
}

export const svgLoader = (path, prefix = 'icon') => {
  if (path === '') return
  idPrefix = prefix
  const res = findSvgFile(process.cwd() + path)
  return {
    name: 'svg-transform',
    transformIndexHtml(html) {
      return html.replace(
        '<body>',
        ` <svg id="svgSpriteStats" xmlns="http://www.w3.org/2000/svg"  style="display: none">${res.join(
          ''
        )}</svg>`
      )
    }
  }
}
