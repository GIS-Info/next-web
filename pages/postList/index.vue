<template>
  <client-only>
    <main v-loading="loading" class="post-list-container">
      <!-- 错误提示 -->
      <div v-if="errorMsg" class="error-banner">
        {{ errorMsg }}
        <button @click="errorMsg = ''">×</button>
      </div>

      <!-- List Section -->
      <section class="content-area">
        <div v-if="postListData.length === 0 && !loading" class="empty-state">
          <p>{{ lang === 'zh' ? '暂无数据' : 'No data available' }}</p>
          <button @click="resetQueryParams" class="text-btn">
            {{ lang === 'zh' ? '重置筛选' : 'Reset filters' }}
          </button>
        </div>

        <div v-else class="posts-wrapper">
          <article
            v-for="post in postListData"
            :key="post.event_id"
            class="post-card"
            @click="goPost(post.event_id)"
          >
            <h2 class="post-title">{{ displayTitle(post) }}</h2>
            <p class="post-description">{{ cleanDescription(post.description) }}</p>
            <div class="post-meta">
              <span class="meta-country">
                <strong>{{ displayCountry(post) }}</strong>
              </span>
              <time class="meta-date">
                {{ lang === 'zh' ? '发布于' : 'Published on' }}
                <strong>{{ post.date || (lang === 'zh' ? '未知时间' : 'Unknown') }}</strong>
              </time>
            </div>
          </article>
        </div>

        <el-pagination
          v-if="totalCount > pageSize"
          background
          layout="prev, pager, next"
          :current-page="queryParams.pageIndex"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="handlePageChange"
          class="pagination"
        />
      </section>

      <!-- Filter Sidebar -->
      <aside class="filter-sidebar">
        <button 
          class="filter-btn reset-btn" 
          @click="resetQueryParams"
          :disabled="!hasActiveFilters"
        >
          {{ lang === 'zh' ? '重置搜索条件' : 'Reset search criteria' }}
        </button>

        <!-- Content Search -->
        <div class="filter-block">
          <h3 class="filter-title">{{ lang === 'zh' ? '按内容搜索' : 'Search By Content' }}</h3>
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              :placeholder="lang === 'zh' ? '输入关键词...' : 'Enter keywords...'"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" @click="handleSearch">
              <svg class="search-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Date Filter -->
        <div class="filter-block">
          <h3 class="filter-title">{{ lang === 'zh' ? '按截止时间搜索' : 'Search by Deadline' }}</h3>
          <div class="by-date">
            <el-date-picker
              v-model="selectedDate"
              type="month"
              :editable="false"
              :placeholder="lang === 'zh' ? '选择月' : 'Select Month'"
              value-format="yyyy-MM"
              @change="handleDateChange"
              style="width: 100%"
            />
          </div>
        </div>

        <!-- Field Filter -->
        <div class="filter-block">
          <h3 class="filter-title">{{ lang === 'zh' ? '按专业领域搜索' : 'Search by Field' }}</h3>
          <div class="field-tags">
            <button
              v-for="field in fields"
              :key="field.key"
              class="field-btn"
              :class="{ active: queryParams.label === field.key }"
              @click="handleLabelChange(field.key)"
            >
              {{ lang === 'zh' ? field.labelZh : field.labelEn }}
            </button>
          </div>
        </div>
      </aside>
    </main>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'

// 简单的防抖函数（不依赖 lodash）
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export default {
  name: 'PostList',
  
  data() {
    return {
      postListData: [],
      pageSize: 7,
      totalCount: 0,
      loading: false,
      errorMsg: '',
      
      queryParams: {
        pageIndex: 1,
        queryString: '',
        year: '',
        month: '',
        label: ''
      },
      
      searchQuery: '',
      selectedDate: '',
      
      fields: [
        { key: 'gis', labelZh: '地理信息科学', labelEn: 'GIScience' },
        { key: 'rs', labelZh: '遥感', labelEn: 'Remote Sensing' },
        { key: 'physical_geo', labelZh: '自然地理学', labelEn: 'Physical Geography' },
        { key: 'human_geo', labelZh: '人文地理学', labelEn: 'Human Geography' },
        { key: 'urban', labelZh: '城市规划', labelEn: 'Urban Planning' },
        { key: 'gnss', labelZh: '卫星导航', labelEn: 'GNSS' }
      ]
    }
  },

  computed: {
    ...mapState({ lang: 'language' }),
    
    hasActiveFilters() {
      return this.queryParams.queryString || 
             this.queryParams.label || 
             this.queryParams.year
    }
  },

  mounted() {
    console.log('PostList component mounted')
    this.initializeData()
  },

  methods: {
    // 初始化数据（从 sessionStorage 或 URL）
    initializeData() {
      try {
        const stored = sessionStorage.getItem('queryParams')
        if (stored) {
          const parsed = JSON.parse(stored)
          this.queryParams = { ...this.queryParams, ...parsed }
          this.searchQuery = this.queryParams.queryString || ''
          if (this.queryParams.year && this.queryParams.month) {
            this.selectedDate = `${this.queryParams.year}-${this.queryParams.month}`
          }
        } else if (this.$route.query?.type) {
          this.queryParams.type = this.$route.query.type
        }
      } catch (e) {
        console.error('Restore state error:', e)
      }
      
      // 初始加载
      this.fetchData()
    },

    // 保存状态
    saveState() {
      try {
        sessionStorage.setItem('queryParams', JSON.stringify(this.queryParams))
      } catch (e) {
        console.error('Save state error:', e)
      }
    },

    // 获取数据
    async fetchData() {
      this.loading = true
      this.errorMsg = ''
      
      try {
        console.log('Fetching with params:', this.queryParams)
        const res = await this.$axios.post('/api/post_by_params', this.queryParams)
        
        if (res?.data?.code === 0) {
          this.postListData = res.data.data.map(item => ({
            ...item,
            description: this.cleanDescription(item.description)
          }))
          this.totalCount = res.data.count
          this.saveState()
        } else {
          this.errorMsg = res?.data?.msg || 'Request failed'
        }
      } catch (error) {
        console.error('Fetch error:', error)
        this.errorMsg = error.message || 'Network error'
      } finally {
        this.loading = false
      }
    },

    // 防抖搜索
    handleSearch: debounce(function() {
      this.queryParams.queryString = this.searchQuery
      this.queryParams.pageIndex = 1
      this.fetchData()
    }, 300),

    handleDateChange(date) {
      if (date) {
        const [year, month] = date.split('-')
        this.queryParams.year = year
        this.queryParams.month = month
      } else {
        this.queryParams.year = ''
        this.queryParams.month = ''
      }
      this.queryParams.pageIndex = 1
      this.fetchData()
    },

    handleLabelChange(label) {
      // 切换选择
      this.queryParams.label = this.queryParams.label === label ? '' : label
      this.queryParams.pageIndex = 1
      this.fetchData()
    },

    handlePageChange(page) {
      this.queryParams.pageIndex = page
      this.fetchData()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    resetQueryParams() {
      this.queryParams = {
        pageIndex: 1,
        queryString: '',
        year: '',
        month: '',
        label: ''
      }
      this.searchQuery = ''
      this.selectedDate = ''
      this.fetchData()
    },

    goPost(id) {
      this.saveState()
      this.$router.push(`/post/${id}`)
    },

    displayTitle(post) {
      if (!post) return '-'
      return this.lang === 'zh' ? (post.title_cn || '-') : (post.title_en || '-')
    },

    displayCountry(post) {
      if (!post) return '-'
      return this.lang === 'zh' ? (post.country_cn || '-') : (post.country_en || '-')
    },

    cleanDescription(desc) {
      if (!desc) return '-'
      return String(desc)
        .replace(/<[^>]+>/g, ' ')
        .replace(/\\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 200) + (String(desc).length > 200 ? '...' : '')
    }
  }
}
</script>

<style scoped>
/* 基础样式 - 确保即使其他样式失效也能看到内容 */
.post-list-container {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  gap: 30px;
}

.content-area {
  flex: 1;
  min-width: 0; /* 防止 flex item 溢出 */
}

.filter-sidebar {
  width: 300px;
  flex-shrink: 0;
}

/* 错误提示 */
.error-banner {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #f56c6c;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 文章卡片 */
.posts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #ebeef5;
}

.post-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.post-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-description {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #909399;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #606266;
}

/* 筛选栏 */
.filter-block {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.filter-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 12px 0;
  color: #303133;
  border-bottom: 2px solid #53389e;
  padding-bottom: 8px;
}

.filter-btn {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #dcdfe6;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover:not(:disabled) {
  background: #53389e;
  color: white;
  border-color: #53389e;
}

.filter-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 搜索框 */
.search-box {
  display: flex;
  gap: 8px;
}

.search-input {
  flex: 1;
  height: 36px;
  border: 1px solid #dcdfe6;
  border-radius: 18px;
  padding: 0 12px;
  outline: none;
}

.search-input:focus {
  border-color: #53389e;
}

.search-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #53389e;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  width: 16px;
  height: 16px;
  fill: white;
}

/* 领域标签 */
.field-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.field-btn {
  flex: 1 0 40%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s;
  color: #606266;
}

.field-btn:hover {
  border-color: #53389e;
  color: #53389e;
}

.field-btn.active {
  background: #53389e;
  color: white;
  border-color: #53389e;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.text-btn {
  color: #53389e;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
}

/* 分页 */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* 响应式 */
@media (max-width: 768px) {
  .post-list-container {
    flex-direction: column;
  }
  
  .filter-sidebar {
    width: 100%;
    order: -1;
  }
  
  .field-btn {
    flex: 1 0 100%;
  }
}
</style>
