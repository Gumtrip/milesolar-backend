<template>
  <div class="app-container">
    <div class="listFunBox">
      <el-form ref="form" :model="listQuery" label-width="100px">
        <el-form-item label="订单">
          <el-input v-model="listQuery.no" placeholder="搜索订单" />
        </el-form-item>
        <button type="button" class="searchBtn" @click="getList"><i class="el-icon-search" /></button>
      </el-form>
      <router-link :to="{name:'OrderOfferCreate'}">
        <el-button type="primary">添加订单报价</el-button>
      </router-link>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="订单号">
        <template slot-scope="scope">
          <router-link :to="{name:'OrderOfferEdit',params:{id:scope.row.id}}" class="link-type">
            <span>{{ scope.row.no }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="客户">
        <template slot-scope="scope">
          <span>{{ scope.row.client.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="营业收入">
        <template slot-scope="scope">
          <span>CNY {{ scope.row.rmb_total_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="总成本">
        <template slot-scope="scope">
          <span>CNY {{ scope.row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="利润">
        <template slot-scope="scope">
          <span>CNY {{ scope.row.rmb_total_amount - scope.row.cost }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <router-link class="mr-10" :to="{name:'OrderOfferEdit',params:{id:scope.row.id}}">
            <el-button type="primary" size="small" icon="el-icon-edit" />
          </router-link>
          <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteItem(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchOrderOffers, deleteOrderOffer } from '@/api/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'OrderList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        include: 'client'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const response = await fetchOrderOffers(this.listQuery)
      this.list = response.data.data
      this.total = response.data.meta.total
      this.listLoading = false
    },
    deleteItem(id) {
      this.$confirm('确认删除？').then(() => {
        deleteOrderOffer(id).then(() => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getList()
        })
      })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>

</style>
