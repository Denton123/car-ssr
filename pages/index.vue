<template>
  <div>
    <index-container :weeklist="weeklist"
      :big-coursel-data="bigCourselData"
      :newsObj="newsObj"
      :tagOne="tagOne"></index-container>
  </div>
</template>
<script>

import { $get } from "http/ajax";
import { webEssayGetWeekendRank, webBannerList, webEssayGethoteassy, webTagGetRandomTagsByChannel } from "http/api";
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
    let newsObj = await $get(webEssayGethoteassy)
    let tagOne = await $get(webTagGetRandomTagsByChannel, {
      channel: 2
    })
    return {
      weeklist: weeklist.data ? weeklist.data.essayEntities : [],
      bigCourselData: bigCourselData.data ? bigCourselData.data : [],
      newsObj: newsObj.data ? newsObj.data : {},
      tagOne: tagOne.data ? tagOne.data : []
    };
  },
  mounted() {
    console.log(this.bigCourselData)
  }
};
</script>
