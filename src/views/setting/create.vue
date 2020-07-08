<template>
  <setting-detail :is-edit="false" />
</template>

<script>
import SettingDetail from './components/SettingDetail'

export default {
  name: 'CreateForm',
  components: { SettingDetail }
}
</script>

