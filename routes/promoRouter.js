const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('All the promotions will be returned to you .');
})
.post((req,res,next)=>{
    res.end('You added a new promotion : name : '+req.body.name+'details : '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('The put operation is not supported ');
})
.delete((req,res,next)=>{
    res.end('All the promotions have been deleted');
});


promoRouter.route('/:promoId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('The details of the promotion : '+req.params.promoId+'will be sent to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('The post operation is not supported');
})
.put((req,res,next)=>{
    res.write('The promotion : '+req.params.promoId+' will be updated');
    res.end('Will update the promotion :'+req.body.name+ 'with the details : '+req.body.description)
})
.delete((req,res,next)=>{
    res.end('The promotion : '+req.params.promoId+'Will be deleted');
});

module.exports = promoRouter;