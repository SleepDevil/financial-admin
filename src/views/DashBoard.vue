<template>
  <v-app>
    <v-snackbar v-model="toLogin" top timeout="1000"
      >退出成功，即将返回登录页面！</v-snackbar
    >
    <v-snackbar app v-model="unAuthorized" top timeout="1000"
      >请先登录！</v-snackbar
    >
    <v-snackbar app v-model="tokenExpire" top timeout="1000"
      >登录已过期，请重新登录！</v-snackbar
    >
    <v-app-bar app color="blue lighten-3" class="pr-12">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn plain @click="logout">
        <v-icon>mdi-account-arrow-left-outline</v-icon>
        Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer class="h-full" v-model="drawer" fixed temporary>
      <v-list nav>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item link to="/dashboard/viewdata">
            <v-list-item-title>查看数据</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/dashboard/modify">
            <v-list-item-title>修改数据</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import checkToken from '../api/checkToken'

export default {
  data: () => ({
    drawer: false,
    group: null,
    toLogin: false,
    unAuthorized: false,
    tokenExpire: false
  }),

  watch: {
    group() {
      this.drawer = false
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem('token')
      this.toLogin = true
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
  },
  async beforeMount() {
    const { success, msg } = await checkToken()
    if (!success) {
      if (msg) {
        this.tokenExpire = true
        setTimeout(() => {
          this.$router.push('/login')
          window.localStorage.removeItem('token')
        }, 1000)
      } else {
        this.unAuthorized = true
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }
    }
  }
}
</script>
