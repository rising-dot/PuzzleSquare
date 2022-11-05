




//Get element
var ImgUploader = $('#uploadImg');


//listen for file selection
$(document).on("change","#fileImg",function(e)
{
	//get the file type
	var file = e.target.files[0];
	var fileName = file.name;
	//console.log(fileName);
    loadImage(file, fileName);
 
});

var target = document.getElementById("img-drag");
target.addEventListener("dragover", function(e){e.preventDefault();}, true);
target.addEventListener("drop", function(e){
	e.preventDefault(); 
	var file = e.dataTransfer.files[0];
	var fileName = file.name;


	loadImage(file, fileName);
}, true);


// //drop box
// var obj = $("#canvas");
// obj.on('dragenter', function (e) 
// {
//     e.stopPropagation();
//     e.preventDefault();
//     $(this).css('border', '2px solid #0B85A1');
// });
// obj.on('dragover', function (e) 
// {
//      e.stopPropagation();
//      e.preventDefault();
// });
// obj.on('drop', function (e) 
// {

//      $(this).css('border', '2px dotted #0B85A1');
//      e.preventDefault();
     
//  	// var file = e.dataTransfer.files[0];


// 	//console.log(file);
// 	var fileName ="test name";

	
//      //We need to send dropped files to Server
//       loadImage(e.dataTransfer.file, fileName);
//      $("#message").html("<p id='error'>drop good</p>");
// });

// //To avoid that we can prevent ‘drop’ event on document.
// $(document).on('dragenter', function (e) 
// {
//     e.stopPropagation();
//     e.preventDefault();
// });
// $(document).on('dragover', function (e) 
// {
//   e.stopPropagation();
//   e.preventDefault();
//   obj.css('border', '2px dotted #0B85A1');
// });
// $(document).on('drop', function (e) 
// {
//     e.stopPropagation();
//     e.preventDefault();
// });






var MAX_HEIGHT = 480;
var MAX_WIDTH = 480;

function render(src, fileName){
	var image = new Image();
	image.onload = function()
	{
		var canvas = document.getElementById("canvas");
		//if the image is smaller then 480, make it 480x480  
		if(image.height < MAX_HEIGHT ) //if(image.height > MAX_HEIGHT || image.height < MAX_HEIGHT )
		{
			image.width *= MAX_HEIGHT / image.height;
			image.height = MAX_HEIGHT;

			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.width = MAX_HEIGHT;
			canvas.height = MAX_HEIGHT;
			ctx.drawImage(image, 0, 0, image.width, image.height);
		}
		else
		{
		//else crop the image to 480x480
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.width = MAX_HEIGHT;
			canvas.height = MAX_HEIGHT;
			ctx.drawImage(image, 
	                      (image.width - MAX_HEIGHT) / 2,   // sx, 200 pixels to the left from center
	                      (image.height - MAX_WIDTH) / 2,  // sy, 175 pixels above center
	                      MAX_HEIGHT, MAX_WIDTH, 0, 0, MAX_HEIGHT, MAX_WIDTH);  // sw, sh, dx, dy, dw, dh
		}

		//TO DO ----------------------------------
		//save this to your database
		var dataURL = canvas.toDataURL('image/jpeg', 0.6);
	
		saveImage(dataURL, fileName);
		//----------------------------------
			$("#img-drag").hide();
			$("#canvasContainer").show();
			$("#go-to-audio").show();
			$("#selected-new-image").show();
		//$("#message").append('<img src="'+dataURL+'">');
		// console.log(dataURL);
	};
	image.src = src;
}



 //check for image type (jpg, png, jpeg) and max 50 KB size
function loadImage(src, fileName){
	
	//console.log(src);

	var imageType = src.type;
	var match= ["image/jpeg","image/png","image/jpg"];

	var imageSize = src.size; 
   	var imgKiloBytes = Math.round( parseInt(imageSize)/1024 );
	console.log("image size in KB: "+imgKiloBytes);

	if(!((imageType==match[0]) || (imageType==match[1]) || (imageType==match[2])) || imgKiloBytes > 51)
	{

		$("#message").html("Invalid Image File, Only jpeg, jpg, png and max 51 KB");
		
		return false;
	}
	else
	{
		//	Create our FileReader and run the results through the render function.
		var reader = new FileReader();
		reader.onload = function(e){
			render(e.target.result, fileName);
		};
		
		reader.readAsDataURL(src);
	}

}





 //save the image, data type( 64 base)
function saveImage(src, fileName)
{
	


 	// get username
    var the_Nickname = nickname[0];

		var userUid = firebase.auth().currentUser.uid;
		var saveDisplayHome = database.ref("display_home/"+userUid+"/" +the_Nickname);
		var task = saveDisplayHome.set({img: src});


			$("#message").text(fileName+' is save');
			//$("#audio-upload-done-text").text(fileName+' is save');
			
	// //Update progress bar
	// task.on('state_changed', 

	// 	function progress(snapshot)
	// 	{
	// 		console.log(snapshot.val());
	// 		var percentage =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

	// 		audioUploader.val(percentage);
	// 		console.log('Upload is ' + percentage + '% done');
	// 	},
	// 	function error(err)
	// 	{

	// 	},
	// 	function complete()
	// 	{
	// 		$("#message").html("<p id='error'>Good To Go</p>");
	// 		$("#audio-upload-done-text").text(fileName+' is save');
	// 		$("#finished-btn").show();
	// 	}
	// );










	// //create a strage ref
	// var storageRef = firebase.storage().ref('home/'+the_Nickname).child(fileName);
	// //Upload file
	// var task = storageRef.putString(src, 'data_url', { contentType:'image/jpeg' });

	// //Update progress bar
	// task.on('state_changed', 

	// 	function progress(snapshot)
	// 	{
	// 		var percentage =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 		ImgUploader.val(percentage);
	// 		console.log('Upload is ' + percentage + '% done');
	// 	},
	// 	function error(err)
	// 	{

	// 	},
	// 	function complete()
	// 	{
	// 		$("#message").html("<p id='error'>Good To Go</p>");
	// 		//$("#drag-drop-container").append('<img id="drop-img-size" src="'+src+'">');
			
	// 	}
	// );










}





	// var srcGo = "";
	// var userUid = "0ZJjLdCAl2TT5yWWb1YrEnnTrwD3";
	// 	var saveDisplayHome = database.ref("display_home/"+userUid+"/" +"one");
	// 	var task = saveDisplayHome.set({img: srcGo});




















// var target = document.getElementById("drop-target");
// target.addEventListener("dragover", function(e)
// {
// 	e.preventDefault();
// }, true);

// target.addEventListener("drop", function(e)
// {
// 	e.preventDefault(); 
// 	loadImage(e.dataTransfer.files[0]);
// 	console.log("we have a drop");
// }, true);






//	Remember that DTK 1.7+ is AMD!
// require(["dojo/request"], function(request){
//     request.post("image-handler.php", {
//         data: {
//             imageName: "myImage.png",
//             imageData: encodeURIComponent(document.getElementById("canvas").toDataURL("image/png"))
//         }
//     }).then(function(text){
//         console.log("The server returned: ", text);
//     });
// });




