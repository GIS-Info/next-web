<template>
  <div class="bg">
    <div class="copyright">
      <h2 class="copyright-title">Copyright</h2>
      <p class="copyright-content">
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
      <a class="link" href="https://www.youtube.com/@gisphere">
         <img class="img" src="./imgs/youtube.png" />
        Youtube GISalon
      </a>
      <a class="link" href="https://space.bilibili.com/1043870260">
         <img class="img" src="./imgs/bilibili.png" />
        Bilibili GISalon
      </a>
      <a class="link" href="https://www.zhihu.com/people/gisphere">
         <img class="img" src="./imgs/zhihu.png" />
        GISphere
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
        WeChat Public
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
  height: auto;
  background: #dcdfe6;
  display: flex;
  flex-direction: column;
  .content {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    text-align: center;
    color: #303133;
  }
  .copyright-title {
    text-align: center;
  }
  .copyright-content {
    text-align: left;
    font-size: 12px;
    margin: 0px 20% 0px 20%;
  }
  .links-container {
    text-align: center;
    padding: 0px 100px 30px 100px;
    .link {
      margin: 0px 10px 0px 10px;
      font-size: 16px;
      color: #303133;
      cursor: pointer;
      text-decoration: none;
      position: relative;
      white-space:nowrap;
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
