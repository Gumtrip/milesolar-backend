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
            <div>
              <div v-if="scope.row.tree">
                <div v-for="(cate,k) in scope.row.tree" :key="k" class="propertyBox">
                  <h4 class="cate">{{ cate.title }}</h4>
                  <el-checkbox-group v-if="cate.children" v-model="selectProperties[scope.row.id]" class="properties">
                    <div v-for="(p,key) in cate.children" :key="key" class="propertyItem">
                      <el-checkbox v-model="selectProperties" :label="p.id">{{ p.title }}</el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </div></template>
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
        <div class="clearfix"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchProducts, fetchPropertyCates } from '@/api/product'
import { createOrderOfferItem } from '@/api/order'
import { propertyTree } from '@/utils/product'
import _ from 'lodash'
export default {
  name: 'Product',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: Number,
      default: null
    },
    items: {
      type: Array,
      default: () => function() { return [] }
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
        },
        include: 'properties'
      },
      list: [],
      propertyCates: [],
      selectProperties: []//  选中的属性
    }
  },
  watch: {
    dialog(newVal, oldVal) {
      this.show = newVal
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
      const list = res.data.data
      this.total = res.data.meta.total
      const cates = await this.getPropertyCates()
      list.forEach(async(item, key) => {
        const ids = []// 用来存放属性分类id
        const cateId = item.property_category_id
        if (_.indexOf(ids, cateId) === -1) {
          ids.push(cateId)
        }
        list[key].tree = await propertyTree(item.properties, cates)
        this.selectProperties[item.id] = []// 用来存放选中的属性id
      })
      this.list = list
    },
    async changePage(page) { // 翻页
      this.listQuery.page = page
      await this.getItems()
    },
    async chooseItem(item) { // 点击选择按钮
      const pids = this.selectProperties[item.id]
      await createOrderOfferItem({
        order_offer_id: this.orderId,
        product_id: item.id,
        pids: pids
      })
      this.show = false
      this.selectProperties[item.id] = []
      this.$emit('update-order', true)
    },
    async getPropertyCates(ids) {
      const res = await fetchPropertyCates()
      return res.data.data
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
  .propertyBox{display: flex;border-bottom: 1px solid #e5e5e5;margin-bottom: 6px;
    &:last-child{border-bottom: none}
    .cate{flex: 0 0 30%}
    .properties{flex: 0 0 70%}
  }
  .propertyItem{display: flex;justify-content: space-around}
</style>
