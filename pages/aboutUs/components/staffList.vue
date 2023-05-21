<template>
  <div class="list">
    <div v-for="person in staffs" :key="person.name" class="card">
      <a class="imgBox" :href="person.link">
        <!-- 如果没有头像则填充默认头像 -->
        <img :src="person.img || 'https://img1.imgtp.com/2023/05/21/huwS9y1u.png'" />
      </a>
      <a :href="person.link" class="name">{{ person.name }}</a>
      <a v-if="person.email" :href="`mailto:${ person.email }`" class="email">{{ person.email }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    staffs: {
      type: Array,
      required: true,
    }
  },
}
</script>
<style lang="less" scoped>
.list{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  .card{
    width: 160px;
    height: 180px;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .imgBox{
      width: 140px;
      height: 140px;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 120px;
        height: 120px;
        border-radius: 10px;
      }
    }
    .imgBox:hover{
      background: linear-gradient(141.27deg,#fcb891 -4.24%,#f784a1 21.25%,#f595fa 44.33%,#98e3f8 83.46%);
    }
    .imgBox:hover + .name{
      text-decoration: underline;
    }
    .name{
      cursor: pointer;
      color: #0073ff;
      text-decoration: none;
    }
    .name:hover{
      text-decoration: underline;
    }
    .email{
      font-size: 12px;
      cursor: pointer;
      color: #0073ff;
      text-decoration: none;
    }
    .email:hover{
      text-decoration: underline;
    }
  }
}
</style>