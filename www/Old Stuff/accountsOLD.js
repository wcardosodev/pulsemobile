$(document).ready(function() {
	
	$('#accounts .item-header').click(function () {
		OpenMenuOption('#accounts');
	});
	
	$('#accounts .form-footer input').click(function (e) {
		// stops the default event of submitting form
		e.preventDefault();
		
		var attrType = $('#accounts .form-footer input').val();
		
		if (attrType == 'Edit') {
			AllowFormEdit('#accounts');
		} else if (attrType == 'Confirm') {
			// do code to submit changes to wherever
			SubmitFormChanges('#accounts');
		}
	});
	
	$('#communication .item-header').click(function () {
		OpenMenuOption('#communication');
	});
	
	$('#communication .form-footer input').click(function (e) {
		// stops the default event of submitting form
		e.preventDefault();
		
		var attrType = $('#communication .form-footer input').val();
		
		if (attrType == 'Edit') {
			AllowFormEdit('#communication');
		} else if (attrType == 'Confirm') {
			// do code to submit changes to wherever
			SubmitFormChanges('#communication');
		}
	});
	
	$('#help .item-header').click(function () {
		OpenMenuOption('#help');
	});
	
	$('#help-shifts, #help-timesheets, #help-availability').click(function (e) {
		OpenHelpOverlay(e.target);
	});
	
	$('#help-timesheets').click(function () {
		
	});
	
	$('#help-availability').click(function () {
		
	});
	
	$('.overlay .footer input, #overlay-cancel').click(function () {
		CloseHelpOverlay();	
	});
	
});

function OpenMenuOption(id) {
	// check if the option(id) is open
	var isMenuOpen = $(id).hasClass('open');
	
	// close all open elements
	$('.menu .open').removeClass('open');
	
	// if it was previously open then close it, else open it
	if (isMenuOpen) {
		$(id).removeClass('open');
	} else {
		$(id).addClass('open');	
	}	
	
	// Need to disable
	$('.menu form .flex-container input').attr('disabled', true);
	$('.menu form .form-footer input').val('Edit');
}

function AllowFormEdit(form_id) {	
	// remove the disabled attribute so they can edit
	$(form_id + ' form .flex-container input').removeAttr('disabled');
	
	var footer_input = $(form_id + ' .form-footer input');
	footer_input.val('Confirm');
}

function DisableFormEdit(form_id) {
	// add disabled attr so they cant edit
	$(form_id + ' form .flex-container input').attr('disabled', true);
	
	var footer_input = $(form_id + ' .form-footer input');
	footer_input.val('Edit');
	
	//TODO: NEED TO REVERT ALL CHANGES BACK TO PREVIOUS
	// COULD DO THIS BY CHECKING THE DATABASE FOR CURRENT SETTINGS OPTIONS
}

function SubmitFormChanges(form_id) {
	$(form_id + '-form').submit();
	// TODO: check for illegal values
	DisableFormEdit(form_id);	
	alert('Submitted');
}

function OpenHelpOverlay(event_caller) {
	$('.overlay').addClass('active');
	
	$('.overlay .header h3').text(event_caller.innerHTML);
	var body = $('.overlay .body');
	
	if (event_caller.id == 'help-shifts') {
		body.html('<ol><li>Navigate to the "Shifts" page. You can do this from the navigation bar at the top of your screen by tapping the <i class="fas fa-clock fa-sm fa-fw"></i> icon, you can also use the side navigation bar by tapping the <i class="fas fa-bars fa-sm fa-fw"></i> and then tapping "Shifts".</li><br><li>Once you are on the "Shifts" page, your shifts for the current week will automatically load. You can change what shifts to view by changing the option at the bottom of the screen. The options you have are "This Week", "Next Week", "Between Dates". If you want to view shifts "Between Dates" you need to input the dates you want to search from and to.</li><br><li>When you have selected a new option, you can click the "Search Shifts" button to load the shifts for the selected option.</li></ol>');	
	} else if (event_caller.id == 'help-timesheets') {
		body.html('<ol><li>Navigate to the "Timesheets" page. You can do this from the navigation bar at the top of your screen by tapping the <i class="fas fa-edit fa-sm fa-fw"></i> icon, you can also use the side navigation by by tapping the <i class="fas fa-bars fa-sm fa-fw"></i> and then tapping "Timesheets".</li><br><li>Once you are on the "Timesheets" page you will need to get the person who can authorize your timesheet to go through your shifts and tick each shift they wish to confirm for. They can make any changes to the shift start and finish times, they can also put in the amount of break time you had. To do this, they will need to click the "Edit" button, they can then make any changes to the values and then click "Save" to confirm changes to the shift.</li><br><li>Once they are happy with the shifts they are confirming, they will need to then enter their signature in the box below.</li><br><li>Finally they can click the "Confirm Shifts" button to confirm and process the ticked shifts.</li></ol>');
	} else if (event_caller.id == 'help-availability') {
		body.html('<ol><li>Navigate to the "Availability" page. You can do this from the navigation bar at the top of your screen by tapping the <i class="fas fa-calendar-alt fa-sm fa-fw"></i> icon, you can also use the side navigation by tapping the <i class="fas fa-bars fa-sm fa-fw"></i> and then tapping "Availability".</li><br><li>Once you are on the "Availability" page, you can select a date from the calendar to input your availability; Available, Not sure, Not Available. You can click the arrows next to the month/year to change the month you are inputting for.<br> When you tap on a date, it will take you to a page to enter your availability. Select from the options for each shift type; Early, Late, Day, Night. If you are unsure of what you can work, select "Not Sure" or just leave it blank. You can use the "Select All" buttons to select all shift types as the selected availability type.</li><br><li>Once you are happy with any changes that you have made, click the submit button, if you wish to cancel, you can click the back button at the top of the screen.</li></ol>');		
	}
}

function CloseHelpOverlay() {
	$('.overlay').removeClass('active');
}