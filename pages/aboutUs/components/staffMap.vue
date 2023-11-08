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
        if (this.staffmap) {
          // 监测到 staffs 参数变化时重新加载图层
          this.ResetLayers(newStaffs)
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
        zoom: 1.2,
      })
      this.staffmap = map
      this.InitLayers(this.staffs) // 初始化时加载图层
      this.SetPopup(map)
    },
    InitLayers(staffdata) {
      // initial layers: after map loaded

      this.staffmap.on('load', () => {
        this.staffmap.addSource('staff', {
          type: 'geojson',
          data: staffdata,
        })
        this.staffmap.addLayer({
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
      // Pop up when hover.

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      })

      //   event: mouseenter -> popup
      map.on('mouseenter', 'staff_location', (e) => {
        // extract user's information for display
        const coordinates = e.features[0].geometry.coordinates.slice()
        const name = e.features[0].properties.name
        map.getCanvas().style.cursor = 'pointer'
        popup.setLngLat(coordinates).setHTML(name).addTo(map)
      })

      //   event: mouseleave -> delete popup
      map.on('mouseleave', 'staff_location', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
      })
    },
    ResetLayers(staffdata) {
      // remove origin layers
      if (this.staffmap.getSource('staff')) {
        this.staffmap.removeLayer('staff_location')
        this.staffmap.removeSource('staff')
      }
      // new layer
      this.staffmap.addSource('staff', {
        type: 'geojson',
        data: staffdata,
      })
      this.staffmap.addLayer({
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
    },
  },
}
</script>

<style lang="less" scoped>
.staffMap {
  height: 70%; // 使用 100% 高度以填充整个父容器
  width: 100%;
}
</style>
