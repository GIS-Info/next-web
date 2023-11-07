<template>
  <div id="staffMap" class="staffMap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import staffGeoInfo from '../gisphere_subset.json'
export default {
  mounted() {
    this.InitialMap()
    this.LoadLayers(staffGeoInfo)
  },
  methods: {
    InitialMap() {
      // 初始化 Mapbox 地图
      mapboxgl.accessToken =
        'pk.eyJ1Ijoia2luZ3NsZXktZ2lzIiwiYSI6ImNrd25maWpoODAwNzcydnBhYmt4YWQzamoifQ.aeqP3iKHqZAQrQdakDJYDQ'
      const map = new mapboxgl.Map({
        container: 'staffMap',

        center: [10, 50],
        // dark style
        style: 'mapbox://styles/mapbox/dark-v9',
        zoom: 1,
      })
      this._data.map = map
    },
    LoadLayers(staffdata) {
      this._data.map.on('load', function () {
        // console.log(this)
        this.addSource('staff', {
          type: 'geojson',
          data: staffdata,
        })
        this.addLayer({
          id: 'staff_location',
          type: 'circle',
          source: 'staff',
          paint: {
            'circle-color': '#4264fb',
            'circle-radius': 6,
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.staffMap {
  height: 100%; // 使用 100% 高度以填充整个父容器
  width: 100%;
}
</style>
