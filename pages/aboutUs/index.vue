<template>
  <div class="container">
    <div class="main">
      <h2>{{ lang == 'zh' ? '关于我们' : 'About Us' }}</h2>
      <p>
        GISphere
        是一个公益项目，由一批在全球不同院校从事地理信息及相关领域科研工作的中国青年学生学者于2019年9月提供一个分享世界各地GIS相关研究生项目、导师和学术前沿信息的在线平台，促进不同国家/地区的GIS相关院校与学生之间的交流、教育与发生的纠纷是合作，共同推动GIS学科和相关产业的发展。目前，旗下子项目包括：
      </p>
      <p><b>GIS-Info 网站</b> 全面介绍海外 GIS 相关院校、专业及老师信息</p>
      <p>
        <b>GISphere 公众号</b> 分享海外院校GIS相关专业学生的申请经验及就读体验
      </p>
      <p>
        <b>GISource 环球资讯速递</b>
        实时发布最新海外院校GIS相关硕士、博士等招生信息
      </p>
      <p><b>GISpace 社区讨论群</b> 为GIS相关专业的海外学者和学生提供交流平台</p>
      <p>
        <b>GISalon 圆桌讨论</b> 和学长学姐“零距离”聊聊留学和职业发展那些事儿
      </p>
      <h2>团队成员</h2>
      <div class="map-container">
        <iframe
          id="maptable_AboutUs"
          width="90%"
          height="450"
          frameborder="0"
          :src="mapinfo[tab]"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <el-tabs v-model="tab">
        <el-tab-pane label="GIS-Info 网站" name="gisinfo">
          <satff-list :staffs="info.gisinfo" />
        </el-tab-pane>
        <el-tab-pane label="GISphere 公众号" name="gisphere">
          <satff-list :staffs="info.gisphere" />
        </el-tab-pane>
        <el-tab-pane label="GISource 资讯" name="gisource">
          <satff-list :staffs="info.gisource" />
        </el-tab-pane>
        <el-tab-pane label="GISpace 社区" name="gispace">
          <satff-list :staffs="info.gispace" />
        </el-tab-pane>
        <el-tab-pane label="GISalon 圆桌" name="gisalon">
          <satff-list :staffs="info.gisalon" />
        </el-tab-pane>
        <el-tab-pane label="GISpread 媒体组" name="media">
          <satff-list :staffs="info.gispread" />
        </el-tab-pane>
        <el-tab-pane label="宣传组" name="publicity">
          <satff-list :staffs="info.publicity" />
        </el-tab-pane>
        <el-tab-pane label="GIStudio 设计组" name="design">
          <satff-list :staffs="info.gistudio" />
        </el-tab-pane>
        <el-tab-pane label="GIStory 访谈" name="interview">
          <satff-list :staffs="info.gistory" />
        </el-tab-pane>
        <el-tab-pane label="alumni" name="alumni">
          <satff-list :staffs="info.alumni" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import satffList from './components/staffList.vue'
import staffInfo from './staff.json'
import { isMobile } from '@/utils/index'
export default {
  components: {
    satffList,
  },
  data() {
    return {
      tab: 'gisinfo',
      info: staffInfo,
      mapinfo: {
        gisinfo:
          'https://maptable.com/s/embed/d3qjbxkuornk?loc=32.36,20.11,2.00z',
        gisalon:
          'https://maptable.com/s/embed/d3qkcdxa86bk?loc=38.17,9.24,2.00z',
        gisource:
          'https://maptable.com/s/embed/d3qkrxdviy2o?loc=35.48,18.53,2.00z',
        gispace:
          'https://maptable.com/s/embed/d3ql8ozd8dmo?loc=41.89,-82.36,2.00z',
        alumni:
          'https://maptable.com/s/embed/d3qlgyu6uww0?loc=28.04,22.95,2.00z',
        gisphere:
          'https://maptable.com/s/embed/d3qmlc99gcg0?loc=40.35,3.42,2.00z',
        media: 'https://maptable.com/s/embed/d3qmyncqcrgg?loc=29.10,9.01,2.00z',
        interview:
          'https://maptable.com/s/embed/d3qna9hggx6o?loc=31.32,12.86,2.00z',
        design:
          'https://maptable.com/s/embed/d3qnk40onhfk?loc=39.76,-43.16,2.00z',
        publicity:
          'https://maptable.com/s/embed/d3qnrqdl5x4w?loc=39.32,17.31,2.00z',
      },
    }
  },

  mounted() {
    if (isMobile()) {
      this.$router.push('/mobile' + this.$router.currentRoute.path)
    }
  },
}
</script>

<style lang="less" scoped>
b {
  margin-right: 20px;
}
h2 {
  margin-top: 40px;
}
.container {
  overflow: auto;
  width: 100%;
  height: 100%;
  //  background-color: #EBEEF5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .main {
    width: 100%;
    max-width: 1200px;
    padding: 40px 20px;
    box-sizing: border-box;
  }
  .map-container {
    text-align: center;
    margin-top: 20px; /* Adjust as needed */
    margin-bottom: 20px;
  }
}
</style>
