<template>
  <div class="main-container">
    <div class="content">
      <h2>{{ lang === 'zh' ? '提交您的提案' : 'Submit Your Proposal' }}</h2>
      <form @submit.prevent="submitProposal">
        <div class="form-group">
          <label for="proposalCategory">{{ lang === 'zh' ? '提案类别:' : 'Proposal Category:' }}</label>
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
            :placeholder="lang === 'zh' ? '请输入您的提案内容...' : 'Type your proposal here...'"
            required
          ></textarea>
        </div>
        <button type="submit" :disabled="isSubmitting" class="submit-button">
          <span v-if="!isSubmitting">{{ lang === 'zh' ? '提交提案' : 'Submit Proposal' }}</span>
          <span v-else>{{ lang === 'zh' ? '提交中...' : 'Submitting...' }}</span>
        </button>
      </form>
      <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
    </div>
  </div>
</template>


<script>
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
  methods: {
    async submitProposal() {
      // Prevent multiple submissions
      if (this.isSubmitting) return;

      // Validate required fields
      if (!this.proposalCategory || !this.proposalText.trim()) {
        this.feedbackMessage = 'Please select a category and enter your proposal details.';
        return;
      }

      this.isSubmitting = true;

      try {
        // Prepare proposal data to send
        const proposalData = {
          category: this.proposalCategory,
          content: this.proposalText
        };

        // Send a POST request to your backend endpoint
        const response = await fetch('/api/send-proposal/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(proposalData)
        });

        if (response.ok) {
          this.feedbackMessage = 'Your proposal has been sent successfully!';
          this.proposalCategory = '';
          this.proposalText = '';
        } else {
          this.feedbackMessage = 'There was an error sending your proposal. Please try again later.';
        }
      } catch (error) {
        console.error('Error sending proposal:', error);
        this.feedbackMessage = 'There was an error sending your proposal. Please try again later.';
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

/* Additional global styles that might be used elsewhere */
.pdf {
  width: 100%;
  height: 70vh;
}

a {
  text-decoration: none;
  color: rgb(60, 101, 166);
}

a:hover {
  background-color: rgb(198, 212, 235);
}
</style>
