//Function insert the second element into the begining of the first one
function prepend(container, newElement)  {
    container.insertBefore(newElement   ,container.firstChild);
}

window.onload = init;

function init(){
    const list = document.getElementById('someList');
    const newElement = document.createElement('li');
    newElement.innerHTML = "New element";
    prepend(list, newElement);
}
