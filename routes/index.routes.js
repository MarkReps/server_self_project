const Router = require('express').Router;

const groupRouter = require('./group.routes');
const tagRouter = require('./tag.routes');
const postRouter = require('./post.routes');
const userRouter = require('./user.routes.js');

const router = Router();

router.use('/post',postRouter)
router.use('/group',groupRouter);
router.use('/tag',tagRouter);
router.use('/user',userRouter);

module.exports = router;