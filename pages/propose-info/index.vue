<template>
  <div class="main-container">
    <div class="content">
      <h2>{{ lang === 'zh' ? '帮我们更新GISphere信息～' : 'Help Us Keep GISphere Information Accurate and Up-to-Date!' }}</h2>
      <div>
        <p>{{ lang === 'zh' ? '我们认可我们的数据可能不是最新的，且有些数据可能缺失或有时有错误，特别是在某些区域或机构。' : 'We acknowledge that some of our data might not be fully up-to-date, and there may be missing entries or occasional errors in our dataset, particularly in certain regions or institutions.' }}</p>
        <p>{{ lang === 'zh' ? '您的贡献是维持GISphere信息准确和完整的基础。如果您发现错误或不准确的信息，或者如果您有额外的数据可以分享，请在这里提交您的修正。' : 'Your contributions are invaluable in improving the accuracy and completeness of GISphere. If you notice incorrect or outdated information, or if you have additional data to share, please submit your corrections here.' }}</p>
        <p>{{ lang === 'zh' ? '我们真诚地欢迎您的支持！' : 'We truly appreciate your effort in keeping GISphere a reliable resource. Our team will review and verify the submitted updates as soon as possible and get back to you if needed. Thank you for your support!' }}</p>
      </div>
      <form @submit.prevent="submitProposal">
        <div class="form-group">
          <label for="proposalCategory">{{ lang === 'zh' ? '更新类别:' : 'What would you like to update?' }}</label>
          <select id="proposalCategory" v-model="proposalCategory" required>
            <option disabled value="">{{ lang === 'zh' ? '请选择类别' : 'Select a category' }}</option>
            <option value="school">{{ lang === 'zh' ? '院校动态' : 'School Updates' }}</option>
            <option value="professor">{{ lang === 'zh' ? '教授动态' : 'Professor Updates' }}</option>
            <option value="recruitment">{{ lang === 'zh' ? '招生招聘 (博士/硕士)' : 'Recruitment Updates (PhD/Masters)' }}</option>
            <option value="competition">{{ lang === 'zh' ? '论文竞赛/会议等' : 'Paper Competitions/Conferences/etc' }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="proposalText">{{ lang === 'zh' ? '详细内容:' : 'Details:' }}</label>
          <textarea
            id="proposalText"
            v-model="proposalText"
            :placeholder="lang === 'zh' ? '请输入您的提案内容...' : 'Describe the necessary correction or new information here...'"
            required
          ></textarea>
        </div>
        <button type="submit" :disabled="isSubmitting" class="submit-button">
          <span v-if="!isSubmitting">{{ lang === 'zh' ? '提交更新' : 'Submit Update' }}</span>
          <span v-else>{{ lang === 'zh' ? '提交中...' : 'Submitting...' }}</span>
        </button>
      </form>
      <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
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
      feedbackMessage: '',
      isSubmitting: false
    };
  },
  computed: {
    ...mapState({ lang: 'language' }) // Ensure language is managed globally
  },
  methods: {
    async submitProposal() {
      if (this.isSubmitting) return;

      if (!this.proposalCategory || !this.proposalText.trim()) {
        this.feedbackMessage = this.lang === 'zh'
          ? '请选择类别并输入您的提案内容。'
          : 'Please select a category and enter your proposal details.';
        return;
      }

      this.isSubmitting = true;

      try {
        const proposalData = {
          category: this.proposalCategory,
          content: this.proposalText
        };

        const response = await fetch('/api/send-proposal/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(proposalData)
        });

        if (response.ok) {
          this.feedbackMessage = this.lang === 'zh'
            ? '您的提案已成功提交！'
            : 'Your proposal has been sent successfully!';
          this.proposalCategory = '';
          this.proposalText = '';
        } else {
          this.feedbackMessage = this.lang === 'zh'
            ? '提交过程中出现错误，请稍后重试。'
            : 'There was an error sending your proposal. Please try again later.';
        }
      } catch (error) {
        console.error('Error sending proposal:', error);
        this.feedbackMessage = this.lang === 'zh'
          ? '提交过程中出现错误，请稍后重试。'
          : 'There was an error sending your proposal. Please try again later.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  background: #ebeef5;
  text-align: center;
  position: absolute;
  overflow: auto;
  padding-top: 40px;
}

.content {
  padding-bottom: 60px;
  width: 60%;
  margin: 0 auto;
  background: #ebeef5;
  border-radius: 0px;
  word-wrap: break-word;
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
  opacity: 0.7;
}

.submit-button:not(:disabled):hover {
  background-color: #66b1ff;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 150px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
  font-size: 1rem;
  color: #333;
}
</style>
