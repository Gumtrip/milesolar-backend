<template>
  <setting-detail :is-edit="true" />
</template>

<script>
import SettingDetail from './components/SettingDetail'

export default {
  name: 'EditForm',
  components: { SettingDetail }
}
</script>

