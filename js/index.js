/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var dataManager = new DataManager("http://localhost:3000/api/cameras");
var cart = new Cart(document.getElementById("cart"));
var pageManager = new PageManager(document.querySelector("main"));

function cartadd(event) {
  event.stopPropagation();
}