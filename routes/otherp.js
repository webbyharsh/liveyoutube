var express=require('express');


var router=express.Router();
router.get('/about',function(req,res){
	res.sendFile(path.join(__dirname+'./routes/info.html'));
});