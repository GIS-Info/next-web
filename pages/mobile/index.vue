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
              >讨论区</el-button
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
            <el-button class="big-button" @click="goToForum"
              >Forum</el-button
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
        <div class="sponsor-list">
          <div class="sponsor-card" @click="goUrl('https://maptable.com')">
            <b>Maptable</b>
            <small>
              {{
                lang == 'zh'
                  ? '新一代空间数据协同工具'
                  : 'Next-Generation Spatial Data Analytics Platform'
              }}
            </small>
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
      window.location.href = 'https://forum.gisphere.info'
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
  justify-content: center;
}
.sponsor-card {
  background-color: #efefef;
  border-radius: 10px;
  height: 50px;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 15px 0;
  padding: 0 10px;
  transition: all 0.2s;
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
