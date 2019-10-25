$(document).ready(function () {
	
	$('#form-login').submit(function(event) {
		event.preventDefault();
		DoLogin();
		//TryLogin();
	});
	
	$('#forgot-password').click(function(event) {
		event.preventDefault();
		alert('You forgot your password!!!!!');	
	});
})



//// Add to index.js or the first page that loads with your app.
//// For Intel XDK and please add this to your app.js.
//
document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("51789cd3-0a5e-4ca2-a5fc-b582888a7275")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);

function TryLogin() {
	//DoLogin();
	
	var username = $('#user-username').val(),
			password = $('#user-password').val(),
			pin = $('#user-pin').val(),
			account_details = {firstName: "", lastName: "", email: "", company: ""};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		// check url below for info on xmlhttprequest properties and methods
		// https://www.w3schools.com/js/js_ajax_http.asp
		// 4 means request is finished and response is ready
		// 200 means success
		if (this.readyState == 4 && this.status == 200) {
			// if request comes back successful
			
			// get the object information and put it into the account details
			
		} else {
			// if request fails
			
			// overlay to say username and password incorrect or something
		}
	};
	xhttp.open('');
	xhttp.send();
	
	// send this information to the server via ajax
	
//	var MessageResult = "";
//	var username = document.getElementById("input-username").value;
//	var password = document.getElementById("input-password").value;
//	var pin = document.getElementById("input-pin").value;
//	
//	// Check if any parameters are missing
//	if (username.length == 0) {
//		MessageResult += "Missing username. ";
//		Result = false;
//	}
//	if (password.length == 0) {
//		MessageResult += "Missing password. ";
//		Result = false;
//	}
//	if (pin.length == 0) {
//		MessageResult += "Missing pin. ";
//		Result = false;
//	}
//	
//	// if missing any information alert them
//	if (MessageResult.length > 0) {
//		alert(MessageResult);
//	}
//	// else login using the credentials
//	else {
//		doLogin(username, password, pin);
//	}
}

function DoLogin() {
	var accountDetails = {firstName: "", lastName: "", email: "", company: ""};
	// here check whether success or fail based on http request
	// make http request
	//alert("Logging in...")
	// check on error code
	
	// fill in the account details to the account information page
	
	//if success move to the next screen
	//document.location.href = "http://172.16.0.18:3000/myAccounts.html";
//	document.location.href = "./myShifts.html";
	document.location.href = "./availabilityNEW.html";
}