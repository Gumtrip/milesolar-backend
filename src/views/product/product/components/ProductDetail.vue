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
        <el-form-item label="简称：">
          <el-input v-model="postForm.short_title" type="textarea" :rows="2" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item prop="category_id" label="分类：">
          <cat-tree v-model="postForm.category_id" :options="categories" :default-value="postForm.category_id" />
        </el-form-item>

        <el-form-item label="简介：">
          <el-input v-model="postForm.brief" type="textarea" :rows="2" placeholder="请输入简介" />
        </el-form-item>

        <el-form-item label="报价简介：">
          <el-input v-model="postForm.offer_desc" type="textarea" :rows="5" placeholder="请输入报价简介" />
        </el-form-item>

        <el-form-item label="首页显示：">
          <el-switch
            v-model="postForm.is_index"
            active-text="首页显示"
            inactive-text="不在首页显示"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="上下架：">
          <el-switch
            v-model="postForm.status"
            active-text="上架"
            inactive-text="下架架"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <el-form-item prop="info_0_m" class="article_content">
          <label>Feature:</label>
          <Tinymce ref="editor" v-model="postForm.info_0_m" :height="400" :upload-config="uploadConfig" />
        </el-form-item>

        <el-form-item class="article_content">
          <label>Specification:</label>
          <Tinymce ref="editor" v-model="postForm.info_1_m" :height="400" :upload-config="uploadConfig" />
        </el-form-item>

        <el-form-item class="article_content">
          <label>Application:</label>
          <Tinymce ref="editor" v-model="postForm.info_2_m" :height="400" :upload-config="uploadConfig" />
        </el-form-item>

        <el-form-item prop="images">
          <Upload ref="uploader" v-model="postForm.images" :upload-config="uploadConfig" />
        </el-form-item>

        <el-form-item class="input-text" prop="seo_title">
          <MDinput v-model="postForm.seo_title" :maxlength="100" name="seo_title">
            seo标题
          </MDinput>
        </el-form-item>
        <el-form-item label="SEO关键字">
          <el-input v-model="postForm.seo_keywords" type="textarea" :rows="2" placeholder="请输入SEO关键字" />
        </el-form-item>
        <el-form-item label="SEO描述">
          <el-input v-model="postForm.seo_desc" type="textarea" :rows="2" placeholder="请输入SEO描述" />
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage2'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchProduct, createProduct, updateProduct, fetchProductCategoryTrees } from '@/api/product'
import moment from 'moment'
import CatTree from '@/components/CatTree' //

const defaultForm = {
  title: '', // 产品题目
  brief: '',
  info_0_m: '', // 产品内容
  info_1_m: '', // 产品内容
  info_2_m: '', // 产品内容
  seo_title: '',
  seo_keywords: '',
  is_index: 0, // 首页显示
  status: 1, // 上下架
  seo_desc: '',
  category_id: null, // 产品分类
  images: [], // 产品图片
  id: undefined
}

export default {
  name: 'ProductDetail',
  components: { Tinymce, MDinput, Upload, Sticky, CatTree },
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
      categories: [],
      loading: false,
      uploadConfig: {
        data: {
          folder: 'product',
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
  computed: {

  },
  watch: {

  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.id = id
      this.fetchData(id)
    }
    this.fetchProductCategoryTrees()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchProduct(id, {
        append: 'path_group,info_group'
      }).then(response => {
        this.postForm = response.data
        // TODO 暂时想不到更好的方法
        this.postForm.info_0_m = response.data.info_group.info_0_m
        this.postForm.info_1_m = response.data.info_group.info_1_m
        this.postForm.info_2_m = response.data.info_group.info_2_m
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    async fetchProductCategoryTrees() {
      const res = await fetchProductCategoryTrees()
      this.categories = res.data
    },
    setTagsViewTitle() {
      const title = '编辑产品'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑产品'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.loading = true
          let res
          try {
            if (this.isEdit) {
              res = await updateProduct(this.id, this.postForm)
            } else {
              res = await createProduct(this.postForm)
            }
            if (res.status === 201) {
              // TODO 不知道为什么这样写的话，你会发现defaultForm 的值已经改变了
              // this.postForm = defaultForm
              // this.postForm = {}
              this.postForm.images.splice(0, this.postForm.images.length)// 不能够这样写 this.postForm.images=[]
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

  .article_content {
    margin-bottom: 30px;
  }

  .article-textarea ::v-deep {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
