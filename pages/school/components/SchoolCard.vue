<template>
  <div>
    <h4 :id="`school:${school?.U_Name_EN}`">{{ (lang == 'zh' ? school?.U_Name_CN : school?.U_Name_EN) || (school?.U_Name_CN || school?.U_Name_EN || '-') }}</h4>
    {{ lang == 'zh' ? '城市: ' : 'City: ' }} {{ (lang == 'zh' ? school?.C_Name_CN : school?.U_City) || (school?.C_Name_CN || school?.U_City || '-') }}
    <br/>
    {{ lang == 'zh' ? '简称: ' : 'Abbreviation: ' }} {{ school?.U_Abbr || '-' }}
    <br/>
    {{ lang == 'zh' ? '部门: ' : 'Unit: ' }} {{ (lang == 'zh' ? school?.Unit_CN : school?.Unit_EN) || (school?.Unit_CN || school?.Unit_EN || '-') }}
    <br/>
    {{ 'URL: ' }} <a :href="school?.U_URL">{{ school?.U_URL || '-' }}</a>
    <br/>
    {{ lang == 'zh' ? '简介: ' : 'Description: ' }} {{ (lang == 'zh' ? school?.Description_CN : school?.Description_EN) || (school?.Description_CN || school?.Description_EN || '-') }}
    <div v-if="people">
      <div v-for="p in Object.keys(people)" :key="p">
        <p>
          <strong>{{ (lang == 'zh' ? people[p]?.P_Name_CN : people[p]?.P_Name_EN) || (people[p]?.P_Name_CN || people[p]?.P_Name_EN || '-') }}</strong>
        </p>
      </div>
    </div>
  </div>
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
  },
};
</script>


<style scoped>
</style>
