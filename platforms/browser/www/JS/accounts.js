$(document).ready(function() {
	
	// clicking edit button
	$('#edit').click(function(event){
		event.preventDefault();
		// if editing
		if ($('.edit-info').is(':disabled')) {			
			$('.edit-info').prop('disabled', false);			
			$('#cancel').prop('disabled', false);
			
			$('#edit').prop('value', 'Save');
			$('#edit').prop('type', 'Submit');
		}
		// if you are saving
		else {
			$('.edit-info').prop('disabled', true);			
			$('#cancel').prop('disabled', true);
			
			$('#edit').prop('value', 'Edit');
			$('#edit').prop('type', 'button');		
		}
	});
	
	// clicking cancel button
	$('#cancel').click(function(event) {
		event.preventDefault();
		//if editable info is enabled (ready to edit)
		if ($('.edit-info').is(':enabled')) {
			// disable editable info
			$('.edit-info').prop('disabled', true);
			// disable cancel button
			$('#cancel').prop('disabled', true);
			// change edit button back to saying edit
			$('#edit').prop('value', 'Edit');
			// change edit button to be of type button no longer submit
			$('#edit').prop('type', 'button');
		}
	});
	 
});