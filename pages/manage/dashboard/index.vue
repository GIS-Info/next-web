<template>
  <div class="main">
    <div class="menu">
      <div class="button-list">
        <a class="button" href="https://gisphere.info/db_update/" style="font-size: 14px; text-decoration: none;">
          <div class="button-text" style="font-size: 18px;">数据库更新</div>
          <div class="button-expansion"></div>
        </a>
        <div class="button" @click="setView('dataPanel')">
          数据
          <div :class="`button-expansion${currentView === 'dataPanel'?' button-expansion-active':''}`"></div>
        </div>
        <div class="button" @click="setView('postList')">
          内容管理
          <div :class="`button-expansion${currentView === 'postList'?' button-expansion-active':''}`"></div>
        </div>
        <!-- 仅超级管理员可以管理用户，超级管理员权限仅可以修改数据库来赋予 -->
        <div v-if="isSuperUser" class="button" @click="setView('userList')">
          用户管理
          <div :class="`button-expansion${currentView === 'userList'?' button-expansion-active':''}`"></div>
        </div>
      </div>
      <div class="logout-button" @click="logout">
        <img class="img" src="./imgs/logout.png" />退出账户
      </div>
    </div>
    <div class="view">
      <dataPanel v-if="currentView === 'dataPanel'" />
      <postList v-if="currentView === 'postList'" />
      <userList v-if="currentView === 'userList'" />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import dataPanel from './dataPanel'
import postList from './postList'
import userList from './userList'
export default {
  name: 'IndexPage',
  components: {dataPanel, postList, userList},
  data(){
    return{
      currentView: 'dataPanel', // 当前视图 ['dataPanel','postList','userList']
    }
  },
  computed: {
    ...mapState({userToken: 'userToken', isSuperUser: 'isSuperUser'}),
  },
  created() {
    if(!this.userToken){
      this.$router.push('/manage/login')
    }
  },
  methods: {
    setView(view){
      this.currentView = view;
      // eslint-disable-next-line no-console
      console.log('view',view)
    },
    logout(){
      this.$store.dispatch('logout');
      location.reload();
    },
  }
}
</script>

<style lang="less" scoped>
.main{
  width: 100%;
  height: 100%;
  background-color: rgb(241, 241, 241);
  text-align: center;
  display: flex;
  flex-direction: row;
}
.menu{
  height: 100%;
  width: 236px;
  min-width: 236px;
  /* flex-grow: 1; */
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.button-list{
  height: 334px;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  padding-left: 35px;
  padding-right: 25px;
}
.button{
  width: 100%;
  height: 74px;
  background: #EBEEF5;
  border-radius: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 74px;
  color: #6A81A5;
  cursor: pointer;
  position:relative;
}
.button-expansion{
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 74px;
  background: #EBEEF5;
  border-radius: 20px;
  transition: all 0.3s;
}
.button-expansion-active {
  margin-right: -45px;
  width: 85px;
  background: #EBEEF5;
}
.button:hover > .button-expansion {
  margin-right: -45px;
  width: 85px;
  background: #EBEEF5;
}
.view{
  height: 100%;
  width: 1204px;
  flex-grow: 1;
}
.logout-button{
  height: 49px;
  left: 50px;
  right: 50px;
  border-radius: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 49px;
  cursor: pointer;
  position:absolute;
  bottom: 39px;
  font-size: 16px;
  line-height: 49px;
  color: #6A81A5;
  border: 3px solid #EBEEF5;
  transition: all 0.3s;
  .img{
    height: 16px;
    margin-right: 5px;
    transform: translateY(2px);
  }
}
.logout-button:hover{
  border: 3px solid #6A81A5;
}
</style>
