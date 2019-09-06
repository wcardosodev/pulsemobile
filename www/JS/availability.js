$(document).ready(function() {
	var d = new Date();

	loadCalendar(d);
	
	$('.month-header .prev').click(function() {
		d = prevMonth(d);
		loadCalendar(d);
	});
	
	$('.month-header .next').click(function() {
		d = nextMonth(d);
		loadCalendar(d);
	});
	
	$('#reset-calendar').click(function () {
		resetCalendarDate();
	})
});

function daysInMonth (month, year) {
	return new Date(year, month, 0, 0, 0, 0, 0).getDate();
}

function startDay (month, year) {
	return new Date(year, month - 1, 1, 0, 0, 0, 0).getDay();
}

function prevMonth (date) {
	var month = date.getMonth(),
			year = date.getFullYear();
	
	return new Date(year, month, 0);
}

function nextMonth (date) {
	var month = date.getMonth(),
			year = date.getFullYear();
	
	return new Date(year, month + 2, 0);	
}

function loadCalendarHeader (date) {
	var monthText = $('.month-header #monthtext'),
			yearText = $('.month-header #yeartext'),
			month = new Array();
	
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';
	
	monthText.html(month[date.getMonth()]);
	yearText.html(date.getFullYear());	
}

// TODO: AFTER LOAD CALENDAR (at the end of the function)
// TODO: SET ALL UNUSED DATES (blank dates) color to black?

function loadCalendar (date) {
	loadCalendarHeader(date);
	
	resetCalendar();
	
	var	startd = startDay(date.getMonth() + 1, date.getFullYear()),
			days = daysInMonth(date.getMonth() + 1, date.getFullYear()),
			table = $('.availability-calendar table tbody')[0],
			rowValue = 0,
			cellValue = startd - 1,
			i;

	if (cellValue < 0) {
		cellValue = 6;
	}
	
	for (i = 1; i <= days; i++) {		
		if (cellValue > 6) {
			cellValue = 0;
			rowValue++;
		}
		
		var cell = table.rows[rowValue].cells[cellValue],
				$cell = $(cell);
		
		//$cell.removeClass();
		$cell.html(i);
		//$cell.addClass('holiday');
		cellValue++;
	}
}

function resetCalendar() {
	var table = $('.availability-calendar table tbody td').html('');
}

// button to go back to todays date
// incase they go too far
function resetCalendarDate() {
	var d = new Date();
	loadCalendar (date);
}