<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="80px">
      <div class="createPost-main-container">
        <el-form-item label="名称:">
          <el-input v-model="postForm.name" />
        </el-form-item>
        <el-form-item label="邮件:">
          <el-input v-model="postForm.email" />
        </el-form-item>
        <el-form-item label="IP:">
          <el-input v-model="postForm.ip" />
        </el-form-item>
        <el-form-item label="SKYPE:">
          <el-input v-model="postForm.skype" />
        </el-form-item>
        <el-form-item label="信息:">
          <el-input v-model="postForm.msg" type="textarea" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item v-if="this.postForm.product_id>0" label="产品信息:">
          <h3 class="productTitle" v-text="this.postForm.product_info.title" />
          <div class="thumbImage flexPic">
            <a target="_blank" :href="baseUrl+'/products/'+this.postForm.product_id">
              <img :src="this.postForm.product_info.main_image" alt="">
            </a>
          </div>
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>

<script>
import { fetchMessage } from '@/api/message'

const defaultForm = {
  title: '', // 文章题目
  id: undefined
}

export default {
  name: 'ArticleDetail',
  components: {},
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
      baseUrl: process.env.VUE_APP_URL,
      id: undefined,
      postForm: Object.assign({}, defaultForm),
      categories: {},
      loading: false,
      uploadConfig: {
        data: {
          model: 'article'
        },
        uploadUrl: 'http://top-top.com/api/admin/images'
      },
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }]
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
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchMessage(id).then(response => {
        this.postForm = response.data
        console.log(this.postForm.product_info)
        // set tagsview title
        this.setTagsViewTitle()

        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },

    setTagsViewTitle() {
      const title = '编辑消息'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑消息'
      document.title = `${title} - ${this.postForm.id}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .productTitle{margin: 0}
  .thumbImage{width: 150px;height: 150px}
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
