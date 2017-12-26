const fs = require('fs');
const path = require('path');
const less = require('less');
const hasha = require('hasha');

function appendStyles(css, id=null){
    let head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    if(id){
        style.setAttribute('id', id);
    }

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

function toLessVars(obj){
    let pre = '';
    Object.keys(obj).forEach(key=>{
        pre += '@'+key+': '+obj[key]+';\n';
    });
    return pre;
}

module.exports = function electronLess({
    source,
    id,
    variables = {},
	paths = []
} = {}){

    if(typeof id !== 'string'){
        id = hasha(source + '');
        //querySelector chokes on selectors
        //starting with numbers
        for(let i=0; i<10; i++){
            if(isNaN(id[i])){
                id = id.slice(i);
                break;
            }
        }
    }

    try{
        let style = document.querySelector('#'+id);
        if(style) style.parentNode.removeChild(style);
    }catch(e){
        return Promise.reject(e);
    }

    let css;

    try{
        css = fs.readFileSync(source, 'utf8');
    }catch(e){
        return Promise.reject(e);
    }

    let pre = toLessVars(variables);

    return less.render(pre+css,
	{
		paths: paths
	})
    .then(output=>{
        appendStyles(output.css, id);
        return {
            source, id
        };
    });
}
