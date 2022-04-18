const {successHandle, errorHandle} = require('../handles')
const Post = require('../model/post')

// GET
const getPosts = async res => {
  try {
    const posts = await Post.find()
    successHandle(res, {data: posts})
  } catch (error) {
    errorHandle(res, {data: error})
  }
}
module.exports = getPosts
