const Router = require('express').Router;

const  postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('',authMiddleware,postController.create);
router.get('',postController.getAll);
router.get('/:id',postController.getOne);
router.patch('/:id',authMiddleware,postController.update);
router.delete('/:id',authMiddleware,postController.delete);


module.exports = router;