<template>
  <div class="flex flex-wrap justify-between w-4/5 ml-20">
    <v-text-field
      class="w-4 mr-8"
      v-model="toChangeName"
      ref="nameRef"
      :readonly="canModify ? false : true"
    ></v-text-field>
    <v-text-field class="w-4 mr-4" v-model="toChangeCode"></v-text-field>
    <v-btn color="blue mr-4 lighten-4" class="mt-3" @click="changeModifyState"
      >修改</v-btn
    >
    <v-btn color="green mr-4 lighten-4" class="mt-3" @click="saveChange"
      >保存</v-btn
    >
    <v-btn color="red lighten-4" class="mt-3" @click="handleDelete">删除</v-btn>
  </div>
</template>

<script>
import request from '../api/axiosInstance'

export default {
  props: {
    name: {
      type: String
    },
    code: {
      type: String
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      toChangeName: this.name,
      toChangeCode: this.code,
      canModify: false
    }
  },
  methods: {
    changeModifyState() {
      this.$refs.nameRef.focus()
      this.canModify = true
    },
    async saveChange() {
      const res = await request.post('/mainforce/changedata', {
        id: this.id,
        name: this.toChangeName,
        code: this.toChangeCode
      })
      console.log(res)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    },
    async handleDelete() {
      await request.post('/mainforce/delete', {
        id: this.id
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  },
  beforeMount() {
    // console.log(this.id)
  }
}
</script>
