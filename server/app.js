const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./mysqlDao.js');
//const dao = require('./sqliteDao.js');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/admin', (req, res)  => {
    res.status(200).sendFile('admin.html', {
        root: path.resolve('../public')
    });
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
var upload = multer({ storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Images and GIFs only, please'));
        }
    } 
})

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');   
});

app.post('/putMeme', upload.single('avatar'), function (req, res) {
    
   dao.insertMeme(req.file.filename);
   res.status(200).send("Inserted new file: " + req.file.filename);
});

app.get('/getMeme', async function (req, res) {

    var meme = await dao.getMeme();
    console.log("Trying to send the file " + meme);
    res.status(200).sendFile( __dirname + "/uploads/"+ meme );
});

app.listen(3000, () => console.log('Server started on port 3000'));