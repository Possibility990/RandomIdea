const express = require('express');

const router = express.Router();

const Idea = require('../models/Idea')

let post =[
 {
    id:1,
    text: 'A news letter that bar any news containing hate speech',
    tag: 'Technology',
    username: 'Possibility',
    date: '2025-07-24'

},

 {
    id:2,
    text: 'Milk cartons that changes colour as the milk ages',
    tag: 'Invention',
    username: 'Wale',
    date: '2022-01-02'

},
 {
    id:3,
    text: 'A web app application that makes house owners upload their houses for rent',
    tag: 'Software',
    username: 'Alani990',
    date: '2023-05-02'

},

]


// Get all ideas
router.get('/', async(req, res)=>{
    
    try{
        const ideas = await Idea.find()
         res.json({success:true, data:ideas}) 

    }catch(error){
        console.log(error)
        res.status(500).json({success:false, error:'Something went wrong'})
    }
});

// Get ideas by Idn
router.get('/:id', async(req, res) => {
    // const idea = post.find(idea => idea.id === +req.params.id )

    // if(!idea){
    //     return res
    //     .status(404)
    //     .json({success:false, data: 'Request not found'})
    // }

    // the above is the hard coded method

    try{
        const idea = await Idea.findById(req.params.id)
        res.json({success:true, data:idea})
        
    }catch(error){
        res
        .status(500)
        .json({success:false, message:'request not found'})
    }

})


router.post('/', async(req, res) =>{
    const body = req.body

    const idea = new Idea( {
        // id: post.length + 1,
        text: body.text,
        tag: body.tag,
        username: body.username
        // date: new Date().toISOString().slice(0,10)
    })

    // post.push(idea)
    try{
        const savedIdeas = await idea.save()
         
    res.json({success:true, data:savedIdeas})

    }catch(error){
         console.log(error)
        res.status(500)
        .json({success:false, error:'Something went wrong'})

    }

   
})

// edit idea
router.put('/:id', async(req, res) =>{
    // const idea = post.find(idea => idea.id === +req.params.id)

    // if(!idea){
    //    return res
    //     .status(404)
    //     .json({success:false, error:'Resource not found'})
    // }

    // idea.text = req.body.text || idea.text
    // idea.tag = req.body.tag || idea.tag

    // res.json({success:true, data:idea})

    // all the aboves are the updated mothods


    try {
        const idea = await Idea.findById(req.params.id)

        if(idea.username === req.body.username){
         const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
        {   $set: {
                text: req.body.text,
                tag: req.body.tag
            }
        },
        {new :true}
        );

        return res.json({success: true, data: updatedIdea}) 
        }
            // user does not match
        res.status(403).json({success:false, error: 'You are not authorise to update this resource'})

       
    } catch (error) {
        res.status(500).json({success:false, error:'request not found'
        })
    }

    
})

router.delete('/:id', async(req, res) => {
    // const itemToDelet = post.find((item) => item.id === +req.params.id)

    // if(!itemToDelet){
    //     return res
    //     .status(404)
    //     .send({success:false, data:'Resource not found'})
    // }
    // const index = itemToDelet.id - 1 // this is possible because the id is number. in a case where the id is alphanumeric or just alpha, we do
    // const index = post.indexOf((itemToDelet))
    // post.splice(index, 1)
    // res.send({success:true, data:{}})

    // post = remainiongIdea;

    // all the above are the hardcoded method
        console.log(req, 'from router testing')

        try{
             const idea = await Idea.findById(req.params.id)

            if(idea.username === req.body.username){
                await Idea.findByIdAndDelete(req.params.id)
                return res.json({success:true, data:{}})
            }
                // username do not match
            res.status(403).json({success:false, error:'You are not authorise to delete this file'})

        }catch{
        res.status(500).json({success:false, error:'invalid request'})
        }

})


module.exports = router


