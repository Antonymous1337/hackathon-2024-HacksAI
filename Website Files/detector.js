const site = window.location.hostname;


/* Miro's HTML / CSS Injecting */

const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML   
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
}

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

    //#checkifreal(src)
    this.checkifrealprototype()
    //private setTooltip()
  }

  /*
  #checkIfReal(src)
  {
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
    }
  }
  */

  checkifrealprototype()
  {
    if (this.#scanElement.className == "real") this.pass = true;

    if (this.pass) {
      this.#percentage = Math.floor(Math.random() * 20) + 80// random integer 80 to 99
    } else {
      this.#percentage = Math.floor(Math.random() * 80) // random integer 0 to 79
    }
    this.#loading = false;
  }
}

let scanList = [];
var element;
var parent_element;
var isImage = false;
var isHover = false;
var parent_element;

$(window).on('mouseenter', function(e1)
{
    var x = e1.clientX, y = e1.clientY;
    element = document.elementFromPoint(x, y);
    parent_element = document.elementFromPoint(x, y).parentNode;
    if (element instanceof HTMLImageElement)
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
      if (parent_element.className == "image_space1") {
        console.log(image_space1)
        Create_Custom_Element1(
          "div",
          "id",
          "js-image-element1",
          "",
        )
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
    //alert('Its an image!');
    //checkIfReal(element);
  }
})