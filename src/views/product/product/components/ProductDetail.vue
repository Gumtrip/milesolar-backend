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
          <el-input v-model="postForm.short_title" placeholder="请输入简称" />
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
            inactive-text="下架"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <!--属性-->
        <el-form-item>
          <el-button type="primary" @click="propertyBox=true">增加属性</el-button>
        </el-form-item>

        <el-form-item label="属性列表">
          <el-table :data="properties" class="listTable" fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="属性分类" width="100" prop="title" />
            <el-table-column align="center" label="属类">
              <template slot-scope="scope">
                <div v-for="(item,key) in scope.row.children" :key="key">
                  <span class="mr-10">{{ item.title }}</span>
                  <span class="pointer text-color" @click="deleteItem(item.pivot.id)">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
    <property v-if="isEdit" :id="postForm.id" :dialog="propertyBox" @close-dia="propertyBox=false" @update-order="fetchData" />

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage2'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchProduct, createProduct, updateProduct, fetchProductCategoryTrees, fetchPropertyCates, deleteProductProperty } from '@/api/product'
import { MessageBox, Notification } from 'element-ui'

import moment from 'moment'
import CatTree from '@/components/CatTree' //
import Property from './Property'
import _ from 'lodash'

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
  components: { Tinymce, MDinput, Upload, Sticky, CatTree, Property },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: undefined,
      postForm: Object.assign({}, defaultForm),
      categories: [],
      propertyCates: [],
      loading: false,
      propertyBox: false,
      properties: [],
      uploadConfig: {
        data: {
          folder: 'product',
          id: typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : ''
        }
      },
      updateDate: '',
      rules: {
        title: [{ required: true, message: '名称是必填的', trigger: 'blur' }]

      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    if (this.isEdit) {
      this.id = this.$route.params && this.$route.params.id
      this.fetchData()
    }
    this.fetchProductCategoryTrees()
  },
  methods: {
    async fetchData() {
      const response = await fetchProduct(this.id, {
        append: 'path_group,info_group',
        include: 'properties'
      })
      this.postForm = response.data
      // TODO 暂时想不到更好的方法
      this.postForm.info_0_m = response.data.info_group.info_0_m
      this.postForm.info_1_m = response.data.info_group.info_1_m
      this.postForm.info_2_m = response.data.info_group.info_2_m
      const properties = this.postForm.properties
      if (properties) {
        this.createPropertyData(properties)
      }
    },
    async fetchProductCategoryTrees() {
      const res = await fetchProductCategoryTrees()
      this.categories = res.data
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
    },
    // 生成属性数据
    async  createPropertyData(properties) {
      const propertyIds = []// 用来请求属性分类

      const tree = _.groupBy(properties, 'property_category_id')// 将属性根据分类分组
      properties.forEach(item => {
        const cateId = item.property_category_id
        if (_.indexOf(propertyIds, cateId) === -1) {
          propertyIds.push(cateId)
        }
      })
      // 获取需要的属性分类
      const query = encodeURI({ filter: { id_in: propertyIds }})
      const res = await fetchPropertyCates(query)

      this.propertyCates = res.data.data
      const data = []
      this.propertyCates.forEach((cate, key) => {
        data.push({
          title: cate.title,
          children: tree[cate.id]
        })
      })
      this.properties = data
    },

    deleteItem(id) {
      MessageBox.confirm('此操作将永久删除属性, 是否继续？', '提示', {
      })
        .then(async() => {
          await deleteProductProperty(id)
          Notification({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
        })
        .catch(() => {})
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
