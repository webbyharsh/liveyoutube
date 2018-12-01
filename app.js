var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var favicon=require('serve-favicon');

app.listen(process.env.PORT||3000);
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/',function(req,res){
res.sendFile(path.join(__dirname+'/index.html'));
});

app.use(favicon(path.join(__dirname+'/ss-home-insight.ico')));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+'/')));
// app.use('/path/others',otherp);


app.get('/:id',function(req,res){
var temp=req.params.id.split("");
if(temp.length==24){
	res.sendFile(path.join(__dirname+'/channel.html'));
}
else if(temp.length==11){
	res.sendFile(path.join(__dirname+'/video.html'));
}

});


app.post('/',function(req,res){
res.redirect('/query/'+req.body.query);
});

app.get('/query/:string',function(req,res){
res.sendFile(path.join(__dirname+'/search.html'));
});
app.get('/query/search/:id',function(req,res){
res.redirect('/'+req.params.id);
});
app.post('/trend',function(req,res){
res.sendFile(path.join(__dirname+'/trending.html'));
});

app.get('/user/go/to/contact',function(req,res){
res.sendFile(path.join(__dirname+'/contact.html'));
});
app.get('/user/go/to/about',function(req,res){
res.sendFile(path.join(__dirname+'/about.html'));
});
app.get('/user/go/to/privacy',function(req,res){
res.sendFile(path.join(__dirname+'/privacy.html'));
});
app.get('/user/pewdiepie',function(req,res){
res.redirect('/UC-lHJZR3Gqxm24_Vd_AJ5Yw');
});
app.get('/user/go/to/jakepaul',function(req,res){
res.redirect('/UCcgVECVN4OKV6DH1jLkqmcA');
});
app.get('/user/tseries',function(req,res){
res.redirect('/UCq-Fj5jknLsUf-MWSy4_brA');
});
app.get('/user/bbkivines',function(req,res){
res.redirect('/UCqwUrj10mAEsqezcItqvwEw');
});
app.get('/user/amitbhadana',function(req,res){
res.redirect('/UC_vcKmg67vjMP7ciLnSxSHQ');
});
app.get('/user/loganpaul',function(req,res){
res.redirect('/UCG8rbF3g2AMX70yOd8vqIZg');
});
app.get('/user/smosh',function(req,res){
res.redirect('/UCY30JRSgfhYXA6i6xX1erWg');
});
app.get('/show/:id',function(req,res){
res.sendFile(path.join(__dirname+'/embed.html'));
});
app.get('/user/go/to/compare',function(req,res){
res.send("Coming soon...thanks for waiting");
});
app.get('/user/go/to/compare-result',function(req,res){
res.send("");
});