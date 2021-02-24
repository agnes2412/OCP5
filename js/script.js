


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
