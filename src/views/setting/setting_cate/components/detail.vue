<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button id="subBtn" v-loading="loading" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>
            <el-form-item label="排序">
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
import { fetchSettingCategory, createSettingCategory, updateSettingCategory } from '@/api/setting'

const defaultForm = {
  title: '', // 文章题目
  id: undefined
}

export default {
  name: 'Detail',
  components: { MDinput, Sticky },
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
      fetchSettingCategory(id).then(response => {
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()

        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },

    setTagsViewTitle() {
      const title = '编辑配置分类'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑配置分类'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.loading = true
          let res
          try {
            if (this.isEdit) {
              res = await updateSettingCategory(this.id, this.postForm)
            } else {
              res = await createSettingCategory(this.postForm)
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
  #subBtn{margin-left: 10px}
</style>
