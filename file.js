var express=require("express");
var app=express();
var path = require("path");
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads')
    },
    filename: function (req, file, cb) {
        console.log("file in filename function::",file)
        var fileext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+fileext)
    }
})

const upload = multer({ storage: storage })


app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.get("/regform",function(req,res){
    res.sendFile(__dirname+"/registerform.html")
})

app.post("/regStudent",upload.single("profilepic"),function(req,res){
    console.log("req.body::",req.body)
    res.send("hi")
})

app.listen(7070,function(){
    console.log("7070 port")
})