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
      <el-table id="userTable" ref="mulTable" :data="list" stripe fit highlight-current-row style="width: 100%" class="listTable mb-20" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column align="center" label="序号" width="60" prop="id" />
        <el-table-column align="center" label="属性名称" prop="title" />
      </el-table>
      <div id="dia-footer">
        <el-pagination v-show="total>0" :total="total" layout="prev,pager,next" background class="fl" @current-change="getProperties" />

        <el-button class="fr" @click="onClose">返回</el-button>
        <el-button class="fr mr-10" type="primary" @click="submitForm">确认添加</el-button>
        <div class="clearfix" />
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { createProductProperty, fetchProperties } from '@/api/product'

export default {
  name: 'Property',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      show: false,
      postForm: {},
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 15,
        title: ''
      },
      expenseRules: {
        property_id: [{ required: true, message: '属性是必填的', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialog(newVal, oldVal) {
      this.show = newVal
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
        this.postForm.product_id = this.id
        this.loading = true
        await createProductProperty(this.postForm)

        this.$notify({ title: '成功', message: '操作成功', type: 'success' })
        this.$emit('update-order', true)
        this.show = false
      } catch (e) {
        console.log(e)
      }
    },
    async getProperties() {
      const res = await fetchProperties()
      this.list = res.data.data
      this.total = res.data.meta.total
    },
    handleSelectionChange(val) {
      this.postForm.properties = val
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
