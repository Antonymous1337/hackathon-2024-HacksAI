const site = window.location.hostname;

//class AI{}
//class Real{}

var element;
var isImage = false;
var isHover = false;

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

$(this).on('keypress', function(event) {
  if (event.keyCode == 115 && isHover == true && isImage == true) //https://www.toptal.com/developers/keycode/table
  {
    alert('Its a taco!');
    //checkIfReal(element);
  }
  else if (event.keyCode == 115) //If prev is false but the key was right
  {
  	//alert('Its NOT a tako, baka!');
  }
})

/*
function checkIfReal(element)
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
