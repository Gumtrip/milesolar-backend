<template>
  <div>
    <el-dialog
      id="userDia"
      :visible.sync="show"
      width="800px"
      center
      @close="onClose"
    >
      <div class="listFunBox">
        <el-form ref="form" :model="listQuery" label-width="80px">
          <el-form-item label="产品列表" style="width: 248px">
            <el-input v-model="listQuery.filter.title" placeholder="输入产品名字" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getItems" />
          </el-form-item>
        </el-form>
      </div>
      <el-table id="userTable" ref="mulTable" :data="list" stripe fit highlight-current-row style="width: 100%" class="listTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div id="dia-footer">
        <el-pagination v-show="total>0" :total="total" layout="prev,pager,next" background :page-size="listQuery.size" class="fl" @current-change="changePage" />
        <el-button class="fr" @click="onClose">返回</el-button>
        <el-button class="fr mr-10" type="primary">确认选择</el-button>
        <div class="clearfix" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchProducts } from '@/api/product'
export default {
  name: 'EquDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    equipages: {
      type: Array,
      default: () => function() { return [] }
    }
  },
  data() {
    return {
      show: true,
      total: 0,
      listQuery: {
        page: 1,
        filter: {
          title: ''
        }
      },
      list: [],
      multipleSelection: [],
      initDialog: false
    }
  },
  watch: {
    dialog(newVal, oldVal) {
      this.show = newVal
      if (!this.initDialog) {
        // this.init()
      }
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    onClose() { // 关闭弹窗
      this.$emit('close-dia', false)
    },
    async getItems() {
      const res = await fetchProducts(this.listQuery)
      this.list = res.data.data
      this.total = res.data.meta.total
    },
    async changePage(page) { // 翻页
      this.listQuery.page = page
      await this.getItems()
    },
    handleSelectionChange() {

    }
  }

}
</script>

<style lang="scss" scoped>
  #userDia ::v-deep{
    .el-dialog__header{padding: 0}
    .el-dialog__body{padding-top: 0}
    .el-table__row{cursor: pointer}
  }
  #userTable{margin-bottom: 20px}
  #dia-footer{}
</style>
