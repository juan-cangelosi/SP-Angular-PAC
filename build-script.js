const fs = require('fs-extra');
const concat = require('concat');    

(async function build() {

    const files =[
        './dist/mayi/runtime.js',
        './dist/mayi/polyfills.js',
        './dist/mayi/scripts.js',
        './dist/mayi/main.js'
    ]
    
    await fs.ensureDir('elements');
    
    await concat(files, '../IAW//src/webparts/spPac/pac-element.js');
    await fs.copy('./dist/mayi/styles.css', '../IAW//src/webparts/spPac/pac-styles.css' );
    console.info('Elements created successfully!');

})()