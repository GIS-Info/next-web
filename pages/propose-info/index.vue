<template>
  <div class="main-container">
    <div class="content">
      <h2>Submit Your Proposal</h2>
      <form @submit.prevent="submitProposal">
        <div class="form-group">
          <label for="proposalCategory">Proposal Category:</label>
          <select id="proposalCategory" v-model="proposalCategory" required>
            <option disabled value="">Select a category</option>
            <option value="school">School Updates</option>
            <option value="professor">Professor Updates</option>
            <option value="recruitment">Recruitment Updates (PhD/Masters)</option>
            <option value="competition">Paper Competitions/Meetings</option>
          </select>
        </div>
        <div class="form-group">
          <label for="proposalText">Details:</label>
          <textarea
            id="proposalText"
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
import emailjs from 'emailjs-com';

export default {
  name: 'ProposeInformation',
  data() {
    return {
      proposalCategory: '',
      proposalText: '',
      feedbackMessage: ''
    };
  },
  methods: {
    async submitProposal() {
      if (!this.proposalCategory || !this.proposalText.trim()) {
        this.feedbackMessage = 'Please select a category and enter your proposal details.';
        return;
      }

      // Configure the email template parameters
      const templateParams = {
        proposal_category: this.proposalCategory,
        proposal_text: this.proposalText,
        to_email: 'gisphere@outlook.com'
      };

      try {
        // Send the email using EmailJS
        const result = await emailjs.send(
          'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
          templateParams,
          'YOUR_USER_ID'        // Replace with your EmailJS user ID (public key)
        );
        console.log(result.text);
        this.feedbackMessage = 'Your proposal has been sent successfully!';
        this.proposalCategory = '';
        this.proposalText = '';
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

.form-group {
  margin-bottom: 20px;
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
