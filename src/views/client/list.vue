<template>
  <div class="app-container">
    <div class="listFunBox">
      <el-form ref="form" :model="listQuery" label-width="100px">
        <el-form-item label="客户列表">
          <el-input v-model="listQuery.filter.name" placeholder="搜索客户" />
        </el-form-item>
        <button type="button" class="searchBtn" @click="getList"><i class="el-icon-search" /></button>
      </el-form>
      <router-link :to="{name:'ClientCreate'}">
        <el-button type="primary">添加订单</el-button>
      </router-link>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80" prop="id" />
      <el-table-column min-width="300px" label="名字" prop="name" />
      <el-table-column width="180px" align="center" label="email" prop="email" />
      <el-table-column width="180px" align="center" label="mobile" prop="mobile" />
      <el-table-column width="180px" align="center" label="skype" prop="skype" />
      <el-table-column width="180px" align="center" label="Whatsapp" prop="whatsapp" />
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <router-link class="mr-10" :to="{name:'ClientEdit',params:{id:scope.row.id}}">
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
import { fetchClients, deleteClient } from '@/api/client'
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
        filter: {
          name: ''
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchClients(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.meta.total
        this.listLoading = false
      })
    },
    deleteItem(id) {
      this.$confirm('确认删除？').then(() => {
        deleteClient(id).then(() => {
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
