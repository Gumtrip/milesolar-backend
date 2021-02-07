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

        <el-form-item class="input-text" prop="title" label="标题">
          <el-input v-model="postForm.title" placeholder="标题" />
        </el-form-item>
        <el-form-item class="input-text" prop="brief" label="简介">
          <el-input v-model="postForm.brief" type="textarea" :rows="10" placeholder="简介" />
        </el-form-item>
        <el-form-item prop="desc" class="sample_content">
          <label>详细内容:</label>
          <Tinymce ref="editor" v-model="postForm.content" :height="400" :upload-config="uploadConfig" />
        </el-form-item>
        <el-form-item prop="img" label="主图">
          <SingleUpload v-model="postForm.image" :upload-config="uploadConfig" />
        </el-form-item>

        <el-form-item prop="image" label="轮播图">
          <Upload v-model="postForm.images" :upload-config="uploadConfig" />
        </el-form-item>

        <el-form-item class="input-text" prop="seo_title">
          <el-input v-model="postForm.seo_title" placeholder="seo标题" />
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
import Upload from '@/components/Upload/SingleImage2'
import SingleUpload from '@/components/Upload/SingleImage'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchPage, createPage, updatePage } from '@/api/page'
import moment from 'moment'

const defaultForm = {
  title: '', // 案例题目
  content: '', // 案例内容
  seo_title: '',
  seo_keywords: '',
  seo_desc: '',
  images: [], // 图片
  id: undefined
}

export default {
  name: 'Detail',
  components: { Tinymce, Upload, Sticky, SingleUpload },
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
          folder: 'page',
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
      this.fetchData(id, { include: 'images' })
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    async fetchData(id, params) {
      const res = await fetchPage(id, params)
      this.postForm = res.data
      console.log(this.postForm)
    },
    submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            let msg
            if (this.isEdit) {
              await updatePage(this.id, this.postForm)
              this.updateDate = moment().format('YYYY-MM-DD H:m:s')
              msg = '修改成功'
            } else {
              const res = await createPage(this.postForm)
              this.$router.push({ name: 'PageEdit', params: { id: res.data.id }})
              msg = '创建成功'
            }
            this.$notify({ title: '成功', message: msg, type: 'success' })
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

</style>
