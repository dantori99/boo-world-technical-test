'use strict';

const { Router } = require('express');
const router = Router();
const commentSchema = require('../models/comment');
const userSchema = require('../models/user');

module.exports = function() {
  router.post('/postComment/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { title, comment, mbti, enneagram, zodiac } = req.body;

      const data = {
        createdBy: userId,
        mbti: mbti,
        enneagram: enneagram,
        zodiac: zodiac,
        title: title,
        comment: comment
      }

      const checkUser = await userSchema.findOne({ _id: userId });
      if (checkUser === null) {
        return res.status(404).json({ message: 'User not found.' })
      }

      const createComment = await commentSchema.create({ ...data })

      res.status(200).json({ statusCode: 200, message: `success add comment by user id : ${userId}`, data: createComment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });

  router.get('/getComment', async (req, res) => {
    const { mbti, enneagram, zodiac, sort } = req.query;
    let params = {}
    let sortParams = {}
    
    if (mbti || enneagram || zodiac) {
      params = {
        $or: [
          { mbti }, { enneagram }, { zodiac }
        ]        
      }
    }

    if (sort.toLowerCase() === 'mostliked') {
      sortParams = { totalLike: -1 }
    } else if (sort.toLowerCase() === 'mostrecent') {
      sortParams = { createdAt: -1 }
    }

    try {
      const getComment = await commentSchema.find(params).sort(sortParams);
      res.status(200).json({ statusCode: 200, data: getComment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });

  router.post('/likeComment', async (req, res) => {
    const { commentId, userId } = req.query;
    try {
      // check if user exist
      const getUser = await userSchema.findOne({ _id: userId });
      // check if comment exist
      const getComment = await commentSchema.findOne({ _id: commentId });
      if (getUser == null) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (getComment == null) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // check if user already commit a like
      const checkLikeStatus = (getComment.likes).includes(userId);
      let response;

      if (checkLikeStatus) {
        // dislike
        await commentSchema.findByIdAndUpdate({ _id: commentId }, { $pull: { likes: userId }, $inc: { totalLike: -1 } }, { new: true });
        response = res.status(200).json({ message: 'unlike success.' })
      } else {
        // like
        await commentSchema.findByIdAndUpdate({ _id: commentId }, { $push: { likes: userId }, $inc: { totalLike: 1 } }, { new: true });
        response = res.status(200).json({ message: 'like success.' })
      }
      
      return response;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });

  return router;
}

