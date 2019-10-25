$(document).ready(function() {	
	$('#sidenav-icon').click(function() {
		$('.sidenav').toggleClass('open');
	});
	
	$('#navbar-close').click(function() {
		$('.sidenav').toggleClass('open');
	});
	
	$('#navbar-sign-out, #navbar-sign-out-img').click(function() {
		LogOut();	
	});
});

function LogOut () {
	alert('wey');
}