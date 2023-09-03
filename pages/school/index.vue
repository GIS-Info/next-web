<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-menu text-color="#000000" >
        <h2 @click="$router.push('/school')">{{ lang == 'zh' ? '院校指南' : 'Institutions' }}</h2>
        <el-menu-item index="1" @click="$router.push('/school/main/north-america')">{{ lang == 'zh' ? '北美洲' : 'North America' }}</el-menu-item>
        <el-menu-item index="2" @click="$router.push('/school/main/asia')">{{ lang == 'zh' ? '亚洲' : 'Asia' }}</el-menu-item>
        <el-menu-item index="3" @click="$router.push('/school/main/europe')">{{ lang == 'zh' ? '欧洲' : 'Europe' }}</el-menu-item>
        <el-menu-item index="4" @click="$router.push('/school/main/south-america')">{{ lang == 'zh' ? '南美洲' : 'South America' }}</el-menu-item>
        <el-menu-item index="5" @click="$router.push('/school/main/oceania')">{{ lang == 'zh' ? '大洋洲' : 'Oceania' }}</el-menu-item>
        <el-menu-item index="6" @click="$router.push('/school/main/africa')">{{ lang == 'zh' ? '非洲' : 'Africa' }}</el-menu-item>
      </el-menu>

      <el-main class="main">
        <h1><strong>{{ lang == 'zh' ? 'GIS-Info 院校指南' : 'GIS-Info Institution Guide' }}</strong></h1>
        <h3>
          {{ lang == 'zh' ? 'GIS-Info院校指南公益项目发起于2019年9月，最新版本更新时间为2021年9月，旨在提供及时且全面的全球GIS及相关专业院校信息。信息由来自世界各地GIS及城市规划等相关专业名校的在读学生、近期毕业校友或青年教师提供，内容主要包括各院系的优势科研方向、开设学位和导师信息。希望这份指南能为有留学意向的GIS相关专业朋友们提供帮助和支持。' : 'This School Instruction Project was launched in September 2019, and the latest version will be updated in September 2021, aiming to provide timely and comprehensive information on global GIS and related professional colleges. The information is provided by current students, recently graduated alumni or young teachers from prestigious schools of GIS and urban planning and other related majors around the world. We hope this guide can provide help and support for GIS-related professional friends who intend to study abroad.' }}
        </h3>
        <h2><i class="el-icon-user-solid"></i>{{ lang == 'zh' ? '社区' : 'GISphere in media' }}</h2>
        <h3>
          <p v-if=" lang == 'zh'">
            为了方便大家交流，我们创办了GISphere留学指南微信公众号，定期邀请在世界各地留学或访学的朋友们分享他们的留学/访学申请经验，以及在海外留学/访学中工作与生活的经历、体验和感悟，帮助小伙伴们有的放矢，提高申请成功率，了解海外工作和生活方方面面信息。同时，我们也会定期整理和发布有关各类会议讲座和论文投稿的各类学术信息，助力大家的学术发展。请扫首页页脚二维码关注我们的GISphere公众号。
          </p>
          <p v-else>
            GISphere maintains an active presence across several social media platforms, such as <a href="https://twitter.com/GISphereGuide">Twitter</a>, <a href="https://www.linkedin.com/company/gisphere/">LinkedIn</a>, <a href="https://www.youtube.com/@gisphere">YouTube</a>, WeChat, <a href="https://space.bilibili.com/1043870260">Bilibili</a>, and <a href="https://www.zhihu.com/people/gisphere">Zhihu</a>, among others. Furthermore, we also have a WhatsApp community. We consistently arrange online events under the banner of the GISalon series, fostering direct engagement among GIS students, emerging professors, and other experts spanning the globe. These gatherings offer a platform to discuss and exchange learning encounters, career guidance, industry-related perspectives, and a wealth of professional insights within the diverse realm of GIS. To learn more, please visit the About page.
          </p>
          <p style="font-weight: bold">
            <i class="el-icon-info"></i>
            {{ lang == 'zh' ? '关注公众号后可以加入GISpace留学微信群。' : 'The QR code for joining the WhatsApp community is in the bottom right corner of the home page.' }}
          </p>
          {{ lang == 'zh' ? '微信群是GIS及相关专业的海外学生学者的高质量活跃交流平台，尤其欢迎一年内有出国出境意向的GIS相关专业小伙伴加入。因群里人数较多，目前需要管理员手动发送邀请链接。请扫首页页脚二维码关注我们的GISphere公众号，并在后台留言“留学群”，可添加管理员好友并获得入群邀请链接。' : 'Feel free to give our Twitter account a follow. We frequently share updates about graduate opportunities in GIS and related fields, along with information about global conferences and competitions that are relevant. This type of information will also be accessible through the Academic Recruiting section on our website.' }}
          <br />
          <br />
          {{ lang == 'zh' ? '本指南由志愿者在业余时间完成，由于时间精力所限，难免有疏漏，内容仅供参考。指南将长期维护更新，若有更正、建议和补充，欢迎在这里留言。也欢迎更多的有志者一同参与维护这个项目！指南中各院校排名不分先后。如果需要了解学校的综合排名等情况，请查询THE、QS、USNews、ARWU等权威排名。' : 'GISphere operates as a non-profit platform, meticulously crafted and maintained by a dedicated group of volunteers during their spare time. Given the limitations in both time and resources, it is possible that the content on this site might have occasional omissions. However, our commitment to continuously uphold and improve this website remains unwavering. If you stumble upon any errors or have valuable suggestions, do not hesitate to reach out to us at gisphere@outlook.com. Moreover, we warmly welcome more volunteers to join our cause! it is important to highlight that our platform exclusively features institutions providing graduate degree programs in GIS and related fields. Notably, we do not evaluate their teaching or research capacities. The institution rankings found on this website are presented without any specific order. For information on the academic rankings of these institutions, we recommend referring to some well-known university rankings like THE, QS, USNews, ARWU, and so on.' }}
          <br />
          {{ lang == 'zh' ? '信息提供者及参与编辑的志愿者名单见下方的作者名单。' : 'Names of authors and developers of this guide are shown below in the Contributor section.' }}
          <br />
          <br />
          <p style="font-weight: bold">
            <i class="el-icon-menu"></i>{{ lang == 'zh' ? '历史版本：' : 'Old version: ' }}
            <a href="https://gis-info.github.io/">https://gis-info.github.io/</a> (Updated 2020/09)
          </p>

        </h3>
        <h2><i class="el-icon-s-opportunity"></i>{{ lang == 'zh' ? '版权' : 'Copyright' }}</h2>
        <h3>{{ lang == 'zh' ? '本文档遵循CC BY-NC 4.0许可，如需非商业转载或修改，请给出署名；商业转载' : 'This guide is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License' }}</h3>
        <h2><i class="el-icon-s-custom"></i>{{ lang == 'zh' ? '作者名单' : 'Contributors' }}</h2>
        <h3>
          {{ lang == 'zh' ? '下面是撰写条目或提供院校信息的作者名单。按姓氏拼音排序。为保护隐私，我们不公开作者的单位信息。部分作者为匿名作者，故在此未予列出。' : 'Below is a list of authors who wrote entries or provided information about one or more institutions. Some authors are anonymous and therefore not listed here. Per the local custom, Chinese surnames are written before the given names.' }}
        </h3>
        <h4>Content providers</h4>
          Yunqi An(安云琪), Weichen Cao(曹伟辰), Yanjia Cao(曹彦佳), Huanfa Chen(陈焕发), Long Chen(陈龙), Xi Chen(陈茜), Yikuan Chen(陈艺宽), Yu Chen(陈昱), Ketian Chen(陈可天), Yanbing Chen(陈彦冰), Jingyi Cheng(程敬宜), Nan Cui(崔楠), Wencong Cui(崔文聪), Shaoqing Dai(戴劭勍), Weichuan Dong(董维川), Xinhao Du(杜新浩), Yao Du(杜瑶), Chenxi Duan(段晨曦), Muxi Duan(段牧溪), Yilun Fan(范宜伦), Qingyuan Fei(费庆源), Xiaorui Feng(冯晓睿), Yao Feng(冯瑶), Sheng Fu(付圣), Peng Gao(高鹏), Yunya Gao(高芸雅), Chen Guo(郭晨), Keyu Guo(郭科宇), Xuerui Guo(郭雪蕊), Xiao Han(韩笑), Chang He(何畅), Xu He(何旭), Yiyi He(何伊伊), Hao Hu(胡昊), Jilin Hu(胡吉林), Yingjie Hu(胡英杰), Yujie Hu(胡于杰), Guan Huang(黄冠), Jiawei Huang(黄佳玮), Qianxia Huang(黄谦夏), Xiao Huang(黄啸), Xinke Huang(黄馨可), Dongqi Jiang(贾东启), Yuhao Kang(康雨豪), Jiameng Lai(赖佳梦), Bayi Li(李八一), Bowen Li(李博文), Hao Li(李浩), Haochen Li(李皓宸), Jia Li(李佳), Junan Li(李俊安), Liang Li(李良), Maine Li(李缅因), Qinghua Li(李清华), Shuo Li(李烁), Xiaojiang Li(李小江), Yi Li(李艺), Yuanxiang Li(李元翔), Ziqi Li(李子奇), Zisheng Li(李子升), Ting Lian(连婷), Xiaofan Liang(梁晓帆), Qianru Liao(廖倩儒), Xizhe Lin(林熙哲), Nianhua Liu(刘年华), Qiliang Liu(刘启亮), Ruowei Liu(刘若葳), Wen Liu(刘雯), Xiaojian Liu(刘晓健), Xinyi Liu(刘欣宜), Yuyan Liu(刘昱妍), Zhenyu Liu(刘振宇). Zhuoming Liu(刘卓明), Jianing Lu(卢加宁), Hui Luan(栾辉), Fangzheng Lyu(吕方正), Chao Ma(马超), Qingyu Ma(马擎宇), Yuchi Ma(马宇驰), Gengchen Mai(买庚辰), Fanlin Meng(孟凡林), Ye Mu(穆野), Zhen Pang(庞真), Qian Peng(彭倩), Tian Qiao(乔天), Guangyun Qu(屈光耘), Quan Ran(冉泉), Jinmeng Rao(饶锦蒙), Jing Rao(饶婧), Zexie Ren(任泽茜), Xia Shi(石霞), Yunrui Si(司云瑞), Qiuran Song(宋秋然), Wanying Song(宋万营), Chenyu Su(苏辰雨), Yifen Sun(孙一璠), Mengxun Tan(谭孟荀), Xiaoyue Tan(谭晓悦), Anqi Tang(唐安琪), Xinyi Tong(童馨仪), Haiming Wang(王海明), Sui Wang(王邃), Yaoli Wang(王瑶莉), Helan Wei(卫贺兰), Xinyuan Wei(魏辛源), Di Wu(吴迪), Qiusheng Wu(吴秋生), Xinhao Wu(吴欣皓), Yutan Xie(谢雨潭), Jin Xing(邢进), Fangjie Xu(徐芳洁), Haowen Xu(徐浩文), Jiazhi Xu(徐佳智), Yawen Xu(徐雅雯), Ziqing Xu(许子清), Kai Xue(薛凯), Shuhong Yan(晏澍虹), Jiaxin Yang(杨家鑫), Mei Yang(杨梅), Tingfang Yang(杨庭方), Yingli Yang(杨莹丽), Yuanxuan Yang(杨源譞), Shan Ye(叶山), Xiang Ye(叶翔), Jian Yi(易健), Manzhu Yu(于曼竹), Wanling Yu(于婉灵), Zhendong Yuan(袁振东), Yuanwen Yue(岳远紊), Kexin Zeng(曾可欣), Xun Zhai(翟寻), Fan Zhang(张帆), Jingrui Zhang(张晶睿), Jingyi Zhang(张婧祎), Jingyuan Zhang(张景源), Lan Zhang(张兰), Weixing Zhang(张蔚行), Yaxuan Zhang(张雅璇), Ying Zhang(张颖), Jing Zhang(章静), Jiayan Zhao(赵家彦), Qunshan Zhao(赵群山), Yuxiao Zhao(赵雨潇), Hong Zhou(周泓), Jianxiong Zhou(周建雄), Lu Zhou(周璐), Rui Zhou(周瑞), Chunwu Zhu(朱春武), Feiyu Zhu(朱飞宇), Qianqian Zou(邹倩倩), Sajjad Muhammad, Donald A. Friend, Dipto Sarkar, Anthony Robinson, Filip Biljecki, Mehdi Chachar, Jason VanHorn, Abel Cerecero, F. Antonio Medrano, Mallory Sagehorn, Ana Villa, Elias Lago, Raj Mahavir, Yassine Zehaf, Youssef Bahja, Nate Deanna, Sergen Ozyakup, Dani Abbasi, Adamou Gudina, Or Caspi, Ryan Galbraith, Ricardo Barros Lourenço
        <h4>Editors</h4>
          Yuhao Kang(康宇豪), Shan Ye(叶山), Haokun Liu(刘昊坤), Jingyuan Zhang(张景源), Shaoqing Dai(戴劭勍), Chenxi Duan(段晨曦), Xinke Huang(黄馨可), Haochen Li(李皓宸), Xiao Li(李肖), Yuyan Liu(刘昱妍), Jinmeng Rao(饶锦蒙), Zexi Ren(任泽茜), Xinyi Tong(童馨仪), Xiang Ye(叶翔), Yuanwen Yue(岳远紊), Jingrui Zhang(张晶睿), Chunwu Zhu(朱春武), Yanbing Chen(陈彦冰)
        <h4>Editors</h4>
          Shan Ye(叶山), Jingyuan Zhang(张景源), Pengyu Chen(陈鹏宇), Chen Yanbing(陈彦冰)
          {{ lang == 'zh' ? '（网站开发组名单请参见关于我们页面）' : '(for the complete list of developers of this site, please refer to the About page)'}}
        <h3>{{ lang == 'zh' ? '再次衷心感谢所有作者的辛苦付出！' : 'We sincerely thank all the authors and volunteers for their efforts!' }}</h3>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Aside',
  data() {
    return {
      sidebarText: null,
      discriptions: null,
      Location: null,
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
  },
}
</script>

<style scoped>
.el-menu {
  width: 15%;
  text-align: center;
}
.el-submenu {
  text-align: center;
  font-size: large;
}
.container {
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.main {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  line-height: 1.5;
}
h1 {
  font-size: 60px;
}
h3 {
  font-size: 15px;
  font-weight: normal;
}
h5 {
  font-weight: normal;
  color: rgb(79, 86, 97);
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 20px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #e1e6ec;
}

img {
  width: 600px;
  height: 200px;
  object-fit: cover;
}

strong {
  color: #1a4986;
}

.tt:hover {
  color: rgb(56, 89, 134);
}

el-collapse-item:hover {
  color: rgb(199, 209, 222);
}

/* /deep/.el-input__inner{
        background-color: rgba(0,0,0,0.1);
        border: rgba(255,255,255,0.3) 1px solid;
        color: white;
    }
     */
.mapboxgl-popup {
  max-width: 300px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

.map-overlay {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: relative;
  width: 200px;
  margin-top: -150px;
  margin-left: 15px;
  padding: 10px;
}

.map-overlay .map-overlay-inner {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.map-overlay-inner fieldset {
  border: none;
  padding: 0;
  margin: 0 0 10px;
}

.map-overlay-inner fieldset:last-child {
  margin: 0;
}

.map-overlay-inner select {
  width: 100%;
}

.map-overlay-inner label {
  display: block;
  font-weight: bold;
  margin: 0 0 5px;
}

.map-overlay-inner button {
  display: inline-block;
  width: 36px;
  height: 20px;
  border: none;
  cursor: pointer;
}

.map-overlay-inner button:focus {
  outline: none;
}

.map-overlay-inner button:hover {
  box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.1);
}

/* geocoder css*/
.mapboxgl-ctrl-geocoder {
  width: 600px;
  height: 80px;
  position: relative;
}

/* Offset the vanishing point using padding*/
.rounded-rect {
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 50px -25px black;
}

.flex-center {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-center.left {
  left: 0px;
}

.flex-center.right {
  right: 0px;
}

.sidebar-content {
  width: 95%;
  height: 95%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: gray;
}

.sidebar-toggle {
  position: absolute;
  width: 1.3em;
  height: 1.3em;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-toggle.left {
  right: -1.5em;
}

.sidebar-toggle.right {
  left: -1.5em;
}

.sidebar-toggle:hover {
  color: #0aa1cf;
  cursor: pointer;
}

.sidebar {
  transition: transform 1s;
  z-index: 1;
  width: 300px;
  height: 100%;
}

/*
    The sidebar styling has them "expanded" by default, we use CSS transforms to push them offscreen
    The toggleSidebar() function removes this class from the element in order to expand it.
    */

.left.collapsed {
  transform: translateX(-295px);
}

.right.collapsed {
  transform: translateX(295px);
}

/* discriptions in sidebar */
.context {
  margin-left: 10px;
  margin-right: 10px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.tooltip {
  position: absolute;
  width: 250px;
  height: 150px;
  display: none;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333333;
  padding: 5px;
}
</style>
