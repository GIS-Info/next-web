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
  import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
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
    // 传入 vuex 的 mutation 方法
    ...mapMutations(['setSuperUser','setUserToken','setUserInfo']),
    submit() {
      const payload = {
        username: this.form.username,
        password: this.form.password,
      }
      this.$axios.post('/api/manage/login/', payload).then((res)=>{
        console.log('res', res);
        const token = res?.data?.token;
        const user = res?.data?.user;
        if(!user?.is_active){ alert('账户已注销') }
        else if(!user?.is_staff){ alert('账户未被审核，请联系管理员') }
        else if(token) {
          // 登录成功
          this.setSuperUser(user?.is_superuser)
          this.setUserToken(token)
          this.setUserInfo(user)
          this.$axios.defaults.headers.common.Authorization = `Token ${token}`;
          this.$router.push('/manage/dashboard/')
        }
      }).catch(error=>{
        if(error?.response?.data?.error?.non_field_errors?.[0]){
          alert(error?.response?.data?.error?.non_field_errors?.[0])
        }else{
          alert('未注册的信息')
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