

//Array contenant les strings correspondants aux couleurs des Teddies
let firstTeddyColors = [
'Tan',
'Chocolate',
'Black',
'White'];

let secondTeddyColors = [
'Pale brown',
'Dark brown',
'White'];

let thirdTeddyColors = [
'Brown'
];

let fourthTeddyColors = [
'Brown',
'Blue',
'Pink'];

let fifthTeddyColors = [
'Beige', 
'Tan',
'Chocolate'];

var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/teddies");
request.send();


let teddyOne = {
	name: 'Norbert',
	price: 2900,
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	imageUrl: 'http://localhost:3000/images/teddy_1.jpg'
};

let teddyTwo = {
	name: 'Arnold',
	price: 3900,
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	imageUrl: 'http://localhost:3000/images/teddy_2.jpg' 
};

let teddyThree = {
	name: 'Lenny and Carl',
	price: 5900,
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	imageUrl: 'http://localhost:3000/images/teddy_3.jpg'
};

let teddyFour = {
	name: 'Gustav',
	price: 4500,
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	imageUrl: 'http://localhost:3000/images/teddy_4.jpg'
};

let teddyFive = {
	name: 'Garfunkel',
	price: 5500,
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	imageUrl: 'http://localhost:3000/images/teddy_5.jpg'
};

let teddies = ["Norbert", "Arnold", "Lenny and Carl", "Gustav", "Garfunkel"];
let text = "";
let i;
for (i = 0; i < teddies.length; i++) {
	text += "Les teddies sont" + " " + teddies[i] + "<br>"
};

let txt = "";
let ted1 = {fname:"Norbert", price: 29, color:"Brown"};
let x;
for (x in ted1) {
	txt += ted1[x] + " ";
}
document.getElementById('teddy1').innerHTML += txt;

document.getElementById("teddies").innerHTML += text;

teddyOne_name.innerHTML += "<p>"+teddyOne.name+"</p>";
teddyOne_photo.innerHTML += "<img src='"+teddyOne.imageUrl+"'>";
teddyTwo_name.innerHTML += "<p>"+teddyTwo.name+"</p>";
teddyTwo_photo.innerHTML += "<img src='"+teddyTwo.imageUrl+"'>";
teddyThree_name.innerHTML += "<p>"+teddyThree.name+"</p>";
teddyThree_photo.innerHTML += "<img src='"+teddyThree.imageUrl+"'>";
teddyFour_name.innerHTML += "<p>"+teddyFour.name+"</p>";
teddyFour_photo.innerHTML += "<img src='"+teddyFour.imageUrl+"'>";
teddyFive_name.innerHTML += "<p>"+teddyFive.name+"</p>";
teddyFive_photo.innerHTML += "<img src='"+teddyFive.imageUrl+"'>";

document.getElementById('teddyOne_photo').style.border='10px solid black';
document.getElementById('teddyTwo_photo').style.border='10px solid pink';
document.getElementById('teddyThree_photo').style.border='10px solid violet';
document.getElementById('teddyFour_photo').style.border='10px solid blue';
document.getElementById('teddyFive_photo').style.border='10px solid red';

let btnPanier = document.querySelectorAll('button');

for(let i = 0; i < btnPanier.length ; i++) {
  btnPanier[i].addEventListener('click', createParagraph);
}