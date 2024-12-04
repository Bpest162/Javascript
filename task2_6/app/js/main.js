import { uid } from './uid.js';
//console.log(uid());

const DataBaseObject = {};

DataBaseObject.indexedDB = {};
DataBaseObject.indexedDB.db = null;


DataBaseObject.indexedDB.onerror = function(e) {
    console.log(e);
};


DataBaseObject.indexedDB.open = function() {
    let version = 1;
    let request = indexedDB.open("todos", version);

    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        e.target.transaction.onerror = DataBaseObject.indexedDB.onerror;

        if(db.objectStoreNames.contains("todolist")) {
        db.deleteObjectStore("todolist");
        };

        var store = db.createObjectStore("todolist",
        {keyPath: "id"});
    };

    request.onsuccess = function(e) {
        DataBaseObject.indexedDB.db = e.target.result;
        DataBaseObject.indexedDB.getAllTodoItems();
    };
    request.onerror = DataBaseObject.indexedDB.onerror;
};

DataBaseObject.indexedDB.addTodo = function(todoText) {
    let trans = makeTrans(["todolist"], "readwrite");
    let store = trans.objectStore("todolist");

    let data = {
        "text": todoText,
        "id": uid(),
    };
    let request = store.put(data);

    request.onsuccess = function(e) {
        DataBaseObject.indexedDB.getAllTodoItems();
    };
    request.onerror = function(e) {
        console.log("Error Adding: ", e);
    };
};

DataBaseObject.indexedDB.deleteTodo = function(id) {
    let trans = makeTrans(["todolist"], "readwrite");
    let store = trans.objectStore("todolist");

    let request = store.delete(id);

    request.onsuccess = function(e) {
        DataBaseObject.indexedDB.getAllTodoItems();
    };
    request.onerror = function(e) {
        console.log("Error Remove: ", e);
    };
};

DataBaseObject.indexedDB.getAllTodoItems = function() {
    const todos = document.getElementById("todoItems");
    todos.innerHTML = "";

    let trans = makeTrans(["todolist"], "readwrite");
    let store = trans.objectStore("todolist");

    let keyRange = IDBKeyRange.lowerBound(0);
    let cursorRequest = store.openCursor(keyRange);

    cursorRequest.onsuccess = function(e) {
        let result = e.target.result;
        if(!!result == false)
        return;

        renderTodo(result.value);
        result.continue();
    };
    cursorRequest.onerror = DataBaseObject.indexedDB.onerror;
};

function renderTodo(row) {
    const todos = document.getElementById("todoItems");
    const li = document.createElement("li");
    li.classList = 'item';
    const itemText = document.createElement('span');
    itemText.classList = 'item-vel';
    itemText.setAttribute("data-key", row.id);
    const safe = document.createElement("div");
    safe.classList = 'safe';
    safe.innerHTML = `<span></span>Safe`;
    const btnDel = document.createElement("button");
    btnDel.classList = 'btn-del';
    const t = document.createTextNode(row.text);
    //console.log(row);

    btnDel.addEventListener("click", function() {
        DataBaseObject.indexedDB.deleteTodo(row.id);

        handleClick(btnDel, itemText);
    }, false);

   

    btnDel.innerHTML = `<span> <span class="del"></span> </span>Delete`;
    li.appendChild(itemText);
    itemText.appendChild(t);
    li.appendChild(safe);
    li.appendChild(btnDel);
    todos.appendChild(li);

    itemText.addEventListener('click', function(ev) {
        submitbtn.style.display = 'none';
        editBtn.style.display = 'block';
        safe.style.background = '#00C45A';
        
        let span = ev.target.closest('[data-key]');
        let id = span.getAttribute('data-key');

        document.getElementById('todo').value = row.text;
        document.Form.setAttribute('data-key', row.id);
        todo.value = row.text;
    });
};

function editToDo(){
    let trans = makeTrans(["todolist"], "readwrite");
    let store = trans.objectStore("todolist");
    let key = document.Form.getAttribute('data-key');
    let data = {
        "id": key,
        "text": todo.value,
    };
    let request = store.put(data);

    request.onsuccess = function(e) {
        DataBaseObject.indexedDB.getAllTodoItems();
    };
    request.onerror = function(e) {
        console.log("Error Editing: ", e);
    };
    if(todo.value == ""){
        alert('Pleas enter your edited task! Field cannot be blank!')
        return false;
    };
};

function clearData(){
    let trans = makeTrans(["todolist"], "readwrite"); 
    let store = trans.objectStore("todolist");
    const objectStoreRequest = store.clear();

    objectStoreRequest.onerror = function(){
        console.log('error');
    };
    objectStoreRequest.onsuccess = function(){
        console.log('success');
    };
};

function handleClick(elemBtnDel, elemBtnedit){
    console.log("removed");
    elemBtnDel.removeEventListener("click", handleClick);
    elemBtnedit.removeEventListener("click", handleClick);
};

function changeBtn(){
    submitbtn.style.display = 'inline-block';
    editBtn.style.display = 'none';
    todo.value = "";
};

function makeTrans(todoName, mode) {
    let db = DataBaseObject.indexedDB.db;
    let trans = db.transaction(todoName, mode);
    trans.onerror = (err) => {
    console.warn(err);
    };
    return trans;
};

const todo = document.getElementById("todo");
function addTodo() {
    DataBaseObject.indexedDB.addTodo(todo.value);
    todo.value = "";
};

function init() {
    DataBaseObject.indexedDB.open();
};

const editBtn = document.getElementById('btn-edit');
editBtn.addEventListener('click', function(e) {
    e.preventDefault();

    editToDo();
    changeBtn();
});

const isCleaner = document.getElementById('iscleaner');
isCleaner.addEventListener('click', () =>{
    
    clearData();
    document.getElementById("todoItems").remove();
});

const submitbtn = document.getElementById('btn-save');
submitbtn.addEventListener('click', (ev) =>{
    ev.preventDefault();

    if(todo.value == ""){
        alert('Pleas enter your task! Field cannot be blank!')
        return false;
    }
    addTodo();
    return false;
});

window.addEventListener("DOMContentLoaded", init, false);



