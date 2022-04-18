const {Schema, model} = require('mongoose');
const postScheam = new Schema(
  {
    userName: {
      type: String,
      required: [true, '貼文姓名未填寫'],
    },
    avatar: {
      type: String,
      required: [true, '貼文頭像 url 未填寫'],
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
      required: [true, '內容未填寫'],
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