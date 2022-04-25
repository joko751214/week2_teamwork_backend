const http = require('http')
const mongoose = require('mongoose')
require('dotenv').config({path: './config.env'})

const headers = require('./headers')
const {successHandle, errorHandle} = require('./handles')
const Post = require('./model/post')

const {getPosts, optionPosts} = require('./api/index')

const PORT = process.env.PORT || 3005

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)
// 連線資料庫
mongoose
  .connect(DB)
  .then(() => console.log('資料庫連線成功'))
  .catch(err => console.log(err))

const requestListener = async (req, res) => {
  let body = ''
  req.on('data', chunk => (body += chunk))

  if (req.url === '/posts' && req.method === 'GET') {
    getPosts(res)
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.on('end', async () => {
      try {
        const data = JSON.parse(body)
        const required = ['userName', 'avatar', 'content']
        let count = 0;
        try {
          required.forEach((item) => {
            if (data[item] === undefined) {
              throw `屬性「${item}」為必要欄位`
            } else if (data[item] === "") {
              throw `屬性「${item}」不能為空值`
            } else {
              count += 1;
            }
          });
        } catch(error) {
          errorHandle(res, error);
        }
        if (count === required.length) {
          const newPost = await Post.create({
            userName: data.userName,
            avatar: data.avatar,
            content: data.content,
            updateImage: data.updateImage,
          })
          successHandle(res, newPost);
        }
      } catch (error) {
        errorHandle(res, error.errors || '欄位格式不正確')
      }
    })
  } else if (req.url === '/posts' && req.method === 'OPTIONS') {
    optionPosts(res)
  } else {
    errorHandle(res, '路由錯誤')
  }
}

const server = http.createServer(requestListener)

server.listen(PORT)
