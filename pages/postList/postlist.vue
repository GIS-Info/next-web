<template>
  <div class="main">

    <div class="web-banner">
      <img class=logo-img src="./logo.svg"></img>
      <div class="logo-name">GISphere</div>

      <!-- 中文web banner -->
      <div v-if="lang =='zh'" class="about-us">
        <button class="about-btn">关于我们</button>
        <button class="about-btn">管理员登录</button>
        <button class="about-btn">English</button>
      </div>

      <!-- 英文web banner -->
      <div v-if="lang =='en'" class="about-us">
        <button class="about-btn">About</button>
        <button class="about-btn">Login (Admin Only)</button>
        <button class="about-btn">切换中文</button>
      </div>

    </div>

    <!-- 中文banner -->
    <div v-if="lang =='zh'" class="page-banner">

      <div class="dropdown level">
        <button class="dropdown-button">职位层次 &#9660;</button>
        <div class="dropdown-content">
          <a href="#">博士</a>
          <a href="#">硕士</a>
          <a href="#">本科</a>
        </div>
      </div>

      <div class="dropdown loc">
        <button class="dropdown-button">国家及地区 &#9660;</button>
        <div class="dropdown-content">
          <a href="#">美国</a>
          <a href="#">中国香港</a>
          <a href="#">德国</a>
        </div>
      </div>


      <div class="dropdown start-term">
        <button class="dropdown-button"> 开始时间 &#9660;</button>
        <div class="dropdown-content">
          <a href="#">春季 (学期制)</a>
          <a href="#">春季 (学季制)</a>
          <a href="#">夏季 (学期制)</a>
        </div>
      </div>
      <div class="dropdown uni">
        <button class="dropdown-button">学校 &#9660;</button>
        <div class="dropdown-content">
          <a href="#">伊利诺伊大学香槟分校</a>
          <a href="#">纽约大学</a>
          <a href="#">哥伦比亚大学</a>
        </div>
      </div>


      <button class="reset_button">重置</button>
    </div>

    <!-- 英文banner -->
    <div v-if="lang =='en'" class="page-banner">

      <div class="dropdown level">
        <button class="dropdown-button">Level &#9660;</button>
        <div class="dropdown-content">
          <a href="#">Ph.D.</a>
          <a href="#">Master</a>
          <a href="#">Bachelor</a>
        </div>
      </div>

      <div class="dropdown loc">
        <button class="dropdown-button">Country / Region &#9660;</button>
        <div class="dropdown-content">
          <a href="#">United States</a>
          <a href="#">Hongkong,China</a>
          <a href="#">Germany</a>
        </div>
      </div>



      <div class="dropdown start-term">
        <button class="dropdown-button"> Start Term &#9660;</button>
        <div class="dropdown-content">
          <a href="#">Spring (Semester)</a>
          <a href="#">Spring (Quarter)</a>
          <a href="#">Summer (Semester)</a>
        </div>
      </div>

      <div class="dropdown uni">
        <button class="dropdown-button">University &#9660;</button>
        <div class="dropdown-content">
          <a href="#">University of Illinois, Urbana-Champaign</a>
          <a href="#">New York University</a>
          <a href="#">Columbia University</a>
        </div>
      </div>

      <button class="reset_button">Reset</button>

    </div>

    <!-- 中文list -->
    <div v-if="lang =='zh'" class="list">
      <div class="entry">
        <div class="entry-title">研究助理</div>
        <div class="entry-content-brief">xxxxx公司</div>
        <div class="entry-loc">英国，伦敦</div>
        <div class="entry-pubDate">发布于 <b>2022年3月31日</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">研究助理</div>
        <div class="entry-content-brief">xxxxx公司</div>
        <div class="entry-loc">英国，伦敦</div>
        <div class="entry-pubDate">发布于 <b>2022年3月31日</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">研究助理</div>
        <div class="entry-content-brief">xxxxx公司</div>
        <div class="entry-loc">英国，伦敦</div>
        <div class="entry-pubDate">发布于 <b>2022年3月31日</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">研究助理</div>
        <div class="entry-content-brief">xxxxx公司</div>
        <div class="entry-loc">英国，伦敦</div>
        <div class="entry-pubDate">发布于 <b>2022年3月31日</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">研究助理</div>
        <div class="entry-content-brief">xxxxx公司</div>
        <div class="entry-loc">英国，伦敦</div>
        <div class="entry-pubDate">发布于 <b>2022年3月31日</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">研究助理</div>
        <div class="entry-content-brief">xxxxx公司</div>
        <div class="entry-loc">英国，伦敦</div>
        <div class="entry-pubDate">发布于 <b>2022年3月31日</b></div>

      </div>

    </div>

    <!-- 英文list -->
    <div v-if="lang =='en'" class="list">
      <div class="entry">
        <div class="entry-title">Research Assistant</div>
        <div class="entry-content-brief">Research Assistant</div>
        <div class="entry-loc">London, England, United Kingdom</div>
        <div class="entry-pubDate">Published on <b>31 Mar, 2022</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">Research Assistant</div>
        <div class="entry-content-brief">Research Assistant</div>
        <div class="entry-loc">London, England, United Kingdom</div>
        <div class="entry-pubDate">Published on <b>31 Mar, 2022</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">Research Assistant</div>
        <div class="entry-content-brief">Research Assistant</div>
        <div class="entry-loc">London, England, United Kingdom</div>
        <div class="entry-pubDate">Published on <b>31 Mar, 2022</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">Research Assistant</div>
        <div class="entry-content-brief">Research Assistant</div>
        <div class="entry-loc">London, England, United Kingdom</div>
        <div class="entry-pubDate">Published on <b>31 Mar, 2022</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">Research Assistant</div>
        <div class="entry-content-brief">Research Assistant</div>
        <div class="entry-loc">London, England, United Kingdom</div>
        <div class="entry-pubDate">Published on <b>31 Mar, 2022</b></div>
      </div>
      <div class="entry">
        <div class="entry-title">Research Assistant</div>
        <div class="entry-content-brief">Research Assistant</div>
        <div class="entry-loc">London, England, United Kingdom</div>
        <div class="entry-pubDate">Published on <b>31 Mar, 2022</b></div>
      </div>
    </div>

    <!-- 中文filter -->
    <div v-if="lang =='zh'" class="filter">
      <div class="filter-title">按内容搜索 <hr> </div>
      <div>
        <input v-model="searchText" type="text" class="search" />
        <button class="button-search">
          <svg class="icon-search"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
               heigth="19"
               width="19">
            <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="filter-title">按截止时间搜索 <hr> </div>
      <select class="filter-year">
        <option>2020年</option>
        <option>2021年</option>
        <option>2022年</option>
      </select>
      <table class="by-month">
        <tr>
          <td><button class="button-month">1月</button></td>
          <td><button class="button-month">2月</button></td>
          <td><button class="button-month">3月</button></td>
          <td><button class="button-month">4月</button></td>
          <td><button class="button-month">5月</button></td>
          <td><button class="button-month">6月</button></td>
        </tr>
        <tr>
          <td><button class="button-month">7月</button></td>
          <td><button class="button-month">8月</button></td>
          <td><button class="button-month">9月</button></td>
          <td><button class="button-month">10月</button></td>
          <td><button class="button-month">11月</button></td>
          <td><button class="button-month">12月</button></td>
        </tr>
      </table>
      <div class="filter-title">按专业领域搜索 <hr> </div>
      <table class="by-field">
        <tr>
          <td><button class="button-field">空间分析</button></td>
          <td><button class="button-field">遥感</button></td>
          <td><button class="button-field">地质</button></td>
        </tr>
        <tr>
          <td><button class="button-field">智慧城市</button></td>
          <td><button class="button-field">城市规划</button></td>
          <td><button class="button-field">制图</button></td>
        </tr>
        <tr>
          <td><button class="button-field">倾斜3D</button></td>
          <td><button class="button-field">云GIS</button></td>
          <td><button class="button-field">可视化</button></td>
        </tr>
      </table>
    </div>

    <!-- 英文filter -->
    <div v-if="lang =='en'" class="filter">
      <div class="filter-title">Search by Content <hr> </div>
      <div>
        <input v-model="searchText" type="text" class="search" />
        <button class="button-search">
          <svg class="icon-search"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
               heigth="19"
               width="19">
            <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="filter-title">Search by Deadline <hr> </div>
      <select class="filter-year">
        <option>2020</option>
        <option>2021</option>
        <option>2022</option>
      </select>
      <table class="by-month">
        <tr>
          <td><button class="button-month">Jan</button></td>
          <td><button class="button-month">Feb</button></td>
          <td><button class="button-month">Mar</button></td>
          <td><button class="button-month">Apr</button></td>
          <td><button class="button-month">May</button></td>
          <td><button class="button-month">Jun</button></td>
        </tr>
        <tr>
          <td><button class="button-month">Jul</button></td>
          <td><button class="button-month">Aug</button></td>
          <td><button class="button-month">Sep</button></td>
          <td><button class="button-month">Oct</button></td>
          <td><button class="button-month">Nov</button></td>
          <td><button class="button-month">Dec</button></td>
        </tr>
      </table>
      <div class="filter-title">Search by Field <hr> </div>
      <table class="by-field">
        <tr>
          <td><button class="button-field">Spatial Analysis</button></td>
          <td><button class="button-field">Remote Sensing</button></td>
          <td><button class="button-field">Geology</button></td>
        </tr>
        <tr>
          <td><button class="button-field">Urban Informatics</button></td>
          <td><button class="button-field">Urban Planning</button></td>
          <td><button class="button-field">Cartography</button></td>
        </tr>
        <tr>
          <td><button class="button-field">Oblique 3D</button></td>
          <td><button class="button-field">CloudGIS</button></td>
          <td><button class="button-field">Visulization</button></td>
        </tr>
      </table>
    </div>



  </div>
  </template>

  <script>
    import Vue from 'vue'
    export default {
      name: 'IndexList',
      props: {
        lang: {
          type: String,
          default: 'en',
          required: false,
        },
        
      }
    }
  </script>

  <style>
    .main {
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      text-align: center;

      margin-top: 60px;
      width: 100%;
      height: 100%;
      background-color: rgb(241, 241, 241);
    }
    .web-banner {
      position: absolute;
      width: 100%;
      height: 60px;
      left: 0px;
      top: 0px;
      background: #E4E7ED;
      box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.12);
      border-radius: 0px;
    }
    .logo-img{
      position:absolute;
      width: 30px;
      height:30px;
      left: 50px;
      top: 15px;
    }
    .logo-name {
      position: absolute;
      width: 30px;
      height: 30px;
      left: 90px;
      top: 20px;
    }
    .about-us{
      position:absolute;
      right:50px;
      top:15px;
      font-size:10px;
    }
    .about-btn {
      background-color: transparent;
      background-repeat: no-repeat;
      border: none;
      cursor: pointer;
      overflow: hidden;
      outline: none;
      margin: 5px;
    }
    .about-btn:hover {
      box-shadow: 0px 0 15px #7CE3B3;
    }
    .page-banner {
      position: absolute;
      width: 100%;
      height: 50px;
      left: 0px;
      top: 60px;
      background: #F5F7FA;
      box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.12);
      border-radius: 0px;
    }
    .dropdown-button {
      /* Font and Color */
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      font-weight: bold;
      color: rgba(48, 49, 51, 0.75);
      /* Button Feature */
      line-height: 20px;
      text-align: center;
      background: #7CE3B3;
      border-radius: 20px;
      border-width: 0px;
      padding: 5px 15px;
    }
    .dropdown-content {
      display: none;
      position: absolute;
      z-index: 1;
      
     
    }
    .dropdown-content a {
        width:100px;
        margin-top:5px;
        padding: 10px 16px;
        text-decoration: none;
        display: inline-block;
        border-radius: 20px;
        font-size: 12px;
        background-color: #FFFFFF;
      }
    .dropdown-content a:hover {
          box-shadow: 0px 0 15px #7CE3B3;
          border-radius: 20px;
          background-color: #FFFFFF;
        }
    .dropdown:hover .dropdown-content {
      display: block;
      
    }
    .dropdown:hover .dropdown-button {
      background-color: #42d791;
    }
    .level {
      position: absolute;
      width: 100px;
      height: 25px;
      left: 120px;
      top: 10px;
    }
    .loc {
      position: absolute;
      width: 150px;
      height: 25px;
      left: 270px;
      top: 10px;
    }
    .start-term {
      position: absolute;
      width: 120px;
      height: 25px;
      left: 460px;
      top: 10px;
    }
    .uni {
      position: absolute;
      width: 120px;
      height: 25px;
      left: 620px;
      top: 10px;
    }
    .reset_button {
      /* Font and Color */
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      font-weight: bold;
      color: rgba(48, 49, 51, 0.75);
      /* Button Feature */
      line-height: 20px;
      text-align: center;
      background: #E6A23C;
      border-radius: 20px;
      border-color: black;
      border-width: 0px;
      padding: 0px 10px;
      /* Position */
      position: absolute;
      width: 100px;
      height: 25px;
      right: 100px;
      top: 10px;
    }
    .list {
      position: absolute;
      top: 110px;
      left: 10%;
      width: 50%;
    }
    .entry {
      margin-top: 8px;
      position: relative;
      display: block;
      background-color:#F5F7FA;
      height: 65px;
      
    }
    .entry-title{
      font-size:15px;
      position:absolute;
      padding: 10px;
      
      
    }
    .entry-content-brief{
       position:absolute;
       padding: 30px 0px 10px 10px;
       font-size: 10px;
       color: #909399;
    }
    .entry-loc {
      position: absolute;
      padding: 45px 0px 10px 10px;
      font-size: 10px;
      color: #909399;
    }
    .entry-pubDate {
      position: absolute;
      padding: 45px 0px 10px 83%;
      font-size: 10px;
      color: #909399;
      
    }
    .filter {
      position: absolute;
      top: 110px;
      left: 60%;
      width: 30%;
    }
    .filter-title {
      position: relative;
      display: block;
      left: 30%;
      top: 20px;
      bottom: 50px;
      width: 40%;
    }
    .search {
      height: 35px;
      width: 50%;
      max-width: 500px;
      border-radius: 20px;
      outline: none;
      border: 3px solid #7CE3B3;
      padding: 0 20px;
      color: #606266;
      background: #FFFFFF;
      margin-top:20px;
    }
    .button-search {
      margin-left: -50px;
      border-radius: 20px;
      height: 30px;
      width: 40px;
      border: 0;
      outline: none;
      cursor: pointer;
      background-color: #FFFFFF;
      transition: all 0.3s ease 0s;
      margin-bottom:50px;
    }
    .button-search:hover {
        background-color: var(--color-4);
      }
    .filter-title hr {
        border-top: 3px solid #7CE3B3;
        width: 35%
      }
    .filter-year {
      position:relative;
      top:20px;
      left:0px;
     
      
      border: 0px solid #7CE3B3;
      padding: 5px;
      word-spacing:30px;
  
    }
    .by-month {
      position: relative;
      top: 20px;
      width: 80%;
      left:10%;
      right:10%;
      margin-bottom: 50px;
    }
    .button-month {
      border-width: 0px;
      margin: 5px;
      padding: 0px;
      height: 35px;
      width: 40px;
      color: #909399;
      cursor: pointer;
      background-color: #FFFFFF;
      transition: all 0.3s ease 0s;
    }
    .button-month:hover {
      background-color: #7CE3B3;
      color: #303133;
    }
    .by-field {
      position: relative;
      left:10%;
      right:10%;
      width: 80%;
      top: 20px;
    }
    .button-field {
      border-color: #DCDFE6;
      border-width: 1px;
      border-radius: 20px;
      height: 30px;
      width: 120px;
      color: #909399;
      cursor: pointer;
      background-color: #FFFFFF;
      transition: all 0.3s ease 0s;
    }
    .button-field:hover {
      background-color: #7CE3B3;
      color:#303133;
    }


  </style>
