<template>
  <div>
    <index-container :weeklist="weeklist"
      :big-coursel-data="bigCourselData"></index-container>
  </div>
</template>
<script>
import { $get } from "http/ajax";
import { webEssayGetWeekendRank, webBannerList } from "http/api";
import IndexContainer from "components/index/layout/IndexContainer";
export default {
  name: "Index",
  components: {
    "index-container": IndexContainer
  },
  async asyncData({ params }) {
    let weeklist = await $get(webEssayGetWeekendRank, { pageNo: 1, size: 10 });
    let bigCourselData = await $get(webBannerList, {
      cChannel: 18,
      linktype: "second"
    });
    return {
      weeklist: weeklist.data ? weeklist.data.essayEntities : [],
      bigCourselData: bigCourselData.data ? bigCourselData.data : []
    };
  }
};
</script>
