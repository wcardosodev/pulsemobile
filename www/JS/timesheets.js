var shifts_toConfirm = new Array();

$(document).ready(function() {
	LoadShiftsIntoTable();
	LoadSelectOptions();
	
//	var fullbody_height = $('.grid-container').height(),
//			nav_height = $('.grid-container #row-nav_bar').height(),
//			header_height = $('.grid-container #row-header').height(),
//			table_height = $('.grid-container #row-table').height(),
//			sig_height = $('.grid-container #row-signature').height(),
//			footer_height = $('.grid-container #row-footer').height();
	
	var bodyheight = $('body').height(),
			navbarheight = $('.topnav').height(),
			headerheight = $('.main-header').height(),
			contentheight = $('.main-content').height(),
			tableheader_height = $('.main-content .table-header').height(),
			tablecontainer_height = $('.main-content .table-container').height(),
			footerheight = $('.main-footer').height(),
			row_id,
			selected_row;
	
	var signature = $("#signature");
//	signature.jSignature({'UndoButton':true});
	signature.jSignature({'height': '100%', 'width': '100%'});
	
	$('#timesheet-client-select').on('change', function(event) {
		// TODO
		// LoadShiftsIntoTable(); query based on the selected client
	});
	
	// initialise the css for the canvas
	$('#timesheet-table').on('change', ':checkbox', function() {
		var checkbox_id = event.target.id,
				id = checkbox_id.replace('checkbox_', ''),
				shift_id = '#' + id;
		
		if(this.checked) {
			var shift = 
						{
							id: id,
							day: $(shift_id + ' .shift_day').html() + 'day',
							date: $(shift_id + ' .shift_date').html(),
							location: $(shift_id + ' .shift_location').html(),
							start: $(shift_id + ' .shift_start').html(),
							end: $(shift_id + ' .shift_end').html(),
							break: $(shift_id + ' .shift_break').html()
						};
			
			AddShiftToConfirmedList(shift);	
		} else if(!(this.checked)) {
			RemoveShiftFromConfirmedList(shifts_toConfirm.findIndex(x => x.id === id));	
		}
	});
	
	$('#timesheet-table').on('change', '.start-input', function () {		
		// if changes to blank reset to original
		if ($(this).val() == '') {
			// change back to default from db or stored somewhere else?
			$(this).val('08:00');
		}
	});
	
	$('#timesheet-table').on('change', '.break-input', function() {
		if ($(this).val() > 999) {
			$(this).val(999);
		}
		
		if (($(this).val() < 0) || ($(this).val().length == 0))  {
			$(this).val(0);
		}
	});
	
//	$('#timesheet-table').on('click', '.save-shift', function (e) {
//		var button_id = e.target.id,
//				shift_id = button_id.replace('edit_', '');
//		
//	});
	
	$('#timesheet-table').on('click', '.edit-shift', function (e) {
		var button_id = e.target.id,
				shift_id = button_id.replace('edit_', '');
		
		if (e.target.value == 'Save') {
			ConfirmEditShiftLine(shift_id);		
		}
		else if (e.target.value == 'Edit'){
			AllowEditShiftLine(shift_id);	
		}
		
	});
	
	$('#timesheet-table').on('click', '.cancel-edit-shift', function (e) {
		var button_id = e.target.id,
				shift_id = button_id.replace('cancel-edit_', '');
		CancelEditShiftLine(shift_id);			
	});
	
	$('#timesheet-table tbody').on('focusin', 'tr td input[type=number], tr td input[type=time]', function (event) {
		row_id = event.target.parentNode.parentNode.id;
		selected_row = $('#timesheet-table tbody tr#' + row_id).position();
	});
	
	// when you click confirm on sig you need to get which shifts have been checked
	$('#signature-confirm').click(function() {		
		// if no shifts ticked to confirm, do nothing, or alert
		if (shifts_toConfirm.length == 0) {
			alert('No shifts ticked to process.');
		} else {
			// if there is a signature continue
			if (!(signature.jSignature('getData', 'native').length == 0)) {
				var confirmed = confirm('You are confirming for ' + shifts_toConfirm.length  + ' shifts. Click "OK" if you are happy to confirm the ticked shifts.');
				// if they click ok to the confirm dialog
				if (confirmed) {
					var datapair = signature.jSignature('getData', 'svgbase64'), 
							signature_image = new Image();
					signature_image.src = 'data:' + datapair[0] + ',' + datapair[1];
					$(signature_image).appendTo($('#signature-img'));
					
					// TODO send the image via json to wherever
					
					SendSignatureImage(signature_image, datapair[1]);
					
					//TODO: DO A CHECK AGAINST THE CURRENT SIGNATURE AND IF IT DOESNT MATCH RETURN ERRORISH???
					
					// remove all imgs from the signature img
//					$('#signature-img img').remove();
					// reset
					signature.jSignature('reset');
				}				
			} else {
				alert('You must enter a valid signature.');
			}
		}		
	});	
	
	$('#signature-reset').click(function() {
		signature.jSignature('reset');
	});
	
	$(window).resize(function () {
		if (bodyheight == $('body').height()) {
			$('.topnav').height(navbarheight);
			$('.main-header').height(headerheight);
			$('.main-content').height(contentheight);
			$('.main-content .table-header').height(tableheader_height);
			$('.main-content .table-container').height(tablecontainer_height);
			$('.main-footer').height(footerheight);
			$('.main-footer').css('display', 'block');
		} else {
			$('.topnav').height(navbarheight);
			$('.main-header').height(headerheight);
			$('.main-content').height($('body').height() - (navbarheight + headerheight));
			$('.main-content .table-header').height(tableheader_height);
			$('.main-content .table-container').height($('.main-content').height() - tableheader_height);
			$('.main-footer').height(0);
			$('.main-footer').css('display', 'none');
		}
		
		if (!(row_id == null)) {
			$('#' + row_id)[0].scrollIntoView(false);
//			$('#timesheet-table tbody').scrollTop(selected_row.top);
		}
		
		// NEED TO FIND THE EDITED ROW
//		$('#timesheet-table').scrollTop(selected_row.top);
	});
});

function LoadSelectOptions() {
	var select_obj = $('#timesheet-client-select'),
//			option_obj = {id, value, name},
			option_array;
	
	// Removes all children
	select_obj.empty();
	
	//TODO: XML REQ TO GET THE VALS
	
	//TODO: When you change to that page itll load the option that has the shifts in for that day?
	
	option_array = [{id:1, value:'Maidenhead', name:'Maidenhead'}, {id:2, value:'Newport', name:'Newport'}];
	
	for (var i = 0; i < option_array.length; i++) {
		select_obj.append('<option id="' + option_array[i].id + '" value="' + option_array[i].value + '">' + option_array[i].name + '</option>');
	};	
}

function LoadShiftsIntoTable() {
	var xml_http = new XMLHttpRequest(),
			table = $('#timesheet-table tbody')[0];
	xml_http.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var objArr = JSON.parse(this.responseText);
			for (var i = 0; i < objArr.rtnLiveStaff.length; i++) {
				var row = table.insertRow(i),
						cell_actions = row.insertCell(0),
						cell_date = row.insertCell(1),
						cell_start = row.insertCell(2),
						cell_end = row.insertCell(3),
						cell_break = row.insertCell(4);
				
				//row.attr('id', '10');// = '<tr id="shift' + (i + 1)  +'"';
				row.id = 'shift' + (i + 1);

				cell_actions.className = 'shift_actions';
				cell_actions.innerHTML = '<input type="checkbox" id="checkbox_' + row.id +'"><input type="button" class="edit-shift" id="edit_' + row.id + '" value="Edit"><input type="button" class="cancel-edit-shift" id="cancel-edit_' + row.id + '" value="Cancel" disabled>';
				
				cell_date.className = 'shift_date';
				cell_date.innerHTML = '27/09';
				
				cell_start.className = 'shift_start';
				cell_start.innerHTML = '<input type="time" class="start-input" value="08:00" required disabled>';
				
				cell_end.className = 'shift_end';
				cell_end.innerHTML = '<input type="time" class="end-input" value="20:00" required disabled>';
				
				var shift_length = 20 - 8,
						break_length;
				
				if (shift_length >= 12) {
					break_length = 60;	
				} else if (shift_length >= 6) {
					break_length = 30;
				} else {
					break_length = 0;
				}
				
				cell_break.className = 'shift_break';
				cell_break.innerHTML = '<input type="number" class="break-input" min="0" max="999" maxlength="3" size="4" value="'+ break_length + '" id="break_' + row.id  + '" disabled>';
			}
		}
	};
	xml_http.open("GET", "http://xojo.pulsesoftware.info/special/rtnLiveStaff", true);
	xml_http.send();
}

function LoadShiftsIntoTableEditedBits() {
	//						cell_checkbox = row.insertCell(0),
//						cell_actions = row.insertCell(0),
//						cell_day = row.insertCell(1),
//					 	cell_break = row.insertCell(2),
//					 	cell_location = row.insertCell(3),
//					 	cell_start = row.insertCell(4),
//					 	cell_end = row.insertCell(5),
//						cell_date = row.insertCell(6);
				
				//row.attr('id', '10');// = '<tr id="shift' + (i + 1)  +'"';
//				row.id = 'shift' + (i + 1);
//				cell_checkbox.innerHTML = '<input type="checkbox" id="checkbox_' + row.id + '">';
//				cell_actions.innerHTML = '<input type="button" class="edit-shift" id="edit_' + row.id + '" value="Edit">'
//				'<input type="checkbox" id="checkbox_' + row.id + '">
//				<input type="button" class="edit-shift" id="edit_' + row.id + '" value="Cancel">';
//				objArr.rtnLiveStaff[i].NurseNo
//				
//				cell_day.className = 'shift_day';
//				cell_day.innerHTML = 'Fri';
//				
//				cell_date.className = 'shift_date';
//				cell_date.innerHTML = '27/09';
//				
//				cell_location.className = 'shift_location';
//				cell_location.innerHTML = 'Location';
//				
//				cell_start.className = 'shift_start';
//				cell_start.innerHTML = '<input type="time" class="start-input" value="08:00" required disabled>';
//				
//				cell_end.className = 'shift_end';
//				cell_end.innerHTML = '<input type="time" class="end-input" value="20:00" required disabled>';
//				
//				var shift_length = 20 - 8,
//						break_length;
//				
//				if (shift_length >= 12) {
//					break_length = 60;	
//				} else if (shift_length >= 6) {
//					break_length = 30;
//				} else {
//					break_length = 0;
//				}
//				
//				cell_break.className = 'shift_break';
//				cell_break.innerHTML = '<input type="number" class="break-input" min="0" max="999" maxlength="3" size="4" value="'+ break_length + '" id="break_' + row.id  + '" disabled>';
}

function AddShiftToConfirmedList(shift_object) {
	shifts_toConfirm.push(shift_object);
}

function RemoveShiftFromConfirmedList(shift_index) {
	shifts_toConfirm.splice(shift_index);
}

function SubmitConfirmedTimesheets() {
 alert('submitted timesheets');	
}

function SendSignatureImage(img, base64string) {
	
}

function AllowEditShiftLine(id) {	
	$('#' + id + ' td input').removeAttr('disabled');
	$('#' + id + ' td.cancel-edit-shift').removeAttr('disabled');
	
	$('#' + id + ' td.shift_actions .edit-shift').val('Save');
}

function ConfirmEditShiftLine(id) {
	// TODO: send the information to server
	CancelEditShiftLine(id);
}

function CancelEditShiftLine(id) {
	// add attr disabled
	$('#' + id + ' td input:not(.edit-shift, [type=checkbox])').attr('disabled', true);
	$('#' + id + ' td.cancel-edit-shift').attr('disabled', true);
	
	$('#' + id + ' td.shift_actions .edit-shift').val('Edit');
}

function CheckForValidTime() {
	
}