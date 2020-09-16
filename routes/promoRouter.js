const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Promotions = require('../models/promotions');
const authenticate = require('../authenticate');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('The put operation is not supported ');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Promotions.remove({})
    .then((message)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(message);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

promoRouter.route('/:promoId')
.get((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('The post operation is not supported');
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {new:true})
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((message)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(message);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = promoRouter;