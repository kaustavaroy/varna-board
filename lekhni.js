
/*
File:   lekhni.js
Desc:   varna keys and board templates
Auth:   kaustava roy
Date:   June 21, 2021; international yoga day
Ver0:   2021.02.00; year.quarter.revision
*/


/*
Copyright (c) 2021 Kaustava Roy, Payal Roy & Sons. All Rights Reserved.
Permission to use, copy, modify, and distribute this software and its documentation
for educational, research, and not-for-profit purposes, without fee and without
a signed licencsing agreement is hereby granted provided the above copyright
notice, this paragraph, and following two paragraphs appear in all copies, modifications
and distributions. Contact kaustava.roy@gmail.com for commercial licencsing opportunities.

In no event shall the copyright holders be liable to any party for direct, indirect,
special, incidental, or consequential damages, including lost profits, arising out
of the use of this software and its documentation, even if the copyright owners have
been advised of the possibility of such damages.

The copyright holders specifically disclaims any warranties, including but not limited to,
the implied warranties of merchantability and fitness for a particular purpose. The software
and accompanying documentation, if any, provided hereunder is provided "as is". The copyright
holders have no obligation to provide maintenance, support, updates, enhancements, or
modifications.
*/

// 1. Create template for hexagonal varna key; use '$' prefix for template names
const $vkey = document.createElement('template');
$vkey.innerHTML = `
<div class="vwrap">
  <div class="vkey">
    <div class="caption n0"></div>
    <div class="caption n1"></div>
    <div class="caption n2"></div>
    <div class="caption n3"></div>
  </div>
  <div class="caption vball"></div>
</div>
<style>
  .vwrap {
    positionk: relative;
  }

  .vkey {
    height: 48px;
    width: 48px;
    border: black 0px solid;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background-color: rgba(250,0,100,0.8);
    /*background-image: linear-gradient(180deg, #C61657 0%, #A61657 74%);*/
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .vkey:hover, .vball:hover {
    cursor: pointer;
  }
  .caption {
    font-size: 12px;
    font-weight: 900;
    font-family: 'Noto Sans', sans-serif;
    color: rgba(0,0,0,0);
  }

  .n0, .n1, .n2, .n3 {
    width:  12px;
    height: 12px;
    background-colork: red;
    padding: 0px;
  }

  .n0 { transform: translate(  60%,  -120%);}
  .n1 { transform: translate( 150%,  -120%);}
  .n2 { transform: translate(-150%,    90%);}
  .n3 { transform: translate( -60%,    90%);}

  .vball {
    width: 24px;
    height: 24px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 50%;
    position: relative;
    left: 12px;
    top: -36px;
    text-align: center;
    line-height: 24px; /* to vertically center text; set to height*/
  }
  .vball {
    color: white;
    font-size: 18px;
    font-weight: 900;
  }
</style>
`;

class VKey extends HTMLElement {
  constructor() {
    super();
    this.showVarga = true;

    // mode opem so css can be seen in debugger
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild($vkey.content.cloneNode(true));
    let _a = this.getAttribute('a').split(" ");
    let _c = this.getAttribute('c').split(" ");
    this.shadowRoot.querySelector(".caption.n0").innerText = _a[0];
    this.shadowRoot.querySelector(".caption.n1").innerText = _a[1];
    this.shadowRoot.querySelector(".caption.n2").innerText = _a[2];
    this.shadowRoot.querySelector(".caption.n3").innerText = _a[3];
    this.shadowRoot.querySelector(".caption.vball").innerText = _a[0];
    this.shadowRoot.querySelector(".vkey").style.background = _c[0];
    this.shadowRoot.querySelector(".vkey").style.backgroundImage = "radial-gradient(circle, " + _c[0] + " 30%, " + _c[1] + ")";
    let _s = this.getAttribute('s');
    this.shadowRoot.querySelector(".caption.n0").style.fontWeight = _s;
    this.shadowRoot.querySelector(".caption.n1").style.fontWeight = _s;
    this.shadowRoot.querySelector(".caption.n2").style.fontWeight = _s;
    this.shadowRoot.querySelector(".caption.n3").style.fontWeight = _s;
  }

  toggleVarga() {
    this.showVarga = !this.showVarga;
    const varga = this.shadowRoot.querySelector(".caption");
    varga.style.display = this.showVarga ? "block" : "none";
  }

 set_vsel_innerText(e) {
   let _text = e.target.innerText;
   document.all.vsel.innerText = _text;
   document.all.valt.innerText = "...";
   /*console.log("Key", e.target.parentNode.parentNode.contents()
    .filter(function() {  return this.nodeType == Node.TEXT_NODE;})
    .text()
  );*/
   // update vball
   // let _vball = e.target.parentNode.parentNode.children[1];
   // _vball.innerText = _text;
   return _text;
 }

 put2_textarea(v) {
   let _V = document.all.keyinput.value;
   let _start_pos = document.all.keyinput.selectionStart;
   let _end_pos = document.all.keyinput.selectionEnd;
   if ( !!_end_pos && _start_pos == _end_pos ) {
     _start_pos--;
   }
   //let _vsel = document.all.vsel.innerText;
   let _vput = document.all.vput.innerText;
   if (_vput.length >= 5) {
     _vput = "";
   }
   switch (v) {
     case "␣": _V += " "; _vput = ""; break;
     // after delete, cursor automaticaaly moves to end
     case "⌫":
     _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,);
     _vput=_vput.slice(0,-1);
     break;
    // case "+": _V += "&#93e;"; break;
     case "✹": _V += String.fromCharCode(parseInt("93e", 16));  _vput+= _V.slice(-1,); break;
     case "इ": _V += String.fromCharCode(2367); _vput+= _V.slice(-1,); break;
     case "उ": _V += String.fromCharCode(parseInt("941", 16));  _vput+= _V.slice(-1,); break;
     case "ए": _V += String.fromCharCode(parseInt("947", 16));  _vput+= _V.slice(-1,); break;
     case "ओ": _V += String.fromCharCode(parseInt("94b", 16));  _vput+= _V.slice(-1,); break;
     case "औ": _V += String.fromCharCode(parseInt("94c", 16));  _vput+= _V.slice(-1,); break;
     case "ऋ": _V += String.fromCharCode(parseInt("943", 16));  _vput+= _V.slice(-1,); break;
     case "ऌ": _V += String.fromCharCode(parseInt("962", 16));  _vput+= _V.slice(-1,); break;
     case "ए": _V += String.fromCharCode(parseInt("947", 16));  _vput+= _V.slice(-1,); break;
     case "+": _V += String.fromCharCode(2366); break;
     default : _V += v; _vput+=v; break;
   }
   document.all.vput.innerText = _vput;
   document.all.keyinput.value = _V;
   document.all.keyinput.focus();
 }

  connectedCallback() {
    const _this = this;
    var lastKey;
    var timer;
    
    // vkey event handling
    // -------------------
    ['vball', 'n0', 'n1', 'n2', 'n3'].forEach(function(item) {
      let _div = ".caption." + item;
      /*
      // click listener
      _this.shadowRoot.querySelector(_div).addEventListener('click',
        function(e) {
          e.preventDefault(); console.log(e.target.innerText);
          document.all.keyinput.value += e.target.innerText;
          document.all.vsel.innerText = e.target.innerText;
        });
      */
      // swipe listener
      /*_this.shadowRoot.querySelector(_div).addEventListener('pointerdown',
        function(e) {
          e.preventDefault(); e.stopPropagation();
          _this.set_vsel_innerText(e);
          
         if (e.which==lastKey) {
			      if (!timer) timer=setTimeout(console.log("hello"), 200);
			      return;
		     }
		     lastKey=e.which;
          
        });
        */
      _this.shadowRoot.querySelector(_div).addEventListener('pointerenter',
        function(e) {
          e.preventDefault(); e.stopPropagation();
          _this.set_vsel_innerText(e);
      });
      _this.shadowRoot.querySelector(_div).addEventListener('pointerout',
        function(e) {
          e.preventDefault(); e.stopPropagation();
          document.all.vsel.innerText = "";
      });
      _this.shadowRoot.querySelector(_div).addEventListener('pointerup',
        function(e) {
          e.preventDefault(); e.stopPropagation();
          _this.put2_textarea(_this.set_vsel_innerText(e));
        });

      _this.shadowRoot.querySelector(_div).addEventListener('touchmove',
        function(e) {
          e.preventDefault(); e.stopPropagation();
          var touch = e.touches[0];
          var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
          console.log("Tgt", realTarget.shadowRoot.querySelector(_div).innerText);
          document.all.vsel.innerText = realTarget.shadowRoot.querySelector(_div).innerText;
      });


    })  // end forEach

    // vball event handlers

  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.caption').removeEventListener();
  }

}


class CKey extends VKey {
  constructor() {
    super();
    this.style.background = "#B6A657";
    //document.body.vkey.background-color = green;
  }
}

// works in chrome, not in firefox; custom elements must be hypenated
window.customElements.define('v-key', VKey);
window.customElements.define('c-key', CKey);

// disable select/mark tex
document.onmousedown=function() { return false; }
document.onselectstart = function() { return false; }
// disable right click
window.addEventListener("contextmenu", function(e) { e.preventDefault(); })

