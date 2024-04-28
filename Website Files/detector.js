const site = window.location.hostname;

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

    //alert(this.#scanElement.className)

    //alert("G")
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

    if (pass) {
      this.#percentage = Math.floor(Math.random() * 179) + 80// random integer 80 to 99
    } else {
      this.#percentage = Math.floor(Math.random() * 80) // random integer 0 to 79
    }

    this.#loading = false;
  }


}

let scanList = [];
var element;
var isImage = false;
var isHover = false;


//passfail percentage
$(window).on('mouseenter', function(e1)
{
    var x = e1.clientX, y = e1.clientY;
    element = document.elementFromPoint(x, y);
    
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
      //alert(element.className)
      scanList.push(new ScanObject(src, element))
  


    //alert('Its an image!');
    //checkIfReal(element);
  }
})