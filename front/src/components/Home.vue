<template>
  <div class="el-container">
    <div class="el-aside">
      <el-aside width="200">
        <el-menu
          text-color="#fff"
          active-text-color="dodgerblue"
          default-active="2"
          class="el-menu" router>
          <el-menu-item index="/Shop" class="el-menu-item">
            <i class="el-icon-tickets el-icon"></i>
            <span slot="title">商品頁</span>
          </el-menu-item>
          <el-menu-item index="/Commodity" class="el-menu-item">
            <i class="el-icon-shopping-bag-2 el-icon"></i>
            <span slot="title">商品清單</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </div>
    <el-container>
      <el-header class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item>訂單維護</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>

</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #304156;
  width: 200px;
  height: 100vh;
}

.el-menu {
  background-color: #304156;
  min-height: 100%;
  padding: 0;
}

.el-menu-item:hover {
  background-color: #2c3e50;
}

.header {
  background-color: #EFF2F7;
  margin: 0px 0px 20px 0px;
}

.el-breadcrumb {
  position: absolute;
  top: 20px;
}

.el-main {
  padding: 0px 20px;
}
</style>
