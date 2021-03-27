<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import { fetchTotalVisitorsAndPageViews } from '@/api/google-analytics'
import moment from 'moment'

const lineChartData = {
  newVisitis: {
    visitors: [],
    pageViews: []
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart
  },
  data() {
    // 统计30日内的浏览量
    return {
      lineChartData: lineChartData.newVisitis,
      visitorsData: []
    }
  },
  async created() {
    this.getTotalVisitorsAndPageViews()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    async getTotalVisitorsAndPageViews() {
      const format = 'YYYY-MM-DD'
      const start = moment().startOf('day').format(format)
      const end = moment().subtract(30, 'days').format(format)
      const res = await fetchTotalVisitorsAndPageViews({
        start: end,
        end: start
      })
      const visitors = []
      const pageViews = []
      for (const item of res.data) {
        visitors.push(item.visitors)
        pageViews.push(item.pageViews)
      }
      this.lineChartData.visitors = visitors
      this.lineChartData.pageViews = pageViews
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
