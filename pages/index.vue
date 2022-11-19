<template>
  <div class="main" @click.right.prevent @copy.prevent @paste.prevent>
    <div class="welcome-page">
      <map-background />
      <div class="welcome-content">
        <div v-if="lang == 'zh'" class="welcome-heading">时空桥接无限可能</div>
        <div v-if="lang == 'en'" class="welcome-heading">
          Where GeoSpatial Thinking Shines
        </div>
        <div v-if="lang == 'zh'" class="welcome-description">
          致力于分享世界各地 GIS 相关领域教育信息
        </div>
        <div v-if="lang == 'en'" class="welcome-description">
          Empower the GIS-related education for the future
        </div>
        <div v-if="lang == 'zh'" class="welcome-buttons">
          <el-button
            class="explore-academic-recruiting"
            @click="goToPostList('academic')"
            >招生信息</el-button
          >
          <el-button class="explore-job-recruiting" @click="goToPostList('job')"
            >招聘信息</el-button
          >
          <el-button class="explore-programs" @click="goToUniversityList"
            >院校指南</el-button
          >
        </div>
        <div v-if="lang == 'en'" class="welcome-buttons">
          <el-button
            class="explore-academic-recruiting"
            @click="goToPostList('academic')"
            >Academic Recruiting</el-button
          >
          <el-button class="explore-job-recruiting" @click="goToPostList('job')"
            >Job Recruiting</el-button
          >
          <el-button class="explore-programs" @click="goToUniversityList"
            >School Instruction</el-button
          >
        </div>
      </div>

      <div
        v-if="lang == 'zh'"
        class="contact-us"
        @mouseover="showContactCard = true"
        @mouseleave="showContactCard = false"
      >
        <transition name="trans-content">
          <div v-if="showContactCard" class="contact-us-card">
            <div class="contact-us-content">
              <a href="mailto:gisphere@outlook.com"> gisphere@outlook.com </a>
            </div>
            <div class="contact-us-content">加入微信社区</div>
            <div class="contact-us-qrcode">
              <img src="../components/BottomBar/imgs/wechat-qrcode.png" />
            </div>
          </div>
        </transition>
        <el-button type="info" round class="contact-us-button"
          >联系我们 / 加入我们</el-button
        >
      </div>

      <div
        v-if="lang == 'en'"
        class="contact-us"
        @mouseover="showContactCard = true"
        @mouseleave="showContactCard = false"
      >
        <transition name="trans-content">
          <div v-if="showContactCard" class="contact-us-card">
            <div class="contact-us-content">
              <a href="mailto:gisphere@outlook.com"> gisphere@outlook.com </a>
            </div>
            <div class="contact-us-content">Join our Whatsapp</div>
            <div class="contact-us-qrcode">
              <img src="../static/WhatsApp.png" />
            </div>
          </div>
        </transition>
        <el-button type="info" round class="contact-us-button"
          >Contact Us / Join Us</el-button
        >
      </div>
    </div>

    <div class="field">
      <div v-if="lang == 'zh'" class="introduce-page">
        <div class="intro-title">
          项目介绍
          <hr class="short-horizontal-line" />
        </div>
        <div class="intro-text">{{ projectIntroZH }}</div>
        <div class="intro-tag">
          <div class="tag">{{ subProject[0] }}</div>
          <div class="tag">{{ subProject[1] }}</div>
          <div class="tag">{{ subProject[2] }}</div>
          <div class="tag">{{ subProject[3] }}</div>
          <div class="tag">{{ subProject[4] }}</div>
        </div>
      </div>

      <div v-if="lang == 'en'" class="introduce-page">
        <div class="intro-title">
          Project Introduction
          <hr class="short-horizontal-line" />
        </div>
        <div class="intro-text">{{ projectIntroEN }}</div>
        <div class="intro-tag">
          <div class="tag">{{ subProject[0] }}</div>
          <div class="tag">{{ subProject[1] }}</div>
          <div class="tag">{{ subProject[2] }}</div>
          <div class="tag">{{ subProject[3] }}</div>
          <div class="tag">{{ subProject[4] }}</div>
        </div>
      </div>
    </div>

    <div class="school">
      <div v-if="lang == 'zh'" class="intro-title">
        热门院校
        <hr class="short-horizontal-line" />
        <div class="intro-text">
          <div>
            <table class="uni-table">
              <tr>
                <td class="uni-content-title"><b>亚洲</b></td>
                <td class="uni-content-title"><b>北美</b></td>
                <td class="uni-content-title"><b>欧洲</b></td>
                <td class="uni-content-title"><b>大洋洲</b></td>
                <td class="uni-content-title"><b>非洲</b></td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesZH.asia[0] }}</td>
                <td class="uni-content">{{ universitiesZH.na[0] }}</td>
                <td class="uni-content">{{ universitiesZH.eu[0] }}</td>
                <td class="uni-content">{{ universitiesZH.oceania[0] }}</td>
                <td class="uni-content">{{ universitiesZH.africaAndLA[0] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesZH.asia[1] }}</td>
                <td class="uni-content">{{ universitiesZH.na[1] }}</td>
                <td class="uni-content">{{ universitiesZH.eu[1] }}</td>
                <td class="uni-content">{{ universitiesZH.oceania[1] }}</td>
                <td class="uni-content">{{ universitiesZH.africaAndLA[1] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesZH.asia[2] }}</td>
                <td class="uni-content">{{ universitiesZH.na[2] }}</td>
                <td class="uni-content">{{ universitiesZH.eu[2] }}</td>
                <td class="uni-content">{{ universitiesZH.oceania[2] }}</td>
                <td class="uni-content">{{ universitiesZH.africaAndLA[2] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesZH.asia[3] }}</td>
                <td class="uni-content">{{ universitiesZH.na[3] }}</td>
                <td class="uni-content">{{ universitiesZH.eu[3] }}</td>
                <td class="uni-content">{{ universitiesZH.oceania[3] }}</td>
                <td class="uni-content">{{ universitiesZH.africaAndLA[3] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesZH.asia[4] }}</td>
                <td class="uni-content">{{ universitiesZH.na[4] }}</td>
                <td class="uni-content">{{ universitiesZH.eu[4] }}</td>
                <td class="uni-content">{{ universitiesZH.oceania[4] }}</td>
                <td class="uni-content">{{ universitiesZH.africaAndLA[4] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesZH.asia[5] }}</td>
                <td class="uni-content">{{ universitiesZH.na[5] }}</td>
                <td class="uni-content">{{ universitiesZH.eu[5] }}</td>
                <td class="uni-content">{{ universitiesZH.oceania[5] }}</td>
                <td class="uni-content">{{ universitiesZH.africaAndLA[5] }}</td>
              </tr>
            </table>
            <div>
              <a href="https://www.gisphere.net/" target="_blank"
                ><p class="to-be-added">完整院校列表</p></a
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="lang == 'en'" class="intro-title">
        Popular Institutes
        <hr class="short-horizontal-line" />
        <div class="intro-text">
          <div>
            <table class="uni-table">
              <tr>
                <td class="uni-content"><b>Asia</b></td>
                <td class="uni-content"><b>North America</b></td>
                <td class="uni-content"><b>Europe</b></td>
                <td class="uni-content"><b>Oceania</b></td>
                <td class="uni-content"><b>Africa and South America</b></td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesEN.asia[0] }}</td>
                <td class="uni-content">{{ universitiesEN.na[0] }}</td>
                <td class="uni-content">{{ universitiesEN.eu[0] }}</td>
                <td class="uni-content">{{ universitiesEN.oceania[0] }}</td>
                <td class="uni-content">{{ universitiesEN.africaAndLA[0] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesEN.asia[1] }}</td>
                <td class="uni-content">{{ universitiesEN.na[1] }}</td>
                <td class="uni-content">{{ universitiesEN.eu[1] }}</td>
                <td class="uni-content">{{ universitiesEN.oceania[1] }}</td>
                <td class="uni-content">{{ universitiesEN.africaAndLA[1] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesEN.asia[2] }}</td>
                <td class="uni-content">{{ universitiesEN.na[2] }}</td>
                <td class="uni-content">{{ universitiesEN.eu[2] }}</td>
                <td class="uni-content">{{ universitiesEN.oceania[2] }}</td>
                <td class="uni-content">{{ universitiesEN.africaAndLA[2] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesEN.asia[3] }}</td>
                <td class="uni-content">{{ universitiesEN.na[3] }}</td>
                <td class="uni-content">{{ universitiesEN.eu[3] }}</td>
                <td class="uni-content">{{ universitiesEN.oceania[3] }}</td>
                <td class="uni-content">{{ universitiesEN.africaAndLA[3] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesEN.asia[4] }}</td>
                <td class="uni-content">{{ universitiesEN.na[4] }}</td>
                <td class="uni-content">{{ universitiesEN.eu[4] }}</td>
                <td class="uni-content">{{ universitiesEN.oceania[4] }}</td>
                <td class="uni-content">{{ universitiesEN.africaAndLA[4] }}</td>
              </tr>
              <tr>
                <td class="uni-content">{{ universitiesEN.asia[5] }}</td>
                <td class="uni-content">{{ universitiesEN.na[5] }}</td>
                <td class="uni-content">{{ universitiesEN.eu[5] }}</td>
                <td class="uni-content">{{ universitiesEN.oceania[5] }}</td>
                <td class="uni-content">{{ universitiesEN.africaAndLA[5] }}</td>
              </tr>
            </table>
          </div>
          <div>
            <a href="https://www.gisphere.net/" target="_blank"
              ><p class="to-be-added">Full list of institutes</p></a
            >
          </div>
        </div>
      </div>
    </div>

    <bottom-bar />

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="30%"
    >
      <p>此网站正在建设中</p>
      <p>
        如须获取 GISphere 相关信息，请访问
        <a href="https://www.gisphere.net">https://www.gisphere.net</a>
      </p>
      <p>
        如有疑问，请联系
        <a href="mailto:gisphere@outlook.com">gisphere@outlook.com</a>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isMobile } from '@/utils/index'
import { ProjectIntro } from '~/utils/ProjectIntro'
import { universities } from '~/utils/Universities'

export default {
  name: 'IndexPage',
  data() {
    return {
      dialogVisible: false,
      showContactCard: false,
      projectIntroZH: ProjectIntro[0],
      projectIntroEN: ProjectIntro[1],
      subProject: ['GIS-Info', 'GISphere', 'GISource', 'GISpace', 'GISalon'],
      universitiesZH: universities.zh,
      universitiesEN: universities.en,
    }
  },

  computed: {
    ...mapState({ lang: 'language' }),
  },

  mounted() {
    if (isMobile()) {
      this.$router.push('/mobile/')
    }
    this.dialogVisible = false
  },

  methods: {
    goToPostList(type) {
      if (type) {
        this.$router.push({
          path: '/postList',
          query: {
            type,
          },
        })
      } else {
        this.$router.push('/postList')
      }
    },
    goToUniversityList() {
      window.location.href = 'https://www.gisphere.net'
    },
    disableCopy(e) {
      e.preventDefault()
    },
  },
}
</script>

<style scoped>
/* 
  // 禁止选中文字的css解决办法
  * { 
  -webkit-user-select: none;  
  -moz-user-select: none;  
  -ms-user-select: none;  
  -o-user-select: none;  
  user-select: none; 
} */
.main {
  width: 100%;
  height: 100%;
}
.welcome-page {
  height: 100%;
  width: 100%;
  position: relative;
}
.introduce-page {
  height: auto;
  width: 100%;
}
.welcome-content {
  position: absolute;
  left: calc((492 / 1440) * 100vw);
  /* left: 93px; */
  margin-left: -399px;
  top: calc((427 / 1080) * 100vh);
  /* top: 376px; */
  margin-top: -136px;
  width: 798px;
  height: 272px;
}
.welcome-heading {
  font-style: normal;
  font-weight: 800;
  font-size: 50px;
  line-height: 60px;
  letter-spacing: -2px;
  color: #0073ff;
}
.welcome-description {
  margin-top: 15px;
  font-size: 20px;
  letter-spacing: 2px;
  color: #ffffff;
}
.welcome-buttons {
  margin-top: 39px;
}
.explore-academic-recruiting {
  border-color: #ffffff;
  background-color: #ffffff;
  color: #0073ff;
}
.explore-job-recruiting {
  border-color: #ffffff;
  background-color: transparent;
  color: #ffffff;
}
.explore-programs {
  border-color: #0073ff;
  background-color: transparent;
  color: #0073ff;
}
.explore-academic-recruiting:active,
.explore-academic-recruiting:hover,
.explore-job-recruiting:active,
.explore-job-recruiting:hover,
.explore-programs:active,
.explore-programs:hover {
  border-color: #0073ff;
  background-color: #0073ff;
  color: #ffffff;
  transition: 300ms ease-in-out;
}
.contact-us {
  position: absolute;
  bottom: 60px;
  right: 60px;
}
.contact-us-card {
  background-color: transparent;
}
.contact-us-button {
  background-color: #909399;
  border-color: transparent;
}
.contact-us-button:active,
.contact-us-button:hover {
  background-color: #c0c4cc;
  transition: 300ms ease-in-out;
}
.intro-title {
  text-align: center;
  font-size: 40px;
  color: #0073ff;
  margin-top: 32px;
}
.short-horizontal-line {
  width: 5%;
  height: 2px;
  background-color: #0073ff;
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
  display: flex;
  justify-content: space-between;
}

.tag {
  background-color: #dcdfe6;
  border-radius: 10px;
  height: 60px;
  line-height: 60px;
  width: 180px;
  font-size: medium;
  text-align: center;
}
.uni-table {
  border-collapse: collapse;
  width: 100%;
}
.uni-content-title {
  font-size: 24px;
  text-align: left;
  padding-bottom: 10px;
}
.uni-content {
  width: 20%;
  font-size: 16px;
  text-align: left;
}
.contact-content {
  width: 50%;
  font-size: 15px;
  text-align: center;
}
.contact-us-content {
  background-color: #909399;
  border-radius: 30px;
  height: 40px;
  width: 171.68px;
  line-height: 42px;
  text-align: center;
  font-size: small;
  margin-bottom: 5px;
}
.contact-us-qrcode {
  background-color: #909399;
  border-radius: 20px;
  height: 171.68px;
  width: 171.68px;
  margin-bottom: 5px;
}
.contact-us-qrcode > img {
  width: 80%;
  height: 80%;
  /* 图片居中显示 */
  margin-left: 10%;
  margin-top: 10%;
}
.trans-content-enter-active,
.trans-content-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 0.34, 0.77, 0.75);
}
.trans-content-enter,
.trans-content-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.school {
  margin-bottom: 64px;
}
.to-be-added {
  color: #0073ff;
  text-align: center;
  font-display: block;
  font-size: 16px;
}
</style>
