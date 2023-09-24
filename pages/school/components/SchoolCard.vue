<template>
  <el-card class="card" shadow="never">
    
    <div slot="header">
      <b :id="`school:${school?.U_Name_EN}`">{{ (lang == 'zh' ? school?.U_Name_CN : school?.U_Name_EN) || (school?.U_Name_CN || school?.U_Name_EN || '-') }}</b>
      <a v-if="lang == 'en' && school?.U_Lat && school?.U_Lon" :href="`https://maps.google.com/?q=${school?.U_Lat},${school?.U_Lon}`"><i class="el-icon-location-outline"></i></a>
    </div>
    {{ lang == 'zh' ? '城市: ' : 'City: ' }} {{ (lang == 'zh' ? school?.C_Name_CN : school?.U_City) || (school?.C_Name_CN || school?.U_City || '-') }}
    <br/>
    {{ lang == 'zh' ? '简称: ' : 'Abbreviation: ' }} <b>{{ school?.U_Abbr || '-' }}</b>
    <br/>
    {{ lang == 'zh' ? '部门: ' : 'Unit: ' }} {{ (lang == 'zh' ? school?.Unit_CN : school?.Unit_EN) || (school?.Unit_CN || school?.Unit_EN || '-') }}
    <br/>
    {{ 'URL: ' }} <a :href="school?.U_URL">{{ school?.U_URL || '-' }}</a>
    <br/>
    {{ lang == 'zh' ? '简介: ' : 'Description: ' }}
    <span v-html="(lang == 'zh' ? school?.Description_CN : school?.Description_EN) || (school?.Description_CN || school?.Description_EN || '-')"></span>
    <div v-if="people">
      <div v-for="p in Object.keys(people)" :key="p">
        <!-- 老师信息 -->
        <p>
            <a v-if="people[p]?.P_URL" :href="people[p]?.P_URL">{{ (lang == 'zh' ? people[p]?.P_Name_CN : people[p]?.P_Name_EN) || (people[p]?.P_Name_CN || people[p]?.P_Name_EN || '-') }}</a>
            <span v-else>{{ (lang == 'zh' ? people[p]?.P_Name_CN : people[p]?.P_Name_EN) || (people[p]?.P_Name_CN || people[p]?.P_Name_EN || '-') }}</span>
          {{ ': ' }}
          <el-tag v-if="people[p]?.P_Physical_Geography === '1'" size="small">{{ lang == 'zh' ? '自然地理' : 'Physical Geography' }}</el-tag>
          <el-tag v-if="people[p]?.P_Human_Geography === '1'" size="small">{{ lang == 'zh' ? '人文地理' : 'Human Geography' }}</el-tag>
          <el-tag v-if="people[p]?.P_Urban_Planning === '1'" size="small">{{ lang == 'zh' ? '规划' : 'Urban Planning' }}</el-tag>
          <el-tag v-if="people[p]?.P_GIS === '1'" size="small">GIS</el-tag>
          <el-tag v-if="people[p]?.P_RS === '1'" size="small">RS</el-tag>
          <el-tag v-if="people[p]?.P_GNSS === '1'" size="small">GNSS</el-tag>
          <el-tag v-for="t in splitInterests(people[p]?.P_Research_Interests)" :key="t" style="margin-right: 6px" size="small">{{ t }}</el-tag>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    school: {
      type: Object,
      default: () => ({}),
    },
    people: {
      type: Object,
      default: () => (null),
    },
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  methods: {
    splitInterests(interests) {
      if(!interests){
        return []
      }
      const str = interests.replaceAll('.',',').replaceAll(';',',')
      const arr = str.split(',').map((i)=>(i.trim())).filter((i)=>(i?.length>0 && i!== ' '))
      return arr;
    }
  },
};
</script>


<style scoped>
.card{
  margin-bottom: 30px;
}
</style>
