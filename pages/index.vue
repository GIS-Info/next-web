<template>
  <div class="main" @click.right.prevent @copy.prevent @paste.prevent>
    <div class="welcome-page">
      <map-background />

      <!-- Welcome content -->
      <div class="welcome-content">
        <div v-if="lang == 'zh'" class="zh-letter-spacing">
          <div class="welcome-heading">时空桥接无限可能</div>
          <div class="welcome-description">
            致力于分享世界各地 GIS 相关领域教育信息
          </div>
          <div class="welcome-buttons">
            <el-button
              class="explore-academic-recruiting"
              @click="goToPostList('academic')"
              >招生信息</el-button
            >
            <el-button
              class="explore-job-recruiting"
              @click="goToPostList('job')"
              >招聘信息</el-button
            >
            <el-button class="explore-programs" @click="goToUniversityList"
              >院校指南</el-button
            >
          </div>
        </div>
        <!-- <div v-if="lang == 'zh'" class="welcome-heading">时空桥接无限可能</div> -->
        <div v-if="lang == 'en'" class=".en-letter-spacing">
          <div class="welcome-heading">Where GeoSpatial Thinking Shines</div>
          <div class="welcome-description">
            Empower the GIS-related education for the future
          </div>
          <div class="welcome-buttons">
            <el-button
              class="explore-academic-recruiting"
              @click="goToPostList('academic')"
              >Academic Recruiting</el-button
            >
            <el-button
              class="explore-job-recruiting"
              @click="goToPostList('job')"
              >Job Recruiting</el-button
            >
            <el-button class="explore-programs" @click="goToUniversityList"
              >School Instruction</el-button
            >
          </div>
        </div>
      </div>

      <!-- Contact Us pop up card -->
      <div>
        <!-- ZH -->
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
        <!-- EN -->
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
    </div>

    <!-- Project Introduction -->
    <div class="field">
      <div v-if="lang == 'zh'" class="introduce-page">
        <div class="intro-title">
          项目介绍
          <hr class="short-horizontal-line" />
        </div>
        <div class="intro-text-zh">{{ projectIntroZH }}</div>
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
        <div class="intro-text-en">{{ projectIntroEN }}</div>
        <div class="intro-tag">
          <div class="tag">{{ subProject[0] }}</div>
          <div class="tag">{{ subProject[1] }}</div>
          <div class="tag">{{ subProject[2] }}</div>
          <div class="tag">{{ subProject[3] }}</div>
          <div class="tag">{{ subProject[4] }}</div>
        </div>
      </div>
    </div>

    <!-- Universities -->
    <div class="school">
      <div v-if="lang == 'zh'" class="intro-title">
        热门院校
        <hr class="short-horizontal-line" />
        <div class="intro-text-zh">
          <div>
            <table class="uni-table">
              <tr>
                <td class="uni-content-title"><b>亚洲</b></td>
                <td class="uni-content-title"><b>北美</b></td>
                <td class="uni-content-title"><b>欧洲</b></td>
                <td class="uni-content-title"><b>大洋洲</b></td>
                <td class="uni-content-title"><b>非洲</b></td>
              </tr>
              <tr v-for="(n, index) in maxUniversitiesListLength" :key="index">
                <td class="uni-content">{{ universitiesZH.asia[index] }}</td>
                <!-- <td>{{ index }}</td> -->
                <td class="uni-content">{{ universitiesZH.na[index] }}</td>
                <td class="uni-content">{{ universitiesZH.eu[index] }}</td>
                <td class="uni-content">{{ universitiesZH.oceania[index] }}</td>
                <td class="uni-content">
                  {{ universitiesZH.africaAndLA[index] }}
                </td>
              </tr>
            </table>
            <div>
              <!-- <p class="to-be-added">完整院校列表</p> -->
              <el-link
                href="https://www.gisphere.net/"
                target="_blank"
                class="to-be-added"
                >完整院校列表</el-link
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="lang == 'en'" class="intro-title">
        Popular Institutes
        <hr class="short-horizontal-line" />
        <div class="intro-text-en">
          <div>
            <table class="uni-table">
              <tr>
                <td class="uni-content"><b>Asia</b></td>
                <td class="uni-content"><b>North America</b></td>
                <td class="uni-content"><b>Europe</b></td>
                <td class="uni-content"><b>Oceania</b></td>
                <td class="uni-content"><b>Africa and South America</b></td>
              </tr>
              <tr v-for="index in maxUniversitiesListLength" :key="index">
                <td class="uni-content">
                  {{ universitiesEN.asia[index - 1] }}
                </td>
                <td class="uni-content">{{ universitiesEN.na[index - 1] }}</td>
                <td class="uni-content">{{ universitiesEN.eu[index - 1] }}</td>
                <td class="uni-content">
                  {{ universitiesEN.oceania[index - 1] }}
                </td>
                <td class="uni-content">
                  {{ universitiesEN.africaAndLA[index - 1] }}
                </td>
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

    <!-- Sponsor -->
    <div class="sponsor-part">
      <div class="introduce-page">
        <div class="intro-title">
          {{ lang == 'zh' ? '赞助商' : 'SPONSOR' }}
          <hr class="short-horizontal-line" />
        </div>
        <div class="sponsor-list">
          <div class="sponsor-card" @click="goUrl('https://maptable.com')">
            <b>Maptable</b>
            <small> 新一代空间数据协同工具</small>
          </div>
          <div
            class="sponsor-card"
            @click="goUrl('https://mp.weixin.qq.com/s/LPq-pXcoLwVkEQ5bcnT46g')"
          >
            <b>Vision 留学</b>
          </div>
          <div
            class="sponsor-card"
            @click="goUrl('mailto:gisphere@outlook.com')"
          >
            <b v-if="lang == 'zh'">成为赞助商？</b>
            <small v-if="lang == 'zh'">联系 gisphere@outlook.com</small>
            <b v-if="lang == 'en'">Become Sponsor?</b>
            <small v-if="lang == 'en'">mail to gisphere@outlook.com</small>
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
    maxUniversitiesListLength() {
      return Math.max(
        // Please make sure the number of universities in Chinese and in English
        // are the same.
        this.universitiesZH.asia.length,
        this.universitiesZH.na.length,
        this.universitiesZH.eu.length,
        this.universitiesZH.oceania.length,
        this.universitiesZH.africaAndLA.length
      )
    },
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
      // 暂时不放出对外的入口，先进行内部测试
      // this.$router.push('/uniInfo');
    },
    goUrl(url) {
      window.location.href = url
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
  color: #0073ff;
  /* 保持背景黑色阴影 */
  text-shadow: 0 0 20px #1f1f20, 0 0 40px #1f1f20, 0 0 60px #1f1f20,
    0 0 80px #1f1f20;
}
.welcome-description {
  margin-top: 15px;
  font-size: 20px;
  color: #ffffff;
  /* 保持背景黑色阴影 */
  text-shadow: 0 0 20px #1f1f20, 0 0 40px #1f1f20, 0 0 60px #1f1f20,
    0 0 80px #1f1f20;
}
.welcome-buttons {
  margin-top: 39px;
  margin-bottom: 39px;
  /* 保持背景黑色阴影 */
  text-shadow: 0 0 20px #1f1f20, 0 0 40px #1f1f20, 0 0 60px #1f1f20,
    0 0 80px #1f1f20;
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
.intro-text-zh {
  line-height: 26px;
  color: #000000;
  margin-left: 151.5px;
  margin-right: 151.5px;
}
.intro-text-en {
  line-height: 26px;
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
  text-align: center;
  padding-bottom: 10px;
}
.uni-content {
  width: 20%;
  height: 2.5rem;
  font-size: 16px;
  text-align: center;
  vertical-align: text-top;
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
  cursor: pointer;
  display: inline-block;
  margin: 0;
}
.sponsor-part {
  line-height: 26px;
  color: #000000;
  margin-left: 151.5px;
  margin-right: 151.5px;
  margin-bottom: 100px;
  display: block;
}
.sponsor-card {
  background-color: #efefef;
  border-radius: 10px;
  height: 80px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 30px;
  cursor: pointer;
  transition: all 0.2s;
}
.sponsor-card:hover {
  transform: translateY(-5px);
  background-color: #f6f4f4;
}
.sponsor-list {
  display: flex;
  justify-content: center;
}
.zh-letter-spacing {
  letter-spacing: 2px;
}
.en-letter-spacing {
  letter-spacing: 1px;
}
</style>
