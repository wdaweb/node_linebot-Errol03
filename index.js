// 引用line機器人套件
import linebot from 'linebot'
// 引用dotenv套件
import dotenv from 'dotenv'
// 引用axios套件
import axios from 'axios'

import schedule from 'node-schedule'

let stage = []

const updateData = async () => {
  const response = await axios.get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-A0012-001?Authorization=CWB-7B039863-6344-4BD1-AF84-FA8676BF0303&downloadType=WEB&format=JSON')
  stage = response.data
}

// 設定時間  一小時觀測一次
schedule.scheduleJob('0 * * * * *', () => {
  updateData()
})

updateData()

// 讀取.env
dotenv.config()
// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async event => {
  try {
    const response = await axios.get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-A0012-001?Authorization=CWB-7B039863-6344-4BD1-AF84-FA8676BF0303&downloadType=WEB&format=JSON')
    stage = response.data
    const text = event.message.text
    let reply = ''
    console.log(text)
    // 打這個字他回傳圖
    if (text === '啵啵') {
      reply = {
        type: 'flex',
        altText: 'Flex',
        contents: {
          type: 'carousel',
          contents: [
            {
              type: 'bubble',
              size: 'micro',
              hero: {
                type: 'image',
                url: 'https://yas.com.hk/blog/wp-content/uploads/2020/06/%E5%B0%8F%E7%90%89%E7%90%83_Blog.jpg',
                size: 'full',
                aspectMode: 'cover',
                aspectRatio: '320:213'
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '浮潛',
                    weight: 'bold',
                    size: 'sm',
                    wrap: true
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                      },
                      {
                        type: 'text',
                        text: '裝備量',
                        size: 'xs',
                        color: '#8c8c8c',
                        margin: 'md',
                        flex: 0
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: '※特別注意浪高與海風。離岸遠時需多人陪同。必備 : 救生衣、面鏡、呼吸管、防滑膠鞋、防寒衣。',
                            wrap: true,
                            color: '#8c8c8c',
                            size: 'xs',
                            flex: 5
                          }
                        ]
                      }
                    ]
                  }
                ],
                spacing: 'sm',
                paddingAll: '13px'
              }
            },
            {
              type: 'bubble',
              size: 'micro',
              hero: {
                type: 'image',
                url: 'https://img.alicdn.com/imgextra/i4/1893096007/O1CN013YPScg1uFFgbLZ3s9_!!1893096007.jpg_960x960Q50s50.jpg',
                size: 'full',
                aspectMode: 'cover',
                aspectRatio: '320:213'
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '自由潛水',
                    weight: 'bold',
                    size: 'sm',
                    wrap: true
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                      },
                      {
                        type: 'text',
                        text: '裝備量',
                        size: 'sm',
                        color: '#8c8c8c',
                        margin: 'md',
                        flex: 0
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: '※特別注意 海溫、海流。需至少一位潛伴陪同。必備 : 面鏡、長蛙、浮球。',
                            wrap: true,
                            color: '#8c8c8c',
                            size: 'xs',
                            flex: 5
                          }
                        ]
                      }
                    ]
                  }
                ],
                spacing: 'sm',
                paddingAll: '13px'
              }
            },
            {
              type: 'bubble',
              size: 'micro',
              hero: {
                type: 'image',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoa3DLinSSqb8HqWMBvK187yKszkV4-SgMxQ&usqp=CAU',
                size: 'full',
                aspectMode: 'cover',
                aspectRatio: '320:213'
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '水肺潛水',
                    weight: 'bold',
                    size: 'sm'
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'xs',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'text',
                        text: '裝備量',
                        size: 'sm',
                        color: '#8c8c8c',
                        margin: 'md',
                        flex: 0
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: '※特別注意浪向及身體狀況。需至少一位潛伴陪同。必備 : 面鏡、呼吸管、潛水服、氣瓶、潛水手套、潛水鞋、浮力控制裝置、調節器、長蛙。',
                            wrap: true,
                            color: '#8c8c8c',
                            size: 'xs',
                            flex: 5
                          }
                        ]
                      }
                    ]
                  }
                ],
                spacing: 'sm',
                paddingAll: '13px'
              }
            }
          ]
        }
      }
      reply = (reply.length === 0) ? '找不到你要下水的地點捏QQ' : reply
      event.reply(reply)
    }
    for (const data in stage) {
      console.log(stage[data].dataset.location.length)
      for (let i = 0; i <= stage[data].dataset.location.length; i++) {
        // 從這裡改
        // console.log(stage[data].dataset.location[0])
        if (stage[data].dataset.location[i].locationName === text) {
          // 打locationName他回傳  風向 海溫 浪高 波向
          reply += '地點：' + stage[data].dataset.location[i].locationName + '\n'
          reply += '雨況：' + stage[data].dataset.location[i].weatherElement[0].time[0].parameter.parameterName + '\n'
          reply += '風向：' + stage[data].dataset.location[i].weatherElement[1].time[0].parameter.parameterName + '\n'
          reply += '風強度：' + stage[data].dataset.location[i].weatherElement[2].time[0].parameter.parameterName + '\n'
          reply += '浪況：' + stage[data].dataset.location[i].weatherElement[4].time[0].parameter.parameterName + '\n'
          // reply += '海溫：' + data.time[0].weatherElement[8].elementValue + '\n'
          // reply += '浪高：' + data.time[0].weatherElement[9].elementValue + '\n'
          // reply += '波向：' + data.time[0].weatherElement[11].elementValue + '\n'
          reply += '\n' + '﹋﹋﹋﹋﹋﹋﹋﹋﹋'
          reply += '\n' + '大海深不可測' + '\n' + '下水要注意安全唷 <(´･ᴗ･`)>'
          break
        }
      }
    }
    console.log(reply)
    reply = (reply.length === 0) ? '找不到你要下水的地點捏QQ' : reply
    event.reply(reply)
  } catch (error) {
    console.log(error)
    event.reply('找不到你要下水的地點捏QQ')
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
