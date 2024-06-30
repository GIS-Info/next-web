<template>
<client-only>
  <div class="container">
    <div class="main">
      <el-form ref="form" class="form" :model="form" label-position="top" label-width="80px">
        <h2 class="form-title">反馈 Feedback</h2>
        <p>通过在此部分提交您的信息，您即同意我们按照此处描述的方式收集和使用您的个人信息。我们声明，所有收集到的信息将被保密，不会向第三方披露。我们致力于保护您的隐私并确保您的信息安全。</p>
        <p>By submitting your information in this part, you hereby consent to the collection and use of your personal information as described herein. We declare that all collected information will be kept confidential and will not be disclosed to third parties. We are committed to protecting your privacy and ensuring the security of your information.</p>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="反馈人姓名 Feedback Provider's Name" required>
              <el-input v-model="form.title_cn" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="反馈人邮箱 Feedback Provider's E-mail" required>
              <el-input v-model="form.title_en" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="反馈人所在机构 Feedback Provider's Institution" required>
              <el-input v-model="form.title_en" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-form-item label="反馈类型 Feedback Type" required>
            <el-radio-group v-model="form.type" required>
              <p><el-radio label="新增信息（招生招聘资讯或院校指南） Add Academic Recruiting or Institution Information" border /></p>
              <p style="margin-top: 10px;"><el-radio label="修改信息（招生招聘资讯或院校指南） Amend Academic Recruiting or Institution Information" border /></p>
              <p style="margin-top: 10px;"><el-radio label="其他 Other" border /></p>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <p>如果你希望新增招生招聘资讯，请至少提供以下信息：<b>招生招聘单位</b>（中英文）、<b>所在国家或地区</b>、<b>招生招聘岗位</b>、<b>联系方式</b>。</p>
        <p>如果你希望新增院校指南，请至少提供以下信息：<b>院校名</b>（中英文）、<b>所在国家或地区</b>、<b>院校信息</b>（中英文）、<b>导师信息</b>（中英文）。</p>
        <p>如果你希望匿名提供信息，请注明。</p>
        <p>欢迎提出其他建议或意见，工作人员会在收到后尽快联系你。</p>
        <p>If you wish to add new recruitment information, please provide at least: <b>institution name</b> (in Chinese and English), <b>country or region</b>, <b>recruitment position information</b>, and <b>contact information</b>.</p>
        <p>If you wish to add new institution Information, please provide at least: <b>institution name</b> (in Chinese and English), <b>country or region</b>, <b>institution introduction</b> (in Chinese and English), and <b>mentor information</b> (in Chinese and English).</p>
        <p>If you wish to provide information anonymously, please indicate. </p>
        <p>Any suggestion is welcome. Our staff will contact you as soon as possible.</p>
        <el-form-item label="正文 Content" required>
          <el-input
            type="textarea"
            :rows="10"
            placeholder=""
            v-model="textarea">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom-bar">
      <div class="bottom-button-container">
        <el-button @click="onCancel">取消 Cancel</el-button>
        <el-button @click="onReset">重置表单 Reset</el-button>
        <el-button type="primary" @click="onSubmit">提交 Submit</el-button>  
      </div>
    </div>
  </div>
</client-only>
</template>

<script>
export default {
  name: 'AddPost',
  data() {
    return {
      form: {
        label: [],
        title_cn: '',
        title_en: '',
        university_cn: '',
        university_en: '',
        university_id: '',
        job_cn: '',
        job_en: '',
        job_id: '',
        country_cn: '',
        country_en: '',
        country_id: '',
        description: '',
      },
  };
  },
  methods: {
    onSubmit() {
      console.log('form', this.form)
      if(this.form.description?.length > 20000) {
        alert('正文太长或正文包含的图片过大');
      }
      if(!this.form.title_cn || !this.form.title_en){
        alert('没有填写标题');
      }
      const payload = {
        university_cn: this.form.university_cn,
        university_en: this.form.university_en,
        country_cn: this.form.country_cn,
        country_en: this.form.country_en,
        job_cn: this.form.job_cn,
        job_en: this.form.job_en,
        description: this.form.description,
        title_cn: this.form.title_cn,
        title_en: this.form.title_en,
        label_physical_geo: this.form.label.includes('Label_Physical_Geo') ? 1 : 0,
        label_human_geo: this.form.label.includes('Label_Human_Geo') ? 1 : 0,
        label_urban: this.form.label.includes('Label_Urban') ? 1 : 0,
        label_gis: this.form.label.includes('Label_GIS') ? 1 : 0,
        label_rs: this.form.label.includes('Label_RS') ? 1 : 0,
        label_gnss: this.form.label.includes('Label_GNSS') ? 1 : 0,
        is_public: 0,
        is_deleted: 0
      }
        this.$axios.post("/api/post/add/", payload).then((res) => {
            if (res.data?.status === "200") {
                this.$message({
                    type: "success",
                    message: "提交成功，请等待管理员审核上架",
                });
            }
            else {
                alert(res.msg);
            }
        }).catch(error => {
            console.log("error", error);
            alert(error);
        });
    },
    onReset() {
      this.editorContent = '';
      this.form = {
        label: [],
        title_cn: '',
        title_en: '',
        university_cn: '',
        university_en: '',
        university_id: '',
        job_cn: '',
        job_en: '',
        job_id: '',
        country_cn: '',
        country_en: '',
        country_id: '',
        description: '',
      };
    },
    onCancel() {
      this.$router.push("../postList");
    },
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main{
    height: 200px;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    justify-content: flex-start;
    align-items: center;
  }
  .bottom-bar{
    width: 100%;
    height: 120px;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #DCDFE6;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .bottom-button-container{
      width: 100%;
      max-width: 1460px;
      padding: 35px 10px 35px 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
.form{
  width: 70%;
  min-width: 500px;
  max-width: 1000px;
  .form-title{
    margin-top: 70px;
  }
}

p{
  color: rgb(139, 142, 147);
  line-height: normal;
  font-size: 14px;
}

</style>