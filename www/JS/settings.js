$(document).ready(function() {
	var bodyheight = $('body').height(),
			navheight = $('.topnav').height(),
			contentheight = $('.main-content').height(),
			headerheight = $('.main-header').height();
	
	$('.menu-item .item-header').click(function() {
		var id = $(this).parent().attr('id');
		
		if (!(id == undefined)) {
			OpenMenuOption('#' + id);
		}
	});
	
	$('.menu-item .item-body .edit-button').click(function(event) {
		event.preventDefault();
		
		var id = $(this).parents('.menu-item').attr('id'),
				attrType = $(this).attr('type');
		
		if (!(id == undefined)) {
			if (attrType == 'button') {
				AllowFormEdit('#' + id);
			} else if (attrType == 'submit') {
				SubmitFormChanges('#' + id);
			}
		};
	});
	
	$('.menu-item .item-body .cancel-button').click(function(event) {
		var id = $(this).parents('.menu-item').attr('id'),
				editting = $(this).siblings('.edit-button').attr('type');
		
		if (!(id == undefined)) {
			if (editting == 'submit') {
				DisableFormEdit('#' + id);	
			} else if (editting == 'button') {
				OpenMenuOption('#' + id);	
			}
		}	
	});
	
	$('.help-item').click(function () {
		OpenHelpOverlay($(this));
	});
	
	$('#overlay .overlay-cancel').click(function () {
		CloseHelpOverlay();	
	});
	
	$(window).resize(function () {
		// if fullsize
		if ($('body').height() == bodyheight) {
			$('.topnav').height(navheight);
			$('.main-header').height(headerheight);
			$('.main-content').height(contentheight);
		} 
		else {
			$('.topnav').height(navheight);
			$('.main-header').height(headerheight);
			$('.main-content').height($('body').height() - (navheight + headerheight));
		}
	});	
});

function OpenMenuOption(id) {
	// check if the option(id) is open
	var isMenuOpen = $(id).hasClass('open');
	
	// close all open elements
	$('.settings-menu .open').removeClass('open');
	
	// if it was previously open then close it, else open it
	if (isMenuOpen) {
		$(id).removeClass('open');
	} else {
		$(id).addClass('open');	
	}	
	
	DisableFormEdit(id);
}

function CloseMenuOption(id) {
	
}

function AllowFormEdit(form_id) {	
	// remove the disabled attribute so they can edit
	$(form_id + ' form input:not([type=text])').removeAttr('disabled');
	
	$(form_id + ' .edit-button').attr('type', 'submit').val('Confirm');
	$(form_id + ' .cancel-button').val('Cancel');
}

function DisableFormEdit(form_id) {
	// add disabled attr so they cant edit
	$(form_id + ' form input:not(.edit-button, .cancel-button)').attr('disabled', true);
	
	$(form_id + ' .edit-button').attr('type', 'button').val('Edit');
	$(form_id + ' .cancel-button').val('Close');
	
	//TODO: NEED TO REVERT ALL CHANGES BACK TO PREVIOUS
	// COULD DO THIS BY CHECKING THE DATABASE FOR CURRENT SETTINGS OPTIONS
}

function SubmitFormChanges(form_id) {
	$(form_id + '-form').submit();
	// TODO: check for illegal values
	DisableFormEdit(form_id);	
	alert('Submitted');
}

function OpenHelpOverlay(caller) {
	$('#overlay').addClass('active');
	
	$('#overlay .overlay-header h3').text(caller.text());
	var body = $('#overlay .overlay-body');
	
	LoadHelpBody(caller);
	
//	if (caller.attr('id') == 'help-shifts') {
//		body.html('<p>1a) Navigate to the "Shifts" page, you can do this from the navigation bar at the top by clicking the <i class="fas fa-clock fa-sm fa-fw"></i> button.</p><img src="Images/NavBar/TopNav.png" class="img-width320"><p>1b) Or by opening the side navigation bar <i class="fas fa-bars fa-sm fa-fw"></i> and clicking "Shifts".</p><img src="Images/NavBar/SideNav.png" class="img-height360"><p>2) Once you are on the Shifts page, your shifts for the current week will automatically load.</p><img src="Images/Shifts/ShiftsLoaded.png" class="img-height360"><p>3a) You can change what shifts to view by changing the option at the bottom of the screen. The options are; This Week, Next Week and Between Dates.</p><img src="Images/Shifts/ShiftsThisWeek.png" class="img-width320"><img src="Images/Shifts/ShiftsNextWeek.png" class="img-width320"><p>3b) If you wish you view what shifts you have between dates, you will need to enter the "To" and "From" dates into the date inputs.</p><img src="Images/Shifts/ShiftsBetweenDates.png" class="img-width320"><p>4) Once you have selected which shifts you want to view, click the "Load Shifts" button at the bottom of the page. That will load shifts for the option you have selected.</p><img src="Images/Shifts/LoadShifts.png" class="img-width320">')
//	}
//	else if (caller.attr('id') == 'help-timesheets') {
//		body.html('<p>1a) Navigate to the "Timesheets" page, you can do this from the navigation bar at the top by clicking the <i class="fas fa-edit fa-sm fa-fw"></i> button.</p><img src="Images/NavBar/TopNav.png" class="img-width320"><p>1b) Or by opening the side navigation bar by clicking <i class="fas fa-bars fa-sm fa-fw"></i> and then clicking "Timesheets".</p><img src="Images/NavBar/SideNav.png" class="img-height360"><p>2a) Once you are on the "Timesheets" page you will need to get the person who can authorize your timesheet to go through your shifts and tick the shifts they are signing for.</p><img src="Images/Timesheets/TickedShifts.png" class="img-height360"><p>2b) They can make any changes by clicking the "Edit" button, inputting the amount of break time, changing start and/or finish times, then clicking "Save".</p><img src="Images/Timesheets/EditingShift.png" class="img-height360"><p>3) Once they have ticked all shifts they wish to sign for, they can enter their signature into the signature box below and finally click "Confirm Shifts" to confirm and process the timesheet.</p><img src="Images/Timesheets/SigningShifts.png" class="img-width320">');
//	}
	
//	if (caller.attr('id') == 'help-shifts') {
//		body.html('<ol><li>Navigate to the "Shifts" page. You can do this from the navigation bar at the top of your screen by tapping the <i class="fas fa-clock fa-sm fa-fw"></i> icon, you can also use the side navigation bar by tapping the <i class="fas fa-bars fa-sm fa-fw"></i> and then tapping "Shifts".</li><br><li>Once you are on the "Shifts" page, your shifts for the current week will automatically load. You can change what shifts to view by changing the option at the bottom of the screen. The options you have are "This Week", "Next Week", "Between Dates". If you want to view shifts "Between Dates" you need to input the dates you want to search from and to.</li><br><li>When you have selected a new option, you can click the "Search Shifts" button to load the shifts for the selected option.</li></ol><img src="./Screenshots/MyShifts2.jpeg">');	
//	} else if (caller.attr('id') == 'help-timesheets') {
//		body.html('<ol><li>Navigate to the "Timesheets" page. You can do this from the navigation bar at the top of your screen by tapping the <i class="fas fa-edit fa-sm fa-fw"></i> icon, you can also use the side navigation by by tapping the <i class="fas fa-bars fa-sm fa-fw"></i> and then tapping "Timesheets".</li><br><li>Once you are on the "Timesheets" page you will need to get the person who can authorize your timesheet to go through your shifts and tick each shift they wish to confirm for. They can make any changes to the shift start and finish times, they can also put in the amount of break time you had. To do this, they will need to click the "Edit" button, they can then make any changes to the values and then click "Save" to confirm changes to the shift.</li><br><li>Once they are happy with the shifts they are confirming, they will need to then enter their signature in the box below.</li><br><li>Finally they can click the "Confirm Shifts" button to confirm and process the ticked shifts.</li></ol>');
//	} else if (caller.attr('id') == 'help-availability') {
//		body.html('<ol><li>Navigate to the "Availability" page. You can do this from the navigation bar at the top of your screen by tapping the <i class="fas fa-calendar-alt fa-sm fa-fw"></i> icon, you can also use the side navigation by tapping the <i class="fas fa-bars fa-sm fa-fw"></i> and then tapping "Availability".</li><br><li>Once you are on the "Availability" page, you can select a date from the calendar to input your availability; Available, Not sure, Not Available. You can click the arrows next to the month/year to change the month you are inputting for.<br> When you tap on a date, it will take you to a page to enter your availability. Select from the options for each shift type; Early, Late, Day, Night. If you are unsure of what you can work, select "Not Sure" or just leave it blank. You can use the "Select All" buttons to select all shift types as the selected availability type.</li><br><li>Once you are happy with any changes that you have made, click the submit button, if you wish to cancel, you can click the back button at the top of the screen.</li></ol>');		
//	}
}

function LoadHelpBody(caller) {
	var body = $('#overlay .overlay-body');
	
	switch(caller.attr('id')) {
		case 'help-view-shifts':
			body.html('<p>Navigate to the "Shifts" page, you can do this from the navigation bar at the top by tapping the <i class="fas fa-clock fa-sm fa-fw"></i> icon.</p><img src="Images/NavBar/TopNav.png" class="img-width320"><p>You can also use the side navigation bar by tapping the <i class="fas fa-bars fa-sm fa-fw"></i> icon and tapping "Shifts".</p><img src="Images/NavBar/SideNav.png" class="img-height360"><p>Once you are on the Shifts page, your shifts for the current week will automatically load.</p><img src="Images/Shifts/ShiftsLoaded.png" class="img-height360"><p>You can change what shifts to view by changing the option at the bottom of the screen. The options are; This Week, Next Week and Between Dates.</p><img src="Images/Shifts/ShiftsThisWeek.png" class="img-width320"><img src="Images/Shifts/ShiftsNextWeek.png" class="img-width320"><p> If you wish you view what shifts you have between dates, you will need to enter the "To" and "From" dates into the date inputs.</p><img src="Images/Shifts/ShiftsBetweenDates.png" class="img-width320"><p>Once you have selected which shifts you want to view, click the "Load Shifts" button at the bottom of the page. That will load shifts for the option you have selected.</p><img src="Images/Shifts/LoadShifts.png" class="img-width320">');
			break;
		case 'help-shift-actions':
			body.html('Lol');
			break;
	}
}

function CloseHelpOverlay() {
	$('#overlay').removeClass('active');
}