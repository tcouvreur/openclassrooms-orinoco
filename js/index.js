var dataManager = new DataManager("http://localhost:3000/api/cameras");
var pageManager = new PageManager(document.querySelector("main"));
var cart        = new Cart(document.getElementById("cart"));