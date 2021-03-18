<template>
  <el-button @click="handleClick">hello click</el-button>
</template>

<script>
export default {
  setup() {
    
  },
  methods:{
    handleClick(){
      this.$message.success('hello')
    }
  }
}
</script>