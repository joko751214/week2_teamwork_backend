const {Schema, model} = require('mongoose');
const postScheam = new Schema(
  {
    userName: {
      type: String,
      required: [true, '貼文必須要有 {PATH} 欄位且不能為空值'],
    },
    avatar: {
      type: String,
      required: [true, '貼文必須要有 {PATH} 欄位且不能為空值'],
    },
    updateImage: {
      type: String,
      default: '',
    },
    cratedAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    content: {
      type: String,
      required: [true, '貼文必須要有 {PATH} 欄位且不能為空值'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    replies: [{}]
  },
  {
    versionKey: false
  }
)
const Post = model('Post', postScheam);
module.exports = Post;