<template>
  <div class="main">
    <el-form :model="form" status-icon label-width="100px" label-position="top" class="form">
      <el-form-item label="账户名" prop="pass">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
      <el-form-item>
        还未获取管理员账户？
        <el-button @click="register">申请注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapState({userToken: 'userToken'}),
  },
  created() {
    if(this.userToken){
      this.$router.push('/manage/dashboard/')
    }
  },
  methods: {
    submit() {
      const payload = {
        username: this.form.username,
        password: this.form.password,
      }
      this.$axios.post('/api/manage/login/', payload).then((res)=>{
        console.log('res', res);
        if(res.data?.status === '200'){
              this.login().then(()=>{
            this.$router.push('/manage/dashboard/')
          })
        } else {
          alert(res.msg)
        }
      }).catch(error=>{
        if(error?.response?.data?.error?.non_field_errors?.[0]){
          alert(error?.response?.data?.error?.non_field_errors?.[0])
        }else{
          alert(error)
        }
      });
    },
    register() {
      this.$router.push('/manage/register')
    }
  }
}
</script>
<style scoped>
  .main{
    display: flex;
    justify-content: center;
  }
  .form{
    width: 600px;
    margin-top: 185px;
  }
</style>