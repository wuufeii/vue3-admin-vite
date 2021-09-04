// prettier前端代码格式化工具，需要配合插件
// 使用命令格式化所有文件  npx prettier --write .
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false, // 结尾不加分号
  singleQuote: true, // 使用单引号
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  bracketSpacing: true, // true：{ foo: bar } false：{foo: bar}
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  arrowParens: 'always', // 单个箭头函数参数是否加()
  htmlWhitespaceSensitivity: 'ignore', // 指定 HTML 文件的全局空白区域敏感度
  endOfLine: 'lf', // 结尾换行符
  vueIndentScriptAndStyle: false
}
