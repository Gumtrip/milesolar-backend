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
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

          </el-col>
        </el-row>
        <el-form-item prop="article_category_id">
          <el-select v-model="postForm.article_category_id" placeholder="文章分类" name="article_category_id" required>
            <el-option v-for="(category,key) in categories" :key="key" :label="category.title" :value="category.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="content" class="article_content">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" :upload-config="uploadConfig" />
        </el-form-item>
        <el-form-item prop="image_uri">
          <Upload v-model="postForm.image_uri" :upload-config="uploadConfig" />
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
import { fetchArticle, createArticle, fetchArticleCategories, updateArticle } from '@/api/article'
import moment from 'moment'

const defaultForm = {
  status: '',
  title: '', // 文章题目
  content: '', // 文章内容
  article_category_id: '', // 文章内容
  image_uri: '', // 文章图片
  id: undefined
}

export default {
  name: 'ArticleDetail',
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
          model: 'article'
        }
      },
      updateDate: '',
      rules: {
        title: [{ validator: validateRequire }],
        article_category_id: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {

  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.id = id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.fetchArticleCategories()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    async fetchArticleCategories() {
      const res = await fetchArticleCategories()
      this.categories = res.data.data
    },
    setTagsViewTitle() {
      const title = '编辑文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑文章'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.loading = true
          let res
          try {
            if (this.isEdit) {
              res = await updateArticle(this.id, this.postForm)
            } else {
              res = await createArticle(this.postForm)
            }

            if (res.status === 201) {
              this.postForm = {}
              this.$refs.editor.setContent('')
              this.$notify({ title: '成功', message: '创建成功', type: 'success' })
            }
            if (res.status === 200) {
              this.updateDate = moment().format('YYYY-DD-MM H:m:s')
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
.article_content{margin-bottom: 30px;}
.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
