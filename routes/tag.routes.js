const Router = require('express').Router;
const {body,param} = require('express-validator');

const tagController = require('../controllers/tag.controller');

const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('',
body('name','Название должно быть словом!').isString(),
body('name',"Название слишком короткое.").isLength({min:3}),
authMiddleware,
tagController.create);

router.get('',tagController.getAll);

router.patch('/:id',
param('id','id не указано.').notEmpty(),
param('id','id должно быть целым числом.').isInt(),
body('name','Название должно быть словом!').isString(),
body('name',"Название слишком короткое.").isLength({min:3}),
authMiddleware,
tagController.update);

router.delete('/:id',
param('id','id не указано.').notEmpty(),
param('id','id должно быть целым числом.').isInt(),
authMiddleware,
tagController.delete);


module.exports = router;