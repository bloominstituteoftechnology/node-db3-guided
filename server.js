const express = require('express');
const helmet = require('helmet');

const UserRouter = require('./users/user-router.js');
const PostRouter = require('./posts/post-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/users', UserRouter);
server.use('/api/posts', PostRouter);

module.exports = server;
