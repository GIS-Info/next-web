<template>
  <div class="main">
    <el-form :model="form" status-icon label-width="100px" label-position="top" class="form">
      <el-form-item label="账户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码">
        <el-input v-model="form.password2" type="password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
      <el-form-item>
        已有账户？
        <el-button @click="login">前往登录</el-button>
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
        email: '',
        password: '',
        password2: '',
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
      if(this.form.password !== this.form.password2){
        alert('两次密码不相同')
        return;
      }
      const payload = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
      }
      this.$axios.post('/api/manage/register/', payload).then((res)=>{
        console.log('res', res);
        alert('您的注册已经提交，请联系管理员审核')
      }).catch(error=>{
        if(error?.response?.data?.error?.non_field_errors?.[0]){
          alert(error?.response?.data?.error?.non_field_errors?.[0])
        }else{
          alert(error)
        }
      });
    },
    login() {
      this.$router.push('/manage/login')
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