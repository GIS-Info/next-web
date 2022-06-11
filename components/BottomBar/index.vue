<template>
  <div class="bg">
    <div class="content">
      GISphere@2022
    </div>
    <div class="links-container">
      <a class="link" href="https://github.com/GIS-Info">
        <img class="img" src="./imgs/github.png" />
        GIS-Info
      </a>
      <a class="link" href="https://www.linkedin.com/company/gisphere/about/">
        <img class="img" src="./imgs/linkedin.png" />
        GISphere
      </a>
      <a class="link" href="mailto:gisphere@outlook.com">
        <img class="img" src="./imgs/email.png" />
        gisphere@outlook.com
      </a>
      <a class="link" @mouseover="() => {showWechatPopup = true}" @mouseleave="()=>{showWechatPopup = false}">
        <img class="img" src="./imgs/wechat.png" />
        GISphere 留学指南
        <transition name="popup">
          <div v-if="showWechatPopup" class="popup">
            <img class="qr-img" src="./imgs/wechat-qrcode.png" />
          </div>
        </transition>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showWechatPopup: false,
    }
  }
}
</script>

<style lang="less" scoped>
.bg{
  width: 100%;
  height: 100px;
  background: #DCDFE6;
  display: flex;
  flex-direction: column;
  .content{
    width: 100%;
    height: 64px;
    line-height: 64px;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    text-align: center;
    color: #303133;
  }
  .links-container{
    margin-top: -10px;
    text-align: center;
    .link{
      margin: 0px 10px 0px 10px;
      font-size: 10px;
      color: #303133;
      cursor: pointer;
      text-decoration: none;
      position: relative;
      .img{
        height: 16px;
        transform: translateY(3px);
      }
      .popup{
        position: absolute;
        top: -220px;
        left: 50%;
        margin-left: -100px;
        width: 200px;
        height: 200px;
        background-color: #DCDFE6;
        .qr-img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .link:hover{
      text-decoration: underline;
    }
  }
}

.popup-enter-active, .popup-leave-active {
  transition: opacity 0.4s;
}
.popup-enter, .popup-leave-to {
  opacity: 0;
}

</style>