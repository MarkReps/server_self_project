const Router = require('express').Router;
const {body, param} = require('express-validator');

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();


router.post('/registration',
body('email').isEmail(),
body('password').isLength({min:5}),
userController.registration);

router.post('/login',
body('email').isEmail(),
body('password').isLength({min:5})
,userController.login);

router.patch('/update/:id',
body('email').optional().isEmail(),
body('password').optional().isLength({min:5}),
param('id','id не указано.').notEmpty(),
param('id','id должно быть целым числом.').isInt(),
authMiddleware,
userController.update);

router.delete('/delete/:id',

param('id','id не указано.').notEmpty(),
param('id','id должно быть целым числом.').isInt(),
authMiddleware,
userController.delete);

router.get('/check',userController.check);


module.exports = router;