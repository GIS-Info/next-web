<template>
    <div>
        <el-container style="height:max-content; border: 1px solid #eee">
            <el-menu text-color="#000000" @open="handleOpen" @close="handleClose" @select="handSelect">
                <h2 class="tt" @click="$router.push('/uniInfo')">院校指南</h2>

                <el-submenu v-for="(cities, country) in groupedUniversities" :key="country" :index="country">
                    <template slot="title">
                        <span>{{ country }}</span>
                    </template>

                    <el-menu-item v-for="(universities, city) in cities" :key="city" :index="city" @click.native="selectedCity = city">
                        <template slot="title">
                            <span>{{ city }}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>

            <nuxt-child> </nuxt-child>

            <el-container class="main">

                <el-main>
                    <el-collapse @change="handleChange" v-for="university in filteredUniversities" :key="university.id">
                        <el-collapse-item :title="university.University_Name_CN">
                            <el-descriptions :column="1">
                                <el-descriptions-item label="Country">{{ university.Country }}</el-descriptions-item>
                                <el-descriptions-item label="Abbreviation">{{
                                    university.University_Abbr }}</el-descriptions-item>
                                <el-descriptions-item label="Description">{{
                                    university.Description_CN }}</el-descriptions-item>
                                <el-descriptions-item label="Unit">{{ university.Unit_CN }}</el-descriptions-item>
                                <el-descriptions-item label="URL">{{ university.URL }}</el-descriptions-item>
                            </el-descriptions>
                        </el-collapse-item>
                    </el-collapse>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
    
   
           

<script>
export default {

    async fetch() {
        try {
            const universitiesRes = await this.$axios.get('/api/post/universities/');
            const citiesRes = await this.$axios.get('/api/post/cities/');
            const countriesRes = await this.$axios.get('/api/post/countries/');
            const cities = citiesRes.data;
            const countries = countriesRes.data;
            this.universities = universitiesRes.data.map(university => {
                const city = cities.find(c => c.City_Name_EN === university.City);
                const country = city? countries.find(c => c.Country_Name_CN === city.Country) : null;
                return {
                    ...university,
                    Country: city ? city.Country : '',
                    Continent: country ? country.Continent : '',
                }
            });
        } catch (error) {
            console.error(error);
            this.$router.push('/error');
        }
    },

    data() {
        return {
            universities: [],
            selectedCity: null,
        };
    },

    created() {
        console.log(this.universities);
    },


    computed: {
        groupedUniversities() {
            const groups = {};
            this.universities.filter(university => university.Continent === '亚洲').forEach(university => {
                if (!groups[university.Country]) {
                    groups[university.Country] = {};
                }
                if (!groups[university.Country][university.City]) {
                    groups[university.Country][university.City] = [];
                }
                // console.log("OK");
                groups[university.Country][university.City].push(university);

            });
            return groups;

        },
        filteredUniversities() {
            if (!this.selectedCity) {
            return [];
            }
            return this.universities.filter(
                university => university.City === this.selectedCity && university.Continent === '亚洲'
            );
        },
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
    },
    name: "Aside",
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