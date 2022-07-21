const Router = require('express').Router;
const {body,param} = require('express-validator');

const groupController = require('../controllers/group.controller');

const authMiddleware = require('../middleware/auth.middleware');

const router = Router();


router.post('',
authMiddleware,
body('name','Название должно быть словом!').isString(),
body('name',"Название слишком короткое.").isLength({min:3}),
groupController.create);

router.get('',groupController.getAll);

router.patch('/:id',
authMiddleware,
body('name','Название должно быть словом!').isString(),
body('name',"Название слишком короткое.").isLength({min:3}),
param('id','id не указано.').notEmpty(),
param('id','id должно быть целым числом.').isInt(),
groupController.update);

router.delete('/:id',
authMiddleware,
param('id','id не указано.').notEmpty(),
param('id','id должно быть целым числом.').isInt(),
groupController.delete);


module.exports = router;