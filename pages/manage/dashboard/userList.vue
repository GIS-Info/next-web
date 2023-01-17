<template>
  <div>
    <el-card>
      <!-- 搜索 添加 -->
      <!-- <el-row :gutter="20">
        <el-col :span="6">
          <el-input
v-model="queryInfo.query"
                    placeholder="请输入内容"
                    clearable
                    @clear="getUserList">
            <el-button
slot="append"
                       icon="el-icon-search"
                       @click="getUserList"></el-button>
          </el-input>
        </el-col>
      </el-row> -->
      <el-col :span="2">
        <el-button
          type="primary"
          @click="addDialogVisible = true">添加用户
        </el-button>
        </el-col>
      <!-- 用户列表区域 -->
      <el-table
:data="userlist"
                border
                stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column
type="index"
                         label="序号"></el-table-column>
        <el-table-column
prop="username"
                         label="用户名"></el-table-column>
        <el-table-column
prop="email"
                         label="邮箱"></el-table-column>
        <el-table-column
prop="mobile"
                         label="电话"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       circle
                       @click="showEditDialog(scope.row.username)"></el-button>
            <el-button
type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="removeUserById(scope.row.username)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
:current-page="queryInfo.pageNo"
                     :page-size="queryInfo.pageSize"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
title="添加用户"
               :visible.sync="addDialogVisible"
               width="50%"
               append-to-body
               @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form
ref="addUserFormRef"
               :model="addUserForm"
               :rules="addUserFormRules"
               label-width="100px">
        <el-form-item
label="用户名"
                      prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item
label="密码"
                      prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item
label="邮箱"
                      prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item
label="手机"
                      prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span
slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
type="primary"
                   @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
title="修改用户信息"
               :visible.sync="editDialogVisible"
               width="50%"
               append-to-body
               @close="editDialogClosed">
      <!-- 内容主体 -->
      <el-form
ref="editUserFormRef"
               :model="editUserForm"
               :rules="editUserFormRules"
               label-width="70px">
        <el-form-item label="用户名">
          <el-input
v-model="editUserForm.username"
                    disabled></el-input>
        </el-form-item>
        <el-form-item
label="邮箱"
                      prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item
label="手机"
                      prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span
slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
type="primary"
                   @click="editUser(editUserForm.username)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
// import axios from 'axios'

// import $ from 'jquery'


export
default {
    data() {
            return {
                // 获取用户列表查询参数对象
                queryInfo: {
                    query: "",
                    // 当前页数
                    pageNo: 1,
                    // 每页显示多少数据
                    pageSize: 5,
                },
                userlist: [],
                total: 0,
                // 添加用户对话框
                addDialogVisible: false,
                // 用户添加
                addUserForm: {
                    username: "",
                    password: "",
                    email: "",
                    mobile: "",
                },
                // 用户添加表单验证规则
                addUserFormRules: {
                    username: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }, {
                        min: 2,
                        max: 10,
                        message: "用户名的长度在2～10个字",
                        trigger: "blur",
                    }, ],
                    password: [{
                        required: true,
                        message: "请输入用户密码",
                        trigger: "blur"
                    }, {
                        min: 6,
                        max: 18,
                        message: "用户密码的长度在6～18个字",
                        trigger: "blur",
                    }, ],
                    email: [{
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur"
                    }],
                    mobile: [{
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    }, ],
                },
                // 修改用户
                editDialogVisible: false,
                editUserForm: {},
                // 编辑用户表单验证
                editUserFormRules: {
                    email: [{
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur"
                    }],
                    mobile: [{
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    }, ],
                },
                // 分配角色对话框
                setRoleDialogVisible: false,
                // 当前需要被分配角色的用户
                userInfo: {},
                // 所有角色数据列表
                rolesLsit: [],
                // 已选中的角色Id值
                selectRoleId: "",
            };
        },
        created() {
            // this.getUserList();
        },
        mounted() {
            this.getUserList();
        },

        methods: {
            // 查询用户
            getUserList() {
                    this.$axios.get('/api/manage/user')
                        .then(res => {
                            if (res.status === 200) {
                                this.userlist = res.data
                            } else {
                                this.$message.error(res.statusText);
                            }
                        }).catch(error => {
                            // console.log(error);
                            this.$message.error("网络异常"+error);
                        })
          
                },
                // 监听 pageSize改变的事件
                handleSizeChange(newSize) {
                    this.queryInfo.pageSize = newSize;
                    this.getUserList();
                },
                // 监听 页码值 改变事件
                handleCurrentChange(newSize) {
                    this.queryInfo.pageNo = newSize;
                    this.getUserList();
                },
                // 监听 添加用户对话框的关闭事件
                addDialogClosed() {
                    this.$refs.addUserFormRef.resetFields();
                },
                // 添加用户
                addUser() {
                    const _this = this
                    this.$refs.addUserFormRef.validate((valid) => {
                        if (valid) {
                            _this.$axios.post('/api/manage/user/', _this.addUserForm)
                                .then(res => {
                                    if (res.status === 201) {
                                        _this.$message({
                                            message: '保存成功',
                                            type: 'success'
                                        });
                                        _this.getUserList()
                                    } else {
                                        _this.$message.error(res.statusText);
                                    }
                                }).catch(error => {
                                    _this.$message.error("网络异常"+ error);
                                })
                        }
                    });

                },
                // 编辑用户信息
                 showEditDialog(id) {
                    this.editUserForm = {}
                    const _this = this
                    _this.$axios.get('/api/manage/user/'+id)
                        .then(res => {
                            if (res.status === 200) {
                                _this.editUserForm = res.data;
                                _this.editDialogVisible = true;                                
                            } else {
                                _this.$message.error(res.statusText);
                            }
                        }).catch(error => {
                            _this.$message.error("网络异常"+error);
                        })
                },
                // 监听修改用户对话框的关闭事件
                editDialogClosed() {
                    this.$refs.editUserFormRef.resetFields();
                },
                // 修改用户信息
                editUser(id) {
                    const _this = this
                    this.$refs.editUserFormRef.validate((valid) => {
                        if (valid) {
                            _this.$axios.patch('/api/manage/user/'+id+'/', this.addUserForm)
                                .then(res => {
                                    if (res.status === 204) {
                                        _this.$message({
                                            message: '保存成功',
                                            type: 'success'
                                        });
                                        _this.getUserList()
                                    } else {
                                        _this.$message.error(res.statusText);
                                    }
                                }).catch(error => {
                                    _this.$message.error("网络异常"+ error);
                                })
                        }
                    });

                },
                // 删除用户
                removeUserById(id) {
                    this.$confirm('确定删除该用户?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const _this = this
                        this.$axios.delete("/api/manage/user/" + id+"/")
                        .then(res => {
                            if (res.status === 204) {
                                _this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                _this.getUserList()
                            } else {
                                _this.$message.error(res.statusText);
                            }
                        }).catch(error => {
                            _this.$message.error("网络异常" + error);
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });               

                    

                },
        }
};
</script>

<style lang="less" scoped>
</style>