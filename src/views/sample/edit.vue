<template>
  <sample-detail :is-edit="true" />
</template>

<script>
import SampleDetail from './components/SampleDetail'

export default {
  name: 'EditForm',
  components: { SampleDetail }
}
</script>

