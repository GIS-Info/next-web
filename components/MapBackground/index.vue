<template>
  <div>
    <svg v-once xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-1 -1 120 70" preserveAspectRatio="xMidYMid slice" class="svg">
      <g
        v-for="(line, xindex) in arr"
        :key="xindex"
        :transform="`translate(${xindex},0)`"
        class="map-col"
        :style="{ animationDelay: `${(xindex / arr.length) * duration}s` }"
      >
          <circle v-for="y in line" :key='`${xindex}-${y}`' cx="0" :cy="y" r="0.3" fill="currentColor" />
      </g>
    </svg>
  </div>
</template>

<script>
import json from './map.json'

const COLUMN_ANIMATION_DURATION = 4
const MAP_COLUMNS = Object.freeze(
  json.data.split(',').map((line) => {
    const parsedLine = []
    line.split('').forEach((v, index) => {
      if (v === '1') {
        parsedLine.push(index)
      }
    })
    return Object.freeze(parsedLine)
  })
)

export default {
  data() {
    return {
      arr: MAP_COLUMNS,
      duration: COLUMN_ANIMATION_DURATION,
    }
  },
}
</script>
<style scoped>
.svg{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: rgb(231, 231, 233);
  position: absolute;
  top: 0px;
  z-index: -1;
}

.map-col {
  color: #404144;
  animation: col-wave 4s linear infinite;
}

@keyframes col-wave {
  0%, 35%, 100% {
    color: #404144;
  }
  45% {
    color: #f7c800;
  }
  55% {
    color: #404144;
  }
}
</style>
