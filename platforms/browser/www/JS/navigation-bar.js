$(document).ready(function() {	
	$('#sidenav-icon').click(function() {
		$('.sidenav').toggleClass('open');
	});
	
	// close
	$('.closebtn').click(function() {
		$('.sidenav').toggleClass('open');
	});
});