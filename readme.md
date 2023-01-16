<h1 align="center">Welcome to boo-world-technical-test 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Completed all task!

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Endpoints
```sh
1. Profile

- {{host}}/:id => retrieve profile by Id

2. User

- {{host}}/user/createUser => create new user
- {{host}}/user/getAll => retrieve all registered users

3. Comment

- {{host}}/comment/postComment/:userId => create a new comment
- {{host}}/comment/getComment => get a comment (you may fill 'mbti' or 'enneagram' or 'zodiac' to filter the comment and sort with 'mostrecent' or 'mostliked' value to sort as a query parametes)
- {{host}}/comment/likeComment => like/unlike the comment
```

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_