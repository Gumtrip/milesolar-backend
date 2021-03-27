<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
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
            <el-form-item class="input-text" label="简介：" prop="brief">
              <el-input v-model="postForm.brief" type="textarea" :rows="5" />
            </el-form-item>
            <el-form-item prop="image">
              <Upload v-model="postForm.image" :upload-config="uploadConfig" />
            </el-form-item>
            <el-form-item label="所属分类">
              <cat-tree v-model="postForm.parent_id" :options="categoryTrees" :default-value="postForm.parent_id" />
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

            <el-form-item>
              <el-input v-model="postForm.order" placeholder="排序" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import CatTree from '@/components/CatTree' //
import Upload from '@/components/Upload/SingleImage'

import { fetchProductCategory, createProductCategory, updateProductCategory, fetchProductCategoryTrees } from '@/api/product'

const defaultForm = {
  title: '', // 文章题目
  id: null,
  parent_id: null,
  image: '' // 图片
}

export default {
  name: 'CategoryDetail',
  components: { CatTree, MDinput, Sticky, Upload },
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
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }]
      },
      uploadConfig: {
        data: {
          folder: 'product_category',
          id: typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : ''
        }
      },
      tempRoute: {},
      categoryTrees: []
    }
  },
  computed: {
  },
  created() {
    const treeQuery = {
      depth: 1
    }
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.id = id
      this.fetchData(id)
      treeQuery.id = id
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.tempRoute = Object.assign({}, this.$route)
    this.fetchTrees(treeQuery)
  },
  methods: {
    fetchData(id) {
      fetchProductCategory(id).then(response => {
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()

        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    async fetchTrees(query) {
      const trees = await fetchProductCategoryTrees(query)
      this.categoryTrees = trees.data
    },
    setTagsViewTitle() {
      const title = '编辑产品分类'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑产品分类'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.loading = true
          let res
          try {
            if (this.isEdit) {
              res = await updateProductCategory(this.id, this.postForm)
            } else {
              res = await createProductCategory(this.postForm)
            }

            if (res.status === 201 || res.status === 200) {
              this.$notify({
                title: '成功',
                message: '提交成功',
                type: 'success',
                duration: 2000
              })
              this.postForm.status = 'published'
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
