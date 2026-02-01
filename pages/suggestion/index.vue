<template>
  <div class="main-container">
    <div class="content">
      <!-- 标题部分 -->
      <div class="header-section">
        <h1 class="main-title">
          {{ lang === 'zh' ? '帮我们更新 GISphere 信息' : 'Help Us Keep GISphere Up-to-Date' }}
        </h1>
        <p class="subtitle">
          {{ lang === 'zh' ? '您的贡献是维持信息准确性的基础' : 'Your contribution helps keep us accurate' }}
        </p>
      </div>

      <!-- 信息卡片 -->
      <div class="info-cards">
        <div class="info-card">
          <span class="card-icon">/span>
          <p>{{ lang === 'zh' ? '我们认可数据可能不是最新的，某些数据可能缺失或有错误' : 'We acknowledge that some information may be outdated, incomplete or inaccurate' }}</p>
        </div>
        <div class="info-card">
          <span class="card-icon"></span>
          <p>{{ lang === 'zh' ? '您的贡献是维持 GISphere 信息准确和完整的基础' : 'Your contributions are essential for maintaining accuracy' }}</p>
        </div>
        <div class="info-card">
          <span class="card-icon"></span>
          <p>{{ lang === 'zh' ? '我们真诚地欢迎您的支持！' : 'We truly appreciate your effort and support!' }}</p>
        </div>
      </div>

      <!-- 表单部分 -->
      <div class="form-container">
        <h2 class="form-title">{{ lang === 'zh' ? '提交您的建议' : 'Submit Your Suggestion' }}</h2>
        
        <el-form 
          ref="suggestionForm"
          :model="formData" 
          @submit.prevent="submitProposal"
          class="suggestion-form"
        >
          <!-- 更新类别 -->
          <el-form-item 
            :label="lang === 'zh' ? '更新类别' : 'Category'"
            prop="proposalCategory"
            required
          >
            <el-select 
              v-model="formData.proposalCategory" 
              :placeholder="lang === 'zh' ? '请选择类别' : 'Select a category'"
              class="full-width"
            >
              <el-option value="school" :label="lang === 'zh' ? '院校动态' : 'School Updates'"></el-option>
              <el-option value="professor" :label="lang === 'zh' ? '教授动态' : 'Professor Updates'"></el-option>
              <el-option value="recruitment" :label="lang === 'zh' ? '招生招聘 (博士/硕士)' : 'Recruitment (PhD/Masters)'"></el-option>
              <el-option value="competition" :label="lang === 'zh' ? '论文竞赛/会议等' : 'Competitions/Conferences'"></el-option>
            </el-select>
          </el-form-item>

          <!-- 详细内容 -->
          <el-form-item 
            :label="lang === 'zh' ? '详细内容' : 'Details'"
            prop="proposalText"
            required
          >
            <el-input
              v-model="formData.proposalText"
              type="textarea"
              :rows="6"
              :placeholder="lang === 'zh' ? '请输入详细的提案内容...' : 'Describe the necessary correction or new information...'"
              maxlength="5000"
              show-word-limit
            ></el-input>
          </el-form-item>

          <!-- 文件上传 -->
          <el-form-item 
            :label="lang === 'zh' ? '附加文件 (可选)' : 'Attachment (Optional)'"
            prop="attachment"
          >
            <el-upload
              ref="uploadComponent"
              action=""
              :auto-upload="false"
              :on-change="handleFileChange"
              :on-remove="handleFileRemove"
              :limit="1"
              drag
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                {{ lang === 'zh' ? '拖拽文件到此或' : 'Drag file here or' }}
                <em>{{ lang === 'zh' ? '点击上传' : 'click to upload' }}</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                {{ lang === 'zh' ? '支持 PDF, 图片, Excel 等常见格式，单个文件不超过 10MB' : 'Support PDF, images, Excel, etc. Max 10MB' }}
              </div>
            </el-upload>
            <div v-if="attachmentInfo" class="attachment-info">
              <span class="file-name">{{ attachmentInfo.name }}</span>
              <span class="file-size">({{ formatFileSize(attachmentInfo.size) }})</span>
            </div>
          </el-form-item>

          <!-- 邮箱 -->
          <el-form-item 
            :label="lang === 'zh' ? '邮箱' : 'Email'"
            prop="feedbackEmail"
            required
          >
            <el-input
              v-model="formData.feedbackEmail"
              type="email"
              :placeholder="lang === 'zh' ? '请输入您的邮箱（便于我们反馈）' : 'Enter your email for feedback'"
            ></el-input>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item class="button-group">
            <el-button 
              type="primary" 
              :loading="isSubmitting"
              @click="submitProposal"
            >
              {{ isSubmitting ? (lang === 'zh' ? '提交中...' : 'Submitting...') : (lang === 'zh' ? '提交更新' : 'Submit Update') }}
            </el-button>
            <el-button @click="resetForm">
              {{ lang === 'zh' ? '清空' : 'Reset' }}
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 反馈消息 -->
        <transition name="fade">
          <div v-if="feedbackMessage" :class="['feedback-message', feedbackType]">
            <i :class="feedbackIconClass"></i>
            <span>{{ feedbackMessage }}</span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProposeInformation',
  data() {
    return {
      formData: {
        proposalCategory: '',
        proposalText: '',
        feedbackEmail: '',
      },
      attachmentInfo: null,
      feedbackMessage: '',
      feedbackType: '', // 'success' 或 'error'
      isSubmitting: false,
      submitTimeout: null
    };
  },
  computed: {
    ...mapState({ lang: 'language' }),
    feedbackIconClass() {
      return this.feedbackType === 'success' 
        ? 'el-icon-success' 
        : 'el-icon-warning';
    }
  },
  methods: {
    handleFileChange(file, fileList) {
      if (file.raw.size > 10 * 1024 * 1024) {
        this.$message.error(
          this.lang === 'zh' ? '文件大小不能超过 10MB' : 'File size cannot exceed 10MB'
        );
        this.$refs.uploadComponent.clearFiles();
        this.attachmentInfo = null;
        return;
      }
      this.attachmentInfo = {
        name: file.name,
        size: file.raw.size,
        file: file.raw
      };
    },
    handleFileRemove() {
      this.attachmentInfo = null;
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },
    resetForm() {
      this.formData = {
        proposalCategory: '',
        proposalText: '',
        feedbackEmail: '',
      };
      this.$refs.uploadComponent?.clearFiles();
      this.attachmentInfo = null;
      this.feedbackMessage = '';
      this.$refs.suggestionForm?.resetFields();
    },
    async submitProposal() {
      // 防止重复提交
      if (this.isSubmitting) return;

      // 清除之前的超时
      if (this.submitTimeout) {
        clearTimeout(this.submitTimeout);
      }

      // 基础校验
      if (!this.formData.proposalCategory || !this.formData.proposalText.trim()) {
        this.showFeedback(
          this.lang === 'zh'
            ? '请选择类别并输入详细内容'
            : 'Please select category and enter details',
          'error'
        );
        return;
      }

      if (this.formData.proposalText.length > 5000) {
        this.showFeedback(
          this.lang === 'zh'
            ? '内容超过 5000 字符限制'
            : 'Content exceeds 5000 character limit',
          'error'
        );
        return;
      }

      if (!this.formData.feedbackEmail) {
        this.showFeedback(
          this.lang === 'zh' ? '请输入邮件' : 'Please enter your email',
          'error'
        );
        return;
      }

      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailReg.test(this.formData.feedbackEmail)) {
        this.showFeedback(
          this.lang === 'zh' ? '邮箱格式不正确' : 'Invalid email format',
          'error'
        );
        return;
      }

      this.isSubmitting = true;

      this.submitTimeout = setTimeout(async () => {
        try {
          const formDataObj = new FormData();
          formDataObj.append('category', this.formData.proposalCategory);
          formDataObj.append('content', this.formData.proposalText);
          formDataObj.append('email', this.formData.feedbackEmail);
          
          // 添加文件（如果有）
          if (this.attachmentInfo?.file) {
            formDataObj.append('attachment', this.attachmentInfo.file);
          }

          const response = await fetch('/api/send-proposal/', {
            method: 'POST',
            body: formDataObj
          });

          if (response.ok) {
            this.showFeedback(
              this.lang === 'zh'
                ? '提案已成功提交！感谢您的支持 🎉'
                : 'Your proposal has been sent successfully! 🎉',
              'success'
            );
            this.resetForm();
          } else {
            const res = await response.json();
            this.showFeedback(
              res.message || (this.lang === 'zh'
                ? '提交出错，请稍后重试'
                : 'Error submitting. Please try again later'),
              'error'
            );
          }
        } catch (error) {
          console.error('Error sending proposal:', error);
          this.showFeedback(
            this.lang === 'zh'
              ? '提交过程出错，请检查网络连接'
              : 'Network error. Please check your connection',
            'error'
          );
        } finally {
          this.isSubmitting = false;
        }
      }, 300);
    },
    showFeedback(message, type) {
      this.feedbackMessage = message;
      this.feedbackType = type;
      
      // 5秒后自动清除消息
      setTimeout(() => {
        this.feedbackMessage = '';
      }, 5000);
    }
  },
  beforeDestroy() {
    if (this.submitTimeout) {
      clearTimeout(this.submitTimeout);
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.main-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.content {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 头部部分 */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 50px 40px;
  text-align: center;
}

.main-title {
  font-size: 2.5em;
  margin: 0 0 15px 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.1em;
  opacity: 0.9;
  margin: 0;
}

/* 信息卡片 */
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 40px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.info-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 2em;
  display: block;
  margin-bottom: 10px;
}

.info-card p {
  margin: 0;
  font-size: 0.95em;
  color: #555;
  line-height: 1.6;
}

/* 表单容器 */
.form-container {
  padding: 40px;
}

.form-title {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.suggestion-form {
  max-width: 600px;
  margin: 0 auto;
}

.suggestion-form ::v-deep .el-form-item {
  margin-bottom: 25px;
}

.suggestion-form ::v-deep .el-form-item__label {
  font-weight: 600;
  color: #333;
}

.suggestion-form ::v-deep .el-input__inner,
.suggestion-form ::v-deep .el-textarea__inner {
  border-radius: 6px;
  border: 1px solid #ddd;
  transition: all 0.3s;
}

.suggestion-form ::v-deep .el-input__inner:focus,
.suggestion-form ::v-deep .el-textarea__inner:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.full-width {
  width: 100%;
}

/* 文件上传 */
.suggestion-form ::v-deep .el-upload-dragger {
  border: 2px dashed #667eea;
  border-radius: 6px;
  background: #f8f9fa;
}

.suggestion-form ::v-deep .el-upload-dragger:hover {
  border-color: #764ba2;
  background: #f0f3ff;
}

.attachment-info {
  margin-top: 12px;
  padding: 10px 12px;
  background: #e6f7ff;
  border-radius: 6px;
  font-size: 0.9em;
  color: #0050b3;
}

.file-name {
  font-weight: 600;
}

.file-size {
  opacity: 0.7;
  margin-left: 5px;
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.button-group ::v-deep .el-button {
  min-width: 120px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1em;
}

.button-group ::v-deep .el-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.button-group ::v-deep .el-button--primary:hover {
  opacity: 0.9;
}

/* 反馈消息 */
.feedback-message {
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1em;
  animation: slideIn 0.3s ease;
}

.feedback-message.success {
  background: #f6ffed;
  border-left: 4px solid #52c41a;
  color: #274e2b;
}

.feedback-message.error {
  background: #fff1f0;
  border-left: 4px solid #ff4d4f;
  color: #58181c;
}

.feedback-message i {
  font-size: 1.2em;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-container {
    padding: 20px 10px;
  }

  .header-section {
    padding: 30px 20px;
  }

  .main-title {
    font-size: 1.8em;
  }

  .info-cards {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .form-container {
    padding: 20px;
  }

  .suggestion-form {
    max-width: 100%;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group ::v-deep .el-button {
    width: 100%;
  }
}
</style>
