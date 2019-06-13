<template>
  <div>
    <el-card class="box-card" shadow="always">
      <h2>Login</h2>
      <el-form label-position="top">
        <el-form-item label="帳號：">
          <el-input type="text"
                    id="account"
                    placeholder="account"
                    v-model="user.account"></el-input>
        </el-form-item>
        <el-form-item label="密碼：">
          <el-input type="password"
                    id="password"
                    placeholder="password"
                    v-model="user.password"
                    show-password></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary"
                   @click="login">Login</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/Home')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  width: 480px;
  margin: 0px auto;
}
</style>
