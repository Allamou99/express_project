const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const authenticate = require('../authenticate');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({storage:storage,fileFilter:imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end('get operation not supported on /images/upload');
})
.post(authenticate.verifyUser,upload.single('imageFile'),(req,res)=>{
    res.statusCode = 200,
    res.setHeader('ContentType','application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end('Put operation not supported on /images/upload');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end('delete operation not supported on /images/upload');
})

module.exports = uploadRouter;