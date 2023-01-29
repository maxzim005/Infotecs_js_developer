import { datatooltip } from './datatooltip.js';
import { slist } from './dragndrop.js';

//Function for API request
function loadProducts() {

	let amountt = changeAmount();
	let sortt = changeSort();
	let result = getdata(amountt, sortt);

	let createElements = Promise.resolve(result);

	createElements.then((data) => {
		let sortlist = document.getElementById('sortlist');
		for (let i = 0; i < amountt; i++) {
			let li = document.createElement('li');
			li.setAttribute('id', i);
			li.setAttribute('data-tooltip', ' <b>Brand:</b>' + data[i].brand +
				'<br/> <b>Category</b>: ' + data[i].category +
				'<br/> <b>Description</b>: ' + data[i].description +
				'<br/> <b>Price</b>: ' + data[i].price);
			li.setAttribute('draggable', 'true');
			li.append(data[i].title);
			sortlist.append(li);
		}
		slist(document.getElementById('sortlist'));
		datatooltip(amountt); //connect with datatooltip
	});
}

function changeAmount() { //method for changing amount of shown products
	let inputt = document.getElementById('inputt');
	let amount = inputt.value;
	return amount;
}

function changeSort() { //method for changing sort 
	let select_tag = document.getElementById('select_tag');
	let sort_type = select_tag.value;
	return sort_type;
}

async function getdata(amount, sort) {
	let response = await fetch(
		'https://dummyjson.com/products'
	);
	let data = await response.json();
	let smth = Array.from(data.products).slice(0, amount); //Slicing array. Depends on chosen amount of products
	
	switch (sort) { //Sorting list of data by choosen value
		case 'title':
			smth.sort((a, b) => a.title > b.title ? 1 : -1);
			break;
		case 'brand':
			smth.sort((a, b) => a.brand > b.brand ? 1 : -1);
			break;
		case 'category':
			smth.sort((a, b) => a.category > b.category ? 1 : -1);
			break;
		case 'description':
			smth.sort((a, b) => a.description > b.description ? 1 : -1);
			break;
		case 'price':
			smth.sort((a, b) => a.brand < b.brand ? 1 : -1);
			break;
		default:
			break;
	}
	return smth;
}
//Createing button, which needed to be pressed for API request
const btn = document.getElementById('btn');
btn.addEventListener('click', (e) => {
	e.preventDefault();
	document.querySelectorAll('li').forEach(e => e.remove());
	loadProducts();
	datatooltip();
});
