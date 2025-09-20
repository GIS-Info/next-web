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
              type="primary"
              class="big-button explore-academic-recruiting"
              @click="goToPostList('academic')"
              >招生信息</el-button
            >
            <el-button
              v-if="false"
              @click="goToPostList('job')"
              >招聘信息</el-button
            >
            <el-button class="big-button explore-programs" @click="goToUniversityList"
              >院校指南</el-button
            >
            <!--
            <el-button class="big-button explore-programs" @click="goToForum"
              >讨论区</el-button
            >
            -->
          </div>
        </div>
        <div v-if="lang == 'en'" class=".en-letter-spacing">
          <div class="welcome-heading">Where GeoSpatial Thinking Shines</div>
          <div class="welcome-description">
            Empower GIScience and Geography education for the future
          </div>
          <div class="welcome-buttons">
            <el-button
              type="primary"
              class="big-button explore-academic-recruiting"
              @click="goToPostList('academic')"
              >Academic Recruiting</el-button
            >
            <el-button
              v-if="false"
              @click="goToPostList('job')"
              >Job Recruiting</el-button
            >
            <el-button class="big-button explore-programs" @click="goToUniversityList"
              >GISphere Guide</el-button
            >
                        <el-button class="big-button explore-programs" @click="$router.push('/gistory')">
              GIStory Interview
            </el-button>
            <!--

            -->
          </div>
        </div>
      </div>
      <!-- Functional Buttons -->
      <div class="functional-buttons">
        <el-button class="white-book-button" round @click="goToMailingList">{{ lang == 'zh' ? '订阅邮箱' : 'Subscribe to Email' }}  </el-button>
        <el-button class="white-book-button explore-job-recruiting" round @click="$router.push('/white-book')">{{ lang == 'zh' ? 'GISphere 留学指南 · 大数据报告白皮书' : 'GISphere Global Admission Annual Review' }}</el-button>
        <!-- Contact Us pop up card -->
        <!-- ZH -->
        <div
          v-if="lang == 'zh'"
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
          <el-button type="info" class="contact-us" round>联系我们 / 加入我们</el-button>
        </div>
        <!-- EN -->
        <div
          v-if="lang == 'en'"
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
          <el-button type="info" round class="contact-us">Contact Us / Join Us</el-button>
        </div>
      </div>
    </div>

    <!-- Project Introduction -->
    <div class="field">
      <div class="introduce-page">
        <div class="intro-title">
          {{ lang == 'zh' ? '项目介绍' : 'About Us' }}
          <hr class="short-horizontal-line" />
        </div>
        <!-- <div class="intro-tag">
          <div class="tag"><span style="color: #7944dd;">GIS</span>-Info</div>
          <div class="tag"><span style="color: #7944dd;">GIS</span>phere</div>
          <div class="tag"><span style="color: #7944dd;">GIS</span>ource</div>
          <div class="tag"><span style="color: #7944dd;">GIS</span>pace</div>
          <div class="tag"><span style="color: #7944dd;">GIS</span>alon</div>
        </div> -->
        <div class="intro-text-zh">{{ lang == 'zh' ? projectIntroZH : projectIntroEN }}</div>

        <!-- Our Mission Section -->
        <div class="intro-title" style="margin-top: 40px;">
          {{ lang == 'zh' ? '我们的使命' : 'Our Mission' }}
          <hr class="short-horizontal-line" />
        </div>
        <div class="intro-text-zh">
          <p v-if="lang == 'zh'">
            GISphere 致力于在全球范围内普及地理信息科学（GIS）教育。我们由一群具有前瞻性思维的中国学生和学者于2019年创立，
            通过促进信息的开放获取、培养学术合作以及连接研究与产业，我们的平台努力打破GIS教育中的各种障碍。
          </p>
          <p v-if="lang == 'zh'">
            我们相信知识应该自由共享，通过提供一个集中的GIS相关资源、学术机会和专业网络的平台，我们旨在赋能全球的学生、
            研究人员和专业人士。我们的最终目标是培育一个充满活力、包容性强且创新的GIS社区，推动学术界和产业界的共同进步。
          </p>
          <p v-if="lang == 'en'">
            At GISphere, we are committed to democratizing access to Geographic Information Science (GIS) education worldwide. Established
            in 2019 by a group of forward-thinking Chinese students and scholars, our platform strives to break barriers in GIS education by
            promoting open access to information, fostering academic collaboration, and bridging the gap between research and industry.
          </p>
          <p v-if="lang == 'en'">
            We believe that knowledge should be freely shared, and by providing a centralized hub for GIS-related resources, academic
            opportunities, and professional networking, we aim to empower students, researchers, and professionals across the globe. Our
            ultimate goal is to cultivate a dynamic, inclusive, and innovative GIS community that drives progress in both academia and industry.
          </p>
        </div>

        <!-- Our Journey Section -->
        <div class="intro-title" style="margin-top: 40px;">
          {{ lang == 'zh' ? '我们的旅程' : 'Our Journey' }}
          <hr class="short-horizontal-line" />
        </div>
        <div class="intro-text-zh">
          <p v-if="lang == 'zh'">
            GISphere 最初是一个专注于用中文发布GIS相关文章和社交媒体内容的平台，专为寻求地理空间教育的中国学生设计。
            随着时间的推移，我们已经突破了语言和地域的界限，发展成为一个连接不同背景的学者、教育者和专业人士的全球性倡议。
          </p>
          <p v-if="lang == 'zh'">
            通过持续的成长和扩展，我们的团队开发了一系列支持GIS教育、职业发展和学术网络的倡议：
          </p>
          <p v-if="lang == 'en'">
            GISphere started as a platform dedicated to publishing GIS-related articles and social media content in Chinese, specifically designed to
            support Chinese students seeking accessible geospatial education. Over time, we have grown beyond linguistic and regional boundaries,
            evolving into a global initiative that connects scholars, educators, and professionals across diverse backgrounds.
          </p>
          <p v-if="lang == 'en'">
            Through continuous growth and expansion, our team has developed a range of initiatives to support GIS education, career development,
            and academic networking:
          </p>
          <ul class="initiatives-list" v-if="lang == 'zh'">
            <li><span class="initiative-highlight">GISphere Guide</span> - 我们的旗舰数据库，提供全球80多个国家的GIS和地理机构及研究生项目的综合信息。</li>
            <li><span class="initiative-highlight">GISalon</span> - 一系列引人入胜的圆桌讨论，为学生提供关于研究生学习经验、学术路径和职业发展的宝贵见解。录制内容可在YouTube（英文）和Bilibili（中文）上获取。</li>
            <li><span class="initiative-highlight">GISource</span> - 一项全球新闻服务，提供关于GIS相关硕士和博士项目招生以及全球学术和行业招聘机会的最新信息。</li>
            <li><span class="initiative-highlight">GISphere 微信公众号</span> - 分享来自全球GIS学生和专家的申请经验、学习见解和专业建议的平台。此外，我们还发布双周GISource通讯、GIStory文章等。</li>
            <li><span class="initiative-highlight">GISpace</span> - 在WhatsApp和微信上的活跃社区讨论平台，促进GIS爱好者之间的同行连接和知识共享。</li>
            <li><span class="initiative-highlight">社交媒体</span> - 在包括X（Twitter）、WhatsApp、知乎和小红书在内的社交媒体平台上分享最新的GIS相关新闻、趋势和更新。</li>
          </ul>
          <ul class="initiatives-list" v-if="lang == 'en'">
            <li><span class="initiative-highlight">GISphere Guide</span> - Our flagship database, providing comprehensive information on GIS and Geography institutions and graduate programs across more than 80 countries.</li>
            <li><span class="initiative-highlight">GISalon</span> - A series of engaging roundtable discussions offering students valuable insights into graduate study experiences, academic pathways, and career development. Recordings are
              available on YouTube (English) and Bilibili (Chinese).</li>
            <li><span class="initiative-highlight">GISource</span> - A global news service delivering up-to-date information on GIS-related master's and doctoral program admissions, as well as academic and industry hiring opportunities
              worldwide.</li>
            <li><span class="initiative-highlight">GISphere WeChat Official Account</span> - A hub for sharing application experiences, study insights, and professional advice from GIS students and experts worldwide. Additionally, we publish a biweekly GISource newsletter, GIStory articles, and more.</li>
            <li><span class="initiative-highlight">GISpace</span> - A vibrant community discussion platform on WhatsApp and WeChat, fostering peer connections and knowledge-sharing among GIS enthusiasts.</li>
            <li><span class="initiative-highlight">Social Media</span> - Sharing the latest GIS-related news, trends, and updates across social media platforms including X (Twitter), WhatsApp, Zhihu, and Rednotes.</li>
          </ul>
          <p v-if="lang == 'zh'">
            随着GISphere的不断发展，我们将继续致力于通过扩展资源、促进合作和使GIS知识在全球范围内更加普及，来丰富GIS教育生态系统。
          </p>
          <p v-if="lang == 'en'">
            As GISphere continues to grow, we remain dedicated to enriching the GIS education ecosystem by expanding resources, facilitating collaborations, and making GIS knowledge more accessible worldwide.
          </p>
        </div>
      </div>
    </div>



    <!-- Sponsor -->
    <div class="sponsor-part">
      <div class="introduce-page">
        <div class="intro-title">
          {{ lang == 'zh' ? '赞助商' : 'SPONSORS' }}
          <hr class="short-horizontal-line" />
        </div>
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
            <b>GIS-Vision 留学</b>
          </div>
          <div
            class="sponsor-card"
            @click="goUrl('mailto:gisphere@outlook.com')"
          >
            <b v-if="lang == 'zh'">成为赞助商？</b>
            <small v-if="lang == 'zh'">联系 gisphere@outlook.com</small>
            <b v-if="lang == 'en'">Become Our Sponsor?</b>
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
    <el-dialog title="订阅 ( Subscribe )" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :top="'17vh'">
      <el-form :model="form">
        <el-form-item
          label="邮箱 ( email )"
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址 ( Please enter your email address. )', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址 ( Please enter a valid email address. )', trigger: ['blur', 'change'] }
          ]">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="名 ( first name )"
          :rules="[
            { required: true, message: '请输入 ( Please enter your first name. )', trigger: 'blur' },
          ]">
          <el-input v-model="form.firstName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="姓 ( last name )"
          :rules="[
            { required: true, message: '请输入 ( Please enter your last name. )', trigger: 'blur' },
          ]">
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
import { isMobile } from '@/utils/index'
import { ProjectIntro } from '~/utils/ProjectIntro'

export default {
  name: 'IndexPage',
  data() {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      showContactCard: false,
      projectIntroZH: ProjectIntro[0],
      projectIntroEN: ProjectIntro[1],
      form: {
        email:'',
        firstName: '',
        lastName: '',
      },
    }
  },
  head() {
    return {
      title: 'GISphere'
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
      // 对外入口
      this.$router.push('/school');
    },
    goToForum() {
      window.location.href = 'https://forum.gisphere.info'
    },
    goUrl(url) {
      window.location.href = url
    },
    disableCopy(e) {
      e.preventDefault()
    },
    goToMailingList() {
      window.open('https://mailchi.mp/da300ab42ac5/gisphere', '_blank');
    },
    // 提交订阅邮件的请求
    handleFormSubmit() {
      this.dialogFormVisible = false;
      const form = this.form;

      // 构造个人信息和邮件列表标签
      const params = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        mailing_list_slug: 'test'
      };

      this.$axios.post('api/subscribe', params)
      .then(res => {
        this.$message({
          message: res.data.message,
          type: 'success'
        });
      })
      .catch(err => {
        this.$message.error(err);
      });

    },
  },
}
</script>

<style scoped>
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
  left: 40%;
  top: 25vh;
  height: 25vh;
  margin-left: -30%;
  margin-right: 10%;
  margin-top: -12.5vh;
}
.uni-content {
  width: 20%;
  height: 2.5rem;
  font-size: 14px;
  text-align: center;
}

/* 新增样式 */
.initiatives-list {
  margin: 20px 0 30px 0;
  padding-left: 20px;
  list-style-type: none;
}

.initiatives-list li {
  margin-bottom: 15px;
  position: relative;
  padding-left: 20px;
  line-height: 1.6;
}

.initiatives-list li:before {
  content: "•";
  color: #2c3aaa;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: -2px;
}

.initiative-highlight {
  color: #7944dd;
  font-weight: 600;
  font-style: oblique;
}

.intro-text-zh p {
  margin-bottom: 15px;
  line-height: 1.6;
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
}
.big-button{
  border: solid 2px #2c3aaa;
  width: 220px;
  height: 50px;
  font-size: 17px;
  font-weight: 400;
  /* 覆盖默认字体 */
  font-family: 'Montserrat', sans-serif !important;
}
.explore-programs {
  color: #2c3aaa;
}
.big-button:hover {
  background-color: #53389e;
  color: #ffffff;
  transition: 100ms ease-in-out;
}
.contact-us {
  margin-left: 10px;
  border: solid 2px #ffffff00;
}
.contact-us-card {
  background-color: transparent;
  margin-left: 10px;
}
.intro-title {
  text-align: center;
  font-size: 40px;
  color: #2c3aaa;
  margin-top: 32px;
}
.short-horizontal-line {
  width: 5%;
  height: 2px;
  background-color: #2c3aaa;
  margin-top: 16px;
  margin-bottom: 20px;
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
  justify-content: space-evenly;
}
.tag {
  border-radius: 10px;
  height: 50px;
  line-height: 50px;
  width: 200px;
  border: solid 2px #2c3aaa;
  font-size: 20px;
  text-align: center;
  font-style: oblique;
  background: linear-gradient(120deg,#ffffff, #ffffff 89%, #c5c9e3 89%, #c5c9e3 90%, #ffffff 90%,#ffffff 94%, #c5c9e3 94%, #c5c9e3 95%, #ffffff 95%);
  font-weight: 800;
}
.uni-table {
  border-collapse: collapse;
  width: 100%;
}
.uni-content-title {
  font-size: 1.15rem;
  text-align: center;
  /* margin-bottom: 100px; */
}
.uni-content {
  width: 20%;
  height: 2.5rem;
  font-size: 14px;
  text-align: center;
}
.el-divider {
  height: 2px;
  width: 3rem;
  margin: 0.25rem auto;
}
.contact-content {
  width: 50%;
  font-size: 15px;
  text-align: center;
}
.contact-us-content {
  background-color: #fff;
  border-radius: 30px;
  height: 40px;
  width: 171.68px;
  line-height: 42px;
  text-align: center;
  font-size: small;
  margin-bottom: 5px;
}
.contact-us-qrcode {
  background-color: #fff;
  border-radius: 20px;
  height: 171.68px;
  width: 171.68px;
  margin-bottom: 10px;
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
  color: #2c3aaa;
  text-align: center;
  font-display: block;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  margin-top: 0.8rem;
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

/* 响应式调整比例 */
@media (max-width: 1920px) {
  .welcome-content {
    transform: scale(1.3);
  }
}
@media (max-width: 1600px) {
  .welcome-content {
    transform: scale(1.2);
  }
}
@media (max-width: 1440px) {
  .welcome-content {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .welcome-buttons {
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  .explore-academic-recruiting {
    border-color: #ffffff;
    background-color: #ffffff;
    color: #2c3aaa;
    margin-bottom: 1rem;
  }
  .explore-job-recruiting {
    border-color: #ffffff;
    background-color: transparent;
    color: #ffffff;
    margin-left: 0 !important;
    margin-bottom: 1rem;
  }
  .explore-programs {
    border-color: #28292a;
    background-color: transparent;
    color: #2c3aaa;
    margin-left: 0 !important;
    margin-bottom: 1rem;
  }
}
.white-book-button{
  font-family: 'Montserrat', sans-serif !important;
  margin-left: 10px;
  border: solid 2px #2c3aaa;
  color: #2c3aaa;
  background-color: rgba(255,255,255,0.5);
}
.white-book-button:hover {
  color: #fff;
  background-color: #53389e;
}
.functional-buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 60px;
  right: 60px;
}
</style>
