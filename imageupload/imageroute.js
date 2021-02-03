let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();
  

// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .jpeg, and .png format allowed!'));
    }
  }
});

// User model
let USer = require('./image');

// POST iamges
router.post('/image', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const user = new USer({
    _id: new mongoose.Types.ObjectId(),
    avatar: url + '/public/' + req.file.filename,
  });
  user.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "User registered successfully!",
      success: true,
      userCreated: {
        _id: result._id,
        avatar: result.avatar,
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        success:false,
        error: err
      });
  })
})


// GET All images
router.get("/image", (req, res, next) => {
  USer.find().then(data => {
    res.status(200).json({
      message: "Users retrieved successfully!",
      users: data
    });
  });
});

router.delete('/image/:id',(req,res,next)=>{
  USer.remove({_id: req.params.id}, function(err, result){
      if(err){
          res.json(err);
      }
      else{
          res.json(result);
      }
  });
});

module.exports = router;
