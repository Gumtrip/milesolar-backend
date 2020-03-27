<template>
  <sample-detail :is-edit="false" />
</template>

<script>
import SampleDetail from './components/SampleDetail'

export default {
  name: 'CreateForm',
  components: { SampleDetail }
}
</script>

