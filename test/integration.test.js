const mongoose = require('mongoose');
const { expect } = require('chai');
const { app } = require('../app');
const request = require('supertest');

describe('POST: Create new user', () => {
    it('Creates a New User', async () => {
        const createUserData = { name: 'daniel' }
        const res = await request(app).post('/user/createUser').send(createUserData);

        expect(res.status).to.equal(200)
        expect(res._body.data).to.includes(createUserData)

        describe('GET: Existing user', () => {
            it('Get User By Id', async () => {
                const id = res._body.data._id;
                const getResult = await request(app).get(`/${id}`);

                expect(getResult.status).to.equal(200);
                expect(getResult.type).to.equal('text/html');
            })
        })

        describe('GET: Not existing user', () => {
            it('If user is not exist, throws an error', async () => {
                const id = '63c4bcf9d5ebd02f6eabde89';
                const getResult = await request(app).get(`/${id}`);

                const message = { message: 'User not found.' }

                expect(getResult.status).to.equal(404);
                expect(getResult._body).to.includes(message);
            })
        })

        describe('POST: Add comment function', () => {
            it('add comment', async () => {
                const id = res._body.data._id;
                const commentData = {
                    mbti: 'INTJ',
                    enneagram: '1w2',
                    zodiac: 'Cancer',
                    title: 'first comment',
                    comment: 'test is working well.'               
                }
                const postComment = await request(app).post(`/comment/postComment/${id}`).send(commentData);

                expect(postComment.status).to.equal(200);
                expect(postComment._body.data).to.includes(commentData);

                describe('POST: Like function', () => {
                    it('run like function', async () => {
                        const userId = postComment._body.data.createdBy
                        const commentId = postComment._body.data._id
                        const addLike = await request(app).post(`/comment/likeComment?userId=${userId}&commentId=${commentId}`);
                        const likeResponse = { message: 'like success.' }
                        
                        expect(addLike.status).to.equal(200);
                        expect(addLike._body).to.includes(likeResponse);
                    })
                })

                describe('POST: Unlike function', () => {
                    it('if hitted by same userId, run dislike', async () => {
                        const userId = postComment._body.data.createdBy
                        const commentId = postComment._body.data._id
                        const addLike = await request(app).post(`/comment/likeComment?userId=${userId}&commentId=${commentId}`);
                        const likeResponse = { message: 'unlike success.' }
                        
                        expect(addLike.status).to.equal(200);
                        expect(addLike._body).to.includes(likeResponse);
                    })
                })
            })
        })

    });
});


after(async () => {
    await mongoose.connection.close();
    console.log('MongoDb disconnected')
});