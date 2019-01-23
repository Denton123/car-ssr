<template>
  <div>
    <index-container 
      :newsObj="newsObj"
      :tagOne="tagOne"
      :newsCourselData="newsCourselData"
      :newsRightList="newsRightList"
      :newsList="newsList"
      :EvCourselData="EvCourselData"
      :tagHot="tagHot"
      :EvList="EvList"
      :hobbiesCourselData="hobbiesCourselData"
      :hobbiesItem="hobbiesItem"
      :hobbiesList="hobbiesList"
      :tagTwo="tagTwo"
      :videoCourselData="videoCourselData"
      :videoRightList="videoRightList"
      :tagThree="tagThree"
      :weeklist="weeklist"
      :dayList="dayList"
      :monthList="monthList"></index-container>
  </div>
</template>
<script>

import { $get } from "http/ajax";
import { webEssayGetWeekendRank, webBannerList, webEssayGethoteassy, webTagGetRandomTagsByChannel, webEssayGetessayBycarnews,
webEssayGetEssayByChannelShou, webTagGetNewEnergyTags, webHobbiesGetOneHobbies, webHobbiesList, webEssayGetDayRank, webEssayGetMonthRank} from "http/api";
import IndexContainer from "components/index/layout/IndexContainer";

export default {
  name: "Index",
   head(){
    return {
      title: `尖峰咖`,
      // 设置 meta
      meta: [
        {
          hid: 'keyWords',
          name: 'keyWords',
          content: '首页,尖锋,尖锋咖,尖锋汽车网,尖锋汽车咨询,尖锋今日车闻,尖锋新能源,尖锋视频,尖锋兴趣部落,jfcar'
        },
        {
          hid: 'description',
          name: 'description',
          content: '尖锋咖为您提供最新汽车咨询，汽车图片，最精彩的汽车新闻、行情、评测、导购内容，是提供信息最独特的中国尖锋汽车网站。'
        },
        {
          hid: 'applicable-device',
          name: 'applicable-device',
          content: 'pc'
        },
        {
          hid: 'mobile-agent',
          name: 'mobile-agent',
          content: `format=html5;url=http://m.jfcar.com.cn`
        }
      ],
    }
  },
  components: {
    "index-container": IndexContainer
  },
  async asyncData({ params }) {
    // 周排行
    let weeklist = await $get(webEssayGetWeekendRank, { pageNo: 1, size: 10 });
    // 大轮播图
    // let bigCourselData = await $get(webBannerList, {
    //   cChannel: 18,
    //   linktype: "second"
    // });
    // 热点咨询
    let newsObj = await $get(webEssayGethoteassy)
    // 标签
    let tagOne = await $get(webTagGetRandomTagsByChannel, {
      channel: 2
    })
    // 今日车闻轮播图
    let newsCourselData = await $get(webBannerList, {
      cChannel: 14,
      linktype: 'second'
    })
    // 今日车闻右侧广告
    let newsRightList = await $get(webEssayGetessayBycarnews, {
      cChannel: 2
    })
    // 今日车闻下方文章信息
    let newsList = await $get(webEssayGetEssayByChannelShou, {
      channel: 2,
      pageNo: 1,
      pageSize: 3
    })
    // 新能源轮播图
    let EvCourselData = await $get(webBannerList, {
      cChannel: 15,
      linktype: 'second'
    })
    // 热点tag
    let tagHot = await $get(webTagGetNewEnergyTags)
    // 新能源下方数据列表
    let EvList = await $get(webEssayGetEssayByChannelShou, {
      channel: 4,
      pageNo: 1,
      pageSize: 3
    })
    // 兴趣部落轮播图
    let hobbiesCourselData = await $get(webBannerList, {cChannel: 17, linktype: 'second'})
    // 兴趣部落右方的数据
    let hobbiesItem = await $get(webHobbiesGetOneHobbies)
    // 兴趣部落下方的数据
    let hobbiesList = await $get(webHobbiesList, {
      limit: 6,
      page: 1
    })
    // 标签
    let tagTwo = await $get(webTagGetRandomTagsByChannel, {
      channel: 6
    })
    // 视频轮播图数据
    let videoCourselData = await $get(webBannerList, {
      cChannel: 16,
      linktype: 'second'
    })
    // 视频右方的数据
    let videoRightList = await $get(webEssayGetEssayByChannelShou, {
      channel: 5,
      pageNo: 1,
      pageSize: 3
    })
    // 标签
    let tagThree = await $get(webTagGetRandomTagsByChannel, {
      channel: 5
    })
    // 日排行
    let dayList = await $get(webEssayGetDayRank, { pageNo: 1, size: 10 });
    // 月排行
    let monthList = await $get(webEssayGetMonthRank, { pageNo: 1, size: 10 });
    newsObj.data.click = newsObj.data.click ? (newsObj.data.click.length > 4 ? newsObj.data.click.slice(0, 4) : newsObj.data.click) : []
    newsList.data.forEach(v => {
      v.classOneName = v.classOneName.toLowerCase();
      if (v.classOneName.toLowerCase() == "news") {
        v.classOneName = "今日车闻";
      } else if (v.classOneName.toLowerCase() == "video") {
        v.classOneName = "视频";
      } else if (v.classOneName.toLowerCase() == "ev") {
        v.classOneName = "新能源";
      } else {
        v.classOneName = "兴趣部落";
      }
    });
    EvList.data.forEach(v => {
      v.classOneName = v.classOneName.toLowerCase();
      if (v.classOneName.toLowerCase() == "news") {
        v.classOneName = "今日车闻";
      } else if (v.classOneName.toLowerCase() == "video") {
        v.classOneName = "视频";
      } else if (v.classOneName.toLowerCase() == "ev") {
        v.classOneName = "新能源";
      } else {
        v.classOneName = "兴趣部落";
      }
    });
    // if (Array.isArray(newsObj.data.hotTime)) {
      newsObj.data.hotTime.forEach(v => {
        v.classOneName = v.classOneName.toLowerCase();
        if (v.classOneName == "news") {
          v.classOneName = "今日车闻";
        } else if (v.classOneName == "video") {
          v.classOneName = "视频";
        } else if (v.classOneName == "ev") {
          v.classOneName = "新能源";
        } else {
          v.classOneName = "兴趣部落";
        }
      });
    // }
    return {
      weeklist: weeklist.data ? weeklist.data.essayEntities : [],
      // bigCourselData: bigCourselData.data ? bigCourselData.data : [],
      newsObj: newsObj.data ? newsObj.data : {},
      tagOne: tagOne.data ? tagOne.data : [],
      newsCourselData: newsCourselData.data ? newsCourselData.data : [],
      newsRightList: newsRightList.data ?  (newsRightList.data  && newsRightList.data.length <= 10 ? newsRightList.data : newsRightList.data.slice(0, 11) ) : [],
      newsList: newsList.data ? newsList.data: [],
      EvCourselData: EvCourselData.data ? EvCourselData.data : [],
      tagHot: tagHot.data ? tagHot.data : [],
      EvList: EvList.data ? EvList.data : [],
      hobbiesCourselData: hobbiesCourselData.data ? hobbiesCourselData.data : [],
      hobbiesItem: hobbiesItem.data ? hobbiesItem.data : {},
      hobbiesList: hobbiesList.data.list ? hobbiesList.data.list : [],
      tagTwo: tagTwo.data ? tagTwo.data : [],
      videoCourselData: videoCourselData.data ? videoCourselData.data : [],
      videoRightList: videoRightList.data ? videoRightList.data　: [],
      tagThree: tagThree.data ? tagThree.data : [],
      dayList: dayList.data ? dayList.data.essayEntities : [],
      monthList: monthList.data ? monthList.data.essayEntities : [],
    };
  },
  methods: {
    formatName (obj) {
      obj.forEach(v => {
      v.classOneName = v.classOneName.toLowerCase();
      if (v.classOneName.toLowerCase() == "news") {
        v.classOneName = "今日车闻";
      } else if (v.classOneName.toLowerCase() == "video") {
        v.classOneName = "视频";
      } else if (v.classOneName.toLowerCase() == "ev") {
        v.classOneName = "新能源";
      } else {
        v.classOneName = "兴趣部落";
      }
    });
    }
  },
  mounted() {
    // this.formatName(this.newsList)
    // this.formatName(this.EvList)
    console.log('aaaaaa')
    console.log(this.newsObj)
  }
};
</script>
