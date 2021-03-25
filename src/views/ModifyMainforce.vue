<template>
  <div>
    <AllDataRow
      class="flex flex-wrap justify-between w-4/5 ml-20"
      ref="formRef"
      v-for="(value, name, index) in mainData"
      :key="index"
      :id="value[0]"
      :name="value[1]"
      :code="value[2]"
      @nameChanged="changeName"
    />
  </div>
</template>

<script>
import request from '../api/axiosInstance.js'
import AllDataRow from '../components/AllDataRow'

export default {
  components: {
    AllDataRow
  },
  data: () => ({
    mainName: '',
    mainCode: '',
    rules: [v => !!v || '请输入内容'],
    notEmptyRules: [v => !!v || '请输入内容', v => !isNaN(v)],
    msg: false,
    mainData: []
  }),
  methods: {
    async submit() {
      let dataValid = this.$refs.formRef.validate()
      if (!dataValid) return
      let item = {
        zhishuheyue: this.selectZhishu,
        shorttermAverage: this.shorttermAverage,
        longtermAverage: this.longtermAverage,
        mainContract: this.mainContract,
        orderNum: this.orderNum
      }
      let res = await request.post('/items/add', item)
      if (res.status === 200 && res.data.msg === '成功！') {
        this.msg = true
      }
    },
    async getMainData() {
      // let mainData = JSON.parse(window.localStorage.getItem('mainData'))
      // if (mainData) {
      //   this.mainData = mainData
      //   return
      // }
      const res = await request.get('/mainforce/viewdata')
      this.mainData = res.data
      // 存入localStorage数组时需要JSON序列化一下
      // window.localStorage.setItem('mainData', JSON.stringify(this.mainData))
    },
    changeName(val) {
      console.log(val)
    }
  },
  beforeMount() {
    this.getMainData()
  }
}
</script>
