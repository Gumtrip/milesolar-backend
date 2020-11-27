<template>
  <div class="app-container">
    <div class="listFunBox">
      <el-form ref="form" :model="listQuery" label-width="100px">
        <el-form-item label="分类列表">
          <el-input v-model="listQuery.title" placeholder="搜索分类" />
        </el-form-item>
        <button type="button" class="searchBtn" @click="getList"><i class="el-icon-search" /></button>
      </el-form>
      <router-link :to="{name:'SampleCreate'}">
        <el-button type="primary">添加分类</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="scope">
          <router-link :to="{name:'SampleEdit',params:{id:scope.row.id}}" class="link-type">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="分类">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="{name:'SampleEdit',params:{id:scope.row.id}}">
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
import { fetchSamples, deleteSample } from '@/api/sample'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'SampleList',
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
        title: '',
        page: 1,
        page_size: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchSamples(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.meta.total
        this.listLoading = false
      })
    },
    deleteItem(id) {
      this.$confirm('确认删除？').then(() => {
        deleteSample(id).then(() => {
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
