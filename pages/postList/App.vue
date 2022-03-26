<template>
  <div id="post">
    <pl></pl>
    <MonthPicker></MonthPicker>
    <!-- <test></test> -->
    <div id="post">

    </div>
  </div>
</template>

<script>
      
  
  import pl from "./postlist.vue";
  import MonthPicker from './MonthPicker.vue'
  import MonthPickerInput from './MonthPickerInput.vue'

  export default {
    name: 'post',
    components: {
      pl,
      MonthPicker,
      MonthPickerInput,
      

    }
  }
</script>

    <style>
      #post {
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
