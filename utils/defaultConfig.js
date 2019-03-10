
//切换不同环境的接口

export const pc_URL = 'http://www.jfcar.com.cn'
// export const pc_URL = 'http://165.qiweioa.cn'

export const detailsObj = {
  hots: 'model',
  ev: 'model',
  news: 'model',
  hobbies: 'model',
  video: 'model',
  rankpage: 'model',
  taglist: 'model',
  search: 'model',
  sorts: 'model',
  rank: "model",
  '视频': "model",
  '今日车闻': "model",
  '新能源': "model",
  '名车': "model",
  '改装': "model",
  '萌宠': "model",
}

export const replaceDetailUrl = (url) => {
  for (var key in detailsObj) {
    url = url.replace(`${key}/detail/`, 'model/detail/')
    url = url.replace(`${key}/hobbiesDetail/`, 'model/hobbiesdetail/')

    // break;
  }
  url = url.replace(`hobbies/hobbiesDetail/`, 'model/hobbiesdetail/')
  url = url.replace(`hobbies/hobbiesdetail/`, 'model/hobbiesdetail/')
  url = url.replace(`modelmodel/`, 'model/')
  return url ? url.toLowerCase() : url ;
}
