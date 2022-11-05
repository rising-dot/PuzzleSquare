


// show logout button when user is logged in
 $(document).on("click","#sign-out",function()
 {
	firebase.auth().signOut().then(function() {
		$("#login-page").show();
    	$("#sign-out").hide();
    	$("#add-puzzle-page").hide();
	 	console.log('Signed Out');
	}, function(error) {
	  	console.error('Sign Out Error', error);
	});
 });



//Sign up new users
$(document).on("click","#btn-create-account",function()
{
	var nickname = $("#username").val();
	var emailText = $("#email").val();
	var passwordText = $("#password").val();

	if(emailText && passwordText && nickname)
	{
		var checkUserNameRef = database.ref('Nicknames');
		checkUserNameRef.orderByKey().equalTo(nickname).once("value", function(snapshot)
   		{
   			var userData = snapshot.val();
   			console.log(userData);
   			if (userData)
   			{

   				console.log("nickname exsit");
   				$("#username-validation-error").text("Nickname Exsit");
   				

   			}
   			else
   			{

				firebase.auth().createUserWithEmailAndPassword(emailText, passwordText).then(function(user)
				{
					//save user informantion
					var saveUserRef = database.ref("Users/"+ user.uid);
					saveUserRef.set({
		  						username: nickname,
		               		 	email: user.email,
		               		    uid : user.uid 
								});
					//save nickname
					var saveNicknameRef = database.ref("Nicknames").child(nickname);
					saveNicknameRef.set({nickname});
				    console.log('everything went fine');
				   
				    
				    //send verification to user
				    user.sendEmailVerification().then(function()
	                {
	                    // Email sent.
	                    //console.log("we have sent a email to you to verifer");
	                    alert("we have sent a email to you to verifer!");
	                },
	                function(error)
	                {
	                    console.log("sendEmailVerification error: " + error);
	                });


				}).catch(function(error) 
				{
				    console.log('there was an error');
				    var errorCode = error.code;
				    var errorMessage = error.message;
				    console.log(errorCode + ' - ' + errorMessage);

				    $("#email-validation-error").text("Email Exsit");

				});
 			}
	

		});




	}
	else
	{
	    console.log('fill in both fields');
	} 




});



$(document).on("click", "#btn-login-account", function()
{

	var emailText = $("#email").val();
	var passwordText = $("#password").val();

  firebase.auth().signInWithEmailAndPassword(emailText, passwordText).then(function() 
  {
     
		console.log('you got in');
		$("#account-container").hide();
		$("#home-container").show();
		display_card_list();
		

  }).catch(function(error) {
		var errorCode = error.code;
     	var errorMessage = error.message;
		alert('Wrong password or invalid-email');
  });







});

var nickname = [];


// //Attach the observer using the onAuthStateChanged method.
// // When a user successfully signs in, you can get information about the user in the observer.
firebase.auth().onAuthStateChanged(function(user) {
  





  if(user.emailVerified)
  {
  	
  		console.log('Email is verified');
  		$("#login-page").hide();
    	$("#sign-out").show();
  		$("#add-puzzle-page").show();

    	// get username
     	var userUid = firebase.auth().currentUser.uid;
     	//console.log(userUid);


    	var getNicknameRef = database.ref("Users/"+userUid);
     	getNicknameRef.once("value", function(snapshot)
    	{
    		//console.log("-----------------------");	
	      	var snapValue = snapshot.val();
	      	var getKey = Object.keys(snapValue);
	      	var the_username = snapValue[getKey[0]].username;
	   		//console.log(snapValue.username);
	   		nickname.push(snapValue.username);
 		});



  
      // var refUsers = database.ref("Users");
  } else {
    // User is signed out.
    // ...
    	$("#login-page").show();
    	$("#sign-out").hide();
    	$("#add-puzzle-page").hide();
     console.log('Email is not verified');
  }
});



$(document).on("click","#go-create-account",function(e)
{
	
	$(".acc-username").show();
	$("#btn-create-account").show();
	$("#pass-validation-error").show();
	$("#btn-login-account").hide();
	$("#go-create-account").hide();
});


// {
//   "rules": {
//     "Usernames": {
//             ".read": true,
// 			      ".write": true
//     },
//   "users": {
//       "$uid": {
//         ".read": true,
//         ".write": true
//       }
//     },
//     "Nicknames": {
//             ".read": true,
// 			      ".write": true
//     }
//   }
// }


  // "users": {
  //     "$uid": {
  //       ".read": "$uid === auth.uid",
  //       ".write": true
  //     }
  //   },





$(document).on("keyup", "#username", function()
{
    var el = $(this);

    if(el.val().length >= 36)
    {
        el.val( el.val().substr(0, 35) ); // delete the value if over 15 
    } 
  
});


$(document).on("keyup", "#email", function()
{
    var el = $(this);

    if(el.val().length >= 226)
    {
        el.val( el.val().substr(0, 255) ); // delete the value if over 15 
    } 
  
});

$(document).on("keyup", "#password", function()
{
    var el = $(this);

    if(el.val().length >= 226)
    {
        el.val( el.val().substr(0, 255) ); // delete the value if over 15 
    } 
  
});

















// {
//   "rules": {
//     "Usernames": {
//         "$username": {
//             ".read": true,
// 			      ".write": true
//       }
//     }
//   }
// }



//     {
//   "rules": {
//     ".read": "auth != null",
//     ".write": "auth != null"
//   }
// }