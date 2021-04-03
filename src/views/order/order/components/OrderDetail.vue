<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar'">
        <span v-show="updateDate" class="timeTips" v-text="'更新于:'+updateDate" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item prop="category_id" label="客户:">
          <el-select v-model="postForm.client_id" placeholder="客户" name="category_id" required>
            <el-option v-for="(client,key) in clients" :key="key" :label="client.name" :value="client.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="总额:" prop="total_amount" class="totalAmount">
          <el-input v-model="postForm.total_amount" class="midFormInput" type="number" placeholder="总额">
            <el-select slot="prepend" v-model="postForm.currency" placeholder="货币">
              <el-option label="人民币" value="CNY" />
              <el-option label="美金" value="USD" />
              <el-option label="奈拉" value="NGN" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="汇率:" prop="exchange_rate">
          <el-input v-model="postForm.exchange_rate" class="midFormInput" type="number" placeholder="汇率" />
        </el-form-item>

        <el-form-item label="人民币收入:" prop="exchange_rate">
          <el-input v-model="postForm.rmb_total_amount" class="midFormInput" type="number" placeholder="人民币收入" />
        </el-form-item>
        <div id="itemBox">
          <div class="mb-10">
            <el-button type="primary" @click="showPop=true">选择产品</el-button>
          </div>
          <el-table
            ref="mulTable"
            stripe
            fit
            highlight-current-row
            :data="postForm.order_items"
            style="width: 100%"
          >
            <el-table-column label="序号" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column label="名称" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图片" width="180">
              <template slot-scope="scope">
                <div class="picBox">
                  <img :src="scope.row.img" alt="">
                </div>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="产品数量"
            >
              <template slot-scope="scope">
                <el-input-number v-model="postForm.order_items[scope.$index].amount" :min="1" />
              </template>
            </el-table-column>
            <el-table-column
              width="260"
              align="center"
              label="实收"
            >
              <template slot-scope="scope">
                <el-input v-model="postForm.order_items[scope.$index].price" class="text-center" placeholder="实收" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <span class="delBtn pointer" @click="delItem(scope.$index)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--收款进度-->
        <div id="proceedBox">
          <div class="mb-10">
            <el-button type="primary" @click="showPop=true">添加收款</el-button>
          </div>
          <el-table
            stripe
            fit
            highlight-current-row
            :data="postForm.order_proceeds"
            style="width: 100%"
          >
            <el-table-column label="序号" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column label="名称" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="币种" width="180">
              <template slot-scope="scope">
                <div class="picBox">
                  <img :src="scope.row.currency" alt="">
                </div>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="收款金额"
            >
              <template slot-scope="scope">
                <el-input-number v-model="postForm.order_items[scope.$index].amount" :min="1" />
              </template>
            </el-table-column>
            <el-table-column
              width="260"
              align="center"
              label="汇率"
            >
              <template slot-scope="scope">
                <el-input v-model="postForm.order_items[scope.$index].price" class="text-center" placeholder="实收" />
              </template>
            </el-table-column>
            <el-table-column
              width="260"
              align="center"
              label="人命币金额"
            >
              <template slot-scope="scope">
                <el-input v-model="postForm.order_items[scope.$index].price" class="text-center" placeholder="实收" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <span class="delBtn pointer" @click="delItem(scope.$index)">删除</span>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <!--订单支出-->
        <div id="expenseBox">
          <div class="mb-10">
            <el-button type="primary" @click="showPop=true">添加支出</el-button>
          </div>
          <el-table
            ref="mulTable"
            stripe
            fit
            highlight-current-row
            :data="postForm.order_items"
            style="width: 100%"
          >
            <el-table-column label="序号" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column label="名称" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图片" width="180">
              <template slot-scope="scope">
                <div class="picBox">
                  <img :src="scope.row.img" alt="">
                </div>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="产品数量"
            >
              <template slot-scope="scope">
                <el-input-number v-model="postForm.order_items[scope.$index].amount" :min="1" />
              </template>
            </el-table-column>
            <el-table-column
              width="260"
              align="center"
              label="实收"
            >
              <template slot-scope="scope">
                <el-input v-model="postForm.order_items[scope.$index].price" class="text-center" placeholder="实收" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <span class="delBtn pointer" @click="delItem(scope.$index)">删除</span>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="postForm.remark" type="textarea" class="midFormInput" rows="4" placeholder="备注" />
        </el-form-item>
      </div>
    </el-form>
    <products :dialog="showPop" :items="postForm.order_items" @close-dia="showPop=false" @pass-items="getItems" />
    <expenses :dialog="expenseBox" :items="postForm.expenses" @close-dia="expenseBox=false" @pass-items="getExpenses" />
    <proceeds :dialog="proceedBox" :items="postForm.proceeds" @close-dia="proceedBox=false" @pass-items="getProceeds" />
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import Expenses from './Expenses'
import Proceeds from './Proceeds'
import Products from './Products'
import { fetchOrder, createOrder, updateOrder } from '@/api/order'
import { fetchClients } from '@/api/client'
import moment from 'moment'

const defaultForm = {
  exchange_rate: 1,
  client_id: null,
  currency: 'CNY',
  id: undefined,
  order_items: []
}

export default {
  name: 'OrderDetail',
  components: { Sticky, Products, Expenses, Proceeds },
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
      clients: {},
      loading: false,
      updateDate: '',
      showPop: false, // 订单产品弹出层
      proceedBox: false, // 支出收款弹出层
      expenseBox: false, // 支出弹出层
      rules: {
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
    this.getClients()
  },
  methods: {
    async fetchData(id) {
      const res = await fetchOrder(id, { include: 'order_items,expenses,proceeds' })
      this.postForm = res.data
    },
    async getClients() {
      const res = await fetchClients()
      this.clients = res.data.data
    },
    getItems(items) {
      this.postForm.order_items = items
    },
    getExpenses(items) {
      this.postForm.order_items = items
    },
    getProceeds(items) {
      this.postForm.order_items = items
    },
    async submitForm() {
      const valid = await this.$refs.postForm.validate()
      try {
        if (valid) {
          this.loading = true
          let res
          if (this.isEdit) {
            res = await updateOrder(this.id, this.postForm)
          } else {
            res = await createOrder(this.postForm)
          }

          if (res.status === 201) {
            this.$notify({ title: '成功', message: '创建成功', type: 'success' })
            this.$router.push({ name: 'OrderEdit', params: { id: res.data.id }})
          }
          if (res.status === 200) {
            this.updateDate = moment().format('YYYY-MM-DD H:m:s')
            this.$notify({ title: '成功', message: '修改成功', type: 'success' })
          }

          this.loading = false
        } else {
          console.log('error submit!!')
          this.loading = false
        }
      } catch (e) {
        console.log(e)
      }
    },
    delItem(index) {
      this.postForm.order_items.splice(index, 1)
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
