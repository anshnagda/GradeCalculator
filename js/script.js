// HELPER FUNCTIONS

// converts HTML string to Node
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}


let table = document.querySelector('.table');

// selects some HTML elements
let addButton = document.getElementById('addMoreButton');
let submitButton = document.getElementById('subButton');

// adds a new row to the table, increasing the number of assignments
function addRow() {
	let newRow = table.insertRow();
	let cel1 = newRow.insertCell();
	let cel2 = newRow.insertCell();
	let cel3 = newRow.insertCell();
	
	cel1.innerHTML = '<input type="number" class="percentageBox">';
	cel2.innerHTML = '<input type="number" class="percentageBox">';
	cel3button = htmlToElement('<button type="button" class="delButton"> Delete Row </button>');
	cel3button.addEventListener('click', (e) => { table.deleteRow(newRow.rowIndex) });
	cel3.appendChild(cel3button);
}

// adds functionality of clicking the "Add Assignment" button
addButton.addEventListener('click', addRow);

// creates 5 initial rows
window.onload = function() {
  for(let i = 0; i < 5; i++) {
  	addRow();
  }
};

// does the math and displays the results
function computeResult() {
	let desiredPercentage = document.getElementById('desiredP').value;
	var rows = [].slice.call(table.rows);

	let totalPercentage = 0.0;
	let totalMaxPercentage = 0.0;

	for(let index = 1; index < rows.length; index++) {
		let assignment = rows[index].cells[0].firstElementChild.value;
		let weight = rows[index].cells[1].firstElementChild.value;

		// if exactly one of the fields is empty, then error
		if(assignment == '' || weight == '') {
			if(assignment != '' || weight != '') {
				alert('Please fill out all existing rows.');
				return;
			}
			assignemnt = 0.0;
			weight = 0.0;
		}

		totalPercentage += assignment * weight / 100.0;
		totalMaxPercentage += (weight * 1.0);
	}

	if(totalMaxPercentage < 0.001) {
		alert('Please enter at least one assignment');
	}

	if(totalMaxPercentage > 100.0) {
		alert('Total Percentage is more than 100%.');
		return;
	}

	let currentPercentage = totalPercentage / totalMaxPercentage * 100.0;
	let requiredPercentage = (desiredPercentage - totalPercentage)/(1.0-totalMaxPercentage/100.0);

	let result = document.getElementById('result');
	

	if(totalMaxPercentage == 100.0 || desiredPercentage == '') {
		result.innerHTML = `You currently have ${Math.round( currentPercentage * 10) / 10}%.`;
	} else {
		result.innerHTML = `You currently have ${Math.round( currentPercentage * 10) / 10}%. You need ${Math.round( requiredPercentage * 10) / 10}% in the rest of the course to achieve ${Math.round( desiredPercentage * 10) / 10}%.`;	
	}
	
	// show the result element
	result.classList.remove = 'd-none';
	result.classList.add = 'd-block'
}

// adds functionality of clicking the "submit" button
submitButton.addEventListener('click', (e) => {e.preventDefault(); computeResult();});
