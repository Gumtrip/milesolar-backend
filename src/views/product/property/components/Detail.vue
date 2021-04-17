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
        <el-form-item prop="category_id" label="分类:" class="required">
          <el-select v-model="postForm.property_category_id" placeholder="分类" name="category_id" required>
            <el-option v-for="(cate,key) in categories" :key="key" :label="cate.title" :value="cate.id" />
          </el-select>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { fetchProperty, createProperty, updateProperty, fetchPropertyCates } from '@/api/product'

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
    this.getCates()
  },
  methods: {
    async fetchData(id) {
      const res = await fetchProperty(id, { include: 'property_category' })
      this.postForm = res.data
    },
    async getCates() {
      const res = await fetchPropertyCates()
      this.categories = res.data.data
    },
    async submitForm() {
      try {
        const valid = await this.$refs.postForm.validate()
        if (valid) {
          this.loading = true
          if (this.isEdit) {
            await updateProperty(this.id, this.postForm)
          } else {
            const res = await createProperty(this.postForm)
            this.$router.push({ name: 'PropertyEdit', params: { id: res.data.id }})
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
  .totalAmount ::v-deep {
    display: flex;
    .el-input--suffix{width: 100px}
  }
  .picBox{width: 50px;height: 50px;margin: 0 auto}
  #itemBox{margin-bottom: 20px}
</style>
