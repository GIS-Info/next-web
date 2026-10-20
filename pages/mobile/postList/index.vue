<template>
  <client-only>
    <div v-loading="loading" class="page">
      <div class="search-bar">
        <el-input
          v-model="queryString"
          :placeholder="lang == 'zh' ? '输入关键词搜索...' : 'Search keywords...'"
          prefix-icon="el-icon-search"
          clearable
          @keyup.enter.native="handleTextChange"
          @clear="handleTextChange"
        />
        <el-button
          class="filter-toggle"
          :type="activeFilterCount > 0 ? 'primary' : 'default'"
          icon="el-icon-s-operation"
          @click="showFilters = !showFilters"
        >
          {{ filterButtonText }}
        </el-button>
      </div>

      <div v-show="showFilters" class="filter-panel">
        <div class="filter-item">
          <div class="label">{{ lang == 'zh' ? '地区' : 'Region' }}</div>
          <el-cascader
            v-model="region"
            :options="regionOptions"
            :props="cascaderProps"
            :placeholder="lang == 'zh' ? '选择大洲 / 国家' : 'Continent / Country'"
            clearable
            @change="handleRegionChange"
          />
        </div>
        <div class="filter-item">
          <div class="label">{{ lang == 'zh' ? '按月份' : 'Month' }}</div>
          <el-date-picker
            v-model="date"
            type="month"
            :editable="false"
            :placeholder="lang === 'zh' ? '选择月份' : 'Select Month'"
            value-format="yyyy-M"
            @change="handleDateChange"
          />
        </div>
        <div class="filter-item">
          <div class="label">{{ lang == 'zh' ? '专业领域' : 'Field' }}</div>
          <el-select
            v-model="label"
            :placeholder="lang == 'zh' ? '请选择领域' : 'Select Field'"
            clearable
            @change="handleLabelChange"
          >
            <el-option
              v-for="item in fieldOptions"
              :key="item.value"
              :label="lang == 'zh' ? item.labelZh : item.labelEn"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-button type="text" class="reset-btn" @click="resetQueryParams">
          {{ lang == 'zh' ? '重置全部筛选' : 'Reset all filters' }}
        </el-button>
      </div>

      <div v-if="filteredCount > 0" class="list-header">
        {{ lang == 'zh' ? '共找到' : 'Found' }} <b>{{ filteredCount }}</b>
        {{ lang == 'zh' ? '条资讯' : 'posts' }}
      </div>
      <div v-else-if="!loading" class="empty-tip">
        {{ lang == 'zh' ? '没有找到符合条件的资讯' : 'No posts found' }}
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
        <div class="post-desc">{{ post.description || '-' }}</div>
        <div class="post-meta">
          <span class="location">
            <i class="el-icon-location-outline"></i>
            {{ (lang == 'zh' ? post.country_cn : post.country_en) || '-' }}
          </span>
          <span class="date">{{ post.date || '-' }}</span>
        </div>
      </div>

      <div class="pagination-wrapper">
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="filteredCount"
          :page-size="pageSize"
          :pager-count="5"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import { REGIONS, COUNTRY_TO_CONTINENT, normalizeCountry } from '@/utils/regions'

// 与桌面端一致：一次性拉回后端过滤后的全量结果，地区筛选与分页都在前端做
const FETCH_ALL_SIZE = 9999

export default {
  name: 'MobilePostList',
  layout: 'mobile',
  data() {
    return {
      allPosts: [],
      currentPage: 1,
      pageSize: 8,

      queryString: '',
      date: '',
      label: '',
      region: [],
      showFilters: false,

      cascaderProps: { expandTrigger: 'click', checkStrictly: true },

      // 发送给后端的参数对象（关键词/月份/领域/type，不含地区）
      queryParams: {},
      loading: true,

      fieldOptions: [
        { value: 'gis', labelZh: '地理信息科学', labelEn: 'GIScience' },
        { value: 'rs', labelZh: '遥感', labelEn: 'Remote Sensing' },
        { value: 'physical_geo', labelZh: '自然地理学', labelEn: 'Physical Geography' },
        { value: 'human_geo', labelZh: '人文地理学', labelEn: 'Human Geography' },
        { value: 'urban', labelZh: '城市规划', labelEn: 'Urban Planning' },
        { value: 'gnss', labelZh: '卫星导航', labelEn: 'GNSS' },
      ],
    }
  },
  head() {
    return {
      title: 'GISphere | 资讯',
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),

    regionOptions() {
      return REGIONS.map((c) => ({
        value: c.value,
        label: this.lang === 'zh' ? c.zh : c.en,
        children: c.countries.map((country) => ({
          value: country.value,
          label: this.lang === 'zh' ? country.zh : country.en,
        })),
      }))
    },

    // 前端地区筛选：country_en 先做别名归一化，再按国家或大洲匹配
    regionFilteredPosts() {
      if (!this.region || this.region.length === 0) return this.allPosts
      const [continent, country] = this.region
      return this.allPosts.filter((p) => {
        const norm = normalizeCountry(p.country_en)
        return country ? norm === country : COUNTRY_TO_CONTINENT[norm] === continent
      })
    },

    filteredCount() {
      return this.regionFilteredPosts.length
    },

    pagedPosts() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.regionFilteredPosts.slice(start, start + this.pageSize)
    },

    activeFilterCount() {
      let n = 0
      if (this.region && this.region.length > 0) n++
      if (this.date) n++
      if (this.label) n++
      return n
    },

    filterButtonText() {
      const base = this.lang === 'zh' ? '筛选' : 'Filter'
      return this.activeFilterCount > 0 ? `${base} (${this.activeFilterCount})` : base
    },
  },
  async mounted() {
    // 读取缓存的搜索状态（与桌面端分开存，避免互相覆盖）
    const storedQueryParams = sessionStorage.getItem('mQueryParams')
    const storedRegion = sessionStorage.getItem('mPostListRegion')
    const storedPage = sessionStorage.getItem('mPostListPage')

    if (storedQueryParams) {
      this.queryParams = JSON.parse(storedQueryParams)
      this.queryString = this.queryParams.queryString || ''
      this.label = this.queryParams.label || ''
      if (this.queryParams.year && this.queryParams.month) {
        this.date = `${this.queryParams.year}-${this.queryParams.month}`
      }
    } else {
      // 首页按钮带过来的查询类型
      const urlType = this.$route.query?.type
      if (urlType) {
        this.$set(this.queryParams, 'type', urlType)
      }
    }
    if (storedRegion) this.region = JSON.parse(storedRegion)
    if (this.activeFilterCount > 0) this.showFilters = true

    await this.queryByParams(this.queryParams)

    if (storedPage) this.currentPage = parseInt(storedPage, 10) || 1
  },
  methods: {
    handleDateChange(val) {
      if (val) {
        const parts = val.split('-')
        if (parts.length === 2) {
          this.$set(this.queryParams, 'year', parts[0])
          this.$set(this.queryParams, 'month', parts[1])
        }
      } else {
        this.$delete(this.queryParams, 'year')
        this.$delete(this.queryParams, 'month')
      }
      this.queryByParams(this.queryParams)
    },

    async resetQueryParams() {
      this.queryString = ''
      this.date = ''
      this.label = ''
      this.region = []
      this.queryParams = {}

      sessionStorage.removeItem('mQueryParams')
      sessionStorage.removeItem('mPostListRegion')
      sessionStorage.removeItem('mPostListPage')

      await this.queryByParams(this.queryParams)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    handleTextChange() {
      this.$set(this.queryParams, 'queryString', this.queryString)
      this.queryByParams(this.queryParams)
    },

    handleLabelChange(val) {
      if (val) {
        this.$set(this.queryParams, 'label', val)
      } else {
        this.$delete(this.queryParams, 'label')
      }
      this.queryByParams(this.queryParams)
    },

    // 地区选择是纯前端筛选，回到第一页即可
    handleRegionChange() {
      this.currentPage = 1
      this.persistState()
    },

    handlePageChange(val) {
      this.currentPage = parseInt(val, 10)
      this.persistState()
      this.$nextTick(() => {
        window.scrollTo({ top: 0 })
      })
    },

    persistState() {
      sessionStorage.setItem('mQueryParams', JSON.stringify(this.queryParams))
      sessionStorage.setItem('mPostListRegion', JSON.stringify(this.region))
      sessionStorage.setItem('mPostListPage', String(this.currentPage))
    },

    queryByParams(params = {}) {
      this.loading = true
      const payload = { ...params, pageIndex: 1, pageSize: FETCH_ALL_SIZE }

      return this.$axios
        .post('api/post_by_params', payload)
        .then((res) => {
          if (res?.data?.code === 0) {
            this.allPosts = res.data.data.map((i) => {
              const l = { ...i }
              l.description = (l.description || '')
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
              return l
            })
            this.currentPage = 1
            this.persistState()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },

    goPost(id) {
      this.persistState()
      this.$router.push('/mobile/post/' + id.toString())
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100%;
  background: #f5f7fa;
  padding: 12px 12px 24px;
  box-sizing: border-box;
}

.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.search-bar .el-input {
  flex: 1;
}
.filter-toggle {
  flex-shrink: 0;
  padding-left: 12px;
  padding-right: 12px;
}

.filter-panel {
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}
.filter-item {
  margin-bottom: 14px;
}
.filter-item .label {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 6px;
}
.filter-item .el-cascader,
.filter-item .el-date-editor,
.filter-item .el-select {
  width: 100%;
}
.reset-btn {
  padding: 0;
  color: #909399;
}

.list-header {
  margin: 4px 2px 10px;
  color: #606266;
  font-size: 13px;
}
.empty-tip {
  text-align: center;
  color: #909399;
  padding: 48px 0;
  font-size: 14px;
}

.post-card {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #ebeef5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  cursor: pointer;
}
.post-card:active {
  background: #fafafa;
}

.post-title {
  font-size: 16px;
  font-weight: 700;
  color: #303133;
  line-height: 1.4;
  margin-bottom: 8px;
  overflow-wrap: break-word;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.post-desc {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 10px;
  overflow-wrap: break-word;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #909399;
}
.location i {
  margin-right: 3px;
  color: #53389e;
}

.pagination-wrapper {
  padding: 16px 0 8px;
  display: flex;
  justify-content: center;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #53389e;
}
</style>
