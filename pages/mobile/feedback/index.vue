<template>
  <div class="page">
    <el-form class="form" label-position="top">
      <h2 class="form-title">反馈 Feedback</h2>
      <p>通过在此部分提交您的信息，您即同意我们按照此处描述的方式收集和使用您的个人信息。我们声明，所有收集到的信息将被保密，不会向第三方披露。我们致力于保护您的隐私并确保您的信息安全。</p>
      <p>By submitting your information in this part, you hereby consent to the collection and use of your personal information as described herein. All collected information will be kept confidential and will not be disclosed to third parties.</p>

      <el-form-item label="反馈人姓名 Name" required>
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item label="反馈人邮箱 E-mail" required>
        <el-input v-model="email" type="email" />
      </el-form-item>
      <el-form-item label="反馈人所在机构 Institution" required>
        <el-input v-model="institution" />
      </el-form-item>

      <el-form-item label="反馈类型 Feedback Type" required>
        <el-radio-group v-model="type" class="type-group">
          <el-radio label="新增信息 Add Information" border />
          <el-radio label="修改信息 Amend Information" border />
          <el-radio label="其他 Other" border />
        </el-radio-group>
      </el-form-item>

      <p>如果你希望新增招生招聘资讯，请至少提供：<b>招生招聘单位</b>（中英文）、<b>所在国家或地区</b>、<b>招生招聘岗位</b>、<b>联系方式</b>。</p>
      <p>如果你希望新增院校指南，请至少提供：<b>院校名</b>（中英文）、<b>所在国家或地区</b>、<b>院校信息</b>（中英文）、<b>导师信息</b>（中英文）。</p>
      <p>如果你希望匿名提供信息，请注明。欢迎提出其他建议或意见，工作人员会在收到后尽快联系你。</p>

      <el-form-item label="正文 Content" required>
        <el-input v-model="content" type="textarea" :rows="8" />
      </el-form-item>

      <div class="buttons">
        <el-button @click="onCancel">取消 Cancel</el-button>
        <el-button @click="onReset">重置 Reset</el-button>
        <el-button type="primary" @click="onSubmit">提交 Submit</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MobileFeedback',
  layout: 'mobile',
  data() {
    return {
      name: '',
      email: '',
      institution: '',
      type: '',
      content: '',
    }
  },
  head() {
    return { title: 'GISphere | 反馈 Feedback' }
  },
  methods: {
    onSubmit() {
      if (!this.name || !this.email) {
        this.$message.warning('请填写姓名和邮箱 Name and e-mail are required')
        return
      }
      if (!this.content) {
        this.$message.warning('请填写正文 Content is required')
        return
      }
      if (this.content.length > 20000) {
        this.$message.warning('正文太长 Content is too long')
        return
      }
      // 与桌面端一致：反馈作为待审核草稿提交（is_public: 0），由管理员处理
      const payload = {
        title_cn: this.name,
        title_en: this.email,
        university_cn: this.institution,
        university_en: '',
        country_cn: '',
        country_en: '',
        job_cn: this.type,
        job_en: '',
        description: this.content,
        label_physical_geo: 0,
        label_human_geo: 0,
        label_urban: 0,
        label_gis: 0,
        label_rs: 0,
        label_gnss: 0,
        is_public: 0,
        is_deleted: 0,
      }
      this.$axios
        .post('/api/post/add/', payload)
        .then((res) => {
          if (res.data?.status === '200') {
            this.$message.success('提交成功，请等待工作人员处理')
            this.onReset()
          } else {
            this.$message.error(res.data?.msg || '提交失败，请稍后再试')
          }
        })
        .catch(() => {
          this.$message.error('提交失败，请稍后再试')
        })
    },
    onReset() {
      this.name = ''
      this.email = ''
      this.institution = ''
      this.type = ''
      this.content = ''
    },
    onCancel() {
      this.$router.push('/mobile')
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100%;
  background: #f5f7fa;
  padding: 16px;
  box-sizing: border-box;
}
.form {
  background: #fff;
  border-radius: 12px;
  padding: 20px 16px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}
.form-title {
  margin: 0 0 12px;
  color: #303133;
}
.form p {
  color: #8b8e93;
  font-size: 13px;
  line-height: 1.6;
  margin: 8px 0;
}
.type-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
}
.type-group .el-radio {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
