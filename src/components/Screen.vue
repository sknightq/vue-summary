<template>
  <section class="screen">
    <component :is="componentId"></component>
  </section>
</template>
<script>
import { computed, reactive, defineAsyncComponent } from 'vue'
export default {
  props: {
    screen: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const componentName = reactive(props.screen)
    const componentId = computed(() => defineAsyncComponent(() => import(`@/views/screens/${componentName}.vue`)))
    return {
      componentId
    }
  }
}
</script>
