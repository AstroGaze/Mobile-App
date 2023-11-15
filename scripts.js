/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-965ee-default-rtdb.firebaseio.com/",
};
const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const listaDeProductos = ref(dataBase, "Shopping List");

const inputBtn = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const itemShop = document.getElementById("shopping-list");

inputBtn.addEventListener("click", function () {
  const item = inputField.value;
  if (inputField.value != "") {
    push(listaDeProductos, item);
    clearField();
    console.log(item);
  }
  // Challenge: Append a new <li> with text content inputValue to the 'shopping-list' <ul>
});

onValue(listaDeProductos, function (snapshot) {
  if (snapshot.exists()) {
    let shoppingItems = Object.entries(snapshot.val());

    console.log(shoppingItems);

    itemShop.innerHTML = "";

    for (let index = 0; index < shoppingItems.length; index++) {
      let currentItem = shoppingItems[index];
      renderList(currentItem);
    }
  } else {
    itemShop.innerHTML = "";
    let newEl = document.createElement("li");
    newEl.textContent = `No items here yet`
    itemShop.append(newEl);
    ;
  }
});

function clearField() {
  inputField.value = "";
}

function renderList(item) {
  /* itemShop.innerHTML += ` <li>${item}</li>`; */
  let currentId = item[0];
  let currentValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = `${currentValue}`;
  newEl.addEventListener("dblclick", function () {
    let locationToDlt = ref(dataBase, `Shopping List/${currentId}`);
    remove(locationToDlt);
  });
  itemShop.append(newEl);
}
