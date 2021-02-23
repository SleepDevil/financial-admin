<template>
  <div class="flex flex-wrap justify-between w-4/5 ml-20">
    <v-text-field
      readonly
      class="w-4 mr-8"
      v-model="selectZhishu"
    ></v-text-field>
    <v-text-field
      readonly
      class="w-4 mr-4"
      v-model="shorttermAverage"
    ></v-text-field>
    <v-text-field
      readonly
      class="w-4 mr-4"
      v-model="longtermAverage"
    ></v-text-field>
    <v-text-field
      readonly
      class="w-4 mr-4"
      v-model="mainContract"
    ></v-text-field>
    <v-text-field readonly class="w-4 mr-4" v-model="orderNum"></v-text-field>
    <v-btn color="blue lighten-4" class="mt-3" @click="handleDelete"
      >删除</v-btn
    >
  </div>
</template>

<script>
import request from "../api/axiosInstance.js";

export default {
  props: {
    selectZhishu: {
      type: String
    },
    shorttermAverage: {
      type: Number
    },
    longtermAverage: {
      type: Number
    },
    mainContract: {
      type: String
    },
    orderNum: {
      type: Number
    }
  },
  methods: {
    async handleDelete() {
      let item = {
        zhishuheyue: this.selectZhishu,
        shorttermAverage: this.shorttermAverage,
        longtermAverage: this.longtermAverage,
        mainContract: this.mainContract,
        orderNum: this.orderNum
      };
      const res = await request.post("/items/delete", item);
      if (res.status === 200) {
        console.log("成功！");
      }
    }
  },
  beforeMount() {
    console.log(this.selectZhishu);
  }
};
</script>
