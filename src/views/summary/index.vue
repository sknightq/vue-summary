<template>
  <div class="main">
    <swiper direction="vertical" @slideChange="onSlideChange">
      <swiper-slide v-for="screen in screens" :key="screen">
        <screen :screen="screen" class="screen-wrapper"></screen>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import Screen from '@/components/Screen.vue'
import 'swiper/swiper.scss'
export default {
  components: {
    Swiper,
    SwiperSlide,
    Screen
  },
  setup() {
    const screens = ['screen1', 'screen2']
    return {
      screens
    }
  },
  methods: {
    onSlideChange(swipe) {
      console.log(swipe)
    }
  }
}
</script>
<style lang="scss">
.main,
.swiper-container {
  width: 100vw;
  height: 100vh;
}
</style>
