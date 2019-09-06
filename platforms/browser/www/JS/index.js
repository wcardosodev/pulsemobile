function tryLogin() {
	doLogin();
	
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

function doLogin() {
	var accountDetails = {firstName: "", lastName: "", email: "", company: ""}
	// here check whether success or fail based on http request
	// make http request
	//alert("Logging in...")
	// check on error code
	
	// fill in the account details to the account information page
	
	//if success move to the next screen
	//document.location.href = "http://172.16.0.18:3000/myAccounts.html";
	document.location.href = "./accounts.html";
}