electron-less
=============

Install
-------

`npm install --save electron-less`

Usage
-----

```javascript
const eless = require('electron-less');
eless({
    //options.source is required
    source: 'styles.less',
    //options.id is optional.
    //options.id defaults to hasha(source)
    id: 'myStyles',
    //options.variables is optional
    //options.variables gets turned into less variables
    //that get prefixed to the options.source file text
    variables: {
        color: 'red'
    }
}).then(()=>{
    console.log('Styles appended to head element')
});
```

About
-----

`electron-less` uses less css preprocessor to parse `.less` files, and appends that css to the `head` in an [electron](https://electron.atom.io/) view (electron Renderer Process).
