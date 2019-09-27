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
	
	// input focusing issue
//	$('.text-input').focus(function () {
//		var msgheight = $('.message-container').css('height'),
//				footerheight = $('.footer').css('height');
//		$('.msg-page').css('height', msgheight - footerheight);
//	})

});