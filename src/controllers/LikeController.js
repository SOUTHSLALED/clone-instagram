const Post = require('../models/Post');
//este require acima é como se fosse o import no python, java etc.
// req = request e res = response
module.exports = {
    async store(req, res){
        const post = await Post.findById(req.params.id); // o sinal de menos 
        
        post.likes += 1;

        await post.save();

        req.io.emit('like', post);

        return res.json(post);
    }


};

//async é para definir codigos que serão assincronos