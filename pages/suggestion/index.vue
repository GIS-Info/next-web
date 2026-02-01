<template>
  <div class="main-container">
    <div class="content-card">
      <header class="form-header">
        <h2>{{ lang === 'zh' ? '帮我们更新 GISphere 信息!' : 'Help Us Keep GISphere Information Accurate and Up-to-Date!' }}</h2>
      </header>
  
      <section class="intro-section">
        <div class="notice-box">
          <p>{{ lang === 'zh' ? '我们认可我们的数据可能不是最新的，且有些数据可能缺失或有时有错误，特别是在某些区域或机构。' : 'We acknowledge that some of our data might not be fully up-to-date, and there may be missing entries or occasional errors in our dataset, particularly in certain regions or institutions.' }}</p>
          <p>{{ lang === 'zh' ? '您的贡献是维持GISphere信息准确和完整的基础。如果您发现错误或不准确的信息，或者如果您有额外的数据可以分享，请在这里提交您的修正。' : 'Your contributions are invaluable in improving the accuracy and completeness of GISphere. If you notice incorrect or outdated information, or if you have additional data to share, please submit your corrections here.' }}</p>
          <p class="highlight-text">{{ lang === 'zh' ? '我们真诚地欢迎您的支持！' : 'We truly appreciate your effort in keeping GISphere a reliable resource. Our team will review and verify the submitted updates as soon as possible and get back to you if needed. Thank you for your support!' }}</p>
        </div>
      </section>

      <form @submit.prevent="submitProposal" class="proposal-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="proposalCategory">{{ lang === 'zh' ? '更新类别' : 'Category' }}</label>
            <select id="proposalCategory" v-model="proposalCategory" required>
              <option disabled value="">{{ lang === 'zh' ? '请选择类别' : 'Select a category' }}</option>
              <option value="school">{{ lang === 'zh' ? '院校动态' : 'School Updates' }}</option>
              <option value="professor">{{ lang === 'zh' ? '教授动态' : 'Professor Updates' }}</option>
              <option value="recruitment">{{ lang === 'zh' ? '招生招聘' : 'Recruitment' }}</option>
              <option value="competition">{{ lang === 'zh' ? '竞赛/会议' : 'Competitions/Conferences' }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="feedbackEmail">{{ lang === 'zh' ? '您的邮箱' : 'Your Email' }}</label>
            <input
              id="feedbackEmail"
              v-model="feedbackEmail"
              type="email"
              :placeholder="lang === 'zh' ? '用于反馈更新进度' : 'For feedback purposes'"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="proposalText">{{ lang === 'zh' ? '详细说明' : 'Details' }}</label>
          <textarea
            id="proposalText"
            v-model="proposalText"
            :placeholder="lang === 'zh' ? '请描述具体的修正内容、缺失信息或相关链接...' : 'Describe the correction or new information here...'"
            required
          ></textarea>
          <div class="form-footer-info">
            <span class="hint">{{ lang === 'zh' ? '* 请尽可能提供可验证的信息来源' : '* Please provide verifiable sources if possible' }}</span>
            <span class="char-count" :class="{ 'text-danger': proposalText.length > 5000 }">
              {{ proposalText.length }} / 5000
            </span>
          </div>
        </div>

        <div class="form-group">
          <label>{{ lang === 'zh' ? '附件证明 (可选)' : 'Attachments (Optional)' }}</label>
          <div class="upload-zone" :class="{ 'has-file': selectedFile }">
            <input 
              type="file" 
              id="fileUpload" 
              ref="fileInput"
              @change="handleFileChange" 
              class="hidden-input" 
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
            />
            <label for="fileUpload" class="upload-container">
              <template v-if="!selectedFile">
                <div class="upload-trigger">
                  <span class="plus-icon">+</span>
                  <span>{{ lang === 'zh' ? '上传证明文件 (支持图片、PDF、Word，限5MB)' : 'Upload evidence (Images, PDF, Word, Max 5MB)' }}</span>
                </div>
              </template>
              <template v-else>
                <div class="file-preview">
                  <span class="file-icon">📄</span>
                  <span class="file-name">{{ selectedFile.name }}</span>
                  <button type="button" @click.prevent="removeFile" class="remove-btn" title="Remove file">✕</button>
                </div>
              </template>
            </label>
          </div>
        </div>

        <div class="actions">
          <button type="submit" :disabled="isSubmitting" class="submit-button">
            <span v-if="!isSubmitting">{{ lang === 'zh' ? '提交更新提案' : 'Submit Update Proposal' }}</span>
            <span v-else>{{ lang === 'zh' ? '正在安全传输中...' : 'Submitting safely...' }}</span>
          </button>
          
          <transition name="slide-fade">
            <div v-if="feedbackMessage" :class="['feedback-msg', statusClass]">
              {{ feedbackMessage }}
            </div>
          </transition>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProposeInformation',
  data() {
    return {
      proposalCategory: '',
      proposalText: '',
      feedbackEmail: '',
      selectedFile: null,
      feedbackMessage: '',
      statusClass: '',
      isSubmitting: false,
    };
  },
  computed: {
    ...mapState({ lang: 'language' })
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        this.showMessage(this.lang === 'zh' ? '单个文件需在5MB以内' : 'File must be under 5MB', 'error');
        this.$refs.fileInput.value = '';
        return;
      }
      this.selectedFile = file;
    },
    removeFile() {
      this.selectedFile = null;
      this.$refs.fileInput.value = '';
    },
    showMessage(msg, type) {
      this.feedbackMessage = msg;
      this.statusClass = type;
      setTimeout(() => { this.feedbackMessage = ''; }, 6000);
    },
    async submitProposal() {
      if (this.isSubmitting) return;

      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailReg.test(this.feedbackEmail)) {
        this.showMessage(this.lang === 'zh' ? '邮箱格式不规范' : 'Invalid email format', 'error');
        return;
      }

      this.isSubmitting = true;
      const formData = new FormData();
      formData.append('category', this.proposalCategory);
      formData.append('content', this.proposalText);
      formData.append('email', this.feedbackEmail);
      if (this.selectedFile) formData.append('file', this.selectedFile);

      try {
        const response = await fetch('/api/send-proposal/', {
          method: 'POST',
          body: formData 
        });

        if (response.ok) {
          this.showMessage(this.lang === 'zh' ? '感谢！您的提案已送至后台审核。' : 'Success! Your proposal is under review.', 'success');
          this.resetForm();
        } else {
          throw new Error();
        }
      } catch (error) {
        this.showMessage(this.lang === 'zh' ? '服务器繁忙，请稍后再试。' : 'Server error, please try again.', 'error');
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.proposalCategory = '';
      this.proposalText = '';
      this.feedbackEmail = '';
      this.selectedFile = null;
      if (this.$refs.fileInput) this.$refs.fileInput.value = '';
    }
  }
};
</script>

<style scoped>
/* 核心容器 */
.main-container {
  width: 100%;
  min-height: 100vh;
  background: #ebeef5; /* 保持原有背景 */
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* 固定宽度的卡片，专为桌面设计 */
.content-card {
  width: 850px;
  background: #ffffff;
  padding: 50px 60px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.form-header {
  margin-bottom: 40px;
  text-align: center;
}

.form-header h2 {
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1rem;
}

/* 栅格布局 */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 10px;
}

/* 输入控件统一风格 */
select, textarea, input[type="email"] {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #f9fafb;
  font-size: 1rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

select:focus, textarea:focus, input:focus {
  outline: none;
  border-color: #409eff;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.12);
}

textarea {
  height: 200px;
  line-height: 1.6;
}

.form-footer-info {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.hint { font-size: 0.85rem; color: #95a5a6; }
.char-count { font-size: 0.85rem; color: #bdc3c7; }
.text-danger { color: #e74c3c; font-weight: bold; }

/* 上传组件 */
.upload-zone {
  border: 2px dashed #dcdfe6;
  border-radius: 12px;
  background: #fcfcfc;
  transition: all 0.3s;
}

.upload-zone:hover {
  border-color: #409eff;
  background: #f4f9ff;
}

.upload-zone.has-file {
  border-style: solid;
  border-color: #67c23a;
  background: #f0f9eb;
}

.hidden-input { display: none; }

.upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  cursor: pointer;
  min-height: 60px;
}

.upload-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #606266;
  font-size: 0.95rem;
}

.plus-icon {
  font-size: 24px;
  color: #409eff;
  font-weight: 300;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
}

.file-icon { font-size: 1.5rem; }
.file-name { color: #2c3e50; font-weight: 500; flex: 1; }

.remove-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s;
}

.remove-btn:hover { background: #d9363e; }

/* 提交按钮 */
.submit-button {
  width: 100%;
  padding: 16px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
  box-shadow: 0 4px 14px 0 rgba(64, 158, 255, 0.3);
}

.submit-button:hover:not(:disabled) {
  background: #66b1ff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.submit-button:disabled {
  background: #a0cfff;
  cursor: not-allowed;
  box-shadow: none;
}

/* 反馈消息动画 */
.feedback-msg {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.feedback-msg.success { background: #f0f9eb; color: #67c23a; }
.feedback-msg.error { background: #fef0f0; color: #f56c6c; }

.slide-fade-enter-active { transition: all 0.3s ease; }
.slide-fade-enter { transform: translateY(-10px); opacity: 0; }
</style>
