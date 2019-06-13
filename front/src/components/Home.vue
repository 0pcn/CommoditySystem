<template>
  <div>
    <el-container>
      <el-aside width="400px">
        <el-row>
          <el-col :span="12">
            <el-menu
              background-color="lightgray"
              default-active="2"
              class="el-menu-vertical-demo" router>
              <el-menu-item index="/Commodity">
                <i class="el-icon-tickets"></i>
                <span slot="title">商品頁</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style>
html,body {
  padding: 0;
  margin: 0;
}

</style>
