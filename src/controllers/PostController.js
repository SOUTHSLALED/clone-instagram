const Post = require('../models/Post');
const sharp = require('sharp'); //sharp é uma dependencia permite manipular imagens dentro da app
const path = require('path'); // path do node
const fs = require('fs'); // filesystem do node
//este require acima é como se fosse o import no python, java etc.
// req = request e res = response
module.exports = {
    async index(req, res){
       const posts = await Post.find().sort('-createdAt'); 
        
       return res.json(posts);//poderia colocar condições do tipo "posts só de hoje" ou outros filtros
    },

    async store(req, res){
        //console.log(req.body);
        const {author, place, description, hashtags} = req.body;
        const { filename: image } = req.file;
        
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality: 70})
        .toFile (
            path.resolve(req.file.destination, 'resized', fileName)
        )
        
        fs.unlinkSync(req.file.path);


        const post = await Post.create({   //o await espera o comando post.create terminar já que dependendo do tamanho ele pode demorar
            author,
            place,
            description,
            hashtags,
            image: fileName,

        });

        req.io.emit('post', post);

        return res.json({post});
    }


};

//async é para definir codigos que serão assincronos