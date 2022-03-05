<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="11 -1 100 90" preserveAspectRatio="xMidYMid slice" class="svg">
      <g v-for="(line, xindex) in arr" :key="xindex" :transform="`translate(${xindex},0)`">
          <circle v-for=" y in line" :key='`${xindex}-${y}`' cx="0" :cy="y" r="0.3" fill="#404144">
              <animate
                attributeName="fill"
                values="#404144;#404144;#404144;#606266;#404144;#404144;#404144;"
                dur="4s"
                :begin="`${(xindex/160)*4}s`"
                repeatCount="indefinite"
              />
          </circle>
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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #1f1f20;
  position: absolute;
  top: 0px;
  z-index: -1;
}
</style>