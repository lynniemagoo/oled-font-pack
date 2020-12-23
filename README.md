# oled-font-pack
This package includes a set of various fonts that can be used on OLED displays. These have been tested with SSD1306 driver chip on a Raspberry Pi.  

For convenience, this package also includes the original **oled-font-3x5** and **oled-font-5x7** both of which are available from npm.

https://www.npmjs.com/package/oled-font-3x5

https://www.npmjs.com/package/oled-font-5x7



## Baseline requirements to use this package

It should be noted that every font in this package has a character height and width that is less than or equal to 32 pixels.  

Version 1.0.12 of the NPM oled-i2c-bus project supports the use of these fonts.   

https://www.npmjs.com/package/oled-i2c-bus

***<u>IMPORTANT:</u>***

**You may use version 1.0.11 or lower of the oled-i2c-bus project, however, you are restricted to using only a font with character height and width that is less than or equal to 8 pixels.  Fonts outside of this range will only render the top-most 8 pixels of a character glyph.**



## Notes regarding additional fonts

The these additional fonts were originally a set of fonts for the UTFT library from Rinky-Dink Electronics.  These fonts have been trans-coded from C source code such that they can now be used as OLED display fonts.

For reference see:

http://www.rinkydinkelectronics.com/r_fonts.php

Permission to publish these fonts was generously granted by the site owner ***(Thanks Henning!***).

If you wish to contact the site owner you may do so at:

http://www.rinkydinkelectronics.com/contact.php



## Version History:

### 1.0.0

- Initial Release

### 1.0.1

- Add font **cp437_8x8** (<u>Glyph's imported from NPM max7219-display</u>) 



## Names of available fonts

- **oled_3x5**
- **tiny_4x6**
- **oled_5x7**
- **small_6x8**
- **sinclair_8x8**
- **sinclair_inverted_8x8**
- **tiny_8x8**
- **cp437_8x8** 
- **myke2_8x9**
- **small_8x12**
- **tron_8x12**
- **retro_8x16**
- **medium_numbers_12x16**
- **big_numbers_14x24**
- **arial_bold_16x16**
- **arial_italic_16x16**
- **arial_normal_16x16**
- **big_16x16**
- **franklin_gothic_normal_16x16**
- **hallfetica_normal_16x16**
- **nadianne_16x16**
- **sinclair_medium_16x16**
- **sinclair_medium_inverted_16x16**
- **swiss_721_outline_16x16**
- **various_symbols_16x16**
- **dot_matrix_medium_16x22**
- **dot_matrix_medium_zero_slash_16x22**
- **dot_matrix_medium_numbers_only_16x22**
- **arial_round_16x24**
- **ocr_a_extended_medium_16x24**
- **sixteen_segment_16x24**
- **grotesk_16x32**
- **grotesk_bold_16x32**
- **retro_16x32**
- **various_symbols_16x32**
- **various_symbols_v2_16x32**
- **dot_matrix_large_numbers_only_24x29**
- **inconsola_24x32**
- **ubuntu_24x32**
- **ubuntu_bold_24x32**
- **dingbats1_extra_large_32x24**
- **various_symbols_32x32**



## Performance improvement through demand-loading

For performance reasons and a smaller memory footprint,  demand-loading of fonts has been provided.  If a font is requested, it will be loaded and kept in memory until such time as the process ends or the user explicitly deletes the font from the package.  Note that once deleted, it can be loaded again with no side-effects.  See example usage below for an example illustrating how to unload a loaded a font using **'delete'**.

## 

## Example Usage (see examples/usage.js):

```javascript
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
```

