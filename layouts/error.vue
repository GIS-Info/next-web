<template>
  <div class="background">

    <section class="error-container">
      <span>4</span>
      <span><span class="screen-reader-text">0</span></span>
      <span>4</span>
    </section>
    <div class="desc">Oops! Lost in Space</div>
    <button class="home" @click="goHome">Go Back Home</button>

  </div>
 
</template>

<script>
  import { mapState } from 'vuex';
  import { isMobile } from '@/utils/index'

  export default {
    name: 'IndexList',
 

    computed: {
      ...mapState({ lang: 'language' }),
    },
    mounted() {
      if (isMobile()) {
        this.$router.push('/mobile' + this.$router.currentRoute.path);
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      }, 
    }
  }
</script>

<style scoped>
  /*the 404 design is adapted from Ricardo Prieto's design, check https://codepen.io/ricardpriet/pen/zPqyvY for more details*/
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700');
  @import url('https://fonts.googleapis.com/css?family=Catamaran:400,800');
    .background {
    background-color: #303133;
    height:100%;
  
  }
    .desc {
    font-family: 'Catamaran', sans-serif;
    font-size: 50px;
    text-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;
    color: #fefefe;
    position: absolute;
    left: 39%;
    
  }
    .error-container {
    text-align: center;
    font-size: 180px;
    font-family: 'Catamaran', sans-serif;
    font-weight: 800;
    padding-top:5%;
  }

    .error-container > span {
      display: inline-block;
      line-height: 0.7;
      position: relative;
      color: #FFB485;
      
    }

    .error-container > span {
      display: inline-block;
      position: relative;
      vertical-align: middle;
    }

    .error-container > span:nth-of-type(1) {
        color: #D1F2A5;
        animation: colordancing 4s infinite;
      }

    .error-container > span:nth-of-type(3) {
        color: #F56991;
        animation: colordancing2 4s infinite;
      }

    .error-container > span:nth-of-type(2) {
        width: 120px;
        height: 120px;
        border-radius: 999px;
      }

    .error-container > span:nth-of-type(2):before,
    .error-container > span:nth-of-type(2):after {
          border-radius: 0%;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: inherit;
          height: inherit;
          border-radius: 999px;
          box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4), inset 0 30px 0 rgba(239, 250, 180, 0.4), inset -30px 0 0 rgba(255, 196, 140, 0.4), inset 0 -30px 0 rgba(245, 105, 145, 0.4);
          animation: shadowsdancing 4s infinite;
        }

    .error-container > span:nth-of-type(2):before {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          transform: rotate(45deg);
        }



  @keyframes shadowsdancing {
    0% {
      box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4), inset 0 30px 0 rgba(239, 250, 180, 0.4), inset -30px 0 0 rgba(255, 196, 140, 0.4), inset 0 -30px 0 rgba(245, 105, 145, 0.4);
    }

    25% {
      box-shadow: inset 30px 0 0 rgba(245, 105, 145, 0.4), inset 0 30px 0 rgba(209, 242, 165, 0.4), inset -30px 0 0 rgba(239, 250, 180, 0.4), inset 0 -30px 0 rgba(255, 196, 140, 0.4);
    }

    50% {
      box-shadow: inset 30px 0 0 rgba(255, 196, 140, 0.4), inset 0 30px 0 rgba(245, 105, 145, 0.4), inset -30px 0 0 rgba(209, 242, 165, 0.4), inset 0 -30px 0 rgba(239, 250, 180, 0.4);
    }

    75% {
      box-shadow: inset 30px 0 0 rgba(239, 250, 180, 0.4), inset 0 30px 0 rgba(255, 196, 140, 0.4), inset -30px 0 0 rgba(245, 105, 145, 0.4), inset 0 -30px 0 rgba(209, 242, 165, 0.4);
    }

    100% {
      box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4), inset 0 30px 0 rgba(239, 250, 180, 0.4), inset -30px 0 0 rgba(255, 196, 140, 0.4), inset 0 -30px 0 rgba(245, 105, 145, 0.4);
    }
  }

  @keyframes colordancing {
    0% {
      color: #D1F2A5;
    }

    25% {
      color: #F56991;
    }

    50% {
      color: #FFC48C;
    }

    75% {
      color: #EFFAB4;
    }

    100% {
      color: #D1F2A5;
    }
  }

  @keyframes colordancing2 {
    0% {
      color: #FFC48C;
    }

    25% {
      color: #EFFAB4;
    }

    50% {
      color: #D1F2A5;
    }

    75% {
      color: #F56991;
    }

    100% {
      color: #FFC48C;
    }
  }


  .home {
    width: 8%;
    height: 30px;
    border-radius: 15px;
    background-color: #F2F6FC;
    border-color: #7CE3B3;
    box-shadow: 0px 0 15px #7CE3B3;
    /* Position */
    position: absolute;
    left:46%;
    top: 60%;
    font-size:15px;
    cursor:pointer;
  }
    .home:hover {
      font-size: 17px;
    }
  
</style>
