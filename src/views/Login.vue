<template>
  <div class="flex justify-center items-center mt-60">
    <v-card class="w-1/5">
      <v-card-title>后台</v-card-title>

      <v-divider class="mx-4"></v-divider>

      <v-form v-model="valid">
        <v-container>
          <v-text-field
            v-model="username"
            :rules="nameRules"
            :counter="10"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="nameRules"
            :counter="10"
            label="Password"
            required
            @keyup.enter="adminLogin"
          ></v-text-field>
        </v-container>
      </v-form>
      <div class="flex justify-center items-start">
        <v-btn @click="adminLogin">登录</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    username: 'admin',
    password: 'admin',
    nameRules: [v => !!v || 'Name is required']
  }),

  methods: {
    adminLogin() {
      if (this.username === 'admin' && this.password === 'admin') {
        // this.$route.push('/dashboard')
        console.log(this.$router.push("/dashboard"))
      }
    }
  }
}
</script>
