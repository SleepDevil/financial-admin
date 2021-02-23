<template>
  <div>
    <Row
      v-for="(value, name, index) in totalData"
      :key="index"
      :selectZhishu="name"
      :shorttermAverage="value[0]"
      :longtermAverage="value[1]"
      :mainContract="value[2]"
      :orderNum="value[3]"
    ></Row>
  </div>
</template>

<script>
import Row from "../components/Row.vue";
import request from "../api/axiosInstance.js";

export default {
  components: { Row },
  data: () => ({
    totalData: null
  }),
  methods: {
    async getData() {
      const res = await request.get("/items/viewdata");
      console.log(res.data);
      this.totalData = res.data;
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>
