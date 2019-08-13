function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

let boxText = '<li> <input type="number"> <input type="number"> <button type="button"> Delete Row </button></li>';

let table = document.querySelector('.courseTable');


function addElement() {
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

window.onload = function() {
  for(let i = 0; i < 5; i++) {
  	addElement();
  }
};

let addButton = document.getElementById('addMoreButton');
addButton.addEventListener('click', addElement);


function computeResult() {
	let desiredPercentage = document.getElementById('desiredP').value;
	var rows = [].slice.call(table.rows);

	if(rows.length < 2) {
		alert('Enter at least one row.');
		return;
	}

	let totalPercentage = 0.0;
	let totalMaxPercentage = 0.0;

	for(let index = 1; index < rows.length; index++) {
		let assignment = rows[index].cells[0].firstElementChild.value;
		let weight = rows[index].cells[1].firstElementChild.value;
		if(assignment === '' || weight === '') {
			alert('Please fill out all existing rows.');
			return;
		}

		totalPercentage += assignment * weight / 100.0;
		totalMaxPercentage += (weight * 1.0);
	}

	let currentPercentage = totalPercentage / totalMaxPercentage*100.0;
	let requiredPercentage = (desiredPercentage - totalPercentage)/(1.0-totalMaxPercentage/100.0);

	let result = document.getElementById('result');
	if(totalMaxPercentage > 100.0) {
		alert('Total Percentage is more than 100%.');
		return;
	}

	if(totalMaxPercentage == 100.0) {
		result.innerHTML = `You currently have ${Math.round( currentPercentage * 10) / 10}%.`;
	} else {
		result.innerHTML = `You currently have ${Math.round( currentPercentage * 10) / 10}%. You need ${Math.round( requiredPercentage * 10) / 10}% in the rest of the course to achieve ${Math.round( desiredPercentage * 10) / 10}%.`;	
	}

	
	result.style.display = 'block';
}

let submitButton = document.getElementById('subButton');
submitButton.addEventListener('click', (e) => {e.preventDefault(); computeResult();});
