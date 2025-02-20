<template>
  <div class="main-container">
    <div class="content">
      <h2>Propose Information</h2>
      
      <!-- Category Selection -->
      <label for="category">Select a Category:</label>
      <select v-model="selectedCategory" @change="updateProposalText">
        <option value="">-- Select a Category --</option>
        <option value="school">Updates about Schools</option>
        <option value="professor">Updates about Professors</option>
        <option value="position">Updates about PhD/M.S/M.A/Intern Positions</option>
      </select>

      <!-- Proposal Input -->
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
      selectedCategory: '',
      proposalText: '',
      feedbackMessage: ''
    };
  },
  methods: {
    updateProposalText() {
      if (this.selectedCategory === 'school') {
        this.proposalText = "I would like to propose an update regarding recent changes in schools, such as curriculum updates, new policies, or administrative changes.";
      } else if (this.selectedCategory === 'professor') {
        this.proposalText = "I would like to share updates about a professor, such as recent publications, research projects, or achievements.";
      } else if (this.selectedCategory === 'position') {
        this.proposalText = "I would like to propose an update about PhD/M.S/M.A/Internship opportunities, including new positions, application deadlines, or funding availability.";
      } else {
        this.proposalText = "";
      }
    },
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
          this.selectedCategory = '';
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

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
