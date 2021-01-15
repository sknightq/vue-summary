<template>
  <section class="wrapper" :style="screenStyle">
    <component :is="componentId" @onResourceLoad="handleResourceLoad"></component>
  </section>
</template>
<script>
import { defineComponent, defineAsyncComponent, computed, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'Screen',
  props: {
    screen: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const componentName = computed(() => props.screen.substring(0, 1).toUpperCase() + props.screen.substring(1))
    const componentId = computed(() => defineAsyncComponent(() => import(`@/views/subpages/${componentName.value}.vue`)))
    const h = ref(600)
    const screenStyle = computed(() => {
      return {
        height: h.value + 'px'
      }
    })
    onMounted(() => {
      h.value = window.innerHeight
      // console.log(`${componentName.value} is mounted`)
    })
    return {
      componentId,
      screenStyle
    }
  },

  methods: {
    handleResourceLoad(params) {
      // console.log('loading resource...')
      this.$emit('onResourceLoad', params)
    }
  }
})
</script>
<style lang="scss">
.screen-wrapper {
  height: 100vh;
  display: flex;
}
</style>
