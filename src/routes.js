const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');


const routes = new express.Router();
const upload = multer(uploadConfig);  //cadastrando a dependencia multer dentro  de uma variavel

/*routes.get('/',(req,res) => {
    return res.send('hello world');
    //return res.send('Hello $(req.query.name)')
});
*/


routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);
module.exports = routes;