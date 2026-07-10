<template>
  <client-only>
    <el-main ref="mainScroll" v-loading="loading" class="main-container">
      <div class="content-wrapper">
        
        <div class="left-column">
          <div class="list-header" v-if="filteredCount > 0">
            <span>{{ lang == 'zh' ? '共找到' : 'Found' }} <b>{{ filteredCount }}</b> {{ lang == 'zh' ? '条资讯' : 'posts' }}</span>
          </div>

          <div
            v-for="post in pagedPosts"
            :key="post.event_id"
            class="post-card"
            @click="goPost(post.event_id)"
          >
            <div class="post-title">
              {{ (lang == 'zh' ? post.title_cn : post.title_en) || '-' }}
            </div>
            <div class="post-desc">{{ post?.description || '-' }}</div>
            <div class="post-meta">
              <span class="location">
                <i class="el-icon-location-outline"></i>
                {{ (lang == 'zh' ? post.country_cn : post.country_en) || '-' }}
              </span>
              <span class="date">
                {{ lang == 'zh' ? '发布于' : 'Published' }}
                <b>{{ post.date || 'N/A' }}</b>
              </span>
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="currentPage"
              :total="filteredCount"
              :page-size="pageSize"
              @current-change="handlePageChange"
            >
            </el-pagination>
          </div>
        </div>

        <div class="right-column">
          <div class="filter-card">
            <div class="filter-header">
              <h3>{{ lang == 'zh' ? '搜索与筛选' : 'Search & Filter' }}</h3>
              <el-button 
                type="text" 
                class="reset-btn" 
                @click="resetQueryParams"
              >
                {{ lang == 'zh' ? '重置' : 'Reset' }}
              </el-button>
            </div>

            <div class="filter-item">
              <div class="label">{{ lang == 'zh' ? '关键词' : 'Keywords' }}</div>
              <el-input
                v-model="queryString"
                :placeholder="lang == 'zh' ? '输入关键词回车搜索...' : 'Type & Enter...'"
                prefix-icon="el-icon-search"
                clearable
                @keyup.enter.native="handleTextChange"
                @clear="handleTextChange"
              >
              </el-input>
            </div>

            <div class="filter-item">
              <div class="label">{{ lang == 'zh' ? '地区' : 'Region' }}</div>
              <el-cascader
                v-model="region"
                :options="regionOptions"
                :props="cascaderProps"
                :placeholder="lang == 'zh' ? '选择大洲 / 国家' : 'Continent / Country'"
                style="width: 100%"
                clearable
                @change="handleRegionChange"
              >
              </el-cascader>
            </div>

            <div class="filter-item">
              <div class="label">{{ lang == 'zh' ? '按月份' : 'Month' }}</div>
              <el-date-picker
                v-model="date"
                type="month"
                :editable="false"
                :placeholder="lang === 'zh' ? '选择月份' : 'Select Month'"
                value-format="yyyy-M"
                style="width: 100%"
                @change="handleDateChange"
              >
              </el-date-picker>
            </div>

            <div class="filter-item">
              <div class="label">{{ lang == 'zh' ? '专业领域' : 'Field' }}</div>
              <el-select 
                v-model="label" 
                :placeholder="lang == 'zh' ? '请选择领域' : 'Select Field'" 
                style="width: 100%"
                clearable
                @change="handleLabelChange"
              >
                <el-option
                  v-for="item in fieldOptions"
                  :key="item.value"
                  :label="lang == 'zh' ? item.labelZh : item.labelEn"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            
          </div>
        </div>

      </div>
    </el-main>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import { REGIONS, COUNTRY_TO_CONTINENT, normalizeCountry } from '@/utils/regions'

// 一次性把匹配的帖子全量拉回，地区筛选与分页都在前端做，
// 因此地区筛选不依赖后端支持任何地区参数
const FETCH_ALL_SIZE = 9999

export default {
    name: 'PostList',
    data() {
        return {
            allPosts: [],       // 后端按 关键词/月份/领域 过滤后的全量结果
            currentPage: 1,     // 前端分页页码
            pageSize: 3,

            // 筛选相关绑定值
            queryString: '',
            date: '', // 绑定日期选择器
            label: '', // 绑定下拉框
            region: [], // 绑定地区级联选择器 [] / [大洲] / [大洲, 国家]

            // 级联选择器配置：checkStrictly 允许只选到大洲这一级
            cascaderProps: { expandTrigger: 'hover', checkStrictly: true },

            // 发送给后端的参数对象（仅 关键词/月份/领域/type，不含地区）
            queryParams: {},
            loading: true,

            // 领域选项配置
            fieldOptions: [
                { value: 'gis', labelZh: '地理信息科学', labelEn: 'GIScience' },
                { value: 'rs', labelZh: '遥感', labelEn: 'Remote Sensing' },
                { value: 'physical_geo', labelZh: '自然地理学', labelEn: 'Physical Geography' },
                { value: 'human_geo', labelZh: '人文地理学', labelEn: 'Human Geography' },
                { value: 'urban', labelZh: '城市规划', labelEn: 'Urban Planning' },
                { value: 'gnss', labelZh: '卫星导航', labelEn: 'GNSS' }
            ]
        };
    },
    head() {
        return {
            title: 'GISphere | 资讯',
        };
    },
    computed: {
        ...mapState({ lang: 'language' }),

        // 按当前语言生成级联选项（value 始终为英文，label 随语言切换）
        regionOptions() {
            return REGIONS.map((c) => ({
                value: c.value,
                label: this.lang == 'zh' ? c.zh : c.en,
                children: c.countries.map((country) => ({
                    value: country.value,
                    label: this.lang == 'zh' ? country.zh : country.en,
                })),
            }));
        },

        // 前端地区筛选：country_en 先做别名归一化，再按国家或大洲匹配
        regionFilteredPosts() {
            if (!this.region || this.region.length === 0) return this.allPosts;
            const [continent, country] = this.region;
            return this.allPosts.filter((p) => {
                const norm = normalizeCountry(p.country_en);
                return country ? norm === country : COUNTRY_TO_CONTINENT[norm] === continent;
            });
        },

        filteredCount() {
            return this.regionFilteredPosts.length;
        },

        // 前端分页
        pagedPosts() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.regionFilteredPosts.slice(start, start + this.pageSize);
        },
    },
    async mounted() {
        // 读取缓存的搜索状态
        const storedQueryParams = sessionStorage.getItem('queryParams');
        const storedRegion = sessionStorage.getItem('postListRegion');
        const storedPage = sessionStorage.getItem('postListPage');

        if (storedQueryParams) {
            this.queryParams = JSON.parse(storedQueryParams);
            // 回显前端控件的状态 (让输入框里有值)
            this.queryString = this.queryParams.queryString || '';
            this.label = this.queryParams.label || '';
            if (this.queryParams.year && this.queryParams.month) {
                this.date = `${this.queryParams.year}-${this.queryParams.month}`;
            }
        } else {
            // 处理 URL 参数
            const urlType = this.$route.query?.type;
            if (urlType) {
                this.$set(this.queryParams, 'type', urlType); // 假设后端支持 type
            }
        }
        // 回显地区级联控件
        if (storedRegion) this.region = JSON.parse(storedRegion);

        await this.queryByParams(this.queryParams);

        // 回显分页（放在拉取之后，避免被 queryByParams 重置）
        if (storedPage) this.currentPage = parseInt(storedPage, 10) || 1;
    },
    methods: {

        handleDateChange(val) {
            if (val) {
                const parts = val.split('-');
                if (parts.length === 2) {
                    this.$set(this.queryParams, 'year', parts[0]);
                    this.$set(this.queryParams, 'month', parts[1]);
                }
            } else {
                // 如果点击了清除按钮 (val 为 null)
                this.$delete(this.queryParams, 'year');
                this.$delete(this.queryParams, 'month');
            }
            this.queryByParams(this.queryParams);
        },

        async resetQueryParams() {
            // 1. 清空前端控件
            this.queryString = '';
            this.date = '';
            this.label = '';
            this.region = [];

            // 2. 清空查询参数
            this.queryParams = {};

            // 3. 清除 SessionStorage
            sessionStorage.removeItem('queryParams');
            sessionStorage.removeItem('postListRegion');
            sessionStorage.removeItem('postListPage');

            // 4. 重新请求
            await this.queryByParams(this.queryParams);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        // 关键词搜索（服务端）
        handleTextChange() {
            // Element UI 的 clear 事件也会触发，所以要处理空字符串
            this.$set(this.queryParams, 'queryString', this.queryString);
            this.queryByParams(this.queryParams);
        },

        // 领域选择（服务端）
        handleLabelChange(val) {
            if (val) {
                this.$set(this.queryParams, 'label', val);
            } else {
                this.$delete(this.queryParams, 'label');
            }
            this.queryByParams(this.queryParams);
        },

        // 地区选择：纯前端，改变绑定值即可（computed 自动重算），只需回到第一页
        handleRegionChange() {
            this.currentPage = 1;
            this.persistState();
        },

        // 前端翻页
        handlePageChange(val) {
            this.currentPage = parseInt(val, 10);
            this.persistState();
            this.$nextTick(() => {
                const elMain = document.querySelector('.el-main');
                if (elMain) elMain.scrollTop = 0;
                window.scrollTo(0, 0);
            });
        },

        persistState() {
            sessionStorage.setItem('queryParams', JSON.stringify(this.queryParams));
            sessionStorage.setItem('postListRegion', JSON.stringify(this.region));
            sessionStorage.setItem('postListPage', String(this.currentPage));
        },

        // 请求接口（后端仅按 关键词/月份/领域/type 过滤，一次取回全部）
        queryByParams(params = {}) {
            this.loading = true;
            const payload = { ...params, pageIndex: 1, pageSize: FETCH_ALL_SIZE };
            // 地区不走后端
            delete payload.continent;
            delete payload.country_en;

            return this.$axios.post('api/post_by_params', payload)
                .then(res => {
                    if (res?.data?.code === 0) {
                        this.allPosts = res.data.data.map((i) => {
                            const l = { ...i };
                            // 简单的去除 HTML 标签正则
                            l.description = (l.description || '')
                                .replace(/<\/?[^>]+(>|$)/g, '')
                                .replace(/&nbsp;/g, ' ')
                                .replace(/\s+/g, ' ')
                                .trim();
                            return l;
                        });
                        this.currentPage = 1;
                        this.persistState();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        goPost(id) {
            this.persistState();
            this.$router.push('/post/' + id.toString());
        },
    },
}
</script>

<style scoped>
.main-container {
  background-color: #f5f7fa; 
  min-height: 80vh;
  padding: 40px 20px; 
  display: flex;
  justify-content: center;
}

.content-wrapper {
  display: flex;
  width: 100%;
  max-width: 1250px; 
  gap: 30px; 
  position: relative;
}

/* --- 左侧栏 --- */
.left-column {
  flex: 1; 
  min-width: 0; 
  display: flex;
  flex-direction: column;
  min-height: 820px;
}

.list-header {
  margin-bottom: 15px;
  color: #606266;
  font-size: 14px;
}

.post-card {
  background: #fff;
  border-radius: 12px;
  padding: 30px; 
  margin-bottom: 20px;
  cursor: pointer;
  border: 1px solid #ebeef5;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.02); 
  height: 220px; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(83, 56, 158, 0.15); 
  border-color: #dcdfe6;
}

.post-title {
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 12px;
  line-height: 1.4;
  overflow-wrap: break-word;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; 
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-desc {
  font-size: 15px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 16px;
  overflow-wrap: break-word;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1; 
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #909399;
  margin-top: auto; 
}

.location i {
  margin-right: 4px;
  color: #53389e;
}

.pagination-wrapper {
  margin-top: -20px; 
  padding: 20px 0;
  display: flex;
  justify-content: center;
}
/* --- 右侧栏 (筛选) --- */
.right-column {
  width: 300px; /* 固定宽度 */
  flex-shrink: 0;
}

.filter-card {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  position: sticky;
  top: 31px; 
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
}

.filter-header h3 {
  margin: 0;
  font-size: 16px;
  color: #303133;
  font-weight: 700;
}

.reset-btn {
  padding: 0;
  color: #909399;
}
.reset-btn:hover {
  color: #53389e;
}

.filter-item {
  margin-bottom: 24px;
}

.filter-item .label {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

::v-deep .el-input__inner {
  height: 50px;         
  line-height: 50px;    
  font-size: 16px;      
  border-radius: 8px;   
}

::v-deep .el-input__inner:focus {
  border-color: #53389e;
}

::v-deep .el-input__icon {
  line-height: 50px;    
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #53389e;
}

</style>