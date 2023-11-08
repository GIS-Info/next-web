<template>
  <div id="staffMap" class="staffMap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  props: {
    staffs: {
      type: Object,
      required: true,
    },
  },
  watch: {
    staffs: {
      deep: true,
      handler(newStaffs) {
        if (this._data.map) {
          // 监测到 staffs 参数变化时重新加载图层

          this.RemoveLayers()
          //   console.log(this._data.map.getSource('staff'))
          //   console.log(newStaffs)
          this.LoadLayers(newStaffs)
          //   console.log(this._data.map.getSource('staff'))
        }
      },
      immediate: true, // 立即执行监听
    },
  },
  mounted() {
    this.InitialMap()
  },
  methods: {
    InitialMap() {
      mapboxgl.accessToken =
        'pk.eyJ1Ijoia2luZ3NsZXktZ2lzIiwiYSI6ImNrd25maWpoODAwNzcydnBhYmt4YWQzamoifQ.aeqP3iKHqZAQrQdakDJYDQ'
      const map = new mapboxgl.Map({
        container: 'staffMap',
        center: [10, 50],
        style: 'mapbox://styles/mapbox/dark-v9',
        zoom: 1,
      })
      this._data.map = map
      this.LoadLayers(this.staffs) // 初始化时加载图层
      this.SetPopup(map)
    },
    RemoveLayers() {
      if (this._data.map.getSource('staff')) {
        this._data.map.removeLayer('staff_location')
        this._data.map.removeSource('staff')
      }
    },
    LoadLayers(staffdata) {
      if (!this._data.map) return // 防止地图未初始化时执行

      this._data.map.on('load', () => {
        this._data.map.addSource('staff', {
          type: 'geojson',
          data: staffdata,
        })
        this._data.map.addLayer({
          id: 'staff_location',
          type: 'circle',
          source: 'staff',
          paint: {
            'circle-color': '#4264fb',
            'circle-radius': 6,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff',
          },
        })
      })
    },
    SetPopup(map) {
      // initial basic popup object

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      })

      //   event: mouseenter -> popup
      map.on('mouseenter', 'staff_location', (e) => {
        // extract user's information for display
        const coordinates = e.features[0].geometry.coordinates.slice()
        const name = e.features[0].properties.name
        // const img_src = e.features[0].properties.img
        // const school =
        map.getCanvas().style.cursor = 'pointer'
        popup.setLngLat(coordinates).setHTML(name).addTo(map)
      })

      //   event: mouseleave -> delete popup
      map.on('mouseleave', 'staff_location', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
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
