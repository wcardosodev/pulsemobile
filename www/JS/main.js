$(document).ready(function() {
	
	// Navbar
	// open / close
	$('#sidenav-icon').click(function() {
		if ($('.sidenav').hasClass('open')) {
			$('.sidenav').css('width', '0%');
		} else {
			$('.sidenav').css('width', '40%');	
		}
		$('.sidenav').toggleClass('open');
	});
	
	// close
	$('.closebtn').click(function() {
		$('.sidenav').css('width', '0%');
		$('.sidenav').toggleClass('open');
	});

});