$(document).ready(function () {
	var bodyheight = $('body').height(),
			navheight = $('.topnav').height(),
			contentheight = $('.main-content').height(),
			headerheight = $('.main-header').height(),
			footerheight = $('.main-footer').height();
	
	scrollToBottom();
	
	$('#msg-send').click(function () {
		if (!$('#txtmsg-body').val() == '') {
			// Send message
			sendMessage();
		}
	});
	
	$(window).resize(function () {
		// if fullsize
		if ($('body').height() == bodyheight) {
			$('.topnav').height(navheight);
			$('.main-header').height(headerheight);
			$('.main-footer').height(footerheight);
			$('.main-content').height(contentheight);
		} 
		else {
			$('.topnav').height(navheight);
			$('.main-header').height(headerheight);
			$('.main-footer').height(footerheight);
			$('.main-content').height($('body').height() - (navheight + headerheight + footerheight));
		}
	});	
})

function sendMessage() {
	var message_list = $('#chat-page'),
					d = new Date(),
					now_hour = d.getHours(),
					now_minute = d.getMinutes(),
					date = d.getDate(),
					months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					message = $('#txtmsg-body').val();
			
			if (now_minute < 10) {
				now_minute = '0'+now_minute;
			}
			
	
			// add msg to the list
			message_list.append('<div class="msg"><div class="sent"><div class="header"><span class="time">' + now_hour + ':' + now_minute + ' | ' + months[d.getMonth()] + ' ' + d.getDate() + '</span></div><div class="body"><p>' + message + '</p></div></div></div>');
			
			// remove the text message from the input
			$('#txtmsg-body').val('');
	
			// TODO: WHEN SENDING YOU NEED TO CHECK FOR A SUCCESS MESSAGE JUST LIKE WHEN LOGGING IN

			// scroll to bottom
			scrollToBottom();
}

function loadMessages() {
	
}

function scrollToBottom() {
	$('#chat-page').scrollTop( $('#chat-page').prop('scrollHeight'));
}

function oldFocusFixMayNeedLater() {
	
		var viewportheight = $('body').css('height'),
			keyboardheight;
	//alert(vportH);
		$('#txtmsg-body').focus(function () {
		//var bodyheight = $('body').css('height');
//		alert(vportH);
//		alert(bodyheight);
	})
	
	
	
//	window.onresize = function () {
//		var bodyheight = $('body').css('height'),
//				navbarheight = parseInt(viewportheight) * 0.07,
//				header_height = parseInt(viewportheight) * 0.1,
//				msgpage_height = parseInt(viewportheight) * 0.76,
//				footer_height = parseInt(viewportheight) * 0.07;
////		alert('VH ' + viewportheight);
////		alert('navbar ' + navbarheight);
////		alert('header ' + header_height);
////		alert('msgpage ' + msgpage_height);
////		alert('footer ' + footer_height);
//		keyboardheight = parseInt(viewportheight) - parseInt(bodyheight);
//		$('.topnav').css('height', navbarheight + 'px');
//		$('.header').css('height', header_height + 'px');
//		$('.footer').css('height', footer_height + 'px');
//		
//		var messagesheight = viewportheight - (navbarheight + header_height + footer_height + keyboardheight);
//		$('.msg-page').css('height', messagesheight);
		
		
		
		// then need to set the
		//var msglistheight = $('.msg-page').css('height');
//		alert(parseInt(viewportheight));
//		alert(parseInt(bodyheight));
		//$('.grid-container').css('grid-template-rows', '7% 10% 38% 7%');
	//}
	
		// input focusing issue
//	$('#txtmsg-body').focus(function () {
//		var msg_page_h = $('.msg-page').css('height');
//		$('.msg-page').css('height', '50%');
//	})
//	
//	$('#txtmsg-body').blur(function () {
//		var msg_page_h = $('.msg-page').css('height');
//		$('.msg-page').css('height', '100%');
//	})
}