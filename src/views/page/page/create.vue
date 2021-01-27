<template>
  <detail :is-edit="false" />
</template>

<script>
import detail from './components/detail'

export default {
  name: 'PageCreate',
  components: { detail }
}
</script>

