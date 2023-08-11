<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-menu text-color="#000000" >
        <h2 @click="$router.push('/uniInfo')">{{ lang == 'zh' ? '院校指南' : 'Institutions' }}</h2>
        <el-menu-item index="1" @click="$router.push('/uniInfo/main/north-america')">{{ lang == 'zh' ? '北美洲' : 'North America' }}</el-menu-item>
        <el-menu-item index="2" @click="$router.push('/uniInfo/main/asia')">{{ lang == 'zh' ? '亚洲' : 'Asia' }}</el-menu-item>
        <el-menu-item index="3" @click="$router.push('/uniInfo/main/europe')">{{ lang == 'zh' ? '欧洲' : 'Europe' }}</el-menu-item>
        <el-menu-item index="4" @click="$router.push('/uniInfo/main/south-america')">{{ lang == 'zh' ? '南美洲' : 'South America' }}</el-menu-item>
        <el-menu-item index="5" @click="$router.push('/uniInfo/main/oceania')">{{ lang == 'zh' ? '大洋洲' : 'Oceania' }}</el-menu-item>
        <el-menu-item index="6" @click="$router.push('/uniInfo/main/africa')">{{ lang == 'zh' ? '非洲' : 'Africa' }}</el-menu-item>
      </el-menu>
      <nuxt-child></nuxt-child>

      <el-container class="main">
        <el-main>
          <h1>GIS-Info <strong>{{ lang == 'zh' ? '院校指南' : 'Institutions' }}</strong></h1>
          <h3>
            GIS-Info
            {{ lang == 'zh' ? '院校指南公益项目发起于2019年9月，最新版本更新时间为2021年9月，旨在提供及时且全面的全球GIS及相关专业院校信息。信息由来自世界各地GIS及城市规划等相关专业名校的在读学生、近期毕业校友或青年教师提供，内容主要包括各院系的优势科研方向、开设学位和导师信息。希望这份指南能为有留学意向的GIS相关专业朋友们提供帮助和支持。' : 'This guide on the GISphere platform was established in September 2019. Its primary objective is to offer up-to-date and thorough information regarding academic institutions worldwide that offer graduate programs in GIS and related subjects. The details about these institutions have been provided by students and young scholars in the global GIS community. The information encompasses aspects such as available degree programs, faculty profiles, and the research areas covered by each institution.' }}
          </h3>
          <h2><i class="el-icon-user-solid"></i>{{ lang == 'zh' ? '社区' : 'GISphere in media' }}</h2>
          <h3>
          {{ lang == 'zh' ? '为了方便大家交流，我们创办了GISphere留学指南微信公众号，定期邀请在世界各地留学或访学的朋友们分享他们的留学/访学申请经验，以及在海外留学/访学中工作与生活的经历、体验和感悟，帮助小伙伴们有的放矢，提高申请成功率，了解海外工作和生活方方面面信息。同时，我们也会定期整理和发布有关各类会议讲座和论文投稿的各类学术信息，助力大家的学术发展。请扫页脚二维码关注我们的GISphere公众号。' : 'GISphere maintains an active presence across several social media platforms, such as Twitter, LinkedIn, YouTube, WeChat, Bilibili, and Zhihu, among others. Furthermore, we also have a WhatsApp community. We consistently arrange online events under the banner of the GISalon series, fostering direct engagement among GIS students, emerging professors, and other experts spanning the globe. These gatherings offer a platform to discuss and exchange learning encounters, career guidance, industry-related perspectives, and a wealth of professional insights within the diverse realm of GIS. To learn more, please visit the About page.' }}
            <br />
            <br />
            <p style="font-weight: bold">
              <i class="el-icon-info"></i>
              {{ lang == 'zh' ? '关注公众号后可以加入GISpace留学微信群。' : 'The QR code for joining the WhatsApp community is in the bottom right corner of the home page.' }}
            </p>
            {{ lang == 'zh' ? '微信群是GIS及相关专业的海外学生学者的高质量活跃交流平台，尤其欢迎一年内有出国出境意向的GIS相关专业小伙伴加入。因群里人数较多，目前需要管理员手动发送邀请链接。请扫页脚二维码关注我们的GISphere公众号，并在后台留言“留学群”，可添加管理员好友并获得入群邀请链接。' : 'Feel free to give our Twitter account a follow. We frequently share updates about graduate opportunities in GIS and related fields, along with information about global conferences and competitions that are relevant. This type of information will also be accessible through the Academic Recruiting section on our website.' }}

            <br />
            <br />
            {{ lang == 'zh' ? '本指南由志愿者在业余时间完成，由于时间精力所限，难免有疏漏，内容仅供参考。指南将长期维护更新，若有更正、建议和补充，欢迎在这里留言。也欢迎更多的有志者一同参与维护这个项目！指南中各院校排名不分先后。如果需要了解学校的综合排名等情况，请查询THE、QS、USNews、ARWU等权威排名。' : 'GISphere operates as a non-profit platform, meticulously crafted and maintained by a dedicated group of volunteers during their spare time. Given the limitations in both time and resources, it is possible that the content on this site might have occasional omissions. However, our commitment to continuously uphold and improve this website remains unwavering. If you stumble upon any errors or have valuable suggestions, do not hesitate to reach out to us at gisphere@outlook.com. Moreover, we warmly welcome more volunteers to join our cause! it is important to highlight that our platform exclusively features institutions providing graduate degree programs in GIS and related fields. Notably, we do not evaluate their teaching or research capacities. The institution rankings found on this website are presented without any specific order. For information on the academic rankings of these institutions, we recommend referring to some well-known university rankings like THE, QS, USNews, ARWU, and so on.' }}

            <br />
            {{ lang == 'zh' ? '信息提供者及参与编辑的志愿者名单见下方的作者名单。' : 'Names of authors and developers of this guide are shown below in the Contributor section.' }}

            <br />
            <br />
            <p style="font-weight: bold">
              <i class="el-icon-menu"></i>{{ lang == 'zh' ? '历史版本：https://gis-info.github.io/' : 'Old version: https://gis-info.github.io/' }}
              (Updated 2020/09)
            </p>

          </h3>
          <h2><i class="el-icon-s-opportunity"></i>{{ lang == 'zh' ? '版权' : 'Copyright' }}</h2>
          <h3>
          {{ lang == 'zh' ? '本文档遵循CC BY-NC 4.0许可，如需非商业转载或修改，请给出署名；商业转载' : 'This guide is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License' }}
          </h3>
          <h2><i class="el-icon-s-custom"></i>{{ lang == 'zh' ? '作者名单' : 'Contributors' }}</h2>
          <h3>
          {{ lang == 'zh' ? '下面是撰写条目或提供院校信息的作者名单。按姓氏拼音排序。为保护隐私，我们不公开作者的单位信息。部分作者为匿名作者，故在此未予列出。' : 'Below is a list of authors who wrote entries or provided information about one or more institutions. Some authors are anonymous and therefore not listed here. Per the local custom, Chinese surnames are written before the given names.' }}

          </h3>

          <el-collapse>
            <el-collapse-item title="Content providers" name="1">
              <div>
              {{ lang == 'zh' ? '安云琪，曹伟辰，曹彦佳，陈焕发，陈可天，陈彦冰，陈龙，陈茜，陈艺宽，陈昱，程敬宜，崔楠，崔文聪，戴劭勍，董维川, 杜新浩，杜瑶，段晨曦，段牧溪，范宜伦，费庆源，冯晓睿，冯瑶，付圣，高鹏，高芸雅，郭晨，郭科宇，郭雪蕊，韩笑，何畅，何旭，何伊伊，胡昊，胡吉林，胡英杰，胡于杰，黄冠，黄佳玮，黄谦夏，黄啸，黄馨可，贾东启，康雨豪，赖佳梦，李八一，李博文，李浩，李皓宸，李佳，李俊安，李良，李缅因，李清华，李烁，李小江，李艺，李元翔，李子奇，李子升，连婷，梁晓帆，廖倩儒，林熙哲，刘年华，刘启亮，刘若葳，刘雯，刘晓健，刘欣宜，刘昱妍，刘振宇，刘卓明，卢加宁，栾辉，吕方正，马超，马擎宇，马宇驰，买庚辰，孟凡林，穆野，庞真，彭倩，乔天，屈光耘，冉泉，饶锦蒙，饶婧，任泽茜，石霞，司云瑞，宋秋然，宋万营，苏辰雨，孙一璠，谭孟荀，谭晓悦，唐安琪，童馨仪，王海明，王邃，王瑶莉，卫贺兰，魏辛源，吴迪，吴秋生，吴欣皓，谢雨潭，邢进，徐芳洁，徐浩文，徐佳智，徐雅雯，许子清，薛凯，晏澍虹，杨家鑫，杨梅，杨庭方，杨莹丽，杨源譞，叶山，叶翔，易健，于曼竹，于婉灵，袁振东，岳远紊，曾可欣，翟寻，张帆，张晶睿，张婧祎，张景源，张兰，张蔚行，张雅璇，张颖，章静，赵家彦，赵群山，赵雨潇，周泓，周建雄，周璐，周瑞，朱春武，朱飞宇，邹倩倩' : 'An Yunqi, Cao Weichen, Cao Yanjia, Chen Huanfa, Chen Long, Chen Xi, Chen Yikuan, Chen Yu, Cheng Jingyi, Chen Ketian, Chen Yanbing, Cui Nan, Cui Wencong, Dai Shaoqing, Dong Weichuan, Du Xinhao, Du Yao, Duan Chenxi, Duan Muxi, Fan Yilun, Fei Qingyuan, Feng Xiaorui, Feng Yao, Fu Sheng, Gao Peng, Gao Yunya, Guo Chen, Guo Keyu, Guo Xuerui, Han Xiaoxiao, He Chang, He Xu, He Yiyi, Hu Hao, Hu Jilin, Hu Yingjie, Hu Yujie, Huang Guan. Huang Jiawei, Huang Qianxia, Huang Xiao, Huang Xinke, Jia Dongqi, Kang Yuhao, Lai Jiameng, Li Bayi, Li Bowen, Li Hao, Li Haochen, Li Jia, Li Junan, Li Liang, Li Maine, Li Qinghua, Li Shuo, Li Xiaojiang, Li Yi, Li Yuanxiang, Li Ziqi, Li Zisheng, Lian Ting, Liang Xiaofan, Liao Qianru, Lin Xizhe, Liu Nianhua, Liu Qiliang, Liu Ruowei, Liu Wen, Liu Xiaojian, Liu Xinyi, Liu Yuyan, Liu Zhenyu. Liu Zhuoming, Lu Jianing, Luan Hui, Lu Fangzheng, Ma Chao, Ma Qingyu, Ma Yuchi, Buy Gengchen, Meng Fanlin, Mu Ye, Pang Zhen, Peng Qian, Qiao Tian, Qu Guangye, Ran Quan, Rao Jinmeng, Rao Jing, Ren Zexie, Shi Xia, Si Yunrui, Song Qiuran, Song Wanying, Su Chenyu, Sun Yifen, Tan Mengxun, Tan Xiaoyue, Tang Anqi, Tong Xinyi, Wang Haiming, Wang Profound, Wang Yaoli, Wei Helan, Wei Xinyuan, Wu Di, Wu Qiusheng. Wu Xinhao, Xie Yutan, Xing Jin, Xu Fangjie, Xu Haowen, Xu Jiazhi, Xu Yawen, Xu Ziqing, Xue Kai, Yan Shuhong, Yang Jiaxin, Yang Mei, Yang Tingfang, Yang Yingli, Yang Yuanxuan, Ye Shan, Ye Xiang, Yi Jian, Yu Manzhu, Yu Wanling, Yuan Zhendong, Yue Yuandian, Zeng Kexin, Zhai Xun, Zhang Fan, Zhang Jingrui, Zhang Jingyi, Zhang Jingyuan, Zhang Lan, Zhang Weixing, Zhang Yaxuan, Zhang Ying, Zhang Jing, Zhao Jiayan, Zhao Qunshan, Zhao Yuxiao, Zhou Hong, Zhou Jianxiong, Zhou Lu, Zhou Rui, Zhu Chunwu, Zhu Feiyu, Zou Qianqian, Sajjad Muhammad, Donald A. Friend, Dipto Sarkar, Anthony Robinson, Filip Biljecki, Mehdi Chachar, Jason VanHorn, Abel Cerecero, F. Antonio Medrano, Mallory Sagehorn, Ana Villa, Elias Lago, Raj Mahavir, Yassine Zehaf, Youssef Bahja, Nate Deanna, Sergen Ozyakup, Dani Abbasi, Adamou Gudina, Or Caspi, Ryan Galbraith, Ricardo Barros Lourenço' }}<

              </div>
            </el-collapse-item>
          </el-collapse>

          <el-collapse>
            <el-collapse-item title="Editors" name="2">
              <div>
              {{ lang == 'zh' ? '戴劭勍，段晨曦，黄馨可，康雨豪，李皓宸，李肖，刘昊坤，刘昱妍，饶锦蒙，任泽茜，童馨仪，叶山，叶翔，岳远紊，张晶睿，张景源，朱春武，陈彦冰' : 'Kang Yuhao, Ye Shan, Liu Haokun, Zhang Jingyuan, Dai Shaoqing, Duan Chenxi, Huang Xinke, Li Haochen, Li Xiao, Liu Yuyan, Rao Jinmeng, Ren Zexi, Tong Xinyi, Ye Xiang, Yue Yuandian, Zhang Jingrui, Zhu Chunwu, Chen Yanbing' }}
              </div>
            </el-collapse-item>
          </el-collapse>

          <el-collapse>
            <el-collapse-item title="Website managers" name="3">
              <div>{{ lang == 'zh' ? '叶山，张景源，陈鹏宇，陈彦冰（网站开发组名单请参见关于我们页面）' : 'Ye Shan, Zhang Jingyuan, Chen Pengyu, Chen Yanbing (for the complete list of developers of this site, please refer to the About page)' }}</div>
            </el-collapse-item>
          </el-collapse>
          <h3>{{ lang == 'zh' ? '再次衷心感谢所有作者的辛苦付出！' : 'We sincerely thank all the authors and volunteers for their efforts!' }}</h3>
        </el-main>
      </el-container>
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
  height: 100%;
  max-width: 1200px;
  padding: 40px 20px;
  box-sizing: border-box;
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
