<template>
  <div class="main">
    <h2>当前无权限</h2>
    <el-button v-if="!isApply" type="success" @click="()=>{isApply = true}">
      申请权限
    </el-button>
    <el-form v-else :model="formInline" class="form">
      <el-form-item label="昵称">
        <el-input v-model="form.name" placeholder="我们应称呼您为"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="方便后续联系"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="()=>{}">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data(){
    return {
      isApply: false,
      form: {
        name: '',
        email: '',
      }
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  background-color: rgb(241, 241, 241);
  text-align: center;
  padding-top: 10vh;
}
.form{
  width: 600px;
  margin: auto;
}
</style>