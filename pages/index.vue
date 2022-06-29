<template>
  <div class="main">
    <div class="welcome-page">
      <map-background />
      <div class="welcome-content">
        <div v-if="lang == 'zh'" class="welcome-heading">
          时空桥接无限可能
        </div>
        <div v-if="lang == 'en'" class="welcome-heading">
          Where GeoSpatial Thinking Shines
        </div>
        <div v-if="lang =='zh'" class="welcome-description">
          致力于分享世界各地 GIS 相关领域教育信息
        </div>
        <div v-if="lang =='en'" class="welcome-description">
          Empower the GIS-related education for the future
        </div>
        <div v-if="lang =='zh'" class="welcome-buttons">
          <el-button class="explore-academic-recruiting" @click="goToPostList('academic')">招生信息</el-button>
          <el-button class="explore-job-recruiting" @click="goToPostList('job')">招聘信息</el-button>
          <el-button class="explore-programs" @click="goToUniversityList">院校指南</el-button>
        </div>
        <div v-if="lang =='en'" class="welcome-buttons">
          <el-button class="explore-academic-recruiting" @click="goToPostList('academic')">Academic Recruiting</el-button>
          <el-button class="explore-job-recruiting" @click="goToPostList('job')">Job Recruiting</el-button>
          <el-button class="explore-programs" @click="goToUniversityList">School Instruction</el-button>
        </div>
      </div>

      <div v-if="lang =='zh'" class="contact-us" @mouseover="showContactCard = true" @mouseleave="showContactCard = false">
        {{ showContactCard }}
        <div v-if="showContactCard">
          <div>加入微信社区</div>
          <div>gisphere@outlook.com</div>
        </div>
        <el-button type="info" round class="contact-us-button">联系我们 / 加入我们</el-button>
      </div>
      <div v-if="lang =='en'" class="contact-us" @mouseover="showContactCard = true" @mouseleave="showContactCard = false">
        <div v-if="showContactCard">
          <div>加入微信社区</div>
          <div>gisphere@outlook.com</div>
        </div>
        <el-button type="info" round class="contact-us-button">Contact Us / Join Us</el-button>
      </div>

    </div>

    <div class="field"> 
      <div v-if="lang =='zh'" class="introduce-page">
        <div class="intro-title">
          专业领域 
          <hr class="short-horizontal-line"/>
        </div>
        <div class="intro-text">
          This guide was launched in September 2019, and the latest update time is Feb 2022. We aim to provide timely and comprehensive information of global graduate-level programs in geographic information sciences (GIS). Authors of this guide are from GIS-related programs, being either current graduate students, recent alumni, or young faculty. We mainly provide first-hand information about GIS-related programs and potential supervisors. We hope this guide can help those who are seeking graduate school opportunities in GIS.
        </div>
        <div class="intro-tag">
          <el-tag type="info" class="tag">地理信息系统</el-tag>
          <el-tag type="info" class="tag">健康</el-tag>
          <el-tag type="info" class="tag">大数据</el-tag>
          <el-tag type="info" class="tag">遥感</el-tag>
          <el-tag type="info" class="tag">公共健康</el-tag>
          <el-tag type="info" class="tag">房地产</el-tag>
          <el-tag type="info" class="tag">城乡规划</el-tag>
          <el-tag type="info" class="tag">可持续发展</el-tag>
          <el-tag type="info" class="tag">交通</el-tag>
          <el-tag type="info" class="tag">地质</el-tag>
          <el-tag type="info" class="tag">自然资源</el-tag>
          <el-tag type="info" class="tag">水文</el-tag>
        </div>

        <div>
          <p class="to-be-added">More to be added</p>
        </div>
      </div>

      <div v-if="lang =='en'" class="introduce-page">
        <div class="intro-title">
          Fields
          <hr class="short-horizontal-line"/>
        </div>
        <div class="intro-text">
          The sky above the white moon, the twelve towers. The sage helps me on my head, the hair is pulled by the long-lived. Wrongly pursued the world's pleasure, not enough to be in the wrong. The ninety-six sages, floating in the sky, name of the empty sky. The sky is thrown, not able to forget the war. Try to conquer the king's brief, the crown of the reigning. The time is big mistake, the crown is thrown away. The sword is not for all
        </div>
        <div class="intro-tag">
          <el-tag type="info" class="tag">GIS</el-tag>
          <el-tag type="info" class="tag">Health</el-tag>
          <el-tag type="info" class="tag">Bid Data</el-tag>
          <el-tag type="info" class="tag">Remote Sensing</el-tag>
          <el-tag type="info" class="tag">Public Health</el-tag>
          <el-tag type="info" class="tag">Real Estate</el-tag>
          <el-tag type="info" class="tag">Urban Planning</el-tag>
          <el-tag type="info" class="tag">Sustainability</el-tag>
          <el-tag type="info" class="tag">Transportation</el-tag>
          <el-tag type="info" class="tag">Geology</el-tag>
          <el-tag type="info" class="tag">Natural Resources</el-tag>
          <el-tag type="info" class="tag">Water</el-tag>
        </div>

        <div>
          <p class="to-be-added">More to be added</p>
        </div>
      </div>
    </div>

    <div class="about"> 
      <div v-if="lang =='zh'" class="intro-title">
          关于我们
          <hr class="short-horizontal-line"/>
      </div>
      <div v-if="lang =='en'" class="intro-title">
        Who are we?
        <hr class="short-horizontal-line"/>
      </div>
    </div>

    <div class="school">
      <div v-if="lang =='zh'" class="intro-title">
        院校列表
        <hr class="short-horizontal-line"/>

        <div class="intro-text">
          <div class="school-table">
            <table class="uni-table">
              <tr>
                <td class="uni-content"><b>亚洲</b></td>
                <td class="uni-content"><b>北美</b></td>
                <td class="uni-content"><b>欧洲</b></td>
                <td class="uni-content"><b>大洋洲</b></td>
                <td class="uni-content"><b>非洲</b></td>
              </tr>
              <tr>
                <td class="uni-content">新加坡国立大学</td>
                <td class="uni-content">加州大学伯克利分校</td>
                <td class="uni-content">剑桥大学</td>
                <td class="uni-content">墨尔本大学</td>
                <td class="uni-content">约翰内斯堡大学</td>
              </tr>
              <tr>
                <td class="uni-content">新加坡国立大学</td>
                <td class="uni-content">加州大学伯克利分校</td>
                <td class="uni-content">剑桥大学</td>
                <td class="uni-content">墨尔本大学</td>
                <td class="uni-content">约翰内斯堡大学</td>
              </tr>
            </table>
            <!-- <template> -->
              <!-- <el-table :data="uniData" style="width: 100%" class="el-table">
                <el-table-column
                  prop="asia"
                  label="亚洲"
                  width="227">
                </el-table-column>
                <el-table-column
                  prop="northAmerica"
                  label="北美"
                  width="227">
                </el-table-column>
                <el-table-column
                  prop="Europe"
                  label="欧洲"
                  width="227">
                </el-table-column>
                <el-table-column
                  prop="oceania"
                  label="大洋洲"
                  width="227">
                </el-table-column>
                <el-table-column
                  prop="africa"
                  label="非洲"
                  width="227">
                </el-table-column>
              </el-table>   -->
            <!-- </template> -->
          </div>
      </div>
      </div>
      <div v-if="lang =='en'" class="intro-title">
        School
        <hr class="short-horizontal-line"/>
      </div>


    </div>

    <div class="contact_us"> 
      <div v-if="lang =='zh'" class="intro-title">
        联系我们
        <hr class="short-horizontal-line"/>
        <div class="intro-text">
          <table class="contact-table">
            <tr>
              <td class="contact-content">康雨豪  kkyyhh96@outlook.com</td>
              <td class="contact-content">叶山  yeshanumich@hotmail.com</td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="lang =='en'" class="intro-title">
        Contact Us
        <hr class="short-horizontal-line"/>
      </div>
    </div>

    <bottom-bar />

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <p>此网站正在建设中</p>
      <p>如须获取 GISphere 相关信息，请访问 <a href="https://www.gisphere.net">https://www.gisphere.net</a></p>
      <p>如有疑问，请联系 <a href="mailto:gisphere@outlook.com">gisphere@outlook.com</a></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {mapState} from 'vuex';
import {isMobile} from '@/utils/index'

export default {
  name: 'IndexPage',
  data() {
    return {
      dialogVisible: true,
      showContactCard: false,
    }
  },

  // element ui table的数据
  // data() {
  //   return {
  //     uniData: [{
  //       asia: '新加坡国立大学',
  //       northAmerica: '威斯康星大学麦迪逊分校',
  //       Europe: '剑桥大学',
  //       oceania: '墨尔本大学',
  //       africa: '约翰内斯堡大学'
  //     },{
  //       asia: '香港大学',
  //       northAmerica: '加州大学伯克利分校',
  //       Europe: '爱丁堡大学',
  //       oceania: '奥克兰大学',
  //       africa: '我编不出来大学'
  //     }],
  //   }
  // },

  computed: {
    ...mapState({lang: 'language'}),
  },
  mounted() {
    if(isMobile()){
      this.$router.push('/mobile/');
    }
  },
  methods: {
    goToPostList(type) {
      if(type){
        this.$router.push({
          path: '/postList',
          query: {
            type
          }
        })
      }else{
        this.$router.push('/postList');
      }
    },
    goToUniversityList() {
      window.location.href = 'https://www.gisphere.net';
    },
  }
}
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
  }
  .welcome-page{
    height:100%;
    width:100%;
  }
  .introduce-page{
    height:auto;
    width:100%;
  }
  .welcome-content{
    position: absolute;
    left: calc((492/1440)*100vw);
    margin-left: -399px;
    top: calc((427/1080)*100vh);
    margin-top: -136px;
    width: 798px;
    height: 272px;
  }
  .welcome-heading{
    font-style: normal;
    font-weight: 800;
    font-size: 50px;
    line-height: 60px;
    letter-spacing: -2px;
    color: #0073FF;
  }
  .welcome-description {
    margin-top: 15px;
    font-size: 20px;
    letter-spacing: 2px;
    color: #FFFFFF;
  }
  .welcome-buttons {
    margin-top: 39px;
  }
  .explore-academic-recruiting {
    border-color: #FFFFFF;
    background-color: #FFFFFF;
    color: #0073FF;
  }
  .explore-job-recruiting {
    border-color: #FFFFFF;
    background-color: transparent;
    color: #FFFFFF;
  }
  .explore-programs {
    border-color: #0073FF;
    background-color: transparent;
    color: #0073FF;
  }
  .explore-academic-recruiting:active,
  .explore-academic-recruiting:hover,
  .explore-job-recruiting:active,
  .explore-job-recruiting:hover,
  .explore-programs:active,
  .explore-programs:hover {
    border-color: #0073FF;
    background-color: #0073FF;
    color: #FFFFFF;
    transition: 300ms ease-in-out;
  }
  .contact-us {
    position:absolute;
    bottom: 60px; 
    right: 60px;
  }
  .contact-us-button {
    background-color: #909399;
    border-color: transparent;
  }
  .contact-us-button:active,
  .contact-us-button:hover {
    background-color: #C0C4CC;
    transition: 300ms ease-in-out;
  }
  .intro-title {
    text-align: center;
    font-size: 40px;
    color: #0073FF;
    margin-top: 32px;
  }
  .short-horizontal-line {
    width: 5%;
    height: 2px;
    background-color: #0073FF;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .intro-text {
    line-height: 26px;
    letter-spacing: 2px;
    color: #000000;
    margin-left: 151.5px;
    margin-right: 151.5px;
  }
  .intro-tag {
    margin: 16px 151.5px;
  }
  .tag {
    background-color: #DCDFE6;
    color: #000000;
    text-align: center;
    padding: 20px 195.5px 38px 23.5px;
    margin: 8px 4px;
    width: 272px;
    height: 81px;
  }
  .to-be-added {
    color: #0073FF;
    text-align: center;
  }
  /* .el-table {
    background-color: #000000;
  } */
  table {
    border-collapse: collapse;
    width: 100%;
  }
  .uni-content {
    width: 20%;
    font-size: 15px;
    text-align: left;
  }
  .contact-content {
    width: 50%;
    font-size: 15px;
    text-align: center;
  }
</style>
