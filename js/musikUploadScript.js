
//Get element
var audioUploader = $('#uploadMusic');

var audioDataURL = [];
var audioFileName = [];




//listen for file selection
$(document).on("change","#fileMusic",function(e)
{
	//get the file type
	var file = e.target.files[0];
	var fileName = file.name;
	console.log(fileName);
	console.log(file);
    


    loadMusic(file, fileName);
 
});




var target = document.getElementById("audio-drag");
target.addEventListener("dragover", function(e){e.preventDefault();}, true);
target.addEventListener("drop", function(e){
	e.preventDefault(); 
	var file = e.dataTransfer.files[0];
	var fileName = file.name;

	loadMusic(file, fileName);
}, true);




//save music in database
function saveAudio(src, fileName){
	 console.log("hhhhhhhhhhhhhhhhh");
	// console.log(src);

	var userUid = firebase.auth().currentUser.uid;

	// var userUid = firebase.auth().currentUser.uid;
	// var saveSong = database.ref("Song/"+userUid);
	// saveSong.set({song: src});

  	var getReward = database.ref("Song/"+userUid);
    getReward.once("value", function(snapSong)
    {
    		
	    var snapValue = snapSong.val();
	   	var myAudio = snapValue.song;
    	var name = snapValue.name;

	    // delete the old song first
	    var getStorageRef = firebase.storage().ref(name+'/'+myAudio);
	    getStorageRef.delete().then(function() {
		  // File deleted successfully
		}).catch(function(error) {
		  // Uh-oh, an error occurred!
		});

		//----------------------------------------------------------------------------------------
		//Insert the song
	    var the_Nickname = nickname[0];

		//create a strage ref
		var storageRef = firebase.storage().ref(the_Nickname).child(fileName);
		//Upload file
		var task = storageRef.put(src);

		$('#message').text(fileName+' is save');
		$('#finished-btn').show();

		var saveSong = database.ref("Song/"+userUid);
		saveSong.set({name:the_Nickname,
						song: fileName
					});

	 	});

 	










	// //Update progress bar
	// task.on('state_changed', 

	// 	function progress(snapshot)
	// 	{
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


	












}



//check for image type (jpg, png, jpeg) and max 50 KB size
function loadMusic(src, fileName){
	
	//console.log(src);


	var audioType = src.type;
	var match= ["audio/mp3","audio/wav","audio/ogg"];

	var audioSize = src.size; 
   	var audioKiloBytes = Math.round( parseInt(audioSize)/1024/1024 );
	console.log("music size in MB: "+audioKiloBytes);

	if(!( (audioType==match[0]) || (audioType==match[1]) || (audioType==match[2]) ) || audioKiloBytes > 51)
	{

		$("#message").html("Invalid Image File, Only mp3, wav, ogg and max 51 MB");
		
		return false;
	}
	else
	{
		//	send to save in database



		//	Create our FileReader and run the results through the render function.
	
		saveAudio(src, fileName);
	
		

	}

}

