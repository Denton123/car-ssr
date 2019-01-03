<template>
  <div class="adver-block">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'AdverBlock'
}
</script>
<style>
.adver-block {
  height: 200px;
  margin: 20px 0px;
  display: flex;
  justify-content: center;
}
</style>
