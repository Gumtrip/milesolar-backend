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
          <el-select v-model="postForm.category_id" placeholder="案例分类" name="category_id" required>
            <el-option v-for="(category,key) in categories" :key="key" :label="category.title" :value="category.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="postForm.intro" type="textarea" :rows="2" placeholder="请输入简介" />
        </el-form-item>

        <el-form-item>
          <el-switch
            v-model="postForm.is_index"
            active-text="首页显示"
            inactive-text="不在首页显示"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <el-form-item prop="desc" class="sample_content">
          <label>详细内容:</label>
          <Tinymce ref="editor" v-model="postForm.desc" :height="400" :upload-config="uploadConfig" />
        </el-form-item>
        <el-form-item prop="image">
          <Upload v-model="postForm.image" :upload-config="uploadConfig" />
        </el-form-item>

        <el-form-item class="input-text" prop="seo_title">
          <MDinput v-model="postForm.seo_title" :maxlength="100" name="seo_title">
            seo标题
          </MDinput>
        </el-form-item>

        <el-form-item>
          <el-input v-model="postForm.seo_keywords" type="textarea" :rows="2" placeholder="请输入SEO关键字" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="postForm.seo_desc" type="textarea" :rows="2" placeholder="请输入SEO描述" />
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
import { fetchSample, createSample, fetchSampleCategories, updateSample } from '@/api/sample'
import moment from 'moment'

const defaultForm = {
  status: '',
  title: '', // 案例题目
  intro: '', // 案例内容
  desc: '', // 案例内容
  is_index: 0, // 首页显示
  seo_title: '',
  seo_keywords: '',
  seo_desc: '',
  category_id: '', // 案例内容
  image: '', // 案例图片
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
          folder: 'sample',
          id: typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : ''
        }
      },
      updateDate: '',
      rules: {
        title: [{ validator: validateRequire }],
        category_id: [{ validator: validateRequire }],
        desc: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {},
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.id = id
      this.fetchData(id)
    }
    this.fetchSampleCategories()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchSample(id).then(response => {
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    async fetchSampleCategories() {
      const res = await fetchSampleCategories()
      this.categories = res.data.data
    },
    setTagsViewTitle() {
      const title = '编辑案例'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑案例'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.loading = true
          let res
          try {
            if (this.isEdit) {
              res = await updateSample(this.id, this.postForm)
            } else {
              res = await createSample(this.postForm)
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

  .sample_content {
    margin-bottom: 30px;
  }

  .sample-textarea ::v-deep {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
