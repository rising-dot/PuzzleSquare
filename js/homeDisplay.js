
$(document).on("click",".card-list-style",function(e)
{
	
	var getImg = $(this).find('img').attr('src');
	var getNickName = $(e.target).text();
	// console.log(getNickName);
	// console.log(getImg);


	sendImgBase(getImg, getNickName);
	$('.card-list-style').remove();
	$("#puzzle-container").show();
	$("#pagination-container").hide();

});

var page_pagination = 10;


function display_card_list()
{
	var pagination = [];
	var getDisplay_home = database.ref("display_home");
	getDisplay_home.orderByKey().limitToFirst(page_pagination).once("value", function(snapshot)
	{
	    var snapValue = snapshot.val();
	    var keyName = snapshot.key;// display_home
	    //console.log(keyName);		
		snapshot.forEach(function(snapUid)
		{		
			snapUid.forEach(function(snapInfo)
			{
				var snapInfoValue = snapInfo.val(); //snapInfoValue.img = data:image/jpeg;base64,/9j/4A
				var keyInfo = snapInfo.key;  		//nickname 
				//console.log(keyInfo);
				//console.log(snapInfo.img);
			//	$('#home-container').append('<div class="card-list-style"><div class="card-img-holder"><img class="card-img-size" src="'+snapInfoValue.img+'"></div><div class="card-text-center"><h1 class="card-text-size">'+keyInfo+'</h1></div></div');
		
$('#home-container').append('<div class="card-list-style" ><div class="card-mini-cover" style="background: url('+snapInfoValue.img+'); height: 149px; transform: translate(-2%, 0%); position: absolute; background-size: cover; background-position: center center; background-repeat: no-repeat; z-index: -1; opacity: .5;"></div><div class="card-img-holder"><img class="card-img-size" src="'+snapInfoValue.img+'"></div><div class="card-text-center"><h1 class="card-text-size">'+keyInfo+'</h1></div></div>');
		
		

			});

			var keyUid = snapUid.key; //console.log(keyUid);	
			pagination.push(keyUid);
		});  	
			//you will get 3 card-list - limitToFirst(3) 
			pageNumber(pagination);
	});

}
display_card_list();

//------------------------------------------------------------------------------------------------------------------------------------------------------



function pageNumber(pagination)
{

	//remove the Class first
	$('#btn-left').removeClass();
	$('#btn-right').removeClass();

	var getLength = pagination.length;


	var getTheFirstUid = pagination[0];
 	var getTheLastUid = pagination[getLength-1];

 	//adding the new class
 	$('#btn-left').addClass(getTheFirstUid);
 	$('#btn-right').addClass(getTheLastUid);
 // 	console.log(getTheFirstUid);
	// console.log(getTheLastUid);

}












$(document).on("click","#btn-right",function()
{
	$("#home-container").empty();
	var myClass = this.className;
	console.log(myClass);

  	var pagination = [];
	var getDisplay_home = database.ref("display_home");
	getDisplay_home.orderByKey().limitToFirst(page_pagination).startAt(myClass).once("value", function(snapshot)
	{
	    var snapValue = snapshot.val();
	    var keyName = snapshot.key;// display_home
	    //console.log(keyName);		
		snapshot.forEach(function(snapUid)
		{		
			snapUid.forEach(function(snapInfo)
			{
				var snapInfoValue = snapInfo.val(); //snapInfoValue.img = data:image/jpeg;base64,/9j/4A
				var keyInfo = snapInfo.key;  		//nickname 
				//console.log(keyInfo);
				//console.log(snapInfo.img);
				$('#home-container').append('<div class="card-list-style" ><div class="card-mini-cover" style="background: url('+snapInfoValue.img+'); height: 149px; transform: translate(-2%, 0%); position: absolute; background-size: cover; background-position: center center; background-repeat: no-repeat; z-index: -1; opacity: .5;"></div><div class="card-img-holder"><img class="card-img-size" src="'+snapInfoValue.img+'"></div><div class="card-text-center"><h1 class="card-text-size">'+keyInfo+'</h1></div></div>');
		
	
			});

			var keyUid = snapUid.key; //console.log(keyUid);	
			pagination.push(keyUid);
		});  	
			//you will get 3 card-list - limitToFirst(3) 
			pageNumber(pagination);
	});


});




$(document).on("click","#btn-left",function()
{
	$("#home-container").empty();
	var myClass = this.className;
	console.log(myClass);

  	var pagination = [];
	var getDisplay_home = database.ref("display_home");
	getDisplay_home.orderByKey().limitToLast(page_pagination).endAt(myClass).once("value", function(snapshot)
	{
	    var snapValue = snapshot.val();
	    var keyName = snapshot.key;// display_home
	    //console.log(keyName);		
		snapshot.forEach(function(snapUid)
		{		
			snapUid.forEach(function(snapInfo)
			{
				var snapInfoValue = snapInfo.val(); //snapInfoValue.img = data:image/jpeg;base64,/9j/4A
				var keyInfo = snapInfo.key;  		//nickname 
				//console.log(keyInfo);
				//console.log(snapInfo.img);
				$('#home-container').append('<div class="card-list-style" ><div class="card-mini-cover" style="background: url('+snapInfoValue.img+'); height: 149px; transform: translate(-2%, 0%); position: absolute; background-size: cover; background-position: center center; background-repeat: no-repeat; z-index: -1; opacity: .5;"></div><div class="card-img-holder"><img class="card-img-size" src="'+snapInfoValue.img+'"></div><div class="card-text-center"><h1 class="card-text-size">'+keyInfo+'</h1></div></div>');
			});

			var keyUid = snapUid.key; //console.log(keyUid);	
			pagination.push(keyUid);
		});  	
			//you will get 3 card-list - limitToFirst(3) 
			pageNumber(pagination);
	});


});












