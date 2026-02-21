<template>
  <client-only>
    <main v-loading="loading" class="post-list-container">
      <!-- List Section -->
      <section class="content-area">
        <transition-group name="list" tag="div" class="posts-wrapper">
          <article
            v-for="post in postListData"
            :key="post.event_id"
            class="post-card"
            @click="goPost(post.event_id)"
            tabindex="0"
            role="link"
            :aria-label="$t('readArticle', { title: postTitle(post) })"
            @keyup.enter="goPost(post.event_id)"
          >
            <h2 class="post-title">{{ postTitle(post) }}</h2>
            <p class="post-description">{{ cleanDescription(post.description) }}</p>
            <div class="post-meta">
              <span class="meta-country">
                <strong>{{ displayField(post, 'country') }}</strong>
              </span>
              <time class="meta-date">
                {{ $t('publishedOn') }} <strong>{{ formatDate(post.date) }}</strong>
              </time>
            </div>
          </article>
        </transition-group>

        <div v-if="!postListData.length && !loading" class="empty-state">
          <p>{{ $t('noResults') }}</p>
          <el-button type="text" @click="resetQueryParams">{{ $t('clearFilters') }}</el-button>
        </div>

        <el-pagination
          v-if="totalCount > 0"
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
        <el-button 
          class="filter-action reset-btn" 
          @click="resetQueryParams"
          :disabled="!hasActiveFilters"
        >
          {{ $t('resetSearch') }}
        </el-button>

        <!-- Content Search -->
        <filter-section :title="$t('searchByContent')">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              :placeholder="$t('searchPlaceholder')"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" @click="handleSearch" :aria-label="$t('search')">
              <svg class="search-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </filter-section>

        <!-- Date Filter -->
        <filter-section :title="$t('searchByDeadline')">
          <el-date-picker
            v-model="selectedDate"
            type="month"
            :editable="false"
            :placeholder="$t('selectMonth')"
            value-format="yyyy-MM"
            @change="handleDateChange"
            class="date-picker"
            popper-class="custom-date-popper"
          />
        </filter-section>

        <!-- Field Filter -->
        <filter-section :title="$t('searchByField')">
          <div class="field-tags">
            <button
              v-for="field in fields"
              :key="field.key"
              class="field-btn"
              :class="{ active: queryParams.label === field.key }"
              @click="handleLabelChange(field.key)"
            >
              {{ $t(field.translationKey) }}
            </button>
          </div>
        </filter-section>
      </aside>
    </main>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import _debounce from 'lodash/debounce' // or use custom debounce if lodash not available

// Reusable filter section component
const FilterSection = {
  props: ['title'],
  template: `
    <div class="filter-block">
      <h3 class="filter-heading">{{ title }}</h3>
      <div class="filter-content">
        <slot></slot>
      </div>
    </div>
  `
}

export default {
  name: 'PostList',
  
  components: { FilterSection },
  
  data() {
    return {
      postListData: [],
      pageSize: 10, // Slightly larger for better UX
      totalCount: 0,
      loading: false,
      
      // Consolidated query state
      queryParams: {
        pageIndex: 1,
        queryString: '',
        year: '',
        month: '',
        label: ''
      },
      
      // Local form state (synced to queryParams on action)
      searchQuery: '',
      selectedDate: '',
      
      // Field definitions (DRY approach)
      fields: [
        { key: 'gis', translationKey: 'fieldGIS' },
        { key: 'rs', translationKey: 'fieldRS' },
        { key: 'physical_geo', translationKey: 'fieldPhysical' },
        { key: 'human_geo', translationKey: 'fieldHuman' },
        { key: 'urban', translationKey: 'fieldUrban' },
        { key: 'gnss', translationKey: 'fieldGNSS' } // Fixed: was duplicate 'rs'
      ]
    }
  },

  head() {
    return {
      title: this.lang === 'zh' ? 'GISphere | 资讯' : 'GISphere | News'
    }
  },

  computed: {
    ...mapState({ lang: 'language' }),
    
    hasActiveFilters() {
      return this.queryParams.queryString || 
             this.queryParams.label || 
             this.queryParams.year ||
             this.queryParams.month
    },

    // Simple i18n helper
    $t() {
      const translations = {
        zh: {
          readArticle: '阅读文章: {title}',
          publishedOn: '发布于',
          noResults: '暂无符合条件的内容',
          clearFilters: '清除筛选条件',
          resetSearch: '重置搜索条件',
          searchByContent: '按内容搜索',
          searchPlaceholder: '输入关键词...',
          search: '搜索',
          searchByDeadline: '按截止时间搜索',
          selectMonth: '选择月份',
          searchByField: '按专业领域搜索',
          fieldGIS: '地理信息科学',
          fieldRS: '遥感',
          fieldPhysical: '自然地理学',
          fieldHuman: '人文地理学',
          fieldUrban: '城市规划',
          fieldGNSS: '卫星导航'
        },
        en: {
          readArticle: 'Read article: {title}',
          publishedOn: 'Published on',
          noResults: 'No results found',
          clearFilters: 'Clear filters',
          resetSearch: 'Reset search criteria',
          searchByContent: 'Search By Content',
          searchPlaceholder: 'Enter keywords...',
          search: 'Search',
          searchByDeadline: 'Search by Deadline',
          selectMonth: 'Select Month',
          searchByField: 'Search by Field',
          fieldGIS: 'GIScience',
          fieldRS: 'Remote Sensing',
          fieldPhysical: 'Physical Geography',
          fieldHuman: 'Human Geography',
          fieldUrban: 'Urban Planning', // Fixed typo: Planing -> Planning
          fieldGNSS: 'GNSS'
        }
      }
      return (key, params = {}) => {
        let text = translations[this.lang]?.[key] || key
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, v)
        })
        return text
      }
    }
  },

  watch: {
    // Auto-search on query string change (debounced)
    searchQuery(newVal) {
      if (!newVal) {
        this.handleSearch()
      }
    }
  },

  mounted() {
    this.restoreState()
  },

  beforeDestroy() {
    // Cleanup session storage if needed
  },

  methods: {
    // State Management
    restoreState() {
      try {
        const stored = sessionStorage.getItem('postListQuery')
        if (stored) {
          const parsed = JSON.parse(stored)
          this.queryParams = { ...this.queryParams, ...parsed }
          
          // Sync local state
          this.searchQuery = this.queryParams.queryString || ''
          if (this.queryParams.year && this.queryParams.month) {
            this.selectedDate = `${this.queryParams.year}-${this.queryParams.month}`
          }
        } else if (this.$route.query?.type) {
          // URL query param handling
          this.queryParams.type = this.$route.query.type
        }
      } catch (e) {
        console.error('Failed to restore state:', e)
      }
      this.fetchData()
    },

    saveState() {
      try {
        sessionStorage.setItem('postListQuery', JSON.stringify(this.queryParams))
      } catch (e) {
        console.error('Failed to save state:', e)
      }
    },

    // Data Fetching
    async fetchData() {
      this.loading = true
      try {
        const res = await this.$axios.post('/api/post_by_params', this.queryParams)
        
        if (res?.data?.code === 0) {
          this.postListData = res.data.data.map(item => ({
            ...item,
            description: this.cleanDescription(item.description)
          }))
          this.totalCount = res.data.count
          
          // Save successful state
          this.saveState()
        } else {
          this.$message?.error?.(res.data?.msg || 'Request failed')
        }
      } catch (error) {
        console.error('Fetch error:', error)
        this.$message?.error?.(this.lang === 'zh' ? '加载失败' : 'Failed to load')
      } finally {
        this.loading = false
      }
    },

    // Event Handlers
    handleSearch: _debounce(function() {
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
      // Toggle behavior: click again to deselect
      this.queryParams.label = this.queryParams.label === label ? '' : label
      this.queryParams.pageIndex = 1
      this.fetchData()
    },

    handlePageChange(page) {
      this.queryParams.pageIndex = page
      this.fetchData()
      // Scroll to top
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

    // Helpers
    postTitle(post) {
      const title = this.lang === 'zh' ? post.title_cn : post.title_en
      return title || '-'
    },

    displayField(post, field) {
      const value = this.lang === 'zh' ? post[`${field}_cn`] : post[`${field}_en`]
      return value || '-'
    },

    formatDate(date) {
      if (!date) return this.lang === 'zh' ? '未知时间' : 'Unknown'
      return date
    },

    cleanDescription(desc) {
      if (!desc) return '-'
      return desc
        .replace(/<[^>]+>/g, ' ')
        .replace(/\\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 200) + (desc.length > 200 ? '...' : '')
    }
  }
}
</script>

<style scoped>
/* CSS Variables for theming */
:root {
  --primary-color: #53389e;
  --primary-light: #f5f7fa;
  --text-primary: #303133;
  --text-secondary: #606266;
  --text-muted: #909399;
  --border-color: #dcdfe6;
  --shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  --radius: 8px;
  --transition: all 0.3s ease;
}

.post-list-container {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #f5f7fa;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
}

/* Content Area */
.content-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.posts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  background: white;
  border-radius: var(--radius);
  padding: 20px 24px;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--primary-color);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.post-card:hover,
.post-card:focus {
  box-shadow: var(--shadow);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  outline: none;
}

.post-card:hover::before,
.post-card:focus::before {
  transform: scaleY(1);
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-description {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 12px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-secondary);
}

.meta-country strong {
  color: var(--primary-color);
  font-weight: 600;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

/* Pagination */
.pagination {
  margin-top: 30px;
  justify-content: center;
}

/* Sidebar */
.filter-sidebar {
  position: sticky;
  top: 40px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filter-action {
  width: 100%;
  border-radius: 20px;
  padding: 12px;
  border: 1px solid var(--border-color);
  background: white;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  font-size: 14px;
}

.filter-action:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.filter-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.filter-block {
  background: white;
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.filter-heading {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary-color);
  position: relative;
}

/* Search Box */
.search-box {
  display: flex;
  gap: 8px;
}

.search-input {
  flex: 1;
  height: 40px;
  border-radius: 20px;
  border: 2px solid var(--border-color);
  padding: 0 16px;
  font-size: 14px;
  transition: var(--transition);
  outline: none;
}

.search-input:focus {
  border-color: var(--primary-color);
}

.search-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(83, 56, 158, 0.3);
}

.search-icon {
  width: 18px;
  height: 18px;
  fill: white;
}

/* Date Picker */
.date-picker {
  width: 100%;
}

/* Field Tags */
.field-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.field-btn {
  flex: 1 0 calc(50% - 5px);
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background: white;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
}

.field-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-1px);
}

.field-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .post-list-container {
    grid-template-columns: 1fr;
  }

  .filter-sidebar {
    position: relative;
    top: 0;
    order: -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .filter-block {
    margin-bottom: 0;
  }
}

@media (max-width: 640px) {
  .post-list-container {
    padding: 20px 16px;
  }

  .post-card {
    padding: 16px;
  }

  .post-title {
    font-size: 16px;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .field-btn {
    flex: 1 0 100%;
  }
}

/* Deep selectors for Element UI overrides */
:deep(.el-input__inner) {
  border-radius: 20px !important;
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: var(--primary-color);
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled):hover) {
  color: var(--primary-color);
}
</style>
