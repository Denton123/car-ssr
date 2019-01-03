<template>
  <div>
    <index-container></index-container>
  </div>
</template>
<script>
import IndexContainer from "components/index/layout/IndexContainer";
export default {
  name: "Index",
  metaInfo: {
    // 设置 title
    title: "主页",
    // 设置 meta
    meta: [
      {
        name: "keyWords",
        content: "vue "
      }
    ],
    // 设置 link
    link: [
      {
        rel: "asstes",
        href: "https://assets-cdn.github.com/"
      }
    ]
  },
  components: {
    "index-container": IndexContainer
  }
};
</script>
