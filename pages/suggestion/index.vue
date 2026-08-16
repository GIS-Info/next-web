<template>
  <div class="page">
    <div class="card">
      <header class="card__header">
        <h1 class="card__title">{{ t.title }}</h1>
      </header>

      <section class="notice">
        <p v-for="(para, i) in t.intro" :key="'i' + i">{{ para }}</p>
        <p class="notice__highlight">{{ t.introHighlight }}</p>
      </section>

      <form class="form" novalidate @submit.prevent="submitProposal">
        <div class="form__grid">
          <div class="field">
            <label for="proposalCategory">{{ t.categoryLabel }}</label>
            <select
              id="proposalCategory"
              v-model="proposalCategory"
              required
            >
              <option disabled value="">{{ t.categoryPlaceholder }}</option>
              <option
                v-for="opt in t.categories"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>

          <div class="field">
            <label for="feedbackEmail">{{ t.emailLabel }}</label>
            <input
              id="feedbackEmail"
              v-model.trim="feedbackEmail"
              type="email"
              :placeholder="t.emailPlaceholder"
              required
            />
          </div>
        </div>

        <div class="field">
          <label for="proposalText">{{ t.detailsLabel }}</label>
          <textarea
            id="proposalText"
            v-model="proposalText"
            :placeholder="t.detailsPlaceholder"
            :maxlength="MAX_LEN"
            required
          ></textarea>
          <div class="field__meta">
            <span class="hint">{{ t.sourceHint }}</span>
            <span class="counter" :class="{ 'is-over': nearLimit }">
              {{ proposalText.length }} / {{ MAX_LEN }}
            </span>
          </div>
        </div>

        <div class="field">
          <span class="field__label">{{ t.attachmentLabel }}</span>
          <div class="upload" :class="{ 'has-file': selectedFile }">
            <input
              id="fileUpload"
              ref="fileInput"
              type="file"
              class="upload__input"
              :accept="ACCEPT"
              @change="handleFileChange"
            />

            <label v-if="!selectedFile" for="fileUpload" class="upload__drop">
              <span class="upload__plus" aria-hidden="true">+</span>
              <span>{{ t.uploadPrompt }}</span>
            </label>

            <div v-else class="upload__file">
              <span class="upload__icon" aria-hidden="true">📄</span>
              <span class="upload__name">{{ selectedFile.name }}</span>
              <span class="upload__size">{{ readableSize }}</span>
              <!-- .stop is required: without it the click bubbles to the
                   wrapping label and re-opens the file picker. -->
              <button
                type="button"
                class="upload__remove"
                :aria-label="t.removeFile"
                @click.stop.prevent="removeFile"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div class="actions">
          <button
            type="submit"
            class="submit"
            :disabled="isSubmitting || !canSubmit"
          >
            {{ isSubmitting ? t.submitting : t.submit }}
          </button>

          <transition name="slide-fade">
            <p
              v-if="feedbackMessage"
              class="feedback"
              :class="'feedback--' + statusClass"
              role="status"
              aria-live="polite"
            >
              {{ feedbackMessage }}
            </p>
          </transition>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const MAX_LEN = 5000
const MAX_BYTES = 5 * 1024 * 1024
const ACCEPT = '.jpg,.jpeg,.png,.pdf,.doc,.docx'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const COPY = {
  zh: {
    title: '帮我们更新 GISphere 信息！',
    intro: [
      '我们知道部分数据可能不是最新的，也可能存在缺失或错误，在某些地区和机构尤其如此。',
      '您的贡献是维持 GISphere 信息准确、完整的基础。如果您发现错误或过时的信息，或者有额外的数据可以分享，欢迎在这里提交。',
    ],
    introHighlight:
      '我们的团队会尽快审核并核实您提交的内容，必要时与您联系。感谢您的支持！',

    categoryLabel: '更新类别',
    categoryPlaceholder: '请选择类别',
    categories: [
      { value: 'school', label: '院校动态' },
      { value: 'professor', label: '教授动态' },
      { value: 'recruitment', label: '招生招聘' },
      { value: 'competition', label: '竞赛/会议' },
    ],

    emailLabel: '您的邮箱',
    emailPlaceholder: '用于反馈更新进度',

    detailsLabel: '详细说明',
    detailsPlaceholder: '请描述具体的修正内容、缺失信息或相关链接…',
    sourceHint: '* 请尽可能提供可验证的信息来源',

    attachmentLabel: '附件证明（可选）',
    uploadPrompt: '上传证明文件（图片、PDF、Word，单个不超过 5MB）',
    removeFile: '移除附件',

    submit: '提交更新提案',
    submitting: '正在提交…',

    errCategory: '请选择更新类别',
    errEmail: '请输入有效的邮箱地址',
    errDetails: '请填写详细说明',
    errTooLong: `详细说明不能超过 ${MAX_LEN} 字`,
    errFileSize: '单个文件需在 5MB 以内',
    errFileType: '仅支持图片、PDF 或 Word 文件',
    errServer: '提交失败，请稍后再试。',
    ok: '感谢！您的提案已送交审核。',

    metaDescription: '向 GISphere 提交院校、教授、招生与竞赛信息的更新与纠错。',
  },

  en: {
    title: 'Help Keep GISphere Up to Date',
    intro: [
      'Some of our data may not be fully up to date, and there may be missing entries or occasional errors — particularly for certain regions and institutions.',
      'Your contributions are what keep GISphere accurate and complete. If you notice incorrect or outdated information, or have additional data to share, please submit it here.',
    ],
    introHighlight:
      'Our team reviews and verifies submissions as soon as possible, and will get back to you if needed. Thank you for your support!',

    categoryLabel: 'Category',
    categoryPlaceholder: 'Select a category',
    categories: [
      { value: 'school', label: 'School Updates' },
      { value: 'professor', label: 'Professor Updates' },
      { value: 'recruitment', label: 'Recruitment' },
      { value: 'competition', label: 'Competitions / Conferences' },
    ],

    emailLabel: 'Your Email',
    emailPlaceholder: 'So we can follow up with you',

    detailsLabel: 'Details',
    detailsPlaceholder:
      'Describe the correction, the missing information, or a relevant link…',
    sourceHint: '* Please provide verifiable sources where possible',

    attachmentLabel: 'Attachments (optional)',
    uploadPrompt: 'Upload evidence — images, PDF, or Word, up to 5MB',
    removeFile: 'Remove attachment',

    submit: 'Submit Update Proposal',
    submitting: 'Submitting…',

    errCategory: 'Choose a category',
    errEmail: 'Enter a valid email address',
    errDetails: 'Add some details about the update',
    errTooLong: `Details must be under ${MAX_LEN} characters`,
    errFileSize: 'Files must be under 5MB',
    errFileType: 'Only images, PDF, and Word files are accepted',
    errServer: 'Submission failed. Please try again.',
    ok: 'Thank you — your proposal is now under review.',

    metaDescription:
      'Submit corrections and updates to GISphere program, faculty, and recruitment data.',
  },
}

export default {
  name: 'SuggestionPage',
  data() {
    return {
      MAX_LEN,
      ACCEPT,
      proposalCategory: '',
      proposalText: '',
      feedbackEmail: '',
      selectedFile: null,
      feedbackMessage: '',
      statusClass: '',
      isSubmitting: false,
      msgTimer: null,
    }
  },
  head() {
    return {
      title: this.t.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.t.metaDescription,
        },
      ],
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
    t() {
      return COPY[this.lang] || COPY.en
    },
    nearLimit() {
      return this.proposalText.length >= MAX_LEN * 0.95
    },
    canSubmit() {
      return (
        this.proposalCategory !== '' &&
        this.proposalText.trim().length > 0 &&
        this.proposalText.length <= MAX_LEN &&
        EMAIL_RE.test(this.feedbackEmail)
      )
    },
    readableSize() {
      if (!this.selectedFile) return ''
      const kb = this.selectedFile.size / 1024
      return kb < 1024
        ? `${Math.round(kb)} KB`
        : `${(kb / 1024).toFixed(1)} MB`
    },
  },
  beforeDestroy() {
    clearTimeout(this.msgTimer)
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0]
      if (!file) return

      const ext = '.' + (file.name.split('.').pop() || '').toLowerCase()
      if (!ACCEPT.split(',').includes(ext)) {
        this.showMessage(this.t.errFileType, 'error')
        this.clearFileInput()
        return
      }
      if (file.size > MAX_BYTES) {
        this.showMessage(this.t.errFileSize, 'error')
        this.clearFileInput()
        return
      }
      this.selectedFile = file
    },
    removeFile() {
      this.selectedFile = null
      this.clearFileInput()
    },
    clearFileInput() {
      if (this.$refs.fileInput) this.$refs.fileInput.value = ''
    },
    showMessage(msg, type) {
      clearTimeout(this.msgTimer)
      this.feedbackMessage = msg
      this.statusClass = type
      this.msgTimer = setTimeout(() => {
        this.feedbackMessage = ''
      }, 6000)
    },
    // Returns the first problem found, or null.
    validate() {
      if (!this.proposalCategory) return this.t.errCategory
      if (!EMAIL_RE.test(this.feedbackEmail)) return this.t.errEmail
      if (!this.proposalText.trim()) return this.t.errDetails
      if (this.proposalText.length > MAX_LEN) return this.t.errTooLong
      return null
    },
    async submitProposal() {
      if (this.isSubmitting) return

      const problem = this.validate()
      if (problem) {
        this.showMessage(problem, 'error')
        return
      }

      this.isSubmitting = true

      const formData = new FormData()
      formData.append('category', this.proposalCategory)
      formData.append('content', this.proposalText)
      formData.append('email', this.feedbackEmail)
      if (this.selectedFile) formData.append('file', this.selectedFile)

      try {
        // Uses the app's configured axios instance (baseURL, interceptors).
        // Do NOT set Content-Type — the browser adds the multipart boundary.
        await this.$axios.post('/api/send-proposal/', formData)
        this.showMessage(this.t.ok, 'success')
        this.resetForm()
      } catch (err) {
        this.showMessage(this.serverMessage(err), 'error')
      } finally {
        this.isSubmitting = false
      }
    },
    // Surface what the server actually said instead of a blanket failure.
    serverMessage(err) {
      const data = err && err.response && err.response.data
      if (typeof data === 'string' && data.length < 200) return data
      if (data && (data.message || data.detail || data.error)) {
        return data.message || data.detail || data.error
      }
      return this.t.errServer
    },
    resetForm() {
      this.proposalCategory = ''
      this.proposalText = ''
      this.feedbackEmail = ''
      this.selectedFile = null
      this.clearFileInput()
    },
  },
}
</script>

<style scoped>
.page {
  --brand: #2c3aaa;
  --brand-ink: #1e2a80;
  --brand-soft: rgba(44, 58, 170, 0.12);
  --ink: #1a1a1a;
  --ink-soft: #5a6270;
  --line: #e0e3ec;
  --nav-h: 56px;

  width: 100%;
  min-height: calc(100vh - var(--nav-h));
  min-height: calc(100svh - var(--nav-h));
  background: #ebeef5;
  padding: clamp(24px, 5vw, 60px) clamp(16px, 4vw, 32px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.card {
  /* was a hard 850px — that overflowed every viewport below it */
  width: min(850px, 100%);
  background: #fff;
  padding: clamp(28px, 5vw, 50px) clamp(20px, 5vw, 60px);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.card__header {
  margin-bottom: 28px;
  text-align: center;
}
.card__title {
  margin: 0;
  font-size: clamp(1.5rem, 3.4vw, 2rem);
  line-height: 1.3;
  color: var(--ink);
  letter-spacing: -0.5px;
}

.notice {
  margin-bottom: 36px;
  color: var(--ink-soft);
  font-size: 0.95rem;
  line-height: 1.7;
}
.notice p {
  margin: 0 0 12px;
}
.notice__highlight {
  margin-bottom: 0;
  padding-left: 14px;
  border-left: 3px solid var(--brand);
  color: var(--ink);
  font-weight: 500;
}

.form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.field {
  margin-bottom: 24px;
  text-align: left;
}
label,
.field__label {
  display: block;
  margin-bottom: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #34495e;
}

select,
textarea,
input[type='email'] {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background-color: #f9fafb;
  font: inherit;
  font-size: 1rem;
  color: var(--ink);
  box-sizing: border-box;
  transition: border-color 0.2s ease, background-color 0.2s ease,
    box-shadow 0.2s ease;
}
select:focus,
textarea:focus,
input:focus {
  outline: none;
  border-color: var(--brand);
  background-color: #fff;
  box-shadow: 0 0 0 4px var(--brand-soft);
}

textarea {
  /* min-height, not height: keeps the drag handle useful */
  min-height: 200px;
  line-height: 1.6;
  resize: vertical;
}

.field__meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  font-size: 0.85rem;
}
.hint {
  color: #95a5a6;
}
.counter {
  color: #b6bcc6;
  font-variant-numeric: tabular-nums;
}
.counter.is-over {
  color: #d9363e;
  font-weight: 700;
}

/* ---------- upload ---------- */
.upload {
  border: 2px dashed #dcdfe6;
  border-radius: 12px;
  background: #fcfcfc;
  transition: border-color 0.25s ease, background-color 0.25s ease;
}
.upload:hover {
  border-color: var(--brand);
  background: #f6f7fc;
}
.upload.has-file {
  border-style: solid;
  border-color: #5aa84f;
  background: #f3faf1;
}
.upload__input {
  /* visually hidden but still focusable, so the control is keyboard-reachable */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.upload__input:focus-visible + .upload__drop {
  outline: 3px solid #ffb703;
  outline-offset: 2px;
}
.upload__drop {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 60px;
  margin: 0;
  padding: 22px;
  font-weight: 400;
  color: #606266;
  font-size: 0.95rem;
  text-align: center;
  cursor: pointer;
}
.upload__plus {
  font-size: 24px;
  line-height: 1;
  color: var(--brand);
  font-weight: 300;
}
.upload__file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
}
.upload__icon {
  font-size: 1.4rem;
}
.upload__name {
  flex: 1;
  min-width: 0;
  color: #2c3e50;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.upload__size {
  color: var(--ink-soft);
  font-size: 0.85rem;
  white-space: nowrap;
}
.upload__remove {
  flex: none;
  padding: 5px 11px;
  border: none;
  border-radius: 6px;
  background: #ff4d4f;
  color: #fff;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;
}
.upload__remove:hover {
  background: #d9363e;
}

/* ---------- submit ---------- */
.submit {
  width: 100%;
  margin-top: 8px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: var(--brand);
  color: #fff;
  font: inherit;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(44, 58, 170, 0.28);
  transition: background 0.25s ease, transform 0.15s ease,
    box-shadow 0.25s ease;
}
.submit:hover:not(:disabled) {
  background: var(--brand-ink);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(44, 58, 170, 0.36);
}
.submit:disabled {
  background: #a6adda;
  cursor: not-allowed;
  box-shadow: none;
}

.feedback {
  margin: 18px 0 0;
  padding: 14px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}
.feedback--success {
  background: #f0f9eb;
  color: #4e9440;
}
.feedback--error {
  background: #fef0f0;
  color: #d9363e;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

:focus-visible {
  outline: 3px solid #ffb703;
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 640px) {
  .form__grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .upload__file {
    flex-wrap: wrap;
  }
  .upload__name {
    flex: 1 1 100%;
    white-space: normal;
    word-break: break-all;
  }
}
</style>
