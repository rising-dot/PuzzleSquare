$(".toggle").on("click", function() {
  $(".toggle").parent().toggleClass('active');
});

$(".progressContainer").hide();

$("#account-container").hide();
$("#puzzle-container").hide();
$("#formWrapper").hide();

$(document).on("click","#home-page",function(e)
{
	$("#home-container").empty();
	display_card_list();
	$("#home-container").show();

	$("#formWrapper").hide();
	$("#pagination-container").show();
	$("#puzzle-container").hide();
	$("#account-container").hide();
	$("#solve").empty();
});

$(document).on("click","#add-puzzle-page",function(e)
{
	$("#formWrapper").show();

	$("#puzzle-container").hide();
	$("#account-container").hide();
	$("#pagination-container").hide();

	$("#home-container").hide();
	$("#home-container").empty();
	$("#solve").empty();
});
$(document).on("click","#login-page",function(e)
{
	$("#account-container").show();
	$("#btn-login-account").show();
	$("#go-create-account").show();


	$(".acc-username").hide();

	$("#pass-validation-error").hide();
	$("#btn-create-account").hide();
	$("#formWrapper").hide();
	$("#puzzle-container").hide();
	$("#pagination-container").hide();

	$("#home-container").hide();
	$("#home-container").empty();
	$("#solve").empty();

});





$(document).on("click","#sign-out",function(e)
{
	$("#formWrapper").hide();
	$("#home-container").empty();
	display_card_list();
	$("#home-container").show();

});



$("#go-to-audio").hide();
$("#canvasContainer").hide();

$("#audio-main-container").hide();
$("#selected-new-image").hide();
$("#back-to-img").hide();
$("#selected-new-image").hide();
$("#finished-btn").hide();

$(document).on("click","#selected-new-image",function(e)
{
	$("#img-drag").show();
	$("#canvasContainer").hide();
});



$(document).on("click","#go-to-audio",function(e)
{
	$("#img-main-container").hide();
	$("#audio-main-container").show();
	$("#go-to-audio").hide();
	
	$("#selected-new-image").hide();
	$("#back-to-img").show();

	$("#message").empty();
});




$(document).on("click","#finished-btn",function(e)
{
	
	
	$("#home-container").empty();
	display_card_list();
	$("#home-container").show();

	$("#formWrapper").hide();
	$("#pagination-container").show();
	$("#puzzle-container").hide();
	$("#account-container").hide();

});




