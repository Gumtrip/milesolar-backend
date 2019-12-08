<template>
  <div>
    <el-cascader v-model="catId" :options="treeData" :props="{ checkStrictly: true ,emitPath: false }" clearable @change="handleChange" />
  </div>
</template>

<script>
export default {
  name: 'CatTree',
  components: {},
  props: {
    options: {
      type: Array,
      default: () => function() { return [] }
    },
    defaultValue: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      catId: this.defaultValue
    }
  },
  computed: {
    treeData() {
      const tData = []
      // if(this.categoryTrees.length>0){
      // tData.push({label: '无',value:0})//TODO 为什么这样写会报错？？？
      // }
      for (let i = 0, len = this.options.length; i < len; i++) {
        const first = this.options[i]
        tData.push({
          label: first.title,
          value: first.id
        })
        if (first.children.length > 0) {
          tData[i]['children'] = []
          for (let j = 0, len = first.children.length; j < len; j++) {
            const sec = first.children[j]
            tData[i]['children'].push({
              label: sec.title,
              value: sec.id
            })
            if (sec.children.length > 0) {
              tData[i]['children'][j]['children'] = []
              for (let k = 0, len = sec.children.length; k < len; k++) {
                const third = sec.children[k]
                tData[i]['children'][j]['children'].push({
                  label: third.title,
                  value: third.id
                })
              }
            }
          }
        }
      }
      if (this.options.length > 0) {
        tData.unshift({ label: '无', value: 0 })
      }
      return tData
    }
  },
  watch: {
    defaultValue: function(newValue) {
      return (this.catId = newValue)
    }
  },
  created() {
  },
  methods: {
    handleChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
