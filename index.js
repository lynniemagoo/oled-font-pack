'use strict';
const _packageName = 'OLED Font Pack';
const _fontsLookup = {
    oled_3x5:'3x5/oled-font-3x5',

    tiny_4x6:'4x6/tiny-font-4x6',
    oled_5x7:'5x7/oled-font-5x7',

    small_6x8:'6x8/small-font-6x8',

    sinclair_8x8:'8x8/sinclair-font-8x8',
    sinclair_inverted_8x8:'8x8/sinclair-inverted-font-8x8',
    tiny_8x8:'8x8/tiny-font-8x8',

    myke2_8x9:'8x9/myke2-font-8x9',

    small_8x12:'8x12/small-font-8x12',
    tron_8x12:'8x12/tron-font-8x12',

    retro_8x16:'8x16/retro-font-8x16',

    medium_numbers_12x16:'12x16/medium-numbers-font-12x16',

    big_numbers_14x24:'14x24/big-numbers-font-14x24',

    arial_bold_16x16:'16x16/arial-bold-font-16x16',
    arial_italic_16x16:'16x16/arial-italic-font-16x16',
    arial_normal_16x16:'16x16/arial-normal-font-16x16',
    big_16x16:'16x16/big-font-16x16',
    franklin_gothic_normal_16x16:'16x16/franklin-gothic-normal-font-16x16',
    hallfetica_normal_16x16:'16x16/hallfetica-normal-font-16x16',
    nadianne_16x16:'16x16/nadianne-font-16x16',
    sinclair_medium_16x16:'16x16/sinclair-m-font-16x16',
    sinclair_medium_inverted_16x16:'16x16/sinclair-m-i-font-16x16',
    swiss_721_outline_16x16:'16x16/swiss-721-outline-font-16x16',
    various_symbols_16x16:'16x16/various-symbols-font-16x16',

    dot_matrix_medium_16x22:'16x22/dotmatrix-m-font-16x22',
    dot_matrix_medium_zero_slash_16x22:'16x22/dotmatrix-m-slash-font-16x22',
    dot_matrix_medium_numbers_only_16x22:'16x22/dotmatrix-m-num-font-16x22',

    arial_round_16x24:'16x24/arial-round-font-16x24',
    ocr_a_extended_medium_16x24:'16x24/ocr-a-extended-m-font-16x24',
    sixteen_segment_16x24:'16x24/sixteen-segment-font-16x24',

    grotesk_16x32:'16x32/grotesk-font-16x32',
    grotesk_bold_16x32:'16x32/grotesk-bold-font-16x32',
    retro_16x32:'16x32/retro-font-16x32',
    various_symbols_16x32:'16x32/various-symbols-font-16x32',
    various_symbols_v2_16x32:'16x32/various-symbols-v2-font-16x32',

    dot_matrix_large_numbers_only_24x29:'24x29/dotmatrix-l-num-font-24x29',

    inconsola_24x32:'24x32/inconsola-font-24x32',
    ubuntu_24x32:'24x32/ubuntu-font-24x32',
    ubuntu_bold_24x32:'24x32/ubuntu-bold-font-24x32',

    dingbats1_extra_large_32x24:'32x24/dingbats1-xl-font-32x24',

    various_symbols_32x32:'32x32/various-symbols-font-32x32',
}

let _fonts = {}

function _loadFont(fontName) {
    if (!Object.hasOwnProperty.call(_fonts, fontName)) {
        if (fontName !== 'hasOwnProperty') {
            try {
                let fontSource = _fontsLookup[fontName];
                if (fontSource) {
                    let font = require('./fonts/' + fontSource);
                    if (font) {
                        _fonts[fontName] = font;
                    }
                }
            } catch(err) {
                console.error('Unexpected error.  Font load failed for font "%s".', fontName);
            }
    }
    }
}


/***********************************************************
 * This module uses a Proxy to support dynamic loading of
 * fonts such that only when a font is referenced it will
 * a load (require) will be attempted
 */
const _fontHandler = {
  get: function(target, prop, receiver) {
    if (prop === '_available') {
        return Object.keys(_fontsLookup);

    } else if (prop === '_loaded') {
        return Object.keys(target);
    } else {
      _loadFont(prop);
      return Reflect.get(...arguments);
    }
  },

  set: function(target, prop, value) {
      throw new Error (_packageName + ' is immutable!');
  },

  has: function(target, key) {
    return key in _fonts;
  },

  ownKeys:function (target) {
    return Reflect.ownKeys(_fonts);
  },

  /* support font deletion after load */
  deleteProperty: function(target, prop) {
    if (prop in _fonts) {
      return delete _fonts[prop];
    } else {
        return false;
    }
  }
}
 
module.exports = new Proxy(_fonts,_fontHandler);
