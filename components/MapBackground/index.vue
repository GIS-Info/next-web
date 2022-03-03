<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-1 -1 160 120" class="svg">
      <g v-for="(line, xindex) in arr" :key="xindex" :transform="`translate(${xindex},0)`">
          <circle v-for=" y in line" :key='`${xindex}-${y}`' cx="0" :cy="y" r="0.3" fill="white"/>
      </g>
    </svg>
  </div>
</template>

<script>
import json from './map.json'
export default {
  data() {
    return {
      arr: [[]],
    }
  },
  created(){
      this.arr = json.data.split(',').map(line=>{
        const nline = []
        line.split('').forEach((v,index) => {
          if(v === '1'){
            nline.push(index)
          }
        });
        return nline;
      });
  }
}
</script>
<style scoped>
.svg{
  width: 100%;
  height: 100%;
  background-color: #bbbbbb;
  position: absolute;
  top: 0px;
  z-index: -1;
}
</style>