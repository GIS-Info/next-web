<template>
  <div id="app">
    <post></post>
    <MonthPicker></MonthPicker>
    <!-- <test></test> -->
    <div id="app">

    </div>
  </div>
</template>

<script>
      
  
  import post from "./post.vue";
  import MonthPicker from './MonthPicker.vue'
  import MonthPickerInput from './MonthPickerInput.vue'

  export default {
    name: 'App',
    components: {
      post,
      MonthPicker,
      MonthPickerInput,
      

    }
  }
</script>

    <style>
      #app {
        font-family: 'Inter', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        width: 100%;
        height: 100%;
      }
    </style>
