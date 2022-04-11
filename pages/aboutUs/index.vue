<template>
  <div class="container">
    <div class="main">
      <h2>关于我们</h2>
      <p>GISphere 是一个公益项目，由一批在全球不同院校从事地理信息及相关领域科研工作的中国青年学生学者于2019年9月提供一个分享世界各地GIS相关研究生项目、导师和学术前沿信息的在线平台，促进不同国家/地区的GIS相关院校与学生之间的交流、教育与发生的纠纷是合作，共同推动GIS学科和相关产业的发展。目前，旗下子项目包括：</p> 
      <p><b>GIS-Info 网站</b> 全面介绍海外 GIS 相关院校、专业及老师信息</p>
      <p><b>GISphere 公众号</b> 分享海外院校GIS相关专业学生的申请经验及就读体验</p>
      <p><b>GISource 环球资讯速递</b> 实时发布最新海外院校GIS相关硕士、博士等招生信息</p>
      <p><b>GISpace 社区讨论群</b> 为GIS相关专业的海外学者和学生提供交流平台</p>
      <p><b>GISalon 圆桌讨论</b> 和学长学姐“零距离”聊聊留学和职业发展那些事儿</p>
      <h2>团队成员</h2>
      <el-tabs v-model="tab">
        <el-tab-pane label="GIS-Info 网站" name="gisinfo">
          <satff-list :staffs="info.gisinfo" />
        </el-tab-pane>
        <el-tab-pane label="GISphere 公众号" name="gisphere">
          <satff-list :staffs="info.gisphere" />
        </el-tab-pane>
        <el-tab-pane label="GISource 资讯" name="gisource">
          <satff-list :staffs="info.gisource" />
        </el-tab-pane>
        <el-tab-pane label="GISpace 社区" name="gispace">
          <satff-list :staffs="info.gispace" />
        </el-tab-pane>
        <el-tab-pane label="GISalon 圆桌" name="gisalon">
          <satff-list :staffs="info.gisalon" />
        </el-tab-pane>
        <el-tab-pane label="媒体组" name="media">
          <satff-list :staffs="info.media" />
        </el-tab-pane>
        <el-tab-pane label="设计组" name="design">
          <satff-list :staffs="info.design" />
        </el-tab-pane>
        <el-tab-pane label="合伙人" name="partner">
          <satff-list :staffs="info.partner" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import satffList from './components/staffList.vue';
export default {
  components: {
    satffList,
  },
  data() {
    return {
      tab: 'gisinfo',
      info: {
        gisinfo: [
          {name: '叶山', email: 'yeshantulsa@hotmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/7e8c161f3ff798b5.png', link: 'https://www.ye-shan.com/'},
          {name: '张景源', email: 'kianzh@outlook.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/56d87131533dcc32.jpeg', link: 'http://sgis.site'},
          {name: '李八一', email: 'barryli081@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/dc197214cf5ba92b.jpeg', link: 'http://81city.top/'},
          {name: '苏昊睿', email: 'haoruisu@163.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/2dbd860286f492f2.png', link: 'https://github.com/ShelbertT'},
          {name: '马秀梅', email: '1978862253@qq.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/0b889f4c72139cea.png', link: ''},
          {name: '朱相怡', email: 'xiangyi.zhu@outlook.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/5175e85e734a928b.jpeg', link: 'https://github.com/Xiangyi-Zhu'},
          {name: '成诚', email: 'gaussc@sjtu.edu.cn', img: 'https://s3.bmp.ovh/imgs/2022/04/10/cd68b183c4a48532.jpeg', link: 'https://gaussc10032.github.io'},
          {name: '张心怡', email: 'zhangxinyi1110@163.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/d76ac82f84ee3521.jpeg', link: 'https://lunnyria.github.io/'},
          {name: '孙怡飞', email: 'dddoctorr612@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/d4314bcb58f4aaa5.jpeg', link: ''},
          {name: '吴玉婷', email: '349361652@qq.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/baa63530116fa115.jpg', link: 'https://github.com/yuting816'},
          {name: '陈鹏宇', email: 'andyphilharmonic@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/65011b490273e6b3.jpeg', link: 'https://github.com/spacecow-boy'},
          {name: '李川泽', email: 'li614243403@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/27e8a85cc5d75f93.jpeg', link: 'https://github.com/lee-chuanze'},
          {name: '张紫葳', email: 'ziweizhang96@outlook.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/08b16d71ac139685.jpeg', link: ''},        
          {name: '周冰', email: 'bing_zhou_barrett@hotmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/c581f11df8079270.jpeg', link: 'https://spgbarrett.github.io/bing-zhou.io/'},        
          {name: '林熙哲', email: 'rayinnz1999@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/4000384f60eb3537.jpeg', link: 'https://github.com/RaysLinn'},        
          {name: '王轩昊', email: 'Xuanh.W@outlook.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/10ba45a4f3ae25c3.jpeg', link: 'https://github.com/Rainlv'},        
          {name: '彭建', email: 'pjwhusir@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/4b437562aeb04dfa.png', link: 'https://github.com/pengjeck'},        
          {name: '胡洛铭', email: 'huluoming98@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/10/2b78be43bec0914d.jpeg', link: ''},
          {name: '周智杰', email: 'zhou-zj@outlook.com', img: 'https://s3.bmp.ovh/imgs/2022/04/11/5ba5bf666ca0a0bc.png', link: 'https://zjalexzhou.github.io/portfolio'},
          {name: '李秦家妹', email: 'l1075651504@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/11/b389c19870ee64b7.jpeg', link: ''},
          {name: '孙婉莹', email: 'Wany.Sun@outlook.com', img: 'https://s3.bmp.ovh/imgs/2022/04/11/417ecc0aad6daf34.jpeg', link: 'https://github.com/YingLSCF'},
          {name: '李长斯', email: 'lichangsi1015@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/11/b1e68def10d2fd04.png', link: 'https://github.com/LArk-root'},
          {name: '冯国泉', email: 'guoquanfeng94@gmail.com', img: 'https://s3.bmp.ovh/imgs/2022/04/11/962890d0cfd1a35d.jpeg', link: ''},
        ],
        gisphere: [],
        gisource: [],
        gispace: [],
        gisalon: [],
        media: [],
        design: [],
        partner: [],
      }
    };
  },
}
</script>

<style lang="less" scoped>
  b{
    margin-right: 20px;
  }
  h2{
    margin-top: 40px;
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
      padding: 40px 20px;
      box-sizing: border-box;
    }
  }
</style>