<template>
  <order-detail :is-edit="true" />
</template>

<script>
import OrderDetail from './components/Detail'

export default {
  name: 'EditForm',
  components: { OrderDetail }
}
</script>

