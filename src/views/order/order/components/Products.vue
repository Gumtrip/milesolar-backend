<template>
  <div>
    <el-dialog
      id="userDia"
      :visible.sync="show"
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
      <el-table id="userTable" ref="mulTable" :data="list" stripe fit highlight-current-row style="width: 100%" class="listTable">
        <el-table-column width="50" />
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
        <el-table-column align="center" label="产品图片">
          <template slot-scope="scope">
            <div class="picBox">
              <img :src="scope.row.main_image">
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品属性">
          <template slot-scope="scope">
            <span v-show="!scope.row.property_show" @click="getProperty(scope.$index,scope.row.id)">显示属性</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button class="fr mr-10" type="success" @click="chooseItem(scope.row)">确认</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="dia-footer">
        <el-pagination v-show="total>0" :total="total" layout="prev,pager,next" background :page-size="listQuery.size" class="fl" @current-change="changePage" />
        <el-button class="fr" @click="onClose">返回</el-button>
        <div class="clearfix" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchProducts, fetchProduct } from '@/api/product'

export default {
  name: 'Product',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    items: {
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
      propertyCates: [],
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
      this.list.forEach((item, key) => {
        this.list[key].property_show = false
      })
      this.total = res.data.meta.total
    },
    async changePage(page) { // 翻页
      this.listQuery.page = page
      await this.getItems()
    },
    handleSelectionChange(val) { // 勾选多选
      this.multipleSelection = val
    },
    chooseItem(item) { // 点击选择按钮
      this.show = false

      this.$emit('pass-items', item)
    },
    async getProperty(index, id) {
      this.list[index].property_show = true
      const res = await fetchProduct(id, { include: 'properties' })
      console.log(res.data)
      // 将
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
  .picBox{width: 80px;height: 80px;margin: 0 auto}
</style>
