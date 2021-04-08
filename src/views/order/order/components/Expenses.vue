<template>
  <div>
    <el-dialog
      id="userDia"
      :visible.sync="show"
      title="添加支出"
      width="800px"
      center
      @close="onClose"
    >
      <el-form ref="expenseForm" :rules="expenseRules" :model="listQuery" label-width="140px">
        <el-form-item class="required" label="支出名称:" prop="title">
          <el-input v-model="postForm.title" />
        </el-form-item>
        <el-form-item class="required" label="支出总额(人民币):" prop="total_amount">
          <el-input v-model="postForm.total_amount" />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="postForm.remark" type="textarea" rows="2" />
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

import { createOrderExpense, updateOrderExpense, fetchOrderExpense } from '@/api/order'

const defaultForm = {
  title: null,
  total_amount: 0,
  remark: '',
  id: null
}
export default {
  name: 'Expenses',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => function() { return {} }
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      show: false,
      total: 0,
      listQuery: {
        page: 1,
        filter: {
          title: ''
        }
      },
      list: [],
      postForm: defaultForm,
      expenseRules: {
        // title: [{ required: true, message: '支出名称是必填的', trigger: 'blur' }],
        // total_amount: [{ required: true, message: '支出总额是必填的', trigger: 'blur' }]
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
  },
  methods: {
    onClose() { // 关闭弹窗
      this.$emit('close-dia', false)
    },
    async submitForm() {
      try {
        // 表单校验不知道为什么不行,难道是一个页面只能一个表单验证？？
        const valid = await this.$refs.expenseForm.validate()
        if (valid) {
          this.postForm.order_id = this.order.id
          this.loading = true
          if (this.isEdit) {
            await updateOrderExpense(this.id, this.postForm)
          } else {
            await createOrderExpense(this.postForm)
          }
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
    async getExpense(id) {
      const res = await fetchOrderExpense(id)
      this.postForm = res.data
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
