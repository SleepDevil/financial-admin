<template>
  <div>
    <v-form class="flex flex-wrap justify-between w-4/5 ml-20" ref="formRef">
      <v-select
        class="w-4 mr-8"
        v-model="selectZhishu"
        :items="zhishus"
        label="请输入指数合约"
        required
        :rules="rules"
      ></v-select>
      <v-text-field
        class="w-4 mr-4"
        v-model="shorttermAverage"
        label="请输入短期均线"
        required
        :rules="numRules"
      ></v-text-field>
      <v-text-field
        class="w-4 mr-4"
        v-model="longtermAverage"
        label="请输入长期均线"
        required
        :rules="numRules"
      ></v-text-field>
      <v-text-field
        class="w-4 mr-4"
        v-model="mainContract"
        label="请输入主力合约"
        required
        :rules="rules"
      ></v-text-field>
      <v-text-field
        class="w-4 mr-4"
        v-model="orderNum"
        label="请输入下单手数"
        required
        :rules="numRules"
      ></v-text-field>
      <v-btn color="blue lighten-4" class="mt-3" @click="submit">提交</v-btn>
    </v-form>
    <v-alert class="w-40 -top-36 left-1/2 z-20" type="success" v-model="msg"
      >添加成功！</v-alert
    >
  </div>
</template>

<script>
import request from "../api/axiosInstance.js";
import { setTimeout } from "timers";

export default {
  data: () => ({
    // 指数合约
    zhishus: [
      "KQ.i@SHFE.rb",
      "KQ.i@SHFE.hc",
      "KQ.i@SHFE.bu",
      "KQ.i@SHFE.ru",
      "KQ.i@SHFE.fu",
      "KQ.i@SHFE.sp",
      "KQ.i@SHFE.al",
      "KQ.i@SHFE.zn",
      "KQ.i@SHFE.ni",
      "KQ.i@CZCE.ZC",
      "KQ.i@CZCE.MA",
      "KQ.i@CZCE.TA",
      "KQ.i@CZCE.FG",
      "KQ.i@CZCE.AP",
      "KQ.i@CZCE.SA",
      "KQ.i@DCE.p",
      "KQ.i@DCE.i",
      "KQ.i@DCE.m",
      "KQ.i@DCE.a",
      "KQ.i@DCE.c",
      "KQ.i@DCE.v",
      "KQ.i@DCE.eg",
      "KQ.i@DCE.pp",
      "KQ.i@DCE.eb",
      "KQ.i@DCE.pg"
    ],
    selectZhishu: "",
    shorttermAverage: "",
    longtermAverage: "",
    mainContract: "",
    orderNum: "",
    rules: [v => !!v || "请输入内容"],
    numRules: [v => !!v || "请输入内容", v => !isNaN(v) || "请输入数字"],
    msg: false
  }),
  methods: {
    async submit() {
      let dataValid = this.$refs.formRef.validate();
      console.log(dataValid);
      if (!dataValid) return;
      let item = {
        zhishuheyue: this.selectZhishu,
        shorttermAverage: this.shorttermAverage,
        longtermAverage: this.longtermAverage,
        mainContract: this.mainContract,
        orderNum: this.orderNum
      };
      let res = await request.post("/items/add", item);
      if (res.status === 200 && res.data.msg === "成功！") {
        this.msg = true;
        setTimeout(() => {
          this.msg = false;
        }, 2000);
      }
    }
  }
};
</script>
