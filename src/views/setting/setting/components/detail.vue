<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar'">
        <span v-show="updateDate" class="timeTips" v-text="'更新于:'+updateDate" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item class="input-text" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="category_id">
          <el-select v-model="postForm.category_id" placeholder="配置分类" name="category_id" required>
            <el-option v-for="(category,key) in categories" :key="key" :label="category.title" :value="category.id" />
          </el-select>
        </el-form-item>

        <el-form-item prop="type">
          <el-select v-model="postForm.type" placeholder="配置分类" name="type" required>
            <el-option v-for="(type,key) in typeMap" :key="key" :label="type.title" :value="type.value" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="postForm.type === 1">
          <el-input v-model="postForm.value" type="textarea" :rows="2" placeholder="请输入配置内容" />
        </el-form-item>

        <el-form-item v-if="postForm.type === 2" prop="image">
          <Upload v-model="postForm.value" :upload-config="uploadConfig" />
        </el-form-item>

        <el-form-item v-if="postForm.type === 3" prop="desc" class="setting_content">
          <label>详细内容:</label>
          <Tinymce ref="editor" v-model="postForm.value" :height="400" :upload-config="uploadConfig" />
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchSetting, createSetting, fetchSettingCategories, updateSetting } from '@/api/setting'
import moment from 'moment'

const defaultForm = {
  title: '', //
  value: '', //
  type: 1, //
  category_id: '', //
  id: undefined
}

export default {
  name: 'Detail',
  components: { Tinymce, MDinput, Upload, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      id: undefined,
      postForm: Object.assign({}, defaultForm),
      categories: {},
      loading: false,
      uploadConfig: {
        data: {
          folder: 'setting',
          id: typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : ''
        }
      },
      updateDate: '',
      rules: {
        title: [{ validator: validateRequire }],
        category_id: [{ validator: validateRequire }],
        desc: [{ validator: validateRequire }]
      },
      tempRoute: {},
      typeMap: [
        { title: '文本', value: 1 },
        { title: '图片', value: 2 },
        { title: '富文本', value: 3 }
      ]
    }
  },
  computed: {},
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.id = id
      this.fetchData(id)
    }
    this.fetchSettingCategories()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchSetting(id).then(response => {
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    async fetchSettingCategories() {
      const res = await fetchSettingCategories()
      this.categories = res.data.data
    },
    setTagsViewTitle() {
      const title = '编辑配置'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑配置'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.loading = true
          let res
          try {
            if (this.isEdit) {
              res = await updateSetting(this.id, this.postForm)
            } else {
              res = await createSetting(this.postForm)
            }

            if (res.status === 201) {
              this.postForm = {}
              this.$refs.editor.setContent('')
              this.$notify({ title: '成功', message: '创建成功', type: 'success' })
            }
            if (res.status === 200) {
              this.updateDate = moment().format('YYYY-MM-DD H:m:s')
              this.$notify({ title: '成功', message: '修改成功', type: 'success' })
            }
          } catch (e) {
            console.log(e)
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          this.loading = false
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .input-text {
    margin-bottom: 40px
  }

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .setting_content {
    margin-bottom: 30px;
  }

  .setting-textarea /deep/ {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
