<template>
  <div class="main-container">
    <div class="content">
      <h2>Propose Information</h2>
      <form @submit.prevent="submitProposal">
        <div class="time-line">
          <textarea
            v-model="proposalText"
            placeholder="Type your proposal here..."
            required
          ></textarea>
        </div>
        <button type="submit">Submit Proposal</button>
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
      proposalText: '',
      feedbackMessage: ''
    };
  },
  methods: {
    async submitProposal() {
      if (!this.proposalText.trim()) {
        this.feedbackMessage = 'Please enter a proposal before submitting.';
        return;
      }

      try {
        const response = await fetch('/api/send-proposal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'gisphere@outlook.com',
            subject: 'New Proposal Submission',
            content: this.proposalText
          })
        });

        if (response.ok) {
          this.feedbackMessage = 'Your proposal has been sent successfully!';
          this.proposalText = '';
        } else {
          this.feedbackMessage = 'There was an error sending your proposal. Please try again later.';
        }
      } catch (error) {
        console.error('Error sending proposal:', error);
        this.feedbackMessage = 'There was an error sending your proposal. Please try again later.';
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

.time-line {
  border-left: 10px solid #a08202;
  padding-left: 30px;
  padding-bottom: 30px;
  margin-bottom: 100px;
}

textarea {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
