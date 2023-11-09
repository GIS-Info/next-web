<template>
  <el-container v-loading="loading" class="container">
    <el-menu text-color="#000000" class="menu" unique-opened :collapse-transition=false>
      <h2 @click="$router.push('/school')">{{ lang == 'zh' ? '院校指南' : 'Institutions' }}</h2>
        <el-submenu v-for="continent in Object.keys(continents)" :key="`continent:${continent}`" :index="`continent:${continent}`">
          <template slot="title">
            <div class="menu-item" @click="goAnchor(`continent:${continent}`)">
              <i class="el-icon-location"></i>
              <span>{{ lang == 'zh' ? continents[continent] : continent }}</span>
            </div>
          </template>
          <el-submenu v-for="country in Object.keys(continentToCountry[continent] || {})" :key="`country:${country}`" :index="`country:${country}`">
            <template slot="title">
              <div class="menu-item" @click="goAnchor(`country:${country}`)">
                {{ (lang == 'zh' ? countries[country] : country) || (countries[country] || country || '-') }}
              </div>
            </template>
            <el-menu-item v-for="school in Object.keys(countryToSchool[country] || {})" :key="school" :index="`school:${schools[school]?.U_Name_EN}`">
              <div class="menu-item" @click="goAnchor(`school:${schools[school]?.U_Name_EN}`)">
                {{ (lang == 'zh' ? schools[school]?.U_Name_CN : schools[school]?.U_Name_EN) || (schools[school]?.U_Name_CN || schools[school]?.U_Name_EN || '-') }}
              </div>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
    </el-menu>
    
    <el-main class="main">
      <el-row>
        <el-checkbox-group v-model="selectedTags" @change="tagSelectHandler">
          <el-checkbox-button v-for="tag in tags" :key="tag.en" :label="tag.en">{{ tag[lang] }}</el-checkbox-button>
        </el-checkbox-group>
    </el-row>
      <h1><strong>{{ lang == 'zh' ? 'GIS-Info 院校指南' : 'GIS-Info Institution Guide' }}</strong></h1>
        {{ lang == 'zh' ? 'GIS-Info院校指南公益项目发起于2019年9月，最新版本更新时间为2021年9月，旨在提供及时且全面的全球GIS及相关专业院校信息。信息由来自世界各地GIS及城市规划等相关专业名校的在读学生、近期毕业校友或青年教师提供，内容主要包括各院系的优势科研方向、开设学位和导师信息。希望这份指南能为有留学意向的GIS相关专业朋友们提供帮助和支持。' : 'This School Instruction Project was launched in September 2019, and the latest version will be updated in September 2021, aiming to provide timely and comprehensive information on global GIS and related professional colleges. The information is provided by current students, recently graduated alumni or young teachers from prestigious schools of GIS and urban planning and other related majors around the world. We hope this guide can provide help and support for GIS-related professional friends who intend to study abroad.' }}
      <br/>
      <br/>
        <b><i class="el-icon-s-opportunity"></i>
        {{ lang == 'zh' ? '社区' : 'GISphere in media' }}</b>
      <br />
      <p v-if=" lang == 'zh'">
        为了方便大家交流，我们创办了GISphere留学指南微信公众号，定期邀请在世界各地留学或访学的朋友们分享他们的留学/访学申请经验，以及在海外留学/访学中工作与生活的经历、体验和感悟，帮助小伙伴们有的放矢，提高申请成功率，了解海外工作和生活方方面面信息。同时，我们也会定期整理和发布有关各类会议讲座和论文投稿的各类学术信息，助力大家的学术发展。请扫首页页脚二维码关注我们的GISphere公众号。
      </p>
      <p v-else>
        GISphere maintains an active presence across several social media platforms, such as <a href="https://twitter.com/GISphereGuide">Twitter</a>, <a href="https://www.linkedin.com/company/gisphere/">LinkedIn</a>, <a href="https://www.youtube.com/@gisphere">YouTube</a>, WeChat, <a href="https://space.bilibili.com/1043870260">Bilibili</a>, and <a href="https://www.zhihu.com/people/gisphere">Zhihu</a>, among others. Furthermore, we also have a WhatsApp community. We consistently arrange online events under the banner of the GISalon series, fostering direct engagement among GIS students, emerging professors, and other experts spanning the globe. These gatherings offer a platform to discuss and exchange learning encounters, career guidance, industry-related perspectives, and a wealth of professional insights within the diverse realm of GIS. To learn more, please visit the About page.
      </p>
      <b>
        <i class="el-icon-s-help"></i>
        {{ lang == 'zh' ? '关注公众号后可以加入GISpace留学微信群。' : 'The QR code for joining the WhatsApp community is in the bottom right corner of the home page.' }}
      </b>
      <br/>
      <br/>
      {{ lang == 'zh' ? '微信群是GIS及相关专业的海外学生学者的高质量活跃交流平台，尤其欢迎一年内有出国出境意向的GIS相关专业小伙伴加入。因群里人数较多，目前需要管理员手动发送邀请链接。请扫首页页脚二维码关注我们的GISphere公众号，并在后台留言“留学群”，可添加管理员好友并获得入群邀请链接。' : 'Feel free to give our Twitter account a follow. We frequently share updates about graduate opportunities in GIS and related fields, along with information about global conferences and competitions that are relevant. This type of information will also be accessible through the Academic Recruiting section on our website.' }}
      <br />
      <br />
      {{ lang == 'zh' ? '本指南由志愿者在业余时间完成，由于时间精力所限，难免有疏漏，内容仅供参考。指南将长期维护更新，若有更正、建议和补充，欢迎在这里留言。也欢迎更多的有志者一同参与维护这个项目！指南中各院校排名不分先后。如果需要了解学校的综合排名等情况，请查询THE、QS、USNews、ARWU等权威排名。' : 'GISphere operates as a non-profit platform, meticulously crafted and maintained by a dedicated group of volunteers during their spare time. Given the limitations in both time and resources, it is possible that the content on this site might have occasional omissions. However, our commitment to continuously uphold and improve this website remains unwavering. If you stumble upon any errors or have valuable suggestions, do not hesitate to reach out to us at gisphere@outlook.com. Moreover, we warmly welcome more volunteers to join our cause! it is important to highlight that our platform exclusively features institutions providing graduate degree programs in GIS and related fields. Notably, we do not evaluate their teaching or research capacities. The institution rankings found on this website are presented without any specific order. For information on the academic rankings of these institutions, we recommend referring to some well-known university rankings like THE, QS, USNews, ARWU, and so on.' }}
      <br />
      {{ lang == 'zh' ? '信息提供者及参与编辑的志愿者名单见下方的作者名单。' : 'Names of authors and developers of this guide are shown below in the Contributor section.' }}
      <br />
      <p style="font-weight: bold">
        <i class="el-icon-menu"></i>
        {{ lang == 'zh' ? '历史版本：' : 'Old version: ' }}
        <a href="https://gis-info.github.io/">https://gis-info.github.io/</a> (Updated 2020/09)
      </p>
      <h2><i class="el-icon-s-check"></i>{{ lang == 'zh' ? '版权' : 'Copyright' }}</h2>
      {{ lang == 'zh' ? '本文档遵循CC BY-NC 4.0许可，如需非商业转载或修改，请给出署名；商业转载' : 'This guide is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License' }}
      <h2><i class="el-icon-info"></i>{{ lang == 'zh' ? '提示' : 'Tips' }}</h2>
      {{ lang == 'zh' ? `本文档包含 ${Object.keys(countries)?.length} 个国家的 ${Object.keys(schools)?.length} 条院校信息，可以通过页面 Ctrl + F 快速检索` : `This document contains information of ${Object.keys(schools)?.length} institutions in ${Object.keys(countries)?.length} countries, which can be quickly retrieved by pressing Ctrl + F on the page` }}
      <h2><i class="el-icon-s-custom"></i>{{ lang == 'zh' ? '作者名单' : 'Contributors' }}</h2>
        {{ lang == 'zh' ? '下面是撰写条目或提供院校信息的作者名单。按姓氏拼音排序。为保护隐私，我们不公开作者的单位信息。部分作者为匿名作者，故在此未予列出。' : 'Below is a list of authors who wrote entries or provided information about one or more institutions. Some authors are anonymous and therefore not listed here. Per the local custom, Chinese surnames are written before the given names.' }}
      <h4>Content providers</h4>
        Yunqi An(安云琪), Weichen Cao(曹伟辰), Yanjia Cao(曹彦佳), Huanfa Chen(陈焕发), Long Chen(陈龙), Xi Chen(陈茜), Yikuan Chen(陈艺宽), Yu Chen(陈昱), Ketian Chen(陈可天), Yanbing Chen(陈彦冰), Jingyi Cheng(程敬宜), Nan Cui(崔楠), Wencong Cui(崔文聪), Shaoqing Dai(戴劭勍), Weichuan Dong(董维川), Xinhao Du(杜新浩), Yao Du(杜瑶), Chenxi Duan(段晨曦), Muxi Duan(段牧溪), Yilun Fan(范宜伦), Qingyuan Fei(费庆源), Xiaorui Feng(冯晓睿), Yao Feng(冯瑶), Sheng Fu(付圣), Peng Gao(高鹏), Yunya Gao(高芸雅), Chen Guo(郭晨), Keyu Guo(郭科宇), Xuerui Guo(郭雪蕊), Xiao Han(韩笑), Chang He(何畅), Xu He(何旭), Yiyi He(何伊伊), Hao Hu(胡昊), Jilin Hu(胡吉林), Yingjie Hu(胡英杰), Yujie Hu(胡于杰), Guan Huang(黄冠), Jiawei Huang(黄佳玮), Qianxia Huang(黄谦夏), Xiao Huang(黄啸), Xinke Huang(黄馨可), Dongqi Jiang(贾东启), Yuhao Kang(康雨豪), Jiameng Lai(赖佳梦), Bayi Li(李八一), Bowen Li(李博文), Hao Li(李浩), Haochen Li(李皓宸), Jia Li(李佳), Junan Li(李俊安), Liang Li(李良), Maine Li(李缅因), Qinghua Li(李清华), Shuo Li(李烁), Xiaojiang Li(李小江), Yi Li(李艺), Yuanxiang Li(李元翔), Ziqi Li(李子奇), Zisheng Li(李子升), Ting Lian(连婷), Xiaofan Liang(梁晓帆), Qianru Liao(廖倩儒), Xizhe Lin(林熙哲), Nianhua Liu(刘年华), Qiliang Liu(刘启亮), Ruowei Liu(刘若葳), Wen Liu(刘雯), Xiaojian Liu(刘晓健), Xinyi Liu(刘欣宜), Yuyan Liu(刘昱妍), Zhenyu Liu(刘振宇). Zhuoming Liu(刘卓明), Jianing Lu(卢加宁), Hui Luan(栾辉), Fangzheng Lyu(吕方正), Chao Ma(马超), Qingyu Ma(马擎宇), Yuchi Ma(马宇驰), Gengchen Mai(买庚辰), Fanlin Meng(孟凡林), Ye Mu(穆野), Zhen Pang(庞真), Qian Peng(彭倩), Tian Qiao(乔天), Guangyun Qu(屈光耘), Quan Ran(冉泉), Jinmeng Rao(饶锦蒙), Jing Rao(饶婧), Zexie Ren(任泽茜), Xia Shi(石霞), Yunrui Si(司云瑞), Qiuran Song(宋秋然), Wanying Song(宋万营), Chenyu Su(苏辰雨), Yifen Sun(孙一璠), Mengxun Tan(谭孟荀), Xiaoyue Tan(谭晓悦), Anqi Tang(唐安琪), Xinyi Tong(童馨仪), Haiming Wang(王海明), Sui Wang(王邃), Yaoli Wang(王瑶莉), Helan Wei(卫贺兰), Xinyuan Wei(魏辛源), Di Wu(吴迪), Qiusheng Wu(吴秋生), Xinhao Wu(吴欣皓), Yutan Xie(谢雨潭), Jin Xing(邢进), Fangjie Xu(徐芳洁), Haowen Xu(徐浩文), Jiazhi Xu(徐佳智), Yawen Xu(徐雅雯), Ziqing Xu(许子清), Kai Xue(薛凯), Shuhong Yan(晏澍虹), Jiaxin Yang(杨家鑫), Mei Yang(杨梅), Tingfang Yang(杨庭方), Yingli Yang(杨莹丽), Yuanxuan Yang(杨源譞), Shan Ye(叶山), Xiang Ye(叶翔), Jian Yi(易健), Manzhu Yu(于曼竹), Wanling Yu(于婉灵), Zhendong Yuan(袁振东), Yuanwen Yue(岳远紊), Kexin Zeng(曾可欣), Xun Zhai(翟寻), Fan Zhang(张帆), Jingrui Zhang(张晶睿), Jingyi Zhang(张婧祎), Jingyuan Zhang(张景源), Lan Zhang(张兰), Weixing Zhang(张蔚行), Yaxuan Zhang(张雅璇), Ying Zhang(张颖), Jing Zhang(章静), Jiayan Zhao(赵家彦), Qunshan Zhao(赵群山), Yuxiao Zhao(赵雨潇), Hong Zhou(周泓), Jianxiong Zhou(周建雄), Lu Zhou(周璐), Rui Zhou(周瑞), Chunwu Zhu(朱春武), Feiyu Zhu(朱飞宇), Qianqian Zou(邹倩倩), Sajjad Muhammad, Donald A. Friend, Dipto Sarkar, Anthony Robinson, Filip Biljecki, Mehdi Chachar, Jason VanHorn, Abel Cerecero, F. Antonio Medrano, Mallory Sagehorn, Ana Villa, Elias Lago, Raj Mahavir, Yassine Zehaf, Youssef Bahja, Nate Deanna, Sergen Ozyakup, Dani Abbasi, Adamou Gudina, Or Caspi, Ryan Galbraith, Ricardo Barros Lourenço
      <h4>Editors</h4>
        Yuhao Kang(康雨豪), Shan Ye(叶山), Haokun Liu(刘昊坤), Jingyuan Zhang(张景源), Shaoqing Dai(戴劭勍), Chenxi Duan(段晨曦), Xinke Huang(黄馨可), Haochen Li(李皓宸), Xiao Li(李肖), Yuyan Liu(刘昱妍), Jinmeng Rao(饶锦蒙), Zexi Ren(任泽茜), Xinyi Tong(童馨仪), Xiang Ye(叶翔), Yuanwen Yue(岳远紊), Jingrui Zhang(张晶睿), Chunwu Zhu(朱春武), Yanbing Chen(陈彦冰)
      <h4>Website managers</h4>
        Shan Ye(叶山), Jingyuan Zhang(张景源), Pengyu Chen(陈鹏宇), Chen Yanbing(陈彦冰)
        {{ lang == 'zh' ? '（网站开发组名单请参见关于我们页面）' : '(for the complete list of developers of this site, please refer to the About page)'}}
      <h3>{{ lang == 'zh' ? '再次衷心感谢所有作者的辛苦付出！' : 'We sincerely thank all the authors and volunteers for their efforts!' }}</h3>
      <el-divider />
      <div v-for="continent in Object.keys(continents)" :key="continent">
        <h2 :id="`continent:${continent}`">{{ (lang == 'zh' ? continents[continent] : continent) || (continents[continent] || continent || '-') }}</h2>
        <div v-if="continentToCountry[continent]">
          <div v-for="country in Object.keys(continentToCountry[continent])" :key="country">
            <h3 :id="`country:${country}`">{{ (lang == 'zh' ? countries[country] : country) || (countries[country] || country || '-') }}</h3>
            <div v-if="countryToSchool[country]">
              <div v-for="school in Object.keys(countryToSchool[country])" :key="school">
                  <SchoolCard :school="schools[school]" :people="schoolToPeople[school]" :lang="lang"/>
              </div>
            </div>
            <el-divider />
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import SchoolCard from './SchoolCard'

export default {
  name: 'SchoolMain',
  components: {
    SchoolCard,
  },
  props: {
    lang: {
      type: String,
      default: 'en',
    }
  },
  data() {
    return {
      rawData: [],
      // 查找表
      continents: {
        Asia: '亚洲',
        Europe: '欧洲',
        'South America': '南美洲',
        Oceania: '大洋洲',
        Africa: '非洲',
        'North America': '北美洲',
      },
      continentToCountry: {},
      countries: {},
      countryToSchool: {},
      schools: {},
      schoolToPeople: {},
      tags: [
        {en: 'Physical Geography', zh: '自然地理'},
        {en: 'Human Geography', zh: '人文地理'},
        {en: 'Urban Planning', zh: '规划'},
        {en: 'GIS', zh: 'GIS'},
        {en: 'RS', zh: 'RS'},
        {en: 'GNSS', zh: 'GNSS'},
        {en: 'Transportation', zh: '交通'},
      ],
      selectedTags: [],
      loading: false,
    }
  },
  /**
   * 使用 fetch 方法是为了服务端渲染，参考 https://nuxtjs.org/docs/features/data-fetching
   */
  async fetch() {
  // 向后端发起请求
  await this.$axios
    .get('/api/schools')
    .then((res) => {
      this.setData(res);
    })
    .catch((error) => {
      console.log('err', error)
      // 跳转到error界面
      this.$router.push('/error')
    })
  },
  computed: {},
  watch: {
  },
  mounted() {
  },
  methods: {
    setData(res){
      this.rawData = res.data || [];
      const continentToCountry = {
        Asia: {},
        Europe: {},
        'South America': {},
        Oceania: {},
        Africa: {},
        'North America': {},
      };
      const countries = {};
      const countryToSchool = {};
      const schools = {};
      const schoolToPeople = {};
      this.rawData.forEach((item)=>{
        // 写入 continentToCountry
        if(!continentToCountry[item.Co_Continent_EN][item.C_Country_EN]){
          continentToCountry[item.Co_Continent_EN][item.C_Country_EN] = true;
        }
        // 写入 country
        if(!countries[item.C_Country_EN]){
          countries[item.C_Country_EN] = item.Co_Name_CN;
        }
        // 写入 countryToSchool
        if(!countryToSchool[item.C_Country_EN]){
          countryToSchool[item.C_Country_EN] = {
            [item.U_Name_EN]: true,
          };
        } else if(!countryToSchool[item.C_Country_EN][item.U_Name_EN]){
          countryToSchool[item.C_Country_EN][item.U_Name_EN] = true;
        }
        // 写入 school
        if(!schools[item.U_Name_EN]){
          schools[item.U_Name_EN] = item
        }
        // 写入 schoolToPeople
        if(item.P_people_id && !schoolToPeople[item.U_Name_EN]){
          schoolToPeople[item.U_Name_EN] = {
            [item.P_people_id]: item,
          };
        } else if(item.P_people_id && !schoolToPeople[item.U_Name_EN][item.P_people_id]){
          schoolToPeople[item.U_Name_EN][item.P_people_id] = item;
        }
      })
      this.continentToCountry = continentToCountry;
      this.countries = countries;
      this.countryToSchool = countryToSchool;
      this.schools = schools;
      this.schoolToPeople = schoolToPeople;
    },
    goAnchor(hash) {
      window.location.hash=hash
    },  
    // 标签选择发生变化
    tagSelectHandler(v) {
      this.loading = true;
      const query = v.map((name)=>name.replaceAll(' ', '_')).join(',');
      this.$axios
      .get('/api/schools' + (query ? ('?tag=' + query) : ''))
      .then((res) => {
        this.setData(res);
        this.loading = false;
      })
      .catch((error) => {
        console.log('err', error)
        this.$router.push('/error')
      })
    },
  },
}
</script>

<style scoped>
.el-menu {
  width: 30%;
  text-align: center;
}
.main {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  line-height: 1.5;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
}

strong {
  color: #1a4986;
}

el-collapse-item:hover {
  color: rgb(199, 209, 222);
}
.container{
  border: 1px solid #eee;
  height: 100%;
}

.menu{
  overflow-y: auto;
  overflow-x: hidden;
  resize: horizontal;
}
.menu-item{
  text-align: left;
}
</style>
