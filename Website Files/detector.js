const site = window.location.hostname;

alert("Injector- JavaScript injected into " + site + ". WOOT!");

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
      //console.log('Its an image!');
    }
    else
    {
    	isImage = false;
      //console.log('Its not an image, idiot');
    }
    
    isHover = true;
		//alert(isHover);
});

$(window).on('mouseleave', function()
{
	isHover = false;
  //alert(isHover);
});

$(this).on('keypress', function(event) {
  if (event.keyCode == 115 && isHover == true && isImage == true) //https://www.toptal.com/developers/keycode/table
  {
    alert('Its a taco!');
  }
  else
  {
  	alert('Its NOT a tako, baka!');
  }
})