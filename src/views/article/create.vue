<template>
  <detail :is-edit="false" />
</template>

<script>
import detail from './components/detail'

export default {
  name: 'ArticleCreate',
  components: { detail }
}
</script>

