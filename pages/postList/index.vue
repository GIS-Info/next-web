<template>
  <client-only>
    <el-main v-loading="loading" class="main-container">
      <div class="content-wrapper">
        
        <div class="list-section">
          <div v-if="postListData.length > 0">
            <div
              v-for="post in postListData"
              :key="post.event_id"
              class="entry-card"
              @click="goPost(post.event_id)"
            >
              <div class="entry-title">
                {{ (lang == 'zh' ? post.title_cn : post.title_en) || '-' }}
              </div>
              <div class="entry-content-brief">{{ post?.description || '-' }}</div>
              <div class="entry-bottom-flex">
                <span>
                  <b>{{ (lang == 'zh' ? post.country_cn : post.country_en) || '-' }}</b>
                </span>
                <span>
                  {{ lang == 'zh' ? '发布于' : 'Published on' }}
                  <b class="date-text">{{ post.date || (lang == 'zh' ? '未知时间' : 'Unknown') }}</b>
                </span>
              </div>
            </div>

            <el-pagination
              class="pagination-container"
              background
              layout="prev, pager, next"
              :current-page="queryParams.pageIndex"
              :total="totalCount"
              :page-size="pageSize"
              @current-change="handlePageChange"
            />
          </div>

          <el-empty 
            v-else-if="!loading" 
            :description="lang === 'zh' ? '暂无数据' : 'No Data Found'"
          />
        </div>

        <div class="filter-sidebar">
          <el-button class="button-reset" @click="resetQueryParams">
            {{ lang == 'en' ? 'Reset search criteria' : '重置搜索条件' }}
          </el-button>

          <div class="filter-group">
            <div class="filter-title">
              {{ lang == 'zh' ? "按内容搜索" : "Search By Content" }}
              <hr />
            </div>
            <div class="search-bar">
              <input
                v-model="queryString"
                type="text"
                class="search-input"
                :placeholder="lang == 'zh' ? '输入关键词...' : 'Keywords...'"
                @keyup.enter="handleTextChange"
              />
              <button class="button-search-icon" @click="handleTextChange">
                <svg viewBox="0 0 20 20" height="18" width="18">
                  <path fill="currentColor" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-title">
              {{ lang == 'zh' ? "按截止时间搜索" : "Search by Deadline" }}
              <hr />
            </div>
            <el-date-picker
              v-model="date"
              type="month"
              style="width: 100%"
              value-format="yyyy-M"
              :placeholder="lang === 'zh' ? '选择月份' : 'Select Month'"
              @change="handleDateChange"
            />
          </div>

          <div class="filter-group">
            <div class="filter-title">
              {{ lang == 'zh' ? "按专业领域搜索" : "Search by Field" }}
              <hr />
            </div>
            <div class="field-grid">
              <el-button 
                v-for="f in fieldOptions" 
                :key="f.id"
                :class="['button-field', { 'is-active': queryParams.label === f.id }]"
                @click="handleLabelChange(f.id)"
              >
                {{ lang == 'zh' ? f.zh : f.en }}
              </el-button>
            </div>
          </div>
        </div>

      </div>
    </el-main>
  </client-only>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PostList',
  data() {
    return {
      postListData: [],
      queryString: '',
      pageSize: 7,
      totalCount: 0,
      date: '',
      loading: true,
      searchTimer: null,
      queryParams: {
        pageIndex: 1,
        queryString: '',
        label: '',
        year: '',
        month: ''
      },
      fieldOptions: [
        { id: 'gis', zh: '地理信息科学', en: 'GIScience' },
        { id: 'rs', zh: '遥感', en: 'Remote Sensing' },
        { id: 'physical_geo', zh: '自然地理学', en: 'Physical Geo' },
        { id: 'human_geo', zh: '人文地理学', en: 'Human Geo' },
        { id: 'urban', zh: '城市规划', en: 'Urban Planning' },
        { id: 'gnss', zh: '卫星导航', en: 'GNSS' }
      ]
    };
  },
  head() {
    return { title: 'GISphere | 资讯' };
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  watch: {
    // Debounced search for the text input
    queryString(newVal) {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.handleTextChange();
      }, 500);
    }
  },
  async mounted() {
    const stored = sessionStorage.getItem('queryParams');
    if (stored) {
      this.queryParams = JSON.parse(stored);
      this.queryString = this.queryParams.queryString || '';
      if (this.queryParams.year && this.queryParams.month) {
        this.date = `${this.queryParams.year}-${this.queryParams.month}`;
      }
    } else {
      this.queryParams.queryType = this.$route.query?.type || '';
    }
    await this.queryByParams();
  },
  methods: {
    async queryByParams() {
      this.loading = true;
      try {
        const res = await this.$axios.post('api/post_by_params', this.queryParams);
        if (res?.data?.code === 0) {
          this.postListData = res.data.data.map((i) => ({
            ...i,
            description: i.description
              ? i.description.replace(/<\/?[^>]+(>|$)/g, '').replace(/\\n/g, '')
              : ''
          }));
          this.totalCount = res.data.count;
        } else {
          console.error('Request Error:', res.msg);
        }
      } catch (err) {
        console.error('Network Error:', err);
      } finally {
        this.loading = false;
      }
    },
    async resetQueryParams() {
      this.queryParams = { pageIndex: 1, queryString: '', label: '', year: '', month: '' };
      this.queryString = '';
      this.date = '';
      sessionStorage.removeItem('queryParams');
      await this.queryByParams();
    },
    handleTextChange() {
      this.queryParams.queryString = this.queryString;
      this.queryParams.pageIndex = 1;
      this.queryByParams();
    },
    handleDateChange() {
      if (this.date) {
        const [year, month] = this.date.split('-');
        this.$set(this.queryParams, 'year', year);
        this.$set(this.queryParams, 'month', month);
      } else {
        this.queryParams.year = '';
        this.queryParams.month = '';
      }
      this.queryParams.pageIndex = 1;
      this.queryByParams();
    },
    handleLabelChange(label) {
      // Toggle logic: click again to deselect
      this.queryParams.label = this.queryParams.label === label ? '' : label;
      this.queryParams.pageIndex = 1;
      this.queryByParams();
    },
    handlePageChange(i) {
      this.queryParams.pageIndex = i;
      this.queryByParams();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    goPost(id) {
      sessionStorage.setItem('queryParams', JSON.stringify(this.queryParams));
      this.$router.push('/post/' + id);
    }
  }
};
</script>

<style scoped>
.main-container {
  background-color: #f4f7f6;
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 30px;
}

/* List Styles */
.list-section {
  flex: 3;
}

.entry-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-left: 5px solid transparent;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.entry-card:hover {
  transform: translateX(5px);
  border-left-color: #53389e;
  box-shadow: 0 4px 12px rgba(83, 56, 158, 0.15);
}

.entry-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.entry-content-brief {
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.entry-bottom-flex {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #95a5a6;
  padding-top: 10px;
  border-top: 1px solid #f9f9f9;
}

/* Sidebar Styles */
.filter-sidebar {
  flex: 1;
  background: #ffffff;
  border-radius: 12px;
  padding: 25px;
  height: fit-content;
  position: sticky;
  top: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.filter-group {
  margin-bottom: 25px;
}

.filter-title {
  font-weight: bold;
  font-size: 0.9rem;
  color: #53389e;
  text-align: left;
  margin-bottom: 15px;
}

.filter-title hr {
  border: none;
  border-top: 2px solid #53389e;
  width: 30px;
  margin: 5px 0 0 0;
}

.search-bar {
  position: relative;
  display: flex;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  outline: none;
}

.search-input:focus {
  border-color: #53389e;
}

.button-search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #909399;
  cursor: pointer;
}

.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.button-field {
  margin: 0 !important;
  font-size: 0.75rem;
  padding: 10px 5px;
  border-radius: 8px;
}

.button-field.is-active {
  background-color: #53389e;
  color: #fff;
  border-color: #53389e;
}

.button-reset {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
}

.pagination-container {
  margin-top: 30px;
  text-align: center;
}

/* Responsive */
@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column-reverse;
  }
  .filter-sidebar {
    position: static;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
