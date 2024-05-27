const site = window.location.hostname;
/*
    "web_accessable_resources": [
        "resources": ["icons&images/GreenCheckmark.png"]
    ],
*/ 

/* Miro's HTML / CSS Injecting */

//const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML   

//Creates style element, set innerHTML to css string, then append.
//Not sure what exactly that middle part means but uh it works yay huahahwhw
const Add_Custom_Style = css => {
  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);
}

//Adds onhover class thingymabob wooooot 
Add_Custom_Style(`
  .expand-on-hover:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease-in-out;
  }
`);

/*
Add_Custom_Style(`

    img {
      width: 10px;
    }
    #js-image-element1{
      position: relative;
      display: grid;  
      place-items: right;
    }
    #js-image-element2{
      position: relative;
      display: grid;
      place-items: right;
    }
    #js-image-element3{
      position: relative;
      display: grid;
      place-items: right;
    }
    #js-image-element4{
      position: relative;
      display: grid;
      place-items: right;
    }
`)*/
/*
function Create_Custom_Element(tag, attr_tag, attr_name, value) {
  
  const custom_element = document.createElement(tag)
  custom_element.setAttribute(attr_tag, attr_name)
  custom_element.innerHTML = value
  parent_element.append(custom_element)
  var img = document.createElement("img");

  let s = chrome.runtime.getURL('/icons&images/GreenCheckmark.png')

  console.log(s);

  img.src = s;

  //Change size and set position of image to the top right of image.
  img.style.width = "50px";
  img.style.height = "50px";
  img.style.position = "absolute"; //position absolute aligns image relative with nearest ancestor?
  img.style.top = "0";
  img.style.right = "0";

  img.setAttribute(attr_tag, attr_name)
  //custom_element.append(img);
  var src = custom_element
  src.append(img);
}
*/
/*
const image_space1 = document.getElementsByClassName("image_space1")
const image_space2 = document.getElementsByClassName("image_space2")
const image_space3 = document.getElementsByClassName("image_space3")
const image_space4 = document.getElementsByClassName("image_space4")

function Create_Custom_Element1(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag)
  custom_element.setAttribute(attr_tag, attr_name)
  custom_element.innerHTML = value
  image_space1[0].append(custom_element)
  var img = document.createElement("img");
  img.src = "icons&images/GreenCheckMark.png";
  img.setAttribute(attr_tag, attr_name)
  var src = custom_element
  src.append(img);
}
function Create_Custom_Element2(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag)
  custom_element.setAttribute(attr_tag, attr_name)
  custom_element.innerHTML = value
  image_space2[0].append(custom_element)
  var img = document.createElement("img");
  img.src = "icons&images/RedX.png";
  var src = custom_element
  src.append(img);
}
function Create_Custom_Element3(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag)
  custom_element.setAttribute(attr_tag, attr_name)
  custom_element.innerHTML = value
  image_space3[0].append(custom_element)
  var img = document.createElement("img");
  img.src = "icons&images/RedX.png";
  var src = custom_element
  src.append(img);
}
function Create_Custom_Element4(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag)
  custom_element.setAttribute(attr_tag, attr_name)
  custom_element.innerHTML = value
  image_space4[0].append(custom_element)
  var img = document.createElement("img");
  img.src = "icons&images/GreenCheckMark.png";
  var src = custom_element
  src.append(img);
}*/

class ScanObject
{

  #loading = true
  #pass = false
  #percentage = -1
  #scanElement = undefined
  constructor(src, element)
  {
    this.#loading = true;
    this.#pass = false;
    this.#percentage = -1;
    this.#scanElement = element

    this.checkIfReal(src)
    //this.checkifrealprototype()
    //private setTooltip()
  }

  
  checkIfReal(src)
  {
    //Create element variable thingymabob for image
    var img = document.createElement("img");

    //'Percentage' of how real image could be
    let percentage = Math.round(Math.random()*100);

    if (percentage >= 80) {
      this.pass = true;
      alert("It Passed! " + percentage)
      img.src = chrome.runtime.getURL('/icons&images/GreenCheckmark.png')
    } else {
      this.pass = false;
      alert("It failed! " + percentage)
      img.src = chrome.runtime.getURL('/icons&images/RedX.png')
    }
  
    //Adds expand on hover to image
    img.className = "expand-on-hover";

    //Change size and set position of image to the top right of image.
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.position = "absolute"; //position absolute aligns image relative with nearest ancestor?
    img.style.top = "0";
    img.style.right = "0";

    /*
    //Domain Expansion: Add functions to img that trigger on mouseover/out to expand widtch and hegths
    img.onmouseover = function() {
      this.style.width = "70px";
      this.style.height = "70px";
    }
    img.onmouseout = function() {
      this.style.width = "50px";
      this.style.height = "50px";
    }
    */

    //Apply image to parent element
    parent_element.append(img);

    this.#loading = false;
    
    /*
    //Check class of image. if "real" then return true, else false
    if (element instanceof Real)
    {
      return false;
      //Maybe change tooltip?
    }
    else
    {
      return true;
      //Change tooltip?
    }*/
  }
  

  /*
  checkifrealprototype()
  {
    let percentage = Math.round(Math.random()*100);

    if (percentage >= 80) {
      this.pass = true;
      alert("It Passed! " + percentage)
    } else {
      this.pass = false;
      alert("It failed! " + percentage)
    }
    this.#loading = false;
  }
  */
}

let scanList = [];
var element;
var isImage = false;
var isHover = false;
var parent_element;

$(window).on('mouseenter', function(e1)
{
    var x = e1.clientX, y = e1.clientY;
    element = document.elementFromPoint(x, y);
    if (element) //Make sure its not null to fix error with trying to get parent of null element
    {
      parent_element = element.parentNode;
    }

    //If imageElement and isnt just a small image like a logo
    if (element instanceof HTMLImageElement && element.naturalWidth > 100 && element.naturalHeight > 100)
    {
    	isImage = true;
    }
    else
    {
    	isImage = false;
    }
    
    isHover = true;
});

$(window).on('mouseleave', function()
{
	isHover = false;
});

//Integrate users who use shift and s to type things out if have time
$(this).on('keypress', function(event) {
  //alert(event.keyCode);
  if (event.keyCode == 115 && isHover == true && isImage == true) //https://www.toptal.com/developers/keycode/table
  {
      // spawn object

      //get image src attribute
      let src = element.src
      scanList.push(new ScanObject(src, element))
      console.log(parent_element.className)

      /*
      Create_Custom_Element(
        "div",
        "id",
        "js-image-element1",
        "",
      )
      */

      /*
      } else if (parent_element.className == "image_space2") {
        console.log(image_space2)
        Create_Custom_Element2(
          "div",
          "id",
          "js-image-element2",
          "",
        )
      } else if (parent_element.className == "image_space3") {
        console.log(image_space3)
        Create_Custom_Element3(
          "div",
          "id",
          "js-image-element3",
          "",
        )
      } else if (parent_element.className == "image_space4") {
        console.log(image_space4)
        Create_Custom_Element4(
          "div",
          "id",
          "js-image-element4",
          "",
        )
      }
      */
    //alert('Its an image!');
    //checkIfReal(element);
  }
})