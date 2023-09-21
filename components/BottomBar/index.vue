<template>
  <div class="bg">
    <div class="copyright">
      <h2 class="copyright-title">Copyright 版权</h2>
      <p class="copyright-content">
        本文档遵循CC BY-NC 4.0许可，如需非商业转载或修改，请给出署名；商业转载
        请务必联系作者获得授权。<br />
        This work is licensed under a
        <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="blank"
          >Creative Commons Attribution-NonCommercial 4.0 International
          License</a
        >. <br />
        This project is supported by a group of scholars who have studied or
        worked in GIS-related departments around the world. We want to say thank
        you to all of those who provided school information and/or worked on
        managing this project as volunteers. <br />
        Please feel free to leave a message in
        <a href="https://github.com/gisphere/gisphere.github.io" target="blank"
          >this GitHub issue</a
        >
        if you find any errors or have any suggestions. We welcome more
        volunteers to join this project to help maintain and develop the guide.
        Please feel free to contact us via
        <a href="mailto:gisphere@outlook.com">gisphere@outlook.com</a>. <br />
      </p>
    </div>
    <div class="content">GISphere@2023</div>
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
      <a class="link" href="https://twitter.com/GISphereGuide">
         <img class="img" src="./imgs/x.png" />
        GISphereGuide
      </a>
      <a
        class="link"
        @mouseover="
          () => {
            showWechatPopup = true
          }
        "
        @mouseleave="
          () => {
            showWechatPopup = false
          }
        "
      >
        <img class="img" src="./imgs/wechat.png" />
        GISphere 留学指南
        <transition name="popup">
          <div v-if="showWechatPopup" class="popup">
            <img class="qr-img" src="./imgs/wechat-qrcode.png" />
          </div>
        </transition>
      </a>
      <a
         class="link"
         @mouseover="
            () => {
            showWhatsapptPopup = true
            }
         "
         @mouseleave="
            () => {
            showWhatsapptPopup = false
            }
         "
      >
        <img class="img" src="./imgs/whatsapp.png" />
              Whatsapp
         <transition name="popup">
            <div v-if="showWhatsapptPopup" class="popup">
                <img class="qr-img" src="./imgs/whatsapp-qrcode.png" />
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
      showWhatsapptPopup: false,
    }
  },
}
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 18.75rem;
  background: #dcdfe6;
  display: flex;
  flex-direction: column;
  .content {
    width: 100%;
    height: 64px;
    line-height: 64px;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    text-align: center;
    color: #303133;
  }
  .copyright-title {
    text-align: center;
  }
  .copyright-content {
    text-align: center;
    font-size: 12px;
    margin: 0px 20% 0px 20%;
  }
  .links-container {
    text-align: center;
    .link {
      margin: 0px 10px 0px 10px;
      font-size: 10px;
      color: #303133;
      cursor: pointer;
      text-decoration: none;
      position: relative;
      .img {
        height: 16px;
        transform: translateY(3px);
      }
      .popup {
        position: absolute;
        top: -220px;
        left: 50%;
        margin-left: -100px;
        width: 200px;
        height: 200px;
        background-color: #dcdfe6;
        .qr-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .link:hover {
      text-decoration: underline;
    }
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.4s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
