<template>
  <detail :is-edit="true" />
</template>

<script>
import Detail from './components/detail'

export default {
  name: 'ArticleCategoryEdit',
  components: { Detail }
}
</script>

