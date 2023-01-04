<!-- todo: 图片大小压缩，或上传到第三方存储 -->
<template>
    <client-only>
      <div class="container">
        <div class="main">
          <el-form ref="form" class="form" :model="form" label-position="top" label-width="80px">
            <h2 class="form-title">编辑 GISource 帖子</h2>
            <el-form-item label="标题（中文）" required>
              <el-input v-model="form.title_cn" placeholder="输入 GISource 帖子标题（中文）"></el-input>
            </el-form-item>
            <el-form-item label="标题（英文）" required>
              <el-input v-model="form.title_en" placeholder="输入 GISource 帖子标题（英文）"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="类别（中文）">
                  <el-input v-model="form.job_cn" placeholder="例如：硕士、博士、博士后、助理教授">
                  </el-input>
                  <!-- 后续考虑改造为可选择的 -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类别（英文）">
                  <el-input v-model="form.job_en" placeholder="例如: Doctoral Student、Research Assistance">
                  </el-input>
                  <!-- 后续考虑改造为可选择的 -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="机构/大学（中文）">
                  <el-input v-model="form.university_cn" placeholder="例如：纽约大学">
                  </el-input>
                  <!-- 后续考虑改造为可选择的 -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="机构/大学（英文）">
                  <el-input v-model="form.university_en" placeholder="例如: New York University">
                  </el-input>
                  <!-- 后续考虑改造为可选择的 -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="国家/地区（中文）">
                  <el-input v-model="form.country_cn" placeholder="例如：美国">
                  </el-input>
                  <!-- 后续考虑改造为可选择的 -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="国家/地区（英文）">
                  <el-input v-model="form.country_en" placeholder="例如：United States">
                  </el-input>
                  <!-- 后续考虑改造为可选择的 -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="标签">
              <el-select v-model="form.label" placeholder="选择或添加相关标签（多选）" multiple filterable style="width:100%">
                <el-option label="自然地理" value="Label_Physical_Geo"></el-option>
                <el-option label="人文地理" value="Label_Human_Geo"></el-option>
                <el-option label="城市及区域规划" value="Label_Urban"></el-option>
                <el-option label="GIS" value="Label_GIS"></el-option>
                <el-option label="遥感（RS）" value="Label_RS"></el-option>
                <el-option label="定位导航与测绘（GNSS）" value="Label_GNSS"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="正文" required>
              <!-- <el-input v-model="form.detail" type="textarea" :rows="17" placeholder=""></el-input> -->
              <!-- vue-quill-editor 富文本编辑器 -->
              <div
                v-quill:myQuillEditor="editorOption" 
                class="quill-editor"
                :content="form.description"
                @change="onEditorChange($event)">
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom-bar">
          <div class="bottom-button-container">
            <el-button @click="onCancel">取消</el-button>
            <el-button @click="onReset">重置表单</el-button>
            <el-button type="primary" @click="onSubmit">编辑成功</el-button>  
          </div>
        </div>
      </div>
    </client-only>
    </template>
    
    <script>
    // import * as dayjs from 'dayjs'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
      name: 'AddPost',
      data() {
        return {
          form: {
            // label: [],
            // title_cn: '',
            // title_en: '',
            // university_cn: '',
            // university_en: '',
            // university_id: '',
            // job_cn: '',
            // job_en: '',
            // job_id: '',
            // country_cn: '',
            // country_en: '',
            // country_id: '',
            // description: '',
          },
          editorOption: {
          }
        }
      },
      mounted() {
        this.form = this.$route.query?.item;
        console.log('this.form :>> ', this.form);
      },
      methods: {  
        onSubmit() {
          if(this.form.description?.length > 20000) {
            alert('正文太长或正文包含的图片过大');
          }
          if(!this.form.title_cn || !this.form.title_en){
            alert('没有填写标题');
          }
          // const payload = {
          //   university_cn: this.form.university_cn,
          //   university_en: this.form.university_en,
          //   country_cn: this.form.country_cn,
          //   country_en: this.form.country_en,
          //   job_cn: this.form.job_cn,
          //   job_en: this.form.job_en,
          //   description: this.form.description,
          //   title_cn: this.form.title_cn,
          //   title_en: this.form.title_en,
          //   label_physical_geo: this.form.label.includes('Label_Physical_Geo') ? 1 : 0,
          //   label_human_geo: this.form.label.includes('Label_Human_Geo') ? 1 : 0,
          //   label_urban: this.form.label.includes('Label_Urban') ? 1 : 0,
          //   label_gis: this.form.label.includes('Label_GIS') ? 1 : 0,
          //   label_rs: this.form.label.includes('Label_RS') ? 1 : 0,
          //   label_gnss: this.form.label.includes('Label_GNSS') ? 1 : 0,
          //   date: dayjs().format('YYYY-MM-DD')
          // };
          const url = 'api/manage/post/' + this.form.event_id;
          this.$axios.post(url, this.form).then((res)=>{
            if(res.data?.msg === 'success'){
              alert('提交成功')
            } else {
              alert(res.msg)
            }
          }).catch(error=>{
            console.log('error', error)
            alert(error)
          });
        },
        onReset() {
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
          this.$router.push('../postList');
        },
        onEditorChange({ editor, html, text }) {
            console.log('editor change!', editor, html, text)
            if(html || html === ''){
              this.form.description = html
            }
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
      .quill-editor{
        height: 500px;
      }
    }
    
    </style>