<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="100px">
      <sticky :z-index="10" :class-name="'sub-navbar'">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item label="名字:" prop="name" class="required">
          <el-input v-model="postForm.name" class="mid-input" placeholder="名字" />
        </el-form-item>

        <el-form-item label="email:">
          <el-input v-model="postForm.email" class="mid-input" placeholder="email" />
        </el-form-item>
        <el-form-item label="移动电话:">
          <el-input v-model="postForm.mobile" class="mid-input" placeholder="mobile" />
        </el-form-item>
        <el-form-item label="skype:">
          <el-input v-model="postForm.skype" class="mid-input" placeholder="skype" />
        </el-form-item>

        <el-form-item label="whatsapp:">
          <el-input v-model="postForm.whatsapp" class="mid-input" placeholder="whatsapp" />
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { fetchClient, createClient, updateClient } from '@/api/client'

const defaultForm = {
  name: null,
  email: null,
  mobile: null,
  skype: null,
  whatsapp: null
}

export default {
  name: 'Detail',
  components: { Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: undefined,
      loading: false,
      postForm: Object.assign({}, defaultForm),
      rules: {
        name: [{ required: true, message: '姓名是必填的', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.id = id
      this.fetchData(id)
    }
  },
  methods: {
    async submitForm() {
      try {
        const valid = await this.$refs.postForm.validate()
        if (valid) {
          this.loading = true
          let res
          if (this.id) {
            res = await updateClient(this.id, this.postForm)
          } else {
            res = await createClient(this.postForm)
          }
          this.$router.push({ name: 'ClientEdit', params: { id: res.data.id }})
          this.$notify({ title: '成功', message: '操作成功', type: 'success' })
          this.loading = false
        } else {
          console.log('error submit!!')
          this.loading = false
        }
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    async fetchData(id) {
      const res = await fetchClient(id)
      this.postForm = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

</style>
