<template>
  <div>
    <h3>测试预渲染请求</h3>
    <p>请求结果： {{ preData }}</p>
    <h3>测试异步get请求</h3>
    <button @click="get">请求</button>
    <h3>测试异步post请求</h3>
    <button @click="post">请求</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  async asyncData({ $axios }) {
    const preData = await $axios.$get('/api/post/1')
    return { preData }
  },
  data() {

  },
  methods: {
    get() {
      this.$axios.get('/api/post/1')
      .then((res)=>{
        alert('成功');
        // eslint-disable-next-line no-console
        console.log(res);
      }).catch((e)=>{
        alert(e);
      })
    },
    post() {
      const req = {
        'job': 'test'
      }
      this.$axios.post('/api/manage/post',req)
        .then((res)=>{
          alert('成功');
          // eslint-disable-next-line no-console
          console.log(res);
        })
        .catch((e)=>{
          alert(e);
        })
    },
  }

}
</script>

<style>

</style>