
<template>
    <div>
        <el-container style="height:max-content; border: 1px solid #eee">
            <el-menu  text-color="#000000" 
                @open="handleOpen"
                @close="handleClose"
                @select="handSelect">
                <h2 @click="$router.push('/uniInfo')">院校指南</h2>
                <el-menu-item index="1" @click="$router.push('/uniInfo/main1')">北美洲</el-menu-item>
                <el-menu-item index="2" @click="$router.push('/uniInfo/main2')">亚洲</el-menu-item>
                <el-menu-item index="3" @click="$router.push('/uniInfo/main3')">欧洲</el-menu-item>
                <el-menu-item index="4" @click="$router.push('/uniInfo/main4')">南美洲</el-menu-item>
                <el-menu-item index="5" @click="$router.push('/uniInfo/main5')">大洋洲</el-menu-item>
                <el-menu-item index="6" @click="$router.push('/uniInfo/main6')">非洲</el-menu-item>
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
                    <el-carousel :interval="4000" type="card" height="200px">
                    <!-- <el-carousel-item v-for="item in 6" :key="item">
                        < img src="https://career.virginia.edu/sites/career2018.virginia.edu/files/styles/paragraphs_photo/public/GIS.jpg?itok=hQqAKtax">
                        <h3 class="medium">{{ item }}</h3>
                    </el-carousel-item> -->
                    <el-carousel-item >
                        <img :src='require("@/pages/uniInfo/images/5.jpg")'>
                        <h3 class="medium"></h3>
                    </el-carousel-item>
                    <el-carousel-item >
                        <img :src='require("@/pages/uniInfo/images/2.jpg")'>
                        <h3 class="medium"></h3>
                    </el-carousel-item>
                    <el-carousel-item >
                        <img :src='require("@/pages/uniInfo/images/1.jpg")' >
                        <h3 class="medium"></h3>
                    </el-carousel-item>
                </el-carousel>

                    <h1>GIS-Info <strong>院校指南</strong> </h1>
                    <h3>GIS-Info 院校指南公益项目发起于2019年9月，最新版本更新时间为2021年9月，旨在提供及时且全面的全球GIS及相关专业院校信息。信息由来自世界各地GIS及城市规划等相关专业名校的在读学生、近期毕业校友或青年教师提供，内容主要包括各院系的优势科研方向、开设学位和导师信息。希望这份指南能为有留学意向的 GIS相关专业朋友们提供帮助和支持。</h3>
                    <!-- <img :src='require("@/pages/uniInfo/images/map.jpg")' > -->

                    
                    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">
                    
                    <meta charset="utf-8">
                    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
                    <link href="https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css" rel="stylesheet">

                    <div id="map" style="width: 1100px; height: 500px;">

                        <div id="left" class="sidebar flex-center left collapsed">
                            <div class="sidebar-content rounded-rect flex-center">
                                <div class="context">
                                    Uni Info:
                                    <p>{{ sidebarText }}</p>
                                    <p>{{ Location }}</p>
                                    <h6>{{discriptions}} </h6> 
                                </div>
                                <div class="sidebar-toggle rounded-rect left" @click="clickLeftArrow">
                                    &rarr;
                                </div>
                            </div>
                        </div>

                        <div id="right" class="sidebar flex-center right collapsed">
                            <div class="sidebar-content rounded-rect flex-center">
                                <h5>Comments:</h5>
                                <br>
                                <div>
                                    <el-badge value="new" class="item">
                                        <el-button size="small">评论</el-button>
                                    </el-badge>
                                </div>
                                <div>
                                    <el-badge value="hot" class="item">
                                        <el-button size="small">回复</el-button>
                                    </el-badge>
                                </div>
                                <div class="sidebar-toggle rounded-rect right" @click="clickRightArrow">
                                    &larr;
                                </div>
                            </div>
                        </div> 
                        
                    </div>

                    <div class="map-overlay top" >
                        <div class="map-overlay-inner">
                            <fieldset>
                            <label>Select layer</label>
                            <select id="layer" name="layer">
                                <!-- Each value matches a layer ID. -->
                                <option value="water">Water</option>
                                <option value="building">Buildings</option>
                                <option value="landuse">Green</option>
                                <!-- <option value="road">Roads</option>
                                <option value="boundaries">Boundaries</option>
                                <option value="poi">POI</option> -->
                            </select>
                            </fieldset>
                            <fieldset>
                                <label>Choose a color</label>
                                <div id="swatches"></div>
                            </fieldset>
                        </div>
                    </div>


                    <div class="tooltip" id="tooltip"></div>

                    <h2 ><i class="el-icon-user-solid"></i>社区</h2>
                    <h3>为了方便大家交流，我们创办了GISphere留学指南微信公众号，定期邀请在世界各地留学或访学的朋友们分享他们的留学/访学申请经验，以及在海外留学/访学中工作与生活的经历、体验和感悟，帮助小伙伴们有的放矢，提高申请成功率，了解海外工作和生活方方面面信息。同时，我们也会定期整理和发布有关各类会议讲座和论文投稿的各类学术信息，助力大家的学术发展。请扫页脚二维码关注我们的GISphere公众号。 
                        <br> 
                        <br><p style="font-weight:bold;"><i class="el-icon-info"></i>关注公众号后可以加入GISpace留学微信群。</p>微信群是GIS及相关专业的海外学生学者的高质量活跃交流平台，尤其欢迎一年内有出国出境意向的GIS相关专业小伙伴加入。因群里人数较多，目前需要管理员手动发送邀请链接。请扫页脚二维码关注我们的GISphere公众号，并在后台留言“留学群”，可添加管理员好友并获得入群邀请链接。
                        <br> 
                        <br> 本指南由志愿者在业余时间完成，由于时间精力所限，难免有疏漏，内容仅供参考。指南将长期维护更新，若有更正、建议和补充，欢迎在这里留言。也欢迎更多的有志者一同参与维护这个项目！指南中各院校排名不分先后。如果需要了解学校的综合排名等情况，请查询THE、QS、USNews、ARWU等权威排名。         
                        <br> 信息提供者及参与编辑的志愿者名单见下方的“作者名单”。 
                        <br> 
                        <br> <p style="font-weight:bold;"> <i class="el-icon-menu"></i>历史版本：https://gis-info.github.io/ (更新时间 2020 年 9 月)</p>
                        <p style="font-weight:bold;"><i class="el-icon-arrow-right"></i>GIS留学：学校与项目指南 - 知乎 (zhihu.com)  (更新时间 2019 年 9 月)</p> 
                    </h3>
                    <h2 ><i class="el-icon-s-opportunity"></i>版权</h2>
                    <h3>本文档遵循CC BY-NC 4.0许可，如需非商业转载或修改，请给出署名；商业转载 请务必联系作者获得授权。
                        <br>This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.</h3>
                    <h2 ><i class="el-icon-s-custom"></i>作者名单</h2>
                    <h3>下面是撰写条目或提供院校信息的作者名单。按姓氏拼音排序。为保护隐私，我们不公开作者的单位信息。部分作者为匿名作者，故在此未予列出。</h3>
                    
                    <el-collapse  @change="handleChange">
                        <el-collapse-item title="内容：" name="1">
                            <div>安云琪，曹伟辰，曹彦佳，陈焕发，陈可天，陈龙，陈茜，陈艺宽，陈昱，程敬宜，崔楠，崔文聪，戴劭勍，董维川, 杜新浩，杜瑶，段晨曦，段牧溪，范宜伦，费庆源，冯晓睿，冯瑶，付圣，高鹏，高芸雅，郭晨，郭科宇，郭雪蕊，韩笑，何畅，何旭，何伊伊，胡昊，胡吉林，胡英杰，胡于杰，黄冠，黄佳玮，黄谦夏，黄啸，黄馨可，贾东启，康雨豪，赖佳梦，李八一，李博文，李浩，李皓宸，李佳，李俊安，李良，李缅因，李清华，李烁，李小江，李艺，李元翔，李子奇，李子升，连婷，梁晓帆，廖倩儒，林熙哲，刘年华，刘启亮，刘若葳，刘雯，刘晓健，刘欣宜，刘昱妍，刘振宇，刘卓明，卢加宁，栾辉，吕方正，马超，马擎宇，马宇驰，买庚辰，孟凡林，穆野，庞真，彭倩，乔天，屈光耘，冉泉，饶锦蒙，饶婧，任泽茜，石霞，司云瑞，宋秋然，宋万营，苏辰雨，孙一璠，谭孟荀，谭晓悦，唐安琪，童馨仪，王海明，王邃，王瑶莉，卫贺兰，魏辛源，吴迪，吴秋生，吴欣皓，谢雨潭，邢进，徐芳洁，徐浩文，徐佳智，徐雅雯，许子清，薛凯，晏澍虹，杨家鑫，杨梅，杨庭方，杨莹丽，杨源譞，叶山，叶翔，易健，于曼竹，于婉灵，袁振东，岳远紊，曾可欣，翟寻，张帆，张晶睿，张婧祎，张景源，张兰，张蔚行，张雅璇，张颖，章静，赵家彦，赵群山，赵雨潇，周泓，周建雄，周璐，周瑞，朱春武，朱飞宇，邹倩倩</div>
                        </el-collapse-item>
                    </el-collapse>

                    <el-collapse  @change="handleChange">
                        <el-collapse-item title="内容编辑：" name="2">
                            <div>戴劭勍，段晨曦，黄馨可，康雨豪，李皓宸，李肖，刘昊坤，刘昱妍，饶锦蒙，任泽茜，童馨仪，叶山，叶翔，岳远紊，张晶睿，张景源，朱春武</div>
                        </el-collapse-item>
                    </el-collapse>

                    <el-collapse @change="handleChange">
                        <el-collapse-item title="网站建设：" name="3">
                            <div>刘昊坤，叶山，叶翔，康雨豪，张景源，饶锦蒙</div>
                        </el-collapse-item>
                    </el-collapse>

                    <h3>再次衷心感谢所有作者的辛苦付出！</h3>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import 'mapbox-gl/dist/mapbox-gl.css';
    import {IconLayer} from '@deck.gl/layers';
    import {MapboxLayer} from '@deck.gl/mapbox';
    import data from '../uniInfo/data/point2.json';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

    const mapboxgl = require('mapbox-gl');
    export default {
        data (){
            return {
                sidebarText: null,
                discriptions:null,
                Location:null
            }
        },
        name: "Aside",
        mounted() {
            this.init();  
        },

        methods: {

            handleOpen(key, keyPath) {
                console.log("打开：",key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log("关闭：",key, keyPath);
            },
            handSelect(key, keyPath) {
                console.log("选择：",key, keyPath);
            },
            handleChange(val) {
                console.log(val);
            },

            init(){
                const INITIAL_VIEW_STATE = {
                    latitude: 40.759363,
                    longitude: -73.984532,
                    zoom: 12,
                    bearing: 0,
                    pitch: 30
                };
                mapboxgl.accessToken = 'pk.eyJ1IjoiamFqYW1vYSIsImEiOiJjbDhzeDI4aHgwMXh6M3hrbmVxbG9vcDlyIn0.cdD4-PP7QcxegAsxlhC3mA';
                const map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/light-v11',
                    attributionControl: false,
                    // Note: deck.gl will be in charge of interaction and event handling
                    interactive: true,
                    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
                    zoom: INITIAL_VIEW_STATE.zoom,
                    bearing: INITIAL_VIEW_STATE.bearing,
                    pitch: INITIAL_VIEW_STATE.pitch
                });
                map.setMaxBounds([
                [-180,-90],
                [180,90]
                 ])
                // map.setLayoutProperty(layers[layerIndex].id, 'width', 1000);
                // map.setLayoutProperty(layers[layerIndex].id, 'height', 400);

                const ICON_MAPPING = {
                    marker: {x: 0, y: 0, width: 500, height: 200, mask: false}
                };

                // icon, mark and fly-to motion
                map.on('load', () => {
                    map.addLayer(new MapboxLayer({
                        id: 'shootingLocations',
                        type: IconLayer,
                        data: data,
                        pickable: true,
                        // iconAtlas and iconMapping are required
                        // getIcon: return a string
                        iconAtlas: require('../uniInfo/images/biaoji.png'),
                        iconMapping: ICON_MAPPING,
                        getIcon: d => 'marker',
                        sizeScale: 8,
                        getPosition: d => [d.coordinates[1],d.coordinates[0]],
                        getSize: d => 5,
                        getColor: d => [Math.sqrt(d.exits), 140, 0],
                        onClick: (info, event) => {
                            this.info = info;
                            if (event.leftButton) {
                                console.log("Yes!!!")
                                console.log(info.object)
                                this.sidebarText = info.object.name
                                this.discriptions=info.object.description
                                this.Location=info.object.address
                            }
                            this.map.flyTo({
                                center:[info.object.coordinates[1],info.object.coordinates[0]],
                                zoom: 17,
                                speed: 6,
                                curve: 1,
                                essential: true
                            })
                        },

                        onHover: ({object, x, y}) => {
                            // const tooltip = `${object[0].name}\n${object[0].film}`;
                            const el = document.getElementById('tooltip');
                            if (object) {
                                el.innerHTML = `<p style="text-align: center">Name:${object.name}</p ><br>Location:${object.address}</br>`;
                                el.style.display = 'block';
                                el.style.left = x + 40 + 'px';
                                el.style.top = y - 20 + 'px';
                            } else {
                                el.style.display = 'none';
                            }
                        },

                        // onClick: (info, event) => {
                        //     this.info = info;
                        //     if (event.leftButton) {
                        //         this.sidebarText = info.name
                        //     }
                        // }

                    }));
                });

                // 3d map
                map.on('style.load', () => {
                    // Insert the layer beneath any symbol layer.
                    const layers = map.getStyle().layers;
                    const labelLayerId = layers.find(
                        (layer) => layer.type === 'symbol' && layer.layout['text-field']
                    ).id;
                    
                    // The 'building' layer in the Mapbox Streets
                    // vector tileset contains building height data
                    // from OpenStreetMap.
                    map.addLayer(
                    {
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#aaa',
                            
                            // Use an 'interpolate' expression to
                            // add a smooth transition effect to
                            // the buildings as the user zooms in.
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.6
                        }
                    },
                    labelLayerId
                    );
                });

                // change layer color
                map.on('load', () => {
                    // Add a custom layer that uses
                    // a vector tileset source.
                    map.addLayer({
                        id: 'triangles',
                        source: {
                        type: 'vector',
                        url: 'mapbox://examples.ckv9z0wgf5v7c27p7me2mf0l9-9wrve' // custom tileset
                        },
                        'source-layer': 'triangles',
                        type: 'fill'
                    });
                });
                
                const swatches = document.getElementById('swatches');
                const layer = document.getElementById('layer');
                const colors = [
                    '#ffffcc',
                    '#a1dab4',
                    '#41b6c4',
                    '#2c7fb8',
                    '#253494',
                    '#fed976',
                    '#feb24c',
                    '#fd8d3c',
                    '#f03b20',
                    '#bd0026'
                ];
                
                for (const color of colors) {
                    const swatch = document.createElement('button');
                    swatch.style.backgroundColor = color;
                    swatch.addEventListener('click', () => {
                        map.setPaintProperty(layer.value, 'fill-color', color);
                    });
                    swatches.appendChild(swatch);
                }

                // Create a popup.
                const popup = new mapboxgl.Popup({     
                    closeButton: false,
                    closeOnClick: false,
                    className: 'mapboxgl-popup'
                });
            
                // map.on('load', () => {
                //     toggleSidebar('left');
                // });
            

                map.on('mouseenter', "shootingLocaion", (data) => {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';
                    
                    // Copy coordinates array.
                    const coordinates = data[0].coordinates;
                    const description = data[0].text1;
                    
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(data[0].lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += data[0].lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found
                    popup.setLngLat(coordinates).setHTML(description).addTo(map);

                }); 
                map.on('mouseleave', "shootingLocaion", () => {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });

                // Add zoom and rotation controls to the map.
                map.addControl(new mapboxgl.NavigationControl());

                //Add a fullscreen control to a map
                map.addControl(new mapboxgl.FullscreenControl());

                // Add the control to the map.
                map.addControl(
                    new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl,
                    }),
                    "bottom-right"
                );
                
                this.map = map;
            },
            
            toggleSidebar(id) {
                    const elem = document.getElementById(id);
                    // Add or remove the 'collapsed' CSS class from the sidebar element.
                    // Returns boolean "true" or "false" whether 'collapsed' is in the class list.
                    const collapsed = elem.classList.toggle('collapsed');
                    const padding = {};
                    // 'id' is 'right' or 'left'. When run at start, this object looks like: '{left: 300}';
                    padding[id] = collapsed ? 0 : 300; // 0 if collapsed, 300 px if not. This matches the width of the sidebars in the .sidebar CSS class.
                    // Use `map.easeTo()` with a padding option to adjust the map's center accounting for the position of sidebars.
                    this.map.easeTo({
                        padding: padding,
                        duration: 1000 // In ms. This matches the CSS transition duration property.
                    });
            },
            clickLeftArrow() {
                this.toggleSidebar('left');
            },
            clickRightArrow() {
                this.toggleSidebar('right');
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
    h1{
        font-size: 60px;
    }
    h3{
        font-size: 15px;
        font-weight:normal;
    }
    h5{
        font-weight:normal;
        color:rgb(79, 86, 97);
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
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #e1e6ec;
    }

    img {
        width: 600px;
        height: 200px;
        object-fit: cover;
    }

    strong{
        color:#1a4986;
    }

    .tt:hover{
        color:rgb(56, 89, 134);
    }

    el-collapse-item:hover{
        color:rgb(199, 209, 222);
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
        position:relative;
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
        position:relative;
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
    .context{
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