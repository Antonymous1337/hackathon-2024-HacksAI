const site = window.location.hostname;

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
.circle {
  background-color: green;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: 0.5s ease-in-out;
  float: right;
  display: flex;
}
.circle:hover {
  width: 300px;
  height: 130px;
  border-radius: 1em;
}
.circle:hover .content-closed {
  animation: trulyHide 0.3s both,
             disappear 0.3s both;
}
.content-closed {
  position: absolute;
  top: -40px;
  right: 12px;
  color: white;
  font-size: 2.5rem;
  user-select: none;
}
.content-opened {
  color: white;
  display: none;
  margin: 10px;
  font-size: 15px;
}
.circle:hover .content-opened {
  display: inline;
  opacity: 0;
  animation: disappear 0.2s 0.5s reverse both ease-in-out;
}
button {
  display: none;
  position: absolute;
  right: 0px;
  color: white;
  background:green;
  font-weight: bold;
  padding: 0px;
  font-size: 40px;
  width: 50px;
  height: 50px;
  border-top-right-radius: 14px;
  border: none;
  z-index: 1;
  text-align: center;
}
.circle:hover button {
  display: inline;
  opacity: 0;
  animation: disappear 0.2s 0.5s reverse both ease-in-out;
}
button:hover {
  color:grey;
}
@keyframes trulyHide {
  0% {display: initial;}
  99% {display: initial;}
  100% {display: none;}
}
@keyframes disappear {
  0% {opacity: 100%;}
  100% {opacity: 0%;}
}
`);

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
  // Create a wrapper div and apply the circle class
  var wrapper = document.createElement("div");
  wrapper.className = "circle";
  wrapper.style.position = "absolute";
  wrapper.style.top = "0";
  wrapper.style.right = "0";
  
  //Closed and open
  var contentOpened = document.createElement("p");
  contentOpened.className = "content-opened";
  var contentClosed = document.createElement("p");
  contentClosed.className = "content-closed";
  
  //Exit button
  var button = document.createElement("button");
  button.className = "button-open";
  button.onclick = function(event) {
    event.preventDefault(); 
    this.parentElement.remove(); };
  button.textContent = "X";

  // 'Percentage' of how real image could be
  let percentage = Math.round(Math.random()*100);

  if (percentage >= 80) {
    this.pass = true;
    alert("It Passed! " + percentage)
    //Stuff to set text and color to match result
    button.style.background = "green";
    wrapper.style.backgroundColor = "green";
    contentClosed.textContent = "R";
    contentOpened.innerHTML = `Chances of being fake: <strong>${percentage}%</strong> <br><br><br>
    This means you can likely trust that this image is real. But still be careful anyway!`;
  } else {
    this.pass = false;
    alert("It failed! " + percentage)
    //Stuff to set text and color to match result
    button.style.background = "red";
    wrapper.style.backgroundColor = "red";
    contentClosed.textContent = "F";
    contentOpened.innerHTML = `Chances of being fake: <strong>${percentage}%</strong> <br><br><br>
    This means the image is suspicious, and should be treated carefully!`;
  }
  // Append the text elements to the wrapper
  wrapper.appendChild(contentClosed);
  wrapper.appendChild(contentOpened);

  // Append the button to the wrapper
  wrapper.appendChild(button);
  // Append the wrapper to the parent element
  parent_element.append(wrapper);

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

  }
})