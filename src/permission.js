/**
 * Created Date: 2022-02-24 02:58:32
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2022-02-24 03:04:24
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2022 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  console.log('router info: ', to, from)
  next()
})