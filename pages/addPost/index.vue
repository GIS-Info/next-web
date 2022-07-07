<template>
  <div class="container">
    <div class="main">
      <div class="section">
        <el-form ref="form" :model="form" label-position="top" label-width="80px">
          <el-form-item label="职位" required>
            <el-input v-model="form.title" placeholder="输入具体职位"></el-input>
          </el-form-item>
          <el-row>
            <el-col span="8">
              <el-form-item label="类别" required>
                <el-select v-model="form.jobClass" placeholder="类别">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="级别" required>
                <el-select v-model="form.jobType" placeholder="级别">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="岗位数量" required>
                <el-select v-model="form.number" placeholder="数量">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                  <el-option label="5" value="5"></el-option>
                  <el-option label="大于5" value="-1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="机构/大学" required>
            <el-input v-model="form.university" placeholder="输入机构/大学名称"></el-input>
          </el-form-item>
          <el-form-item label="位置" required>
            <el-col span="8">
              <el-select v-model="form.country" placeholder="国家/地区">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-col>
            <el-col :span="16">
              <!-- !!! 暂时不设置城市，二期需求 !!!
              <el-select v-model="form.region" placeholder="城市">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
              -->
            </el-col>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="联系人" required>
                <el-input v-model="form.contact1" placeholder="输入联系姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="联系邮箱" required>
                <el-input v-model="form.email1" placeholder="输入联系邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="联系人2">
                <el-input v-model="form.contact2" placeholder="输入联系姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="联系邮箱2">
                <el-input v-model="form.email2" placeholder="输入联系邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="消息提供者" required>
                <el-input v-model="form.provider" placeholder="输入消息提供者姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="联系邮箱" required>
                <el-input v-model="form.providerEmail" placeholder="输入联系邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="信息来源">
            <el-input v-model="form.URL" placeholder="输入信息来源网址"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="section">
        <el-form ref="form" :model="form" label-position="top" label-width="80px">
          <el-form-item label="标签" required>
            <el-select v-model="form.fields" placeholder="选择或添加相关标签（多选）" multiple filterable allow-create style="width:100%">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学所需学位条件">
            <el-input v-model="form.requiredDegree" placeholder="输入学位"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col span="3">
              <el-switch
                v-model="form.hasStartTerm">
              </el-switch>
            </el-col>
            <el-col span="8">
              <el-select v-model="form.startYear" :disabled="!form.hasStartTerm">
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2020" value="2020"></el-option>
                <el-option label="2021" value="2021"></el-option>
                <el-option label="2022" value="2022"></el-option>
                <el-option label="2023" value="2023"></el-option>
                <el-option label="2024" value="2024"></el-option>
                <el-option label="2025" value="2025"></el-option>
                <el-option label="2026" value="2026"></el-option>
                <el-option label="2027" value="2027"></el-option>
                <el-option label="2028" value="2028"></el-option>
                <el-option label="2029" value="2029"></el-option>
                <el-option label="2030" value="2030"></el-option>
              </el-select>
            </el-col>
            <el-col span="8">
              <el-select v-model="form.startTerm" :disabled="!form.hasStartTerm">
                <el-option label="第一学期 Term 1" value="1"></el-option>
                <el-option label="第二学期 Term 2" value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="截止日期">
            <el-col span="5">
              <el-switch
                v-model="form.noDeadline"
                active-text="尽快申请">
              </el-switch>
            </el-col>
            <el-col span="10">
              <el-date-picker
                v-model="form.deadline"
                :disabled="form.noDeadline"
                type="date"
                placeholder="选择截止日期"
                style="width: 100%">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="补充">
            <el-input v-model="form.detail" type="textarea" :rows="17" placeholder="输入具体职位"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="bottom-button-container">
        <el-button>取消</el-button>
        <el-button>重置表单</el-button>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddPost',
  data() {
    return {
      form: {
        title: '',
        jobClass: '',
        jobType: '',
        number: '',
        university: '',
        country: '',
        contact1: '',
        email1: '',
        contact2: '',
        email2: '',
        provider: '',
        providerEmail: '',
        URL: '',
        fields: '',
        requiredDegree: '',
        hasStartTerm: '',
        startYear: '',
        startTerm: '',
        noDeadline: '',
        deadline: '',
        detail: '',
      }
    }
  },
  methods: {
  onSubmit() {
    alert('submit!');
  }
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
    flex-direction: row;
    overflow-y: scroll;
    flex-wrap: wrap;
    justify-content:center;
    align-items: flex-start;
    .section{
      width: 700px;
      margin: 20px;
      padding: 20px;
    }
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
.el-form-item{
    margin-bottom: 10px;
}
</style>