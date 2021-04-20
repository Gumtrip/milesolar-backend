<template>
  <div>
    <el-dialog
      id="userDia"
      :visible.sync="show"
      title="添加属性"
      width="800px"
      center
      @close="onClose"
    >
      <el-form ref="postForm" :rules="postForm" :model="postForm" label-width="140px">
        <el-form-item class="required" label="支出名称:" prop="title">
          <el-input v-model="postForm.title" />
        </el-form-item>
      </el-form>
      <div id="dia-footer">
        <el-button class="fr" @click="onClose">返回</el-button>
        <el-button class="fr mr-10" type="primary" @click="submitForm">确认添加</el-button>
        <div class="clearfix" />
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { createProductProperty, fetchProperties } from '@/api/product'

const defaultForm = {
  title: null,
  total_amount: 0,
  remark: '',
  id: null
}
export default {
  name: 'Property',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      postForm: defaultForm,
      properties: [],
      expenseRules: {
        property_id: [{ required: true, message: '属性是必填的', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialog(newVal, oldVal) {
      this.show = newVal
    },
    id(newVal, oldVal) {
      if (newVal) {
        this.getExpense(newVal)
      } else {
        this.postForm = defaultForm
      }
    }
  },
  created() {
    this.getProperties()
  },
  methods: {
    onClose() { // 关闭弹窗
      this.$emit('close-dia', false)
    },
    async submitForm() {
      try {
        const valid = await this.$refs.postForm.validate()
        if (valid) {
          this.postForm.order_id = this.order.id
          this.loading = true
          await createProductProperty(this.postForm)

          this.$notify({ title: '成功', message: '操作成功', type: 'success' })
          this.$emit('update-order', true)
          this.show = false
        } else {
          console.log('error submit!!')
          this.loading = false
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getProperties() {
      const res = await fetchProperties()
      this.properties = res.data
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
