<template>
  <div>
    <v-app class="w-full">
      <v-snackbar v-model="showErr" color="error" top timeout="1000"
        >用户名或密码错误！</v-snackbar
      >
      <v-snackbar v-model="showSuccess" color="success" top
        >登录成功！
      </v-snackbar>
      <v-card class="w-1/5 ml-1/2 transform -translate-x-1/2 mt-60">
        <v-card-title>后台</v-card-title>

        <v-divider class="mx-4"></v-divider>

        <v-form v-model="valid" ref="formRef">
          <v-container>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="pwdRules"
              label="Password"
              required
              :type="pwdVisibility ? 'text' : 'password'"
              :append-icon="pwdVisibility ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="pwdVisibility = !pwdVisibility"
              @keyup.enter="adminLogin"
            ></v-text-field>
          </v-container>
        </v-form>
        <div class="flex justify-center items-start">
          <v-btn @click="adminLogin">登录</v-btn>
        </div>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import request from '../api/axiosInstance'

export default {
  data: () => ({
    valid: false,
    username: '',
    password: '',
    usernameRules: [v => !!v || '请输入用户名'],
    pwdRules: [v => !!v || '请输入密码'],
    pwdVisibility: false,
    showErr: false,
    showSuccess: false,
    msg: false
  }),

  methods: {
    async adminLogin() {
      let dataValid = this.$refs.formRef.validate()
      if (!dataValid) return
      const res = await request.post('/login', {
        username: this.username,
        password: this.password
      })
      const { data } = res
      if (!data.token) {
        this.showErr = true
        this.$refs.formRef.reset()
        return
      }
      window.localStorage.setItem('token', data.token)
      this.showSuccess = true
      setTimeout(() => {
        this.$router.push('/dashboard/viewdata')
      }, 1000)
    }
  }
}
</script>
