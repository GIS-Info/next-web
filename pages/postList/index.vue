<template>
  <client-only>
    <el-main ref="mainScroll" v-loading="loading" class="main-container">
      <div class="content-wrapper">
        
        <div class="left-column">
          <div class="list-header" v-if="totalCount > 0">
            <span>{{ lang == 'zh' ? '共找到' : 'Found' }} <b>{{ totalCount }}</b> {{ lang == 'zh' ? '条资讯' : 'posts' }}</span>
          </div>

          <div
            v-for="post in postListData"
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
              :current-page="queryParams.pageIndex"
              :total="totalCount"
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

export default {
    name: 'PostList',
    data() {
        return {
            postListData: [],
            pageIndex: 1,
            pageSize: 3,
            totalCount: 0,
            
            // 筛选相关绑定值
            queryString: '',
            date: '', // 绑定日期选择器
            label: '', // 绑定下拉框
            
            // 发送给后端的参数对象
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
    },
    async mounted() {
        // 读取缓存的搜索状态
        const storedQueryParams = sessionStorage.getItem('queryParams');
        if (storedQueryParams) {
            this.queryParams = JSON.parse(storedQueryParams);
            
            // 回显前端控件的状态 (让输入框里有值)
            this.queryString = this.queryParams.queryString || '';
            this.label = this.queryParams.label || '';
            if (this.queryParams.year && this.queryParams.month) {
                this.date = `${this.queryParams.year}-${this.queryParams.month}`;
            }

            await this.queryByParams(this.queryParams);
        } else {
             // 处理 URL 参数
             const urlType = this.$route.query?.type;
             if (urlType) {
                 this.$set(this.queryParams, 'type', urlType); // 假设后端支持 type
             }
            await this.queryByParams(this.queryParams);
        }
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
            // 每次筛选变动，重置回第一页
            this.$set(this.queryParams, 'pageIndex', 1);
            this.queryByParams(this.queryParams);
        },

        async resetQueryParams() {
            // 1. 清空前端控件
            this.queryString = '';
            this.date = '';
            this.label = '';
            
            // 2. 清空查询参数
            this.queryParams = {
                pageIndex: 1,
                pageSize: this.pageSize
            };
            
            // 3. 清除 SessionStorage
            sessionStorage.removeItem('queryParams');
            
            // 4. 重新请求
            await this.queryByParams(this.queryParams);
        
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        // 关键词搜索
        handleTextChange() {
            // Element UI 的 clear 事件也会触发，所以要处理空字符串
            this.$set(this.queryParams, 'queryString', this.queryString);
            this.$set(this.queryParams, 'pageIndex', 1); // 搜索时重置页码
            this.queryByParams(this.queryParams);
        },

        // 领域选择
        handleLabelChange(val) {
            if(val) {
                this.$set(this.queryParams, 'label', val);
            } else {
                this.$delete(this.queryParams, 'label');
            }
            this.$set(this.queryParams, 'pageIndex', 1);
            this.queryByParams(this.queryParams);
        },

        // 翻页
        handlePageChange(val) {
        // 1. 强制转换为数字 
        const pageNum = parseInt(val, 10);
        
        // 2. 更新参数
        this.$set(this.queryParams, 'pageIndex', pageNum);
        
        // 3. 发起请求
        this.queryByParams(this.queryParams).then(() => {
            this.$nextTick(() => {
                const elMain = document.querySelector('.el-main');
                if (elMain) elMain.scrollTop = 0;
                window.scrollTo(0, 0);
            });
        });
    },

        updateQueryParams() {
            sessionStorage.setItem('queryParams', JSON.stringify(this.queryParams));
        },

        // 请求接口
        queryByParams(params = {}) {
            this.loading = true;
            // 确保分页参数存在
            if(!params.pageIndex) params.pageIndex = this.pageIndex;
            if(!params.pageSize) params.pageSize = this.pageSize;

            return this.$axios.post('api/post_by_params', params)
                  .then(res => {
                    if (res?.data?.code === 0) {
                        this.postListData = res.data.data.map((i) => {
                            const l = { ...i };
                            // 简单的去除 HTML 标签正则
                            l.description = l.description
                                .replace(/<\/?[^>]+(>|$)/g, '')
                                .replace(/&nbsp;/g, ' ')
                                .replace(/\s+/g, ' ') 
                                .trim();
                            return l;
                        });
                        this.totalCount = res.data.count;
                        this.updateQueryParams();
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
            this.updateQueryParams();
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