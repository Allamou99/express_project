const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the datas to you');
})
.post((req,res,next)=>{
    res.end('Will add the dish : '+req.body.name+ 'With details : '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end('Put operation not supported on /dishes');
})
.delete((req,res,next)=>{
    res.end('All the dishes are deleted');
});


dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send the details of the dish'+req.params.dishId+'to you');
})
.post((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end('Post operatio not supported on /dishes/:dishId');
})
.put((req,res,next)=>{
    res.write('Updating the dish : '+req.params.dishId+ '\n');
    res.end('Will update the dish :'+req.body.name+ 'with the details : '+req.body.description)
})
.delete((req,res,next)=>{
    res.end('The dish whoose id : '+req.params.dishId+'will be deleted.');
});

module.exports = dishRouter;