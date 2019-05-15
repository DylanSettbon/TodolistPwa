import { openDB } from '/node_modules/idb/build/esm/index.js';
import checkConnectivity from '/connection.js';
async function init() {
    checkConnectivity();
    document.getElementById("todotest").addEventListener("click", newElement);
    const result = await fetch('http://localhost:3000/todos');
    const data = await result.json();
    console.log(data)

    function AddElementTodo(x) {
        var li = document.createElement("li");
        var t = document.createTextNode(x);
        li.appendChild(t);
        document.getElementById("myUL").appendChild(li);
    }
    data.forEach(element => {
        AddElementTodo(element.title)
    });
    ///
    const database = await openDB('app-new', 1, {
        upgrade(db) {
            db.createObjectStore('elements')
        }
    });
    if (navigator.onLine) {
        await database.put('elements', data, 'elements');
    }
    const articles = await database.get('elements', 'elements');

   


    // Create a "close" button and append it to each list item
    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
    // Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = async function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
        fetch('http://localhost:3000/todos', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: inputValue })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            return data;
        });
    }

    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

init()



