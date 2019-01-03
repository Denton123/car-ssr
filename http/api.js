/**
 * 这里填写接口名称
 */

//    hobbies模块
export const webHobbiesDelete = '/web/hobbies/delete' //    删除hobbies
export const webHobbiesGetClassList = '/web/hobbies/getClassList' //    获取hobbies分类
export const webHobbiesInfo = '/web/hobbies/info' //    获取hobbies信息
export const webHobbiesList = '/web/hobbies/list' //    查询hobbies列表
export const webHobbiesSave = '/web/hobbies/save' //    保存hobbies
export const webHobbiesUpdate = '/web/hobbies/update' //    修改hobbies

//    Web专栏表
export const dsfFeatureGetRutureByChannel = '/web/feature/getRutureByChannel' //    获取每一个板块的专栏文章
export const dsfFeatureInfo = '/web/feature/info' //    获取专栏信息
export const dsfFeatureList = '/web/feature/list' //    查询专栏列表

//    web广告列表
export const webBannerInfo = '/web/banner/info' //    查询广告列表信息
export const webBannerList = '/web/banner/list' //    查询广告列表

//    web标签表
export const webTagGetNewEnergyTags = '/web/tag/getNewEnergyTags' //    获取新能源的30条tags
export const webTagGetRandomTags = '/web/tag/getRandomTags' //    随机获取tag
export const webTagGetRandomTagsByChannel = '/web/tag/getRandomTagsByChannel' //    随机获取tag
export const webTagGetTagDetail = '/web/tag/info' //  获取tag详情
export const webTagAboutList = '/web/tag/list' // 获取tag相关的文章列表
//    web活动表
export const webActivityInfo = '/web/activity/info' //     获取活动信息
export const webActivityList = '/web/activity/list' //     查询活动列表

//    web活动预约表
export const webActivityapplyInfo = '/web/activityapply/info' //    获取活动预约信息
export const webActivityapplyList = '/web/activityapply/list' //   查询活动预约列表

//   web频道表
export const webChannelInfo = '/web/channel/info' //   获取频道信息
export const webChannelList = '/web/channel/list' //   查询频道列表

//   web前端用户表
export const webUserBloggerItem = '/web/user/bloggerItem' //   博主的主页获取博主的文章
export const webUserChangePassword = '/web/user/changePassword' //   修改密码
export const webUserCheckPhone = '/web/user/checkPhone' //   校验手机号是否存在系统当中
export const webUserClickCare = '/web/user/clickCare' //   关注博主
export const webUserForgetAndReset = '/web/user/forgetAndReset' //   忘记密码重置密码
export const webUserGetBollgerFans = '/web/user/getBollgerFans' //   获取博主的粉丝,关注,列表
export const webUserGetBollgerRank = '/web/user/getBollgerRank' //   获取热门博主
export const webUserInfo = '/web/user/info' //   获取前端用户信息
export const webUserSelectByPhone = '/web/user/selectByPhone' //   根据手机号获取用户信息
export const webUserSelectByPrimaryKey = '/web/user/selectByPrimaryKey' //   根据id获取用户信息
export const webUserUpdate = '/web/user/update' //   修改前端用户信息
export const webUserUpdatePhone = '/web/user/updatePhone' //   更新用户手机号码
export const webUserAthourInfo = '/web/essay/getAuthorPersonal' //    根据文章id获取个人信息

//   web前端登录
export const webAccountLogin = '/web/accountLogin' //   账号登录
export const webNoteLogin = '/web/noteLogin' //   短信登录
export const webRegister = '/web/register' //   注册

//   web文章表
export const webEssayEssayCommentList = '/web/essaycomment/EssayCommentList' //   查询文章评论表列表
export const webEssayMyEssay = '/web/essay/MyEssay' //   通过前端用户id获取‘我的文章’
export const webEssayClickEssay = '/web/essay/clickEssay' //   点赞和爆胎
export const webEssayDelSingleEssay = '/web/essay/delSingleEssay' //   通过文章id，删除文章
export const webEssayDelete = '/web/essay/delete' //   通过文章ids数组，批量删除文章
export const webEssayGetDayRank = '/web/essay/getDayRank' //   获取文章的日排行榜
export const webEssayGetEssayByChannel = '/web/essay/getEssayByChannel' //   根据不同的板块内容获取对应的文章
export const webEssayGetEssayByTagId = '/web/essay/getEssayByTagId' //   获取每一个标签若干个文章
export const webEssayGetMonthRank = '/web/essay/getMonthRank' //   获取文章的月排行榜
export const webEssayGetNewestCarEssay = '/web/essay/getNewestCarEssay' //   获取最新发布的8条今日车闻的文章
export const webEssayGetOthersEassy = '/web/essay/getOthersEassy' //   获取每一个板块最热门的8条essay
export const webEssayGetWeekendRank = '/web/essay/getWeekendRank' //   获取文章的周排行榜
export const webEssayGetclickAfter = '/web/essay/getclickAfter' //   异步请求点击后的数据
export const webEssayGetessayBycarnews = '/web/essay/getessayBycarnews' //   随机切换文章的接口
export const webEssayGethoteassy = '/web/essay/gethoteassy' //   首页获取最热的5篇文章
export const webEssayInfo = '/web/essay/info' //   通过文章id获取文章详情[每个文章都会带有一个其所属的标签列表],如果前端用户登录了，则会返回一个map,如果该用户曾经点赞过该文章，则EssayLogEntity不为空，否则为空
export const webEssayDetailsInfo = '/web/essayDetails/info' //   通过文章id获取文章详情[每个文章都会带有一个其所属的标签列表],如果前端用户登录了，则会返回一个map,如果该用户曾经点赞过该文章，则EssayLogEntity不为空，否则为空
export const webEssayList = '/web/essay/list' //   查询文章表列表

export const webEssayReplyEssayComment = '/web/essaycomment/replyEssayComment' //   回复评论（需要参数 被评论的文章id、回复的内容 封装在文章评论实体里）
export const webEssaySave = '/web/essay/save' //   保存文章,参数为一个文章实体
export const webHobbiesGetOneHobbies = '/web/hobbies/getOneHobbies' // 获取hobbies右边的文章
export const webEssaySaveEssayComment = '/web/essaycomment/saveEssayComment' //   新增评论（需要参数 被评论的文章id、评论的内容 封装在文章评论实体里）
export const webEssayUpdate = '/web/essay/update' //   修改文章，参数为文章实体（不需要update Time）
export const webEssayGoodLog = '/web/essaycomment/changeEssayCommentGoodLog' //   变更评论点赞记录(评论点赞功能（包括点赞和取消点赞）。只需要传入被点赞的评论的id-commentId)【返回该评论点赞总数】
export const webEssayGetEssayByChannelShou = '/web/essay/getEssayByChannelShou' // 首页--获取每一个板块的文章

// 站内搜索
export const webSearch = '/web/search/searchEssay' // 站内搜索结果
//   web兴趣部落详情
export const webHobbiesDetailInfo = '/web/hobbiesDetails/info' //   获取兴趣部落详情
export const webHobbiesDetailComment = '/web/hobbiescomment/hobbiesCommentList' //   查询hobbies评论表列表
export const webHobbiesDetailReplyComment =
  '/web/hobbiescomment/replyHobbiesComment' //   回复评论
export const webHobbiesDetailNewComment =
  '/web/hobbiescomment/saveHobbiesComment' //   新增评论

export const webHobbiesDetailChangeLike =
  '/web/hobbiescomment/changeHobbiesCommentGoodLog' //   点赞
export const webHobbiesDetailClickGoodOrBad =
  '/web/hobbiesDetails/clickGoodOrBad' //   加油或爆胎

export const webHobbiesSecond = '/web/hobbies/getHobbiesSecond' // 获取兴趣二级频道列表选项
//   发表文章
export const webEssayArticleType = '/web/essay/getOneClassList' // 获取文章分类

// 上传图片
export const filePicture = 'sys/uploadFile' // 上传图片

export const smsSendMsgByRegister = '/sms/sendMsgByRegister' // 用户注册的短信验证
export const smsUserSendMsgUpdateByPwd = '/sms/sendMsgUpdateByPwd' // 忘记密码的短信验证
export const smsCheckCode = '/sms/checkCode' // 短信验证码验证

// 获取热门博主文章列表
export const webBologerlist = '/web/user/getEssayByBlogger'

// 活动预约
export const webActivityGetCity = '/web/activity/getCity' // 获取城市
export const webActivityGetDict = '/web/activity/getDict' // 获取区域
export const webActivityGetProvince = '/web/activity/getProvince' // 获取省份
export const webActivityGetStore = '/web/activity/getStore' // 获取专营店
export const webActivityapplySave = '/web/activityapply/save' // 新增预约
export const webActivityapplyUpdate = '/web/activityapply/update' // 修改预约
// web兴趣部落详情相关信息
export const webHobbiesDetailTag = '/web/hobbiesDetails/findHobbiesWithTag' //   查询和Hobbies所属tag相关的另外8篇文章
export const webEssayDetailTag = '/web/essayDetails/findEssaysOrHobbiesWithTag' //   查询和文章所属tag相关的另外8篇文章
// web兴趣部落/文章详情相关信息
export const webHobbiesDetailTopSix =
  '/web/essayDetails/findTopSixEssayOrHobbies' //   查询博主6篇热门文章或hobbies
export const webHobbiesDetailRandomData =
  '/web/essayDetails/findRandomRecommendEssaysAndHobbies' //   查询随机数据

// 个人信息
export const webMyEssay = '/web/user/MyEssay' // 通过前端用户id获取‘我的文章’(按创建时间倒序排序)

// 退出登录
export const webLogout = '/web/loginOut' // 退出登录
