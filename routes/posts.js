const express = require('express')

const router = express.Router()
const Post = require('../models/Post')


//GET
router.get('/', async (req, res) => {
    try{
    await Post.find({}, function (err, posts) {
        res.render('posts',{
            postList: mergeSort(posts)
        })
    })
    //Desc соритровка слиянием
    }catch (e) {
        res.json({message: e})
    }
})

//POST
router.post('/', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    })
    try{
        await newPost.save()
        res.redirect('/posts')
    } catch (e) {
        res.json({message: e})
    }
})

//PUT
router.put('/:id', async (req, res) => {
    try{
        const upPost = await Post.findOneAndUpdate(
            req.params.id, {$set: {
                title: req.body.title,
                content: req.body.content}})
        res.json(upPost)
    } catch (e) {
        res.json({message: e})
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
   try{
       const delPost = await Post.deleteOne({_id: req.params.id})
       res.json(delPost)
   } catch (e) {
       res.json({message: e})
   }

})



//Sort function
function mergeSort(array) {
    if(array.length <= 1) {
        return array
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return mergeTopDown(mergeSort(left), mergeSort(right))
}

function mergeTopDown(left, right) {
    const array = [];

    while (left.length && right.length) {
        if(left[0]< right[0]) {
            array.push(right.shift());
        } else {
            array.push(left.shift());

        }
    }

    return array.concat(left.slice()).concat(right.slice());
}


module.exports = router