
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
	<div class="caption nx"></div>
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
    font-weight: 300;
    font-family: 'Noto Sans', sans-serif;
    color: rgba(0,0,0,0);
  }

  .n0, .n1, .nx, .n2, .n3 {
    width:  15px;
    height: 12px;
    background-colork: red;
    padding: 0px;
  }
  
  .n2 {
    color: white;
    font-size: 10px;
    font-weight: 200;
	text-align: center;
  }
  
  .n0 { transform: translate(  60%,  -120%);}
  .n1 { transform: translate( 160%,  -110%);}
  .nx { transform: translate(-150%,    90%);}
  .n2 { transform: translate(-110%,    110%);}
  .n3 { transform: translate( -60%,    90%);}

  .vball {
    width: 24px;
    height: 24px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 50%;
    position: relative;
    text-align: center;
    line-height: 24px; /* to vertically center text; set to height*/
  }
  .vball {
    left: 12px;
    top: -42px;
  }
  .vball {
    color: white;
    font-size: 16px;
    font-weight: 300;
  }
    
</style>
`;

//  ् - halanth allows creation of conjunct vyanjana (consonants)
const halanth = String.fromCharCode(parseInt("094d", 16));
// ़ -  nukta changes vyanaja_alpaprana to vyanjana_mahaprana
const nukta = String.fromCharCode(parseInt("093c", 16));

// swara (vowels)
const swara = "अआइईउऊऋॠऌएऐऎऑओऔ";
const arr_swara = [...swara];

let swara_matra = "";
// ऽ ा ि ी ु ू ृ ॄ ॅ ॆ े ै ॉ ॊ ो ौ
for ( let i = 0x93d; i < 0x94d; i++) {
   swara_matra += String.fromCharCode(i) + " ";
}
const arr_swara_matra = [...swara_matra];

const vyanjana = "कखगघचछजझटठडढतथदधपफबभमनणङञयरलवशषसहक्षत्रज्ञ";
const arr_vyanjana = [...vyanjana];

const vyanajana_alpaprana = "कगचजटडतदपब";
const arr_vyanjana_alpaprana = [... vyanajana_alpaprana];

const vyanajana_mahaprana = "खघछझठढथधफभ";
const arr_vyanjana_mahaprana = [... vyanajana_mahaprana];

const vowels = "aeiou";
const arr_vowels = [... vowels];

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
    this.shadowRoot.querySelector(".caption.nx").innerText = _a[2];
    this.shadowRoot.querySelector(".caption.n2").innerText = _a[2];
    this.shadowRoot.querySelector(".caption.n3").innerText = _a[3];
    this.shadowRoot.querySelector(".caption.vball").innerText = _a[0];
	this.shadowRoot.querySelector(".vkey").style.background = _c[0];
    this.shadowRoot.querySelector(".vkey").style.backgroundImage = "radial-gradient(circle, " + _c[0] + " 30%, " + _c[1] + ")";
    let _s = this.getAttribute('s');
    this.shadowRoot.querySelector(".caption.n0").style.fontWeight = _s;
    this.shadowRoot.querySelector(".caption.n1").style.fontWeight = _s;
    this.shadowRoot.querySelector(".caption.nx").style.fontWeight = _s;
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
   //let _vball = e.target.parentNode.parentNode.children[1];
   //_vball.innerText = _text;
   return _text;
 }

 put2_textarea(v) {
   let _V = document.all.keyinput.value;
   let _V_lastchar = _V.slice(-1,);
   let _V_penulchar = _V.slice(-2,-1);	 
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
	 
   // remove previous halanth if swara (vowel) being added
   if (arr_swara.includes(v)) {
	   if (_V_lastchar == "्") {
		   _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,);
	       _vput = _vput.slice(0,-1);
		   _V_lastchar = _V.slice(-1,);	  
	   }
   }

  // initialize	 
  let alpa_index = 0;
  let maha_v = arr_vyanjana_mahaprana[alpa_index];
		  	 
  // if nukta, change previous alpaprana consonant to mahaprana
  if ( v == nukta ) {
	  if ( arr_vyanjana_alpaprana.includes(_V_lastchar) ) {
		  alpa_index = arr_vyanjana_alpaprana.indexOf(_V_lastchar);
		  maha_v = arr_vyanjana_mahaprana[alpa_index];
		  console.log(alpa_index);
		  console.log(maha_v);
	  }
	  if ( _V_lastchar == halanth && arr_vyanjana_alpaprana.includes(_V_penulchar) ) {
		  alpa_index = arr_vyanjana_alpaprana.indexOf(_V_penulchar);
		  maha_v = arr_vyanjana_mahaprana[alpa_index];
		  console.log(alpa_index);
		  console.log(maha_v);
	  }
	  //_V = _V.slice(,-2) + _V_penulchar + _V_lastchar;   _vput+= _V.slice(-1,); 
   }
		 
   // use matras if last char is vyanjana and new char is swara
   if ( arr_swara.includes(v) && arr_vyanjana.includes(_V_lastchar) ) {
		   switch (v) {
		     // const swara = "अआइईउऊॠऌएऐऍऑओऔ";
			 // const vyanjana = "कखगघचछजझटठडढतथदधपफबभमनणङञयरलवशषसहक्षत्रज्ञ";
             // const arr_vyanjana = [...vyanjana];
		     // https://www.unicode.org/charts/nameslist/n_0900.html
		     case "आ": _V += String.fromCharCode(parseInt("93e", 16));  _vput+= _V.slice(-1,); break; 
			 case "इ": _V += String.fromCharCode(parseInt("93f", 16)); _vput+= _V.slice(-1,); break;
			 case "ई": _V += String.fromCharCode(parseInt("940", 16)); _vput+= _V.slice(-1,); break;
		     case "उ": _V += String.fromCharCode(parseInt("941", 16));  _vput+= _V.slice(-1,); break;
			 case "ऊ": _V += String.fromCharCode(parseInt("942", 16));  _vput+= _V.slice(-1,); break;
		     case "ऋ": _V += String.fromCharCode(parseInt("943", 16));  _vput+= _V.slice(-1,); break;
		     case "ऌ": _V += String.fromCharCode(parseInt("962", 16));  _vput+= _V.slice(-1,); break;  
		     case "ए": _V += String.fromCharCode(parseInt("947", 16));  _vput+= _V.slice(-1,); break;
			 case "ऐ": _V += String.fromCharCode(parseInt("948", 16));  _vput+= _V.slice(-1,); break;
			 case "ऎ": _V += String.fromCharCode(parseInt("946", 16));  _vput+= _V.slice(-1,); break;
		     case "ऑ": _V += String.fromCharCode(parseInt("949", 16));  _vput+= _V.slice(-1,); break;
		     case "ओ": _V += String.fromCharCode(parseInt("94b", 16));  _vput+= _V.slice(-1,); break;
     	     case "औ": _V += String.fromCharCode(parseInt("94c", 16));  _vput+= _V.slice(-1,); break;
	   }
   } else if  ( arr_vowels.includes(v) && arr_vowels.includes(_V_lastchar) ) {
	   // handling elongated english vowels and diphthongs
	    let vv = v + _V_lastchar;
	    switch (vv) {
		     // const vowels = "aeiou"
			case "aa":  _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,) + "ā"; _vput+= _V.slice(-1,); break;
			case "ee":  _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,) + "éi"; _vput+= _V.slice(-2,); break;
			case "ii":  _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,) + "ē"; _vput+= _V.slice(-1,); break;
    		case "oa":  _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,) + "ō"; _vput+= _V.slice(-1,); break;
			case "oo": 
			case "uu":  _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,) + "û"; _vput+= _V.slice(-1,); break;
			case "iu":  _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,) + "ū"; _vput+= _V.slice(-2,); break;
			default : _V += v; _vput+=v; break;
		}
   } else {	 
		   switch (v) {	   
		       case "␣": _V += " "; _vput = ""; break;
		       // after delete, cursor automaticaaly moves to end
		       case "⌫":
		           _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,);
		           _vput=_vput.slice(0,-1);
		           break;
			   case nukta:  
				   if ( arr_vyanjana_alpaprana.includes(_V_lastchar) ) {
				  	   alpa_index = arr_vyanjana_alpaprana.indexOf(_V_lastchar);
                	   maha_v = arr_vyanjana_mahaprana[alpa_index];
					   // end_pos seems to be just start_pos+1 and is last char 
					   console.log("start_pos",_start_pos, _V.substring(0,_start_pos))
					   console.log("end_pos",_end_pos, _V.substring(_end_pos,))
 			           _V = _V.substring(0,_start_pos) + _V.substring(_end_pos,) + maha_v;
				       _vput = _vput.slice(0,-1) + maha_v;
					   _V_lastchar = maha_v;
					   console.log("start_pos",_start_pos, _V.substring(0,_start_pos))
					   console.log("end_pos",_end_pos, _V.substring(_end_pos,))
		               break;
				   } else if ( _V_lastchar == halanth && arr_vyanjana_alpaprana.includes(_V_penulchar) ) {
		              alpa_index = arr_vyanjana_alpaprana.indexOf(_V_penulchar);
		              maha_v = arr_vyanjana_mahaprana[alpa_index];
		 			  _V = _V.substring(0,_start_pos-1) + maha_v + halanth;
				      _vput = _vput.slice(0,-2) + maha_v + halanth;
					  break;  
				   } else {
					    // default behavior
					    _V += v; _vput+=v; break;
				   }
				case "अ": 
				   if ( arr_swara_matra.includes(_V_lastchar) ) {
					   _V += String.fromCharCode(parseInt("93d", 16));  _vput+= _V.slice(-1,); break;
				   }
		       // case "+": _V += "&#93e;"; break;
		       // case "+": _V += String.fromCharCode(2366); break;
				case "--" : break;  
		        default : _V += v; _vput+=v; break;
		   }
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
    ['vball', 'n0', 'n1', 'nx', 'n2', 'n3'].forEach(function(item) {
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
      // swipe listener - causing keyboard display corruption. comment out.
		/*
      _this.shadowRoot.querySelector(_div).addEventListener('pointerdown',
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
          // pointerup corresponds to click
		  //_this.put2_textarea(_this.set_vsel_innerText(e));
			_this.put2_textarea(document.all.vsel.innerText);

        });
	  /*		
      _this.shadowRoot.querySelector(_div).addEventListener('pointercancel',
        function(e) {
          e.preventDefault(); e.stopPropagation();
		  // pointerend corresponds to touch remove
		  //_this.put2_textarea(_this.set_vsel_innerText(e));	
      });
	  */	
      _this.shadowRoot.querySelector(_div).addEventListener('touchmove',
        function(e) {
          e.preventDefault(); e.stopPropagation();
          var touch = e.touches[0];
		  var x0 = touch.clientX;
		  var y0 = touch.clientY;
          var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
          const parentElement_children =  realTarget.shadowRoot.querySelector(_div).parentElement.children;
		  console.log("Tgt", realTarget.shadowRoot.querySelector(_div).innerText, x0:y0, realTarget);
	      
          document.all.vsel.innerText = realTarget.shadowRoot.querySelector(_div).innerText;
      });
	 
		

    })  // end forEach
 // vball event handlers
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.caption').removeEventListener();
  }

// end class Vkey	
}


class CKey extends VKey {
  constructor() {
    super();
    this.style.background = "#B6A657";
    //document.body.vkey.background-color = green;
  }
}


// Add Event Handler to viewrow to cancel (unset) vsel
// ---------------------------------------------------
// Define the event handler function
function handlePointerEnter(event) {
  console.log('Pointer entered the div!', event.target);
  // You can add any desired actions here, e.g., change background color
  // event.target.style.backgroundColor = 'lightgreen';
  document.all.vsel.innerText = "";	
}
// Get a reference to the div element
const vrowDiv = document.getElementById('vrow');
// Attach the pointerenter event listener to the div
vrowDiv.addEventListener('pointerenter', handlePointerEnter);
vrowDiv.addEventListener('touchmove', handlePointerEnter);


// works in chrome, not in firefox; custom elements must be hypenated
window.customElements.define('v-key', VKey);
window.customElements.define('c-key', CKey);

// disable select/mark tex
document.onmousedown=function() { return false; }
document.onselectstart = function() { return false; }
// disable right click
window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
