//Important keys
const initialstring="https://www.googleapis.com/youtube/v3/search?part=snippet&&maxResults=40&q=";
const laststring="&key=AIzaSyB3fR5LrDw6SHgNZk2ge8zrq06gpP5yb18";
const videoinitial="https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=";
const channelinitial="https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=";
//important keys

var app=angular.module('body',[]);

app.controller('query',function($scope,$http,$location){
	
		var querystring=$location.absUrl().split('/')[4];
		console.log($location.absUrl().split('/'));
		document.getElementById('loadingcont').classList.add('loader');
        
		$http.get(initialstring+querystring+laststring).then((response)=>{
			document.getElementById('loadingcont').classList.remove('loader');
			console.log(response.data.items);
			$scope.response=response.data.items;
		})

	
});


var subs=angular.module('channelstats',[]);

subs.controller('ch',function($scope,$http,$interval,$location){
	console.log($location.absUrl().split('/')[3]);
	var channelid=$location.absUrl().split('/')[3];
	$scope.channelname="Loading Data...";
	$scope.description="Loading Data...";
	$scope.increase="Loading Data..Have Patience";
	var increase=0;
	var startsubs;
	var elapsedtime=0;
	$http.get(channelinitial+channelid+laststring).then((response)=>{
		console.log(response);
		// $scope.titleofchannelpage=response.data.items[0].snippet.title+' - RealTime subscriber Count';
		$scope.channelname=response.data.items[0].snippet.title;
		document.getElementById('title').innerHTML=response.data.items[0].snippet.title+' - RealTime subscriber Count';
		$scope.description=response.data.items[0].snippet.description;
		startsubs=response.data.items[0].statistics.subscriberCount;
		$scope.provided=response.data.items;
		$scope.country='Country: '+response.data.items[0].snippet.country;
		$scope.totalviews="Total Views on the channel:"+numberWithCommas(response.data.items[0].statistics.viewCount);
		$interval(function(){
			$http.get(channelinitial+channelid+laststring).then((response)=>{ $scope.subscribers=numberWithCommas(response.data.items[0].statistics.subscriberCount);
					$scope.increase='^'+(parseInt(response.data.items[0].statistics.subscriberCount)-startsubs);
					$scope.rate=((parseInt(response.data.items[0].statistics.subscriberCount)-startsubs)/elapsedtime).toFixed(2)+' subs/sec';
					elapsedtime+=0.5;
					updateChart(parseInt(response.data.items[0].statistics.subscriberCount));
				});
			// $scope.subscribers=response.data.items[0].statistics.subscriberCount;
		},500)
	});
//graph plotting
var dps=[];
var chart = new CanvasJS.Chart("chartContainer", {
	title :{
		text: "Live Subs Plot"
	},   
	theme:"light2",
	data: [{
		type: "spline",
		dataPoints: dps,
		markerType:"none"

	}],
	axisY: {
		title: "Subscribers ",
		includeZero: false
	},
	axisX: {
		title: "Time ",
		suffix:" secs"
	}
});

var updateInterval = 1000;


var updateChart = function (subs) {

	count = dps.length;

	if(dps.lenght>90){
		dps.shift();
	}
	dps.push({
		x:elapsedtime,
		y:subs
	})
	

	chart.render();
};





});

//additional funcitons
function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


var vdos=angular.module('vstats',[]);

vdos.controller('vdo',function($scope,$location,$interval,$http){
var videoid=$location.absUrl().split('/')[3];

	$http.get(videoinitial+videoid+laststring).then((response)=>{
		console.log(response);
		$scope.title=response.data.items[0].snippet.title;
		$scope.publisher='Published by '+response.data.items[0].snippet.channelTitle;
		$scope.description=response.data.items[0].snippet.description;
		var ytlink='https://www.youtube.com/embed/'+response.data.items[0].id;
		var array=[];
		array.push(ytlink);
		console.log(array);
		console.log(ytlink);
		$scope.data="Loading..."
		document.getElementById('videocontainer').src=ytlink;
		$scope.date=response.data.items[0].snippet.publishesAt;

		$interval(function(){
			$http.get(videoinitial+videoid+laststring).then((response)=>{
				$scope.data="";
				$scope.likes=numberWithCommas(response.data.items[0].statistics.likeCount);
				$scope.dislikes=numberWithCommas(response.data.items[0].statistics.dislikeCount);
				$scope.comments=numberWithCommas(response.data.items[0].statistics.commentCount);
				$scope.views=numberWithCommas(response.data.items[0].statistics.viewCount);
				var totalvotes=parseInt(response.data.items[0].statistics.likeCount)+parseInt(response.data.items[0].statistics.dislikeCount);
				var likesare=response.data.items[0].statistics.likeCount;
				var likespercent=(likesare/totalvotes)*100;
				document.getElementById('likes').style.width=likespercent+'%';
			});
		},1000)
	})
});

var fpc=angular.module('front',[]);

fpc.controller('index',function($scope,$http){
	
		$http.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN"+laststring).then((response)=>{
			$scope.responseindex=response.data.items;
		console.log(response);
	});
});

//for index page predefined big youtubers
var b1=angular.module('big',[]);

b1.controller('bigctr1',function($scope,$http,$interval){
	$scope.info="Loading..."
	$http.get(channelinitial+'UC-9-kyTW8ZkZNDHQJ6FgpwQ'+laststring).then((response)=>{
		$scope.title=response.data.items[0].snippet.title;
		$scope.resp=response.data.items;
	});
	$interval(function(){
		$http.get(channelinitial+'UC-9-kyTW8ZkZNDHQJ6FgpwQ'+laststring).then((response)=>{
			$scope.subscribers=response.data.items[0].statistics.subscriberCount;
			$scope.info="";

		});

	},2000);

});





var elapsedtimeg=0;
setInterval(function(){elapsedtimeg++},1000);
b1.controller('bigctr2',function($scope,$http,$interval){
	$scope.info="Loading...";
	
	$http.get(channelinitial+'UC-lHJZR3Gqxm24_Vd_AJ5Yw'+laststring).then((response)=>{
		$scope.title=response.data.items[0].snippet.title;
		$scope.resp2=response.data.items;
	});
	$interval(function(){
		$http.get(channelinitial+'UC-lHJZR3Gqxm24_Vd_AJ5Yw'+laststring).then((response)=>{
			$scope.subscribers=response.data.items[0].statistics.subscriberCount;			$scope.info="";
			pewds.push({
				x:elapsedtimeg,
				y:parseInt($scope.subscribers=response.data.items[0].statistics.subscriberCount)
			})
		});
	},2000);

});

b1.controller('bigctr3',function($scope,$http,$interval){
	$scope.info="Loading..."
	$http.get(channelinitial+'UCq-Fj5jknLsUf-MWSy4_brA'+laststring).then((response)=>{
		$scope.title=response.data.items[0].snippet.title;
		$scope.resp3=response.data.items;
	});
	$interval(function(){
		$http.get(channelinitial+'UCq-Fj5jknLsUf-MWSy4_brA'+laststring).then((response)=>{
			$scope.subscribers=response.data.items[0].statistics.subscriberCount;			$scope.info="";
			tsers.push({
				x:elapsedtimeg,
				y:parseInt($scope.subscribers=response.data.items[0].statistics.subscriberCount)
			})
		});

	},2000);

});

b1.controller('bigctr4',function($scope,$http,$interval){
	$scope.info="Loading..."
	$http.get(channelinitial+'UCIwFjwMjI0y7PDBVEO9-bkQ'+laststring).then((response)=>{
		$scope.title=response.data.items[0].snippet.title;
		$scope.resp4=response.data.items;
	});
	$interval(function(){
		$http.get(channelinitial+'UCIwFjwMjI0y7PDBVEO9-bkQ'+laststring).then((response)=>{
			$scope.subscribers=response.data.items[0].statistics.subscriberCount;			$scope.info="";

		});

	},2000);

});

b1.controller('bigctr5',function($scope,$http,$interval){
	$scope.info="Loading..."
	$http.get(channelinitial+'UCRijo3ddMTht_IHyNSNXpNQ'+laststring).then((response)=>{
		$scope.title=response.data.items[0].snippet.title;
		$scope.resp5=response.data.items;
	});
	$interval(function(){
		$http.get(channelinitial+'UCRijo3ddMTht_IHyNSNXpNQ'+laststring).then((response)=>{
			$scope.subscribers=response.data.items[0].statistics.subscriberCount;			$scope.info="";

		});

	},2000);

});

b1.controller('bigctr6',function($scope,$http,$interval){
	$scope.info="Loading..."
	$http.get(channelinitial+'UCqwUrj10mAEsqezcItqvwEw'+laststring).then((response)=>{
		$scope.title=response.data.items[0].snippet.title;
		$scope.resp6=response.data.items;
	});
	$interval(function(){
		$http.get(channelinitial+'UCqwUrj10mAEsqezcItqvwEw'+laststring).then((response)=>{
			$scope.subscribers=response.data.items[0].statistics.subscriberCount;			$scope.info="";

		});

	},2000);

});
var pewds=[];
var tsers=[];
var bbs=[];
var amit=[];
b1.controller('data-plot',function($scope,$http,$interval){
	
	var chart1 =new CanvasJS.Chart('chartContainer2',{
		title:{text:"PewDiePie"},
		axisY:{
			title:"Subscribers",
			includeZero:false,
		}
		,
		axisX:{
			title:"Time",
			suffix:" secs"
		},
		data:[{
			type:"spline",
			dataPoints:pewds,
			markerType:"none"
		}]
		});
chart1.render();

var chart2 =new CanvasJS.Chart('chartContainer3',{
		title:{text:" T-Series"},
		axisY:{
			title:"Subscribers",
			includeZero:false,
		}
		,
		
		axisX:{
			title:"Time",
			suffix:" secs"
		},
		data:[{
			type:"spline",
			dataPoints:tsers,
			markerType:"none"
		}]
	});
	$interval(function(){
		if(tsers.length>40&&pewds.length>40){
			pewds.shift();
			tsers.shift();
		}
		
		$http.get(channelinitial+'UCqwUrj10mAEsqezcItqvwEw'+laststring).then((response)=>{
			 pewdie=parseInt(response.data.items[0].statistics.subscriberCount);
			bbs.push(
			{
			x:elapsedtimeg,
			y:parseInt(response.data.items[0].statistics.subscriberCount)
			});
		});
		$http.get(channelinitial+'UC_vcKmg67vjMP7ciLnSxSHQ'+laststring).then((response)=>{
			tseries=parseInt(response.data.items[0].statistics.subscriberCount);
			amit.push(
			{
			x:elapsedtimeg,
			y:parseInt(response.data.items[0].statistics.subscriberCount)
			});
			tseriess=parseInt(response.data.items[0].statistics.subscriberCount);
		})
		chart1.render();
		chart2.render();
		

	},1000)
});
var pewdie,tseriess,subgap;
// title :{
// 		text: "Live Subs Plot"
// 	},   
// 	theme:"light2",
// 	data: [{
// 		type: "spline",
// 		dataPoints: dps
// 	}],
// 	axisY: {
// 		title: "Subscribers ",
// 		includeZero: false
// 	},
// 	axisX: {
// 		title: "Time ",
// 		suffix:" secs"
// 	}