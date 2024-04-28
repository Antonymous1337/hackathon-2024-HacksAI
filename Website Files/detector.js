const site = window.location.hostname;


/* Miro's HTML / CSS Injecting */

const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML

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
    function Create_Custom_Element(tag, attr_tag, attr_name, value) {
      const custom_element = document.createElement(tag)
      custom_element.setAttribute(attr_tag, attr_name)
      custom_element.innerHTML = value
      document.a.append(custom_element)
      console.log("You ran me!")
    }

    Create_Custom_Element(
      "div",
      "id",
      "js-custom-element",
      "My Custom JS Element 1",
    )
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
  


    //alert('Its an image!');
    //checkIfReal(element);
  }
})