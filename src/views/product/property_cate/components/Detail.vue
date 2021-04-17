<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar'">
        <el-button v-loading="loading" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item label="名称:" prop="title" class="required">
          <el-input v-model="postForm.title" class="midFormInput" placeholder="名称" />
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { fetchPropertyCate, createPropertyCate, updatePropertyCate } from '@/api/product'

const defaultForm = {
  title: null,
  property_category_id: null
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
      postForm: Object.assign({}, defaultForm),
      categories: {},
      loading: false,
      rules: {
        title: [{ required: true, message: '名称是必填的', trigger: 'blur' }]
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
    async fetchData(id) {
      const res = await fetchPropertyCate(id)
      this.postForm = res.data
    },
    async submitForm() {
      try {
        const valid = await this.$refs.postForm.validate()
        if (valid) {
          this.loading = true
          if (this.isEdit) {
            await updatePropertyCate(this.id, this.postForm)
          } else {
            const res = await createPropertyCate(this.postForm)
            this.$router.push({ name: 'PropertyCateEdit', params: { id: res.data.id }})
          }
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
</style>
