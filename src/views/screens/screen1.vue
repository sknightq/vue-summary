<template>
  <div>
    screen1
  </div>
</template>
<script>
// @ is an alias to /src
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'screen1',
  created() {
    const positions = [
      [113.665412, 34.757975],
      [113.280637, 23.125178],
      [111.670801, 40.818311]
    ]
    AMapLoader.load({
      key: '25dca9ecc8f2704d9cd9f5e1626eef5e', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [] //插件列表
    })
      .then(AMap => {
        const map = new AMap.Map('map', {
          resizeEnable: true,
          // viewMode:"3D",
          zoom: 15,
          center: [116.335183, 39.941735],
          mapStyle: 'amap://styles/e5473324dd9854ed7de45a14f8c71d9e' //设置地图的显示样式
        })

        var canvas = document.createElement('canvas')
        var customLayer = new AMap.CustomLayer(canvas, {
          alwaysRender: true, //缩放过程中是否重绘，复杂绘制建议设为false
          zIndex: 120
        })
        var onRender = function() {
          // var retina = AMap.Browser.retina
          var size = map.getSize() //resize
          var width = size.width
          var height = size.height
          canvas.style.width = width + 'px'
          canvas.style.height = height + 'px'
          // if (retina) {
          //   //高清适配
          //   width *= 2
          //   height *= 2
          // }
          canvas.width = width
          canvas.height = height //清除画布
          var ctx = canvas.getContext('2d')
          ctx.fillStyle = 'rgba(3, 4, 5, 0.2)'
          ctx.strokeStyle = '#fff'
          ctx.beginPath()
          for (var i = 0; i < positions.length; i++) {
            var center = positions[i]
            var pos = map.lngLatToContainer(center)
            var r = 30
            ctx.moveTo(pos.x + r, pos.y)
            ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI)
          }
          ctx.lineWidth = 3
          ctx.closePath()
          ctx.stroke()
          ctx.fill()
        }
        customLayer.render = onRender
        customLayer.setMap(map)

        new AMap.Polygon({
          path: positions, //以5个点的坐标创建一个隐藏的多边形
          map: map,
          strokeOpacity: 0, //透明
          fillOpacity: 0, //透明
          bubble: true //事件穿透到地图
        })

        const overlaysList = map.getAllOverlays('polygon')
        map.setFitView(overlaysList)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
