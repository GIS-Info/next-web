<template>
  <div>
    <el-container style="height:max-content; border: 1px solid #eee">
      <el-menu text-color="#000000" @open="handleOpen" @close="handleClose" @select="handSelect">
        <h2 class="tt" @click="$router.push('/school')">{{ lang == 'zh' ? '院校指南' : 'Institutions' }}</h2>
        <el-menu-item
          v-for="country in uniqueCountryNames"
          :key="country"
          :index="country"
          @click="selectedCountry = country">
          <template slot="title">
            <span>{{ country }}</span>
          </template>
        </el-menu-item>
      </el-menu>
      <el-container class="main">
        <el-main>
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="university in universities" :key="university.id" :name="university.id">
              <template #title>
                {{ (lang == 'zh' ? university.University_Name_CN : university.University_Name_EN) || university.University_Name_CN || university.University_Name_EN }}
              </template>
              <el-descriptions :column="1">
                <el-descriptions-item :label="lang == 'zh' ? '城市' : 'City'">{{ university.City }}</el-descriptions-item>
                <el-descriptions-item :label="lang == 'zh' ? '缩写' : 'Abbreviation'">{{ university.University_Abbr}}</el-descriptions-item>
                <el-descriptions-item :label="lang == 'zh' ? '部门' : 'Unit'">{{ (lang == 'zh' ? university.Unit_CN : university.Unit_EN) || university.Unit_CN || university.Unit_EN}}</el-descriptions-item>
                <el-descriptions-item label="URL"><a :href="university.URL">{{ university.URL }}</a></el-descriptions-item>
                <el-descriptions-item :label="lang == 'zh' ? '简介' : 'Description'">{{ (lang == 'zh' ? university.Description_CN : university.Description_EN) || university.Description_CN || university.Description_EN}}</el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>
          </el-collapse>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      universities: [],
      uniqueCountryNames: [],
      selectedCountry: null,
      activeNames: [],
    };
  },
  async fetch() {
    try {
      const continent = this.$route.params.continent;
      const continentMap = {
          'north-america': '北美洲',
          'asia': '亚洲',
          'europe': '欧洲',
          'south-america': '南美洲',
          'oceania': '大洋洲',
          'africa': '非洲',
      }
      const continentName = continentMap[continent]
      const continentRes = await this.$axios.get(`/api/uniInfo/get_continent_data/${continentName}`);
      console.log('continentRes', continentRes);
      this.universities = continentRes.data;
      this.activeNames = this.universities.map(university => university.id);
      const countryNames = continentRes.data.map(row => row.Country);
      this.uniqueCountryNames = [...new Set(countryNames)];
    } catch (error) {
      console.error(error);
      this.$router.push('/error');
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  watch: {
    selectedCountry() {
      this.fetchUniversities();
    },
  },
  created() {
    this.fetchUniversities();
  },
  serverMiddleware: ['~/middleware/proxy'],
  methods: {
    handleOpen(key, keyPath) {
        console.log("打开：", key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log("关闭：", key, keyPath);
    },
    handSelect(key, keyPath) {
        console.log("选择：", key, keyPath);
    },
    handleChange(activeNames) {
        console.log('Changed collapse items:', activeNames);
    },
    async fetchUniversities() {
      if (this.selectedCountry) {
        const countryRes = await this.$axios.get(`/api/uniInfo/get_country_data/${this.selectedCountry}`);
        this.universities = countryRes.data;
        this.activeNames = this.universities.map(university => university.id);
      }
    },
  },
};
</script>


<style scoped>
.el-menu {
    width: 15%;
    text-align: center;
}

.el-submenu {
    text-align: center;
    font-size: large;
}

.container {
    overflow: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

}

.main {
    width: 100%;
    height: 1000px;
    max-width: 1200px;
    padding: 40px 20px;
    box-sizing: border-box;
}

.tt:hover {
    color: rgb(30, 43, 61);
    background-color: rgb(228, 231, 235);
}

el-collapse-item:hover {
    color: rgb(113, 129, 149);
}
</style>
