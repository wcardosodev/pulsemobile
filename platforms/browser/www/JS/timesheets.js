$(document).ready(function() {
	var signature = $("#signature");
	signature.jSignature();
	
	// initialise the css for the canvas
	
	
	$("#signature-reset").click(function() {
		signature.jSignature('reset');
	});
	
	$('#signature-redoLastStroke').click(function() {
		
	});
	
	$('#signature-confirm').click(function() {
		
	});
});