//Function accepts an element as input and must delete all text nodes inside this element
function deleteTextNodes(element)  {
    let i = 0;    
    const childs = element.childNodes;    
    for (i; i < childs.length; i += 1) {                       
        if (childs[i].nodeType === 1) {                                
            deleteTextNodes(childs[i]);
        }
        if (childs[i].nodeType === 3) {                          
            element.removeChild(childs[i]);                                    
            i -= 1;
        }             
    }
}

window.onload = init;

function init() {
    const body = document.getElementsByTagName('body')[0];          
    deleteTextNodes(body);
    console.log(body);
    
}
