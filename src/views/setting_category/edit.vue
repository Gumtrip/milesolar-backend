<template>
  <detail :is-edit="true" />
</template>

<script>
import detail from './components/detail'

export default {
  name: 'SettingCategoryEdit',
  components: { detail }
}
</script>

