<template>
  <div class="main" @copy.prevent @paste.prevent>
    <div class="welcome-page">
      <map-background />

      <!-- Welcome content -->
      <div class="welcome-content">
        <div v-if="lang == 'zh'" class="zh-letter-spacing">
          <div class="welcome-heading">时空<br />桥接无限可能</div>
          <div class="welcome-description">
            致力于分享<br />世界各地 GIS 相关领域教育信息
          </div>
          <div class="welcome-buttons">
            <el-button
              type="primary"
              class="big-button-zh"
              @click="goToPostList('academic')"
              >招生信息</el-button
            >
            <el-button v-if="false" @click="goToPostList('job')"
              >招聘信息</el-button
            >
            <el-button class="big-button-zh" @click="goToUniversityList"
              >院校指南</el-button
            >
            <el-button class="big-button-zh" @click="goToForum"
              >GIScience访谈</el-button
            >
          </div>
        </div>
        <div v-if="lang == 'en'" class="en-letter-spacing">
          <div class="welcome-heading">Where GeoSpatial Thinking Shines</div>
          <div class="welcome-description">
            Empower the GIS-related education for the future
          </div>
          <div class="welcome-buttons">
            <el-button
              type="primary"
              class="big-button"
              @click="goToPostList('academic')"
              >Academic Recruiting</el-button
            >
            <el-button v-if="false" @click="goToPostList('job')"
              >Job Recruiting</el-button
            >
            <el-button class="big-button" @click="goToUniversityList"
              >Institutions</el-button
            >
          </div>
        </div>
      </div>
      <!-- Functional Buttons -->
      <div class="functional-buttons">
        <el-button
          class="white-book-button"
          round
          @click="$router.push('white-book')"
          >{{
            lang == 'zh'
              ? 'GISphere 留学指南 · 大数据报告白皮书'
              : 'GISphere Global Admission Annual Review'
          }}</el-button
        >
        <el-button
          class="white-book-button"
          round
           @click="goToMailingList"
          >{{ lang == 'zh' ? '订阅邮箱' : 'Subscribe to Email' }}</el-button
        >
        <!-- Contact Us pop up card -->
        <el-dialog
          :visible.sync="showContactCard"
          :show-close="false"
          :title="contactUsTitle"
        >
          <!-- ZH -->
          <div v-if="lang == 'zh'" class="contact-us-card">
            <div class="contact-us-content">
              <a href="mailto:gisphere@outlook.com"> gisphere@outlook.com </a>
            </div>
            <div class="contact-us-content">加入微信社区</div>
            <div class="contact-us-qrcode">
              <img src="../../components/BottomBar/imgs/wechat-qrcode.png" />
            </div>
          </div>
          <!-- EN -->
          <div v-if="lang == 'en'" class="contact-us-card">
            <div class="contact-us-content">
              <a href="mailto:gisphere@outlook.com"> gisphere@outlook.com </a>
            </div>
            <div class="contact-us-content">Join our Whatsapp</div>
            <div class="contact-us-qrcode">
              <img src="../../static/WhatsApp.png" />
            </div>
          </div>
        </el-dialog>
        <el-button
          type="info"
          class="contact-us"
          round
          @click="showContactCard = true"
          >{{
            lang == 'zh' ? '联系我们 / 加入我们' : 'Contact Us / Join Us'
          }}</el-button
        >
      </div>
    </div>
    <!-- Project Introduction -->
    <div class="introduce-page">
      <h1 class="intro-title">
        {{ lang == 'zh' ? '项目介绍' : 'Project Introduction' }}
        <hr class="short-horizontal-line" />
      </h1>
      <div class="intro-text-zh">
        {{ lang == 'zh' ? projectIntroZH : projectIntroEN }}
      </div>
      <div class="intro-tag">
        <div class="tag"><span style="color: #7944dd">GIS</span>-Info</div>
        <div class="tag"><span style="color: #7944dd">GIS</span>phere</div>
        <div class="tag"><span style="color: #7944dd">GIS</span>ource</div>
        <div class="tag"><span style="color: #7944dd">GIS</span>pace</div>
        <div class="tag"><span style="color: #7944dd">GIS</span>alon</div>
      </div>
    </div>

    <!-- Sponsor -->
    <div class="school-page">
      <div class="sponsor-part">
        <h1 class="intro-title">
          {{ lang == 'zh' ? '赞助商' : 'SPONSOR' }}
          <hr class="short-horizontal-line" />
        </h1>
        <ul class="sponsor-list">
          <li v-for="sp in sponsors" :key="sp.name">
            <a
              class="sponsor-card"
              :href="sp.url"
              target="_blank"
              rel="noopener sponsored"
            >
              <img :src="sp.logo" :alt="sp.name" loading="lazy" />
              <small v-if="sp.note">{{ sp.note[lang] || sp.note.en }}</small>
            </a>
          </li>
          <li>
            <a
              class="sponsor-card sponsor-card--join"
              href="mailto:contact@gisphere.info"
            >
              <b>{{ lang == 'zh' ? '成为赞助商？' : 'Become Sponsor?' }}</b>
              <small>
                {{ lang == 'zh' ? '联系' : 'mail to' }} contact@gisphere.info
              </small>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <mobile-bottom-bar />
    <el-dialog
      title="订阅 ( Subscribe )"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="90%"
      top="17vh"
    >
      <el-form :model="form">
        <el-form-item
          label="邮箱 ( email )"
          prop="email"
          :rules="[
            {
              required: true,
              message: '请输入邮箱地址 ( Please enter your email address. )',
              trigger: 'blur',
            },
            {
              type: 'email',
              message:
                '请输入正确的邮箱地址 ( Please enter a valid email address. )',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="名 ( first name )"
          :rules="[
            {
              required: true,
              message: '请输入 ( Please enter your first name. )',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="form.firstName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="姓 ( last name )"
          :rules="[
            {
              required: true,
              message: '请输入 ( Please enter your last name. )',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="form.lastName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFormSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ProjectIntro } from '~/utils/ProjectIntro'
export default {
  name: 'MobileIndexPage',
  layout: 'mobile',
  data() {
    return {
      sponsors: [
        {
          name: 'Maptable',
          url: 'https://maptable.com',
          logo: '/maptable_logo.png',
          note: {
            zh: '新一代空间数据协同工具',
            en: 'Next-Generation Spatial Data Analytics Platform',
          },
        },
        {
          name: 'GIS-Vision',
          url: 'https://mp.weixin.qq.com/s/LPq-pXcoLwVkEQ5bcnT46g',
          logo: '/vision_logo.png',
        },
        {
          name: 'ElevenLabs',
          url: 'https://try.elevenlabs.io/GISphere',
          logo: '/elevenlabs-logo-black.png',
          note: { zh: 'AI 语音与音频平台', en: 'AI Voice & Audio Platform' },
        },
      ],
      dialogFormVisible: false,
      form: {
        email: '',
        firstName: '',
        lastName: '',
      },
      showContactCard: false,
      projectIntroZH: ProjectIntro[0],
      projectIntroEN: ProjectIntro[1],
      lastTouchY: 0,
      isTouching: false,
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
    contactUsTitle() {
      return this.lang === 'zh' ? '联系我们' : 'Contact Us'
    },
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.handleScroll)
    if (this.scrollTimeout) clearTimeout(this.scrollCanTimeout)
  },
  methods: {
    goToPostList(type) {
      this.$router.push({
        path: '/postList',
        query: { type },
      })
    },
    goToUniversityList() {
      this.$router.push('/school')
    },
    goToForum() { 
      window.location.href = 'https://mp.weixin.qq.com/mp/homepage?__biz=Mzg3OTUyMjk3OQ==&hid=5&sn=3587fb68bd6892591c79b32606a286bf&scene=18'
    },
    goToMailingList() {
      window.open('https://mailchi.mp/da300ab42ac5/gisphere', '_blank');
    },
    // 提交订阅邮件的请求
    handleFormSubmit() {
      this.dialogFormVisible = false
      const form = this.form
      // 构造个人信息和邮件列表标签
      const params = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        mailing_list_slug: 'test',
      }
      this.$axios
        .post('api/subscribe', params)
        .then((res) => {
          this.$message({
            message: res.data.message,
            type: 'success',
          })
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    handleTouchStart(event) {
      this.lastTouchY = event.touches[0].clientY
      this.isTouching = true
    },
    handleTouchMove(event) {
      if (!this.isTouching) return

      const currentTouchY = event.touches[0].clientY
      const direction = currentTouchY > this.lastTouchY ? -1 : 1
      this.lastTouchY = currentTouchY

      // 节流滚动调整
      clearTimeout(this.scrollTimeout)
      this.scrollTimeout = setTimeout(() => {
        this.adjustScrollPosition(direction)
      }, 100)
    },
    handleTouchEnd() {
      this.isTouching = false
    },
    adjustScrollPosition(direction) {
      const viewportHeight = window.innerHeight
      const scrollPosition = window.pageYOffset + direction * viewportHeight

      if (scrollPosition >= 2 * viewportHeight) {
        // 如果滚动位置超过200vh，停止自动定位
        return
      }
      if (scrollPosition < 0) {
        // 如果滚动位置低于0vh，停止自动定位
        return
      }

      const targetSection = Math.round(scrollPosition / viewportHeight)
      this.scrollToSection(targetSection)
    },
    scrollToSection(sectionIndex) {
      const viewportHeight = window.innerHeight
      const targetPosition = sectionIndex * viewportHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style scoped>
.main {
  width: 100%;
}
.welcome-page {
  height: calc(100vh - 16vw);
  width: 100%;
  position: relative;
}
.welcome-content {
  animation: floatUp 1.25s ease-out forwards;
  position: absolute;
  width: 80%;
  top: 5.5vh;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.welcome-heading {
  font-style: normal;
  font-weight: 800;
  font-size: 50px;
  line-height: 60px;
  color: #ffffff;
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
  text-shadow: 0 0 20px #1f1f20, 0 0 40px #1f1f20, 0 0 60px #1f1f20,
    0 0 80px #1f1f20;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.big-button-zh {
  border: solid 2px #2c3aaa;
  font-size: 16px;
}
.big-button {
  border: solid 2px #2c3aaa;
  padding-left: 12px;
  padding-right: 12px;
}

.functional-buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  width: 80%;
  bottom: 3vh;
  right: 0;
  left: 0;
  margin: 0 auto;
}
.white-book-button {
  border: solid 2px #2c3aaa;
  color: #2c3aaa;
  background-color: #ffffff;
  margin-bottom: 10px;
}
.contact-us-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -4vh;
}

.zh-letter-spacing {
  letter-spacing: 2px;
}
.en-letter-spacing {
  letter-spacing: 1px;
}
.introduce-page {
  display: flex;
  flex-direction: column;
}
.intro-tag {
  height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.tag {
  border-radius: 10px;
  line-height: 50px;
  width: 300px;
  border: solid 2px #2c3aaa;
  font-size: 20px;
  text-align: center;
  font-style: oblique;
  background: linear-gradient(
    120deg,
    #ffffff,
    #ffffff 89%,
    #c5c9e3 89%,
    #c5c9e3 90%,
    #ffffff 90%,
    #ffffff 94%,
    #c5c9e3 94%,
    #c5c9e3 95%,
    #ffffff 95%
  );
  font-weight: 800;
}

.intro-text-zh {
  line-height: 2rem;
  color: #000000;
  width: 85%;
  margin: auto;
}

.intro-title {
  text-align: center;
  color: #2c3aaa;
}
.short-horizontal-line {
  width: 25%;
  height: 2px;
  background-color: #2c3aaa;
  margin-top: 10px;
  margin-bottom: -15px;
}

.school-page {
  display: flex;
  flex-direction: column;
}
.uni-wrapper {
  width: 80%;
  margin: auto;
}
.uni-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -25px;
}
.uni-list-tag {
  padding: 5px 10px;
  margin: 0 5px 5px 0;
  border-radius: 10px;
  border: solid 2px #2c3aaa;
  font-style: oblique;
  background: linear-gradient(
    120deg,
    #ffffff,
    #ffffff 89%,
    #c5c9e3 89%,
    #c5c9e3 90%,
    #ffffff 90%,
    #ffffff 94%,
    #c5c9e3 94%,
    #c5c9e3 95%,
    #ffffff 95%
  );
  font-weight: 200;
}

.sponsor-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}
.sponsor-list li {
  width: 80%;
  margin: 10px 0;
}
.sponsor-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 84px;
  padding: 16px 12px;
  background-color: #fff;
  border: 1px solid #e3e5f0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(30, 42, 128, 0.06);
  text-align: center;
  color: #1f1f20;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.sponsor-card:active {
  transform: scale(0.98);
  border-color: #2c3aaa;
}
.sponsor-card img {
  display: block;
  max-width: min(70%, 170px);
  max-height: 40px;
  object-fit: contain;
}
.sponsor-card small {
  font-size: 12px;
  color: #555;
}
.sponsor-card--join {
  background: transparent;
  border: 1.5px dashed #b9bfe0;
  box-shadow: none;
  color: #2c3aaa;
}

.to-be-added {
  color: #2c3aaa;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  margin-top: 0.8rem;
}

@keyframes floatUp {
  from {
    transform: translateY(20vh);
  }
  to {
    transform: translateY(0);
  }
}
</style>
