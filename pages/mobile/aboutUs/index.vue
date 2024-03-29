<template>
  <div class="container">
    <div class="main">
    <section>
        <h1>About GISphere</h1>
            <li style="font-size: larger;">
              <strong><em>Empowering Global Geographic Information Science Education</em></strong>
            </li>

        <h2>Mission:</h2>
        <p>
            At GISphere, we are dedicated to democratizing access to Geographic Information Science (GIS) education across the globe.
            Founded in 2019 by a visionary group of Chinese students and scholars, our mission is to facilitate the freedom of information
            in GIS education, enhance academic exchange and collaboration, and make substantial contributions to both academia and industry.
        </p>

        <h2>Our Journey:</h2>
        <p>
            Beginning as a platform focused on articles and social media posts in Chinese, GISphere has grown into a global entity.
            Our journey has been marked by continuous expansion and evolution, reaching audiences worldwide and embracing diverse cultures and languages.
        </p>

        <h2>What We Do:</h2>
        <ul>
            <li style="font-size: 16px;">
                <strong>GISphere Guide (GIS-info):</strong> Our flagship database, featuring comprehensive information on 443 GIS-related academic programs and
                over 1,200 professors from more than 80 countries.
            </li>
            <li style="font-size: 16px;">
                <strong>GISalon:</strong> Engaging roundtable discussions that provide students with insights into study abroad experiences and career development.
                Recordings are available on <a href="https://www.youtube.com/@gisphere">YouTube</a> and <a href="https://space.bilibili.com/1043870260">Bilibili</a>.
            </li>
            <li style="font-size: 16px;">
                <strong>GISource:</strong> A global news service delivering up-to-date information on admissions for GIS-related master's and doctoral programs
                at international institutions.
            </li>
            <li style="font-size: 16px;">
                <strong>GISphere WeChat Official Account:</strong> Sharing application experiences and study insights from students in GIS-related programs abroad,
                providing valuable perspectives for aspiring students. As well as bi-week GISource newsletter, GIStory articles, and more.
            </li>
            <li style="font-size: 16px;">
                <strong>GISpace:</strong> Community discussion groups on WeChat and WhatsApp </a> that serve
                as a platform for interaction among overseas scholars and students in GIS-related fields.
            </li>
            <li style="font-size: 16px;">
                <strong>GIS Education Research:</strong> GISphere is not just about sharing knowledge - we contribute to it.
                <ul>
                    <li style="font-size: 16px;">
                        Wang, Y., Kang, Y., Liu, H., Hou, C., Zhou, B., Ye, S., Liu, Y., Rao, J., Pei, Z., Ye, X., & Gao, S. (2023).
                        Choosing GIS graduate programs from afar: Chinese students' perspectives.
                        <em>Transactions in GIS, 27, 450–475.</em>
                        <a href="https://doi.org/10.1111/tgis.13037">Link to the paper</a>
                    </li>
                    <li style="font-size: 16px;">More research papers coming soon.</li>
                </ul>
            </li>
        </ul>

    <h2>Get Involved</h2>
    <p>Interested in learning more, contributing, or partnering with us? Contribute to our crowd-sourced GIS-info database
        <a href="https://gisphere.github.io/pages/contribute" target="_blank">here</a>,
        submit articles about vacancies in your group either in Chinese or English to be published on our WeChat official account
        <a href="https://mp.weixin.qq.com/s/EB1nVtZ58bIUGlIg4VWzgQ" target="_blank">here</a> and/or Twitter, or join our vibrant GISpace community.</p>

    <h2>Join Us in Our Mission</h2>
    <p>
        Explore our resources, attend our webinars, and become a part of a global movement to make GIS education accessible to all.
        If you are interested in joining our volunteer group, please do not hesitate to send your CV and a short cover letter expressing
        your interest to <a href="mailto:gisphere@outlook.com">gisphere@outlook.com</a>.
    </p>
    </section>

      <h2>Team Member</h2>
      <el-tabs v-model="tab">
        <el-tab-pane label="GIS-Info Website" name="gisinfo">
          <satff-list :staffs="info.gisinfo" />
        </el-tab-pane>
        <el-tab-pane label="GISphere Public" name="gisphere">
          <satff-list :staffs="info.gisphere" />
        </el-tab-pane>
        <el-tab-pane label="GISource" name="gisource">
          <satff-list :staffs="info.gisource" />
        </el-tab-pane>
        <el-tab-pane label="GISpace Community" name="gispace">
          <satff-list :staffs="info.gispace" />
        </el-tab-pane>
        <el-tab-pane label="GISalon" name="gisalon">
          <satff-list :staffs="info.gisalon" />
        </el-tab-pane>
        <el-tab-pane label="GISpread" name="media">
          <satff-list :staffs="info.gispread" />
        </el-tab-pane>
        <el-tab-pane label="Publicity Group" name="publicity">
          <satff-list :staffs="info.publicity" />
        </el-tab-pane>
        <el-tab-pane label="GIStudio" name="design">
          <satff-list :staffs="info.gistudio" />
        </el-tab-pane>
        <el-tab-pane label="GIStory" name="interview">
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
import staffInfo from '@/pages/aboutUs/staff.json'
export default {
  components: {
    satffList,
  },
  layout: 'mobile',

  data() {
    return {
      tab: 'gisinfo',
      info: staffInfo
    };
  },
  head() {
    return {
      title: 'GISphere | 关于我们',
    }
  },
}
</script>

<style lang="less" scoped>
  b{
    margin-right: 3vw;
  }
  h2{
    margin-top: 8vw;
  }
  .container{
    overflow: auto;
    width: 100%;
    height: 100%;
    //  background-color: #EBEEF5;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .main{
      width: 100%;
      max-width: 1200px;
      padding: 4vw 2vw;
      box-sizing: border-box;
    }
  }
</style>
