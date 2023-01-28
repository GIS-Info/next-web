<template>
    <div>
        <el-container style="height:max-content; border: 1px solid #eee">
            <el-menu  text-color="#000000" 
                @open="handleOpen"
                @close="handleClose"
                @select="handSelect">
                <h2 class="tt" @click="$router.push('/uniInfo')">院校指南</h2>
                <el-submenu index="1" >
                    <template slot="title">
                        <span>北美洲</span>
                    </template>
                    
                    <el-submenu index="1-1">
                        <template slot="title"><span>美国</span></template>
                        <el-menu-item index="1-1-1" @click="$router.push('/uniInfo/main1')">美国东部</el-menu-item>
                        <el-menu-item index="1-1-2" @click="$router.push('/uniInfo/main2')">美国南部</el-menu-item>
                    </el-submenu>

                    <el-submenu index="1-2">
                        <template slot="title"><span>加拿大</span></template>
                    </el-submenu>
                </el-submenu>

                <el-submenu index="2" >
                    <template slot="title"><span>欧洲</span></template>

                    <el-submenu index="2-1">
                        <template slot="title"><span>北欧</span></template>
                        <el-menu-item index="2-1-1">挪威</el-menu-item>
                        <el-menu-item index="2-1-2">芬兰</el-menu-item>
                    </el-submenu>

                    <el-submenu index="2-2">
                        <template slot="title"><span>西欧</span></template>
                        <el-menu-item index="2-2-1">德国</el-menu-item>
                        <el-menu-item index="2-2-2">荷兰</el-menu-item>
                    </el-submenu> 
                </el-submenu>

            </el-menu>
            <nuxt-child></nuxt-child>

            <el-container class="main">
                <el-main>
                    <!-- <el-table :data="tableData">
                        <el-table-column prop="date" label="日期" width="140">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table> -->
                    <el-collapse @change="handleChange">

                        <el-collapse-item title="乔治梅森大学 George Mason University" name="1" >
                            <el-descriptions size="">
                                <el-descriptions-item label="地址">美国，弗吉尼亚州，费尔法克斯市</el-descriptions-item>
                                <el-descriptions-item label="GIS相关系所"><a href=" ">地理与地理信息科学系</a ></el-descriptions-item>
                                <el-descriptions-item label="简称">GMU</el-descriptions-item>
                                <!-- <el-descriptions-item label="备注">
                                    <el-tag size="small">学校</el-tag>
                                </el-descriptions-item> -->
                                <el-descriptions-item label="简介">乔治梅森大学是美国的一所公立高校，距离华盛顿DC只有三十分钟，其地理系具有强劲的地理信息计算科学和数据科学的实力。该系的硕士研究生项目有三类，包含地理信息系统，地球科学，和地理与制图学三个方向的硕士学位。博士生项目只有一个：地球系统与地理信息科学博士学位，本科毕业生也可以申请，以上均为STEM</el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions column="1">
                                <el-descriptions-item label="相关导师"></el-descriptions-item>
                                <el-descriptions-item><a href="https://science.gmu.edu/directory/chaowei-yang">Chaowei Yang</a ><el-tag size="small">spatiotemporal theories and applications</el-tag></el-descriptions-item>
                                <el-descriptions-item><a href="https://science.gmu.edu/directory/andreas-zufle">Andreas Zufle</a ><el-tag size="small">computer science</el-tag><el-tag size="small">data sciences</el-tag><el-tag size="small">geoinformation science</el-tag><el-tag size="small">geospatial intelligence</el-tag><el-tag size="small">smart cities</el-tag></el-descriptions-item>
                            </el-descriptions>
                        </el-collapse-item>

                        <el-collapse-item title="克拉克大学 Clark University" name="2">

                            <el-descriptions size="">
                                <el-descriptions-item label="地址">美国，马萨诸塞州，伍斯特</el-descriptions-item>
                                <el-descriptions-item label="GIS相关系所"><a href=" ">地理系</a ></el-descriptions-item>
                                <el-descriptions-item label="简称">Clark</el-descriptions-item>
                                <!-- <el-descriptions-item label="备注">
                                    <el-tag size="small">学校</el-tag>
                                </el-descriptions-item> -->
                                <el-descriptions-item label="简介">克拉克大学的地理系是美国最早授予地理学研究生学位的地理系之一，并在一定程度上可视为已解散的哈佛大学地理系的继承者。著名地图制图学家Richard Harrison（美国制图学院系第一次大发展的引领人）和Erwin Raizs（世界上第一本地图学教材《制图学基础》的作者）曾在此任教。该系研究生项目有MS和PhD。其中MS项目是和该校的国际发展、建设和环境系合作开设，主要方向就是GIS。</el-descriptions-item>
                            </el-descriptions>

                            <el-descriptions column="1">
                                <el-descriptions-item label="相关导师"></el-descriptions-item>
                                <el-descriptions-item><a href="https://www2.clarku.edu/faculty/facultybio.cfm?id=460">John Rogan</a >
                                    <el-tag size="small">landscape ecology</el-tag>
                                    <el-tag size="small">fire ecology</el-tag>
                                    <el-tag size="small">optical remote sensing and GIScience</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item><a href="https://scholar.google.com/citations?user=Lfmhbd8AAAAJ&hl=en">Robert Gilmore Pontius Jr</a >
                                    <el-tag size="small">land change</el-tag>
                                    <el-tag size="small">modeling</el-tag>
                                    <el-tag size="small">statistics</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item><a href="https://www2.clarku.edu/faculty/facultybio.cfm?id=896&progid=15">Florencia Sangermano</a >
                                    <el-tag size="small">conservation biology</el-tag>
                                    <el-tag size="small">GIS</el-tag>
                                    <el-tag size="small">remote sensing and landscape ecology</el-tag>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-collapse-item>

                    </el-collapse>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Aside",
        methods: {
            handleOpen(key, keyPath) {
                console.log("打开：",key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log("关闭：",key, keyPath);
            },
            handSelect(key, keyPath) {
                console.log("选择：",key, keyPath);
            }
        }
    }    
</script>

<style scoped>
    .el-menu{
        width: 15%;
        text-align: center;
    }
    .el-submenu{
       text-align: center;
       font-size: large;
    }
    .container{
    overflow: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

}
    .main{
      width: 100%;
      height: 1000px;
      max-width: 1200px;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .tt:hover{
        color:rgb(30, 43, 61);
        background-color: rgb(228, 231, 235);
    }
    el-collapse-item:hover{
        color:rgb(113, 129, 149);
    }

</style>