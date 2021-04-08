<template>
  <div>
    <el-dialog
      id="userDia"
      :visible.sync="show"
      title="添加收款"
      width="800px"
      center
      @close="onClose"
    >
      <el-form ref="postForm" :model="postForm" :rules="proceedRules" label-width="100px">
        <el-form-item label="总额:" prop="total_amount" class="totalAmount">
          <el-input v-model="postForm.total_amount" class="midFormInput" placeholder="总额">
            <el-select slot="prepend" v-model="postForm.currency" placeholder="货币">
              <el-option label="人民币" value="CNY" />
              <el-option label="美金" value="USD" />
              <el-option label="奈拉" value="NGN" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="汇率:" prop="exchange_rate">
          <el-input v-model="postForm.exchange_rate" />
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
import { createOrderProceed, updateOrderProceed, fetchOrderProceed } from '@/api/order'
const defaultForm = {
  currency: 'CNY',
  total_amount: 0,
  exchange_rate: 1,
  id: null
}
export default {
  name: 'Proceed',
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
      postForm: defaultForm,
      proceedRules: {
        exchange_rate: [{ required: true, message: '汇率是必填的', trigger: 'blur' }]
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
        this.getProceed(newVal)
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
        const valid = await this.$refs.postForm.validate()
        if (valid) {
          this.postForm.order_id = this.order.id
          this.loading = true
          if (this.id) {
            await updateOrderProceed(this.id, this.postForm)
          } else {
            await createOrderProceed(this.postForm)
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
    async getProceed(id) {
      const res = await fetchOrderProceed(id)
      this.postForm = res.data
    }
  }

}
</script>

<style lang="scss" scoped>
  .totalAmount ::v-deep {
    display: flex;
    .el-form-item__content{margin-left: 0!important;}
    .el-input--suffix{width: 100px}
  }
</style>
