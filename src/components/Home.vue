<template>
  <el-container class="home_container">
    <el-header
      >我的测试平台
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>测试项目</span>
            </template>
            <el-menu-item index="/project">
              <template slot="title">
              <i class="el-icon-menu"></i>
              <span>项目管理</span>
            </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>测试接口</span>
            </template>
            <el-menu-item index="/interface">
              <template slot="title">
              <i class="el-icon-menu"></i>
              <span>接口管理</span>
            </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>测试用例</span>
            </template>
            <el-menu-item index="/case">
              <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用例管理</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  color: white;
  padding-left: 50px;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0px;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>
