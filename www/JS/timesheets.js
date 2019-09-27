	var shifts_toConfirm = new Array();

$(document).ready(function() {
	loadShiftsIntoTable();
	
	var signature = $("#signature");
	signature.jSignature();
	
	// initialise the css for the canvas
	
	$('input[type=checkbox]').change(function (event) {
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
			
			addShiftToConfirmedList(shift);	
		} else if(!(this.checked)) {
			removeShiftFromConfirmedList(shifts_toConfirm.findIndex(x => x.id === id));	
		}
	})
	
	// when you click confirm on sig you need to get which shifts have been checked
	$('#signature-confirm').click(function() {		
		// need to check that signiture has something
		// double check via prompt that they are happy w sig
		submitConfirmedTimesheets();	
	});	
	
	$("#signature-reset").click(function() {
		signature.jSignature('reset');
	});
	
	$('#signature-redoLastStroke').click(function() {
		
	});	
});

function loadShiftsIntoTable() {
	var xml_http = new XMLHttpRequest(),
			table = $('#timesheet-table tbody')[0],
			i;
	xml_http.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var objArr = JSON.parse(this.responseText);
//			for (i = 0; i < objArr.rtnLiveStaff.length; i++) {
			for (i = 0; i < objArr.rtnLiveStaff.length; i++) {
				var row = table.insertRow(i),
						cell_checkbox = row.insertCell(0),
						cell_day = row.insertCell(1),
					 	cell_date = row.insertCell(2),
					 	cell_location = row.insertCell(3),
					 	cell_start = row.insertCell(4),
					 	cell_end = row.insertCell(5),
						cell_break = row.insertCell(6);
				
				//row.attr('id', '10');// = '<tr id="shift' + (i + 1)  +'"';
				row.id = 'shift' + (i + 1);
				cell_checkbox.innerHTML = '<input type="checkbox" id="checkbox_' + row.id + '">';
				
				cell_day.className = 'shift_day';
				cell_day.innerHTML = 'Fri';
				
				cell_date.className = 'shift_date';
				cell_date.innerHTML = '27/09';
				
				cell_location.className = 'shift_location';
				cell_location.innerHTML = 'Location';
				
				cell_start.className = 'shift_start';
				cell_start.innerHTML = '08:00';
				
				cell_end.className = 'shift_end';
				cell_end.innerHTML = '20:00';
				
				cell_break.className = 'shift_break';
				cell_break.innerHTML = '60';
			}
		}
	};
	xml_http.open("GET", "http://xojo.pulsesoftware.info/special/rtnlivestaff", true);
		xml_http.send();
}

function addShiftToConfirmedList(shift_object) {
	shifts_toConfirm.push(shift_object);
}

function removeShiftFromConfirmedList(shift_index) {
	shifts_toConfirm.splice(shift_index);
}

function submitConfirmedTimesheets() {
 alert('submitted timesheets');	
}