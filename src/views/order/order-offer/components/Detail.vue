<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar'">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item prop="category_id" label="客户:" class="required">
          <el-select v-model="postForm.client_id" placeholder="客户" name="category_id" required @change="getClientInfo">
            <el-option v-for="(client,key) in clients" :key="key" :label="client.name" :value="client.id" />
          </el-select>
        </el-form-item>
        <div class="inlineInput">
          <el-form-item label="客户名称:">
            <el-input v-model="postForm.client_info.name" class="smFormInput" placeholder="客户名称" />
          </el-form-item>
          <el-form-item label="客户Email:">
            <el-input v-model="postForm.client_info.email" class="smFormInput" placeholder="客户Email" />
          </el-form-item>
        </div>
        <div class="inlineInput">
          <el-form-item label="客户电话:">
            <el-input v-model="postForm.client_info.mobile" class="smFormInput" placeholder="客户电话" />
          </el-form-item>
        </div>

        <el-form-item label="币种:" prop="currency" class="required">
          <el-select v-model="postForm.currency" placeholder="币种">
            <el-option label="人民币" value="CNY" />
            <el-option label="美金" value="USD" />
            <el-option label="奈拉" value="NGN" />
          </el-select>
        </el-form-item>
        <el-form-item label="汇率:" prop="exchange_rate" class="required">
          <el-input v-model="postForm.exchange_rate" class="midFormInput" type="number" placeholder="汇率" />
        </el-form-item>
        <el-form-item label="报价时效:" prop="offer_range" class="required">
          <el-date-picker
            v-model="postForm.offer_range"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item v-if="isEdit" label="运费:" class="required">
          <el-input v-model="postForm.freight" class="midFormInput" type="number" placeholder="运费" />
        </el-form-item>
        <el-form-item v-if="isEdit" label="人民币收入:">
          <el-input v-model="postForm.rmb_total_amount" :readonly="true" class="midFormInput" type="number" placeholder="人民币收入" />
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
            :data="postForm.items"
            style="width: 100%"
          >
            <el-table-column label="序号" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column label="名称" width="180">
              <template slot-scope="scope">
                <el-input v-model="postForm.items[scope.$index].title" />
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
              label="数量"
            >
              <template slot-scope="scope">
                <el-input-number v-model="postForm.items[scope.$index].amount" :min="1" />
              </template>
            </el-table-column>
            <el-table-column
              width="260"
              align="center"
              label="单价"
            >
              <template slot-scope="scope">
                <el-input v-model="postForm.items[scope.$index].price" class="text-center" placeholder="实收">
                  <template slot="prepend">{{ postForm.currency }}</template>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="描述"
            >
              <template slot-scope="scope">
                <el-input v-model="postForm.items[scope.$index].desc" type="textarea" />
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <span class="delBtn pointer red-text" @click="delItem(scope.$index)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <ul id="calBox">
          <li><label v-text="'产品总价:'" /><span>{{ postForm.currency }} {{ postForm.item_total_amount }}</span></li>
          <li><label v-text="'运费:'" /><span>{{ postForm.currency }} {{ postForm.freight }}</span></li>
          <li><label v-text="'总价:'" /><span>{{ postForm.currency }} {{ postForm.total_amount }}</span></li>
          <li><label v-text="'人民币总价:'" /><span>￥ {{ postForm.rmb_total_amount }}</span></li>
        </ul>
        <el-form-item label="条款:" prop="term">
          <el-input v-model="postForm.term" type="textarea" rows="10" placeholder="备注" />
        </el-form-item>
      </div>
    </el-form>
    <products v-if="postForm.items" :dialog="showPop" :items="postForm.items" @close-dia="showPop=false" @pass-items="getItems" />

  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { fetchOrderOffer, createOrderOffer, updateOrderOffer } from '@/api/order'
import Products from '@/views/order/order/components/Products'

import { fetchClients } from '@/api/client'

const defaultForm = {
  exchange_rate: 1,
  client_id: null,
  client_info: {},
  currency: 'USD',
  id: undefined,
  term: '1. Price terms: EXW price + shipping cost to buyer\'s agent warehouse in China(The price will be adjusted while exchange rate fluctuates more than 3%(Based on 1USD=6.50RMB).\n' +
    '2. Payment: T/T,  30% deposit, balance Should be paid before shipment.\n' +
    '3. Lead time: 15 days after payment received.\n' +
    '4. Packaging: Netural carton\n' +
    '5. USD Account details:\n' +
    'Account Name: Foshan MILE SOLAR TECHNOLOGY CO., LTD\n' +
    'Account Number: 228 104 152 20 \n' +
    'SWIFT/BIC: SCBLHKHH (SCBLHKHHXXX * If 11 characters are required) \n' +
    'Address: No.138, Qingke Road, Chancheng District, Foshan, China.\n' +
    'Bank Name: Standard Chartered Bank (Hong Kong) Limited \n' +
    'Bank Address: Payment Centre, 15/F Standard Chartered Tower, 388 Kwun Tong Road, Hong Kong \n' +
    'Country/Region: Hong Kong \n' +
    'Type of Account: Business Account \n' +
    'Bank Code: 003 \n' +
    'Branch Code: 368 * If paying from Hong Kong banks.',
  items: []
}

export default {
  name: 'Detail',
  components: { Sticky, Products },
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
      clients: {},
      loading: false,
      showPop: false, // 订单产品弹出层
      rules: {
        offer_range: [{ required: true, message: '报价有效期是必填的', trigger: 'blur' }],
        term: [{ required: true, message: '条款是必填的', trigger: 'blur' }]
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
      const res = await fetchOrderOffer(id, { include: 'items' })
      this.postForm = res.data
    },
    async getClients() { // 获取客户名称
      const res = await fetchClients()
      this.clients = res.data.data
    },
    getItems(items) { // 获取产品
      this.postForm.items = items
    },
    delItem(index) {
      this.postForm.items.splice(index, 1)
    },
    async submitForm() {
      try {
        const valid = await this.$refs.postForm.validate()
        if (valid) {
          this.loading = true
          let res
          if (this.isEdit) {
            res = await updateOrderOffer(this.id, this.postForm)
            this.fetchData(this.id)
          } else {
            res = await createOrderOffer(this.postForm)
            this.$router.push({ name: 'OrderOfferEdit', params: { id: res.data.id }})
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
    },
    getClientInfo(id) {
      this.clients.forEach(item => {
        if (item.id === id) {
          this.postForm.client_info = item
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .totalAmount ::v-deep {
    display: flex;
    .el-input--suffix{width: 100px}
  }
  .picBox{width: 50px;height: 50px;margin: 0 auto}
  #itemBox{margin-bottom: 20px}
  .inlineInput{display: flex}
  .inlineInput ::v-deep{
    .el-form-item{margin-right: 20px}
    .el-form-item--medium .el-form-item__content{float: left}
  }

  #calBox{
    label{color:$gray;font-weight: normal ;}
    li{display: flex;justify-content: space-between;font-size: 14px;margin-bottom: 6px}
  }
</style>
