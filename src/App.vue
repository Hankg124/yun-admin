<template>
  <vnode/>
  <svgIcon icon="Share" size="18" color="red" />

<RouterView />
</template>
<script setup lang='ts'>

import { h } from 'vue'

const vnode = h('div', {class:'test'},['dev',h('span','hello world')])

</script>
<style lang='scss' scoped>

</style>