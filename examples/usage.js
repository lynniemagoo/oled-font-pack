'use strict';
//const FontPack = require('oled-font-pack');
const FontPack = require('../index.js');

function main() {
    // List names of available fonts.
    console.log(FontPack._available);
    // List names of currently loaded fonts.
    console.log("Currently currently loaded fonts (_loaded):");
    console.log(FontPack._loaded);
    // Load the legacy oled-font-3x5
    let font3x5 = FontPack.oled_3x5;
    // Load the legacy oled-font-5x7;
    let font5x7 = FontPack.oled_5x7;
    // List names of loaded fonts using Object.keys.
    console.log("Currently currently loaded fonts (Object.keys):");
    console.log(Object.keys(FontPack));
    let sinclairMedium16x16 = FontPack["sinclair_medium_16x16"];
    let sinclairMediumInverted16x16 = FontPack.sinclair_medium_inverted_16x16;
    // If needed, users may unload fonts no longer needed.
    delete FontPack.oled_5x7;
    // List names of loaded fonts using a loop.
    console.log("Currently currently loaded fonts (for in):");
    for (let key in FontPack) {
        console.log(key);
    }
}

main();