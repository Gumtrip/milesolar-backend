<template>
  <article-detail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/CategoryDetail'

export default {
  name: 'CreateForm',
  components: { ArticleDetail }
}
</script>

