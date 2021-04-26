<template>
  <div class="app-container">
    <div class="listFunBox">
      <el-form ref="form" :model="listQuery" />
      <router-link :to="{name:'PropertyCateCreate'}">
        <el-button type="primary">添加属性</el-button>
      </router-link>
    </div>
    <el-table v-loading="listLoading" :data="list" class="listTable" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80" prop="id" />
      <el-table-column align="center" label="名称" prop="title" />
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <router-link class="mr-10" :to="{name:'PropertyCateEdit',params:{id:scope.row.id}}">
            <el-button type="primary" size="small" icon="el-icon-edit" />
          </router-link>
          <!--          <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteItem(scope.row.id)" />-->
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
import { fetchPropertyCates, deletePropertyCate } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'OrderList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        title: '',
        page: 1,
        page_size: 20,
        include: 'property_category'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const response = await fetchPropertyCates()
      this.list = response.data.data
      this.total = response.data.meta.total
      this.listLoading = false
    },
    deleteItem(id) {
      this.$confirm('确认删除？').then(() => {
        deletePropertyCate(id).then(() => {
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
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
