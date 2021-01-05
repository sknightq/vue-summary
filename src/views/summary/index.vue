<template>
  <div class="main">
    <div class="external">
      <audio class="bgm" src="/music/bg.mp3" ref="bgm"></audio>
      <div class="btn share-btn" v-if="isInApp">
        <img src="/images/share@2x.png" alt="分享" />
      </div>
      <div class="btn music-btn" :class="{ playing: musicPlaying }" @click="playMusic">
        <img src="/images/music_play@2x.png" alt="背景音乐" v-show="musicPlaying" />
        <img src="/images/music_pause@2x.png" alt="背景音乐" v-show="!musicPlaying" />
      </div>
    </div>

    <div class="screen-show">
      <div class="swiper-container" id="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="screen in screens" :key="screen">
            <screen class="screen-wrapper" :screen="screen" @onResourceLoad="handleResourceLoad"></screen>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import Swiper from 'tiny-swiper'
import Screen from '@/components/Screen.vue'
import { toHump, isInApp } from '@/assets/scripts/utils.js'
export default defineComponent({
  components: {
    Screen
  },
  setup() {
    const store = useStore()
    store.dispatch('getData').then(resp => {
      const temp = {}
      for (const key in resp) {
        const newKey = toHump(key)
        temp[newKey] = resp[key]
      }
      store.commit('setData', temp)
    })
    // 控制页面
    const screens = computed(() => {
      let pages = ['screen1', 'screen2', 'screen3', 'screen4', 'screen5', 'screen6', 'screen7', 'screen8', 'screen9', 'screen10', 'share']
      const remove = function(name, array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] === name) {
            array.splice(i, 1)
            break
          }
        }
        return array
      }
      // 控制页面显示
      // pages = remove('screen3', pages)

      return pages
    })

    // 记录每个页面所需资源真实加载情况
    const temp = computed(() => {
      const tempScreens = {}
      screens.value.forEach(screen => {
        tempScreens[screen] = {
          loadedCount: 0,
          total: 0
        }
      })
      return tempScreens
    })
    const resources = reactive(temp.value)
    const progress = computed(() => {
      let loadedCount = 0
      let total = 0
      screens.value.forEach(screenKey => {
        loadedCount += resources[screenKey].loadedCount
        total += resources[screenKey].total
      })
      return total === 0 ? 0 : parseInt((loadedCount * 100) / total, 10)
    })

    const screenActiveIdx = ref(0)
    const musicPlaying = ref(false)
    onMounted(() => {
      // const store = useStore()
      // store.commit('setResourcesLoaded', true)
    })
    return {
      screens,
      screenActiveIdx,
      progress,
      resources,
      musicPlaying,
      isInApp: isInApp('ge')
    }
  },
  methods: {
    handleResourceLoad({ loadedCount, total, screenKey }) {
      // console.log('screenName: %O, loadedCount: %O', screenKey, loadedCount)
      this.resources[screenKey].loadedCount = loadedCount
      this.resources[screenKey].total = total
    },
    playMusic() {
      !this.musicPlaying && this.$refs['bgm'].play()
      this.musicPlaying && this.$refs['bgm'].pause()
      this.musicPlaying = !this.musicPlaying
    },
    showScreens() {
      // 开始初始化swiper, 如果放在onMounted里会错过第一swiper的动画
      const swiper = new Swiper(document.querySelector('#swiper-container'), {
        direction: 'vertical',
        slideActiveClass: 'screen-enter'
      })
      swiper.on('scroll', activeIndex => {
        this.screenActiveIdx = activeIndex
      })
      // 用于后续页面渲染判断，Leaflet开始渲染会依赖这个条件
      this.$store.commit('setResourcesLoaded', true)
    },
    getProgress() {
      return this.progress
    },
    completeProgress() {
      //
    }
  }
})
</script>
<style lang="scss">
.main {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .external {
    position: absolute;
    right: 4.53333vw;
    top: 2.66666vw;
    z-index: 999;
    .bgm {
      position: absolute;
      z-index: 1;
    }
  }
  .screen-show {
    pointer-events: none;
    opacity: 0;
    &.display {
      pointer-events: inherit;
    }
  }
  .btn {
    font-size: 4vw;
    width: 22px;
    height: 22px;
    img {
      width: 100%;
    }
    &.share-btn {
      margin-bottom: 15px;
    }
    &.music-btn {
      &.playing {
        animation: turnAround 4s linear infinite;
      }
    }
    &.down-btn {
      bottom: 20px;
      left: 50%;
      margin-left: -15px;
      animation: bounceDown 1s linear infinite;
    }
  }
}
.start {
  .main {
    .screen-show {
      opacity: 1;
      pointer-events: inherit;
      transition: opacity 1s ease 0.5s;
    }
  }
}
</style>
