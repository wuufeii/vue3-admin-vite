<template>
  <el-dropdown>
    <div class="header-user">
      <img src="@/assets/img/user.jpg" alt="" />
      <span>超级管理员</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
        <el-dropdown-item icon="el-icon-lock">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header-user {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 0 4px;
  cursor: pointer;
  color: #ffffff;
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 4px;
  }
}
</style>
