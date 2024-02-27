import path from 'path';
import multer from 'multer';

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null,uniqueSuffix+file.originalname)
      }
})

var upload = multer({
    storage:storage,
    fileFilter: function(req,file,callback){
        if(file.mimetype == "image/png"){
            callback(null,true)
        }
        else{
            console.log("Only png supported");
            callback(null,false);
        }
    },

    limits:{
        fileSize:1024 * 1024 * 2
    }
})
export default upload;