<template>
  <div class="agent">
    <el-row>
      <el-col :span="24">
        <el-col :span="6" class="">
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import { mapGetters,mapActions } from 'vuex'
  export default {
    computed: {
      // 使用对象展开 混入 computed 对象中
    },
    methods: {
      //...mapActions({
      //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
      //})
    }
  }
</script>
<style lang="scss" scoped>
  .agent {
    .col1 {
      background: #000;
    }
  }
</style>