// 引用line機器人套件
import linebot from 'linebot'
// 引用dotenv套件
import dotenv from 'dotenv'
// 引用axios套件
import axios from 'axios'

import schedule from 'node-schedule'

let stage = []

const updateData = async () => {
  const response = await axios.get('http://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0018-001?Authorization=CWB-6767C315-F7C6-43FB-A5AA-7E8EDFC84BE1&format=JSON&sort=obsTime" -H "accept: application/json')
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
  // console.log(event.message.text)
  // event.reply(event.message.text)
  try {
    // const response = await axios.get('http://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0018-001?Authorization=CWB-6767C315-F7C6-43FB-A5AA-7E8EDFC84BE1&format=JSON&sort=obsTime" -H "accept: application/json')
    const text = event.message.text
    let reply = ''
    for (const data of stage.records.location) {
      // 從這裡改
      if (data.locationName === text) {
        // 打locationName他回傳  風向 海溫 浪高 波向
        reply += '風向：' + data.time[0].weatherElement[2].elementValue + '\n'
        reply += '海溫：' + data.time[0].weatherElement[8].elementValue + '\n'
        reply += '浪高：' + data.time[0].weatherElement[9].elementValue + '\n'
        reply += '波向：' + data.time[0].weatherElement[11].elementValue + '\n'
        reply += '\n' + '﹋﹋﹋﹋﹋﹋﹋﹋﹋'
        reply += '\n' + '大海深不可測' + '\n' + '下水要注意安全唷 <(´･ᴗ･`)>'
        break
      }
      // 打這個字他回傳圖
      if (text === '啵啵') {
        reply = {
          type: 'flex',
          altText: 'Flex',
          contents: {
            type: 'bubble',
            hero: {
              type: 'image',
              url: 'https://scontent.ftpe8-3.fna.fbcdn.net/v/t1.0-9/13438970_649891098527715_3718300424551689281_n.jpg?_nc_cat=106&ccb=2&_nc_sid=e007fa&_nc_ohc=N1IilW04ioAAX-vqkte&_nc_ht=scontent.ftpe8-3.fna&oh=1f38a69033e0997f398b57e7502f489d&oe=5FC086D6',
              size: '5xl',
              aspectRatio: '20:18',
              aspectMode: 'fit',
              action: {
                type: 'uri',
                uri: 'http://linecorp.com/'
              },
              margin: 'lg'
            },
            body: {
              type: 'box',
              layout: 'vertical',
              spacing: 'md',
              contents: [
                {
                  type: 'text',
                  text: '浮標來救援 !',
                  wrap: true,
                  weight: 'bold',
                  gravity: 'center',
                  size: 'xl'
                },
                {
                  type: 'box',
                  layout: 'baseline',
                  margin: 'md',
                  contents: []
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  margin: 'lg',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          color: '#aaaaaa',
                          size: 'sm',
                          flex: 1,
                          text: ' '
                        },
                        {
                          type: 'text',
                          text: '度數對應上圖的方位',
                          wrap: true,
                          size: 'sm',
                          color: '#666666',
                          flex: 4
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: ' ',
                          color: '#aaaaaa',
                          size: 'sm',
                          flex: 1
                        },
                        {
                          type: 'text',
                          text: '便可遠端了解即時海況',
                          wrap: true,
                          color: '#666666',
                          size: 'sm',
                          flex: 4
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: ' ',
                          color: '#aaaaaa',
                          size: 'sm',
                          flex: 1
                        },
                        {
                          type: 'text',
                          text: '有任何問題歡迎郵件  opto8543@gamil.com                   歡迎掃描QR條碼，讓小浮標多多出任務 ',
                          wrap: true,
                          color: '#666666',
                          size: 'sm',
                          flex: 4
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  margin: 'xxl',
                  contents: [
                    {
                      type: 'spacer'
                    },
                    {
                      type: 'image',
                      url: 'https://qr-official.line.me/sid/L/163vnokf.png',
                      aspectMode: 'cover',
                      size: 'xl',
                      align: 'center'
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    }
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
