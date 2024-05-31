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
  width: 250px;
  height: 130px;
  border-radius: 1em;
}
.circle:hover .content-closed {
  animation: trulyHide 0.3s both,
             disappear 0.3s both;
}
.content-closed {
  position: absolute;
  top: -25%; 
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2.5rem;
  user-select: none;
}
.content-opened {
  color: white;
  display: none;
  margin: 10px;
  font-size: 14px;
  line-height: normal;
}
.circle:hover .content-opened {
  display: inline;
  opacity: 0;
  animation: disappear 0.2s 0.5s reverse both ease-in-out;
}
detectorExitButton {
  display: none;
  position: absolute;
  right: 0%;
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
  line-height: normal;
}
.circle:hover detectorExitButton {
  display: inline;
  opacity: 0;
  animation: disappear 0.2s 0.5s reverse both ease-in-out;
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
@keyframes rotate {
  from {
    transform: rotate(0deg); 
  }
  to {
    transform: rotate(360deg);
  }
}
`);

class ScanObject
{
  #loading = true
  #pass = false
  #percentage = -1
  #scanElement = undefined
  #scanElementParent = undefined
  constructor(src, element, parentElement)
  {
    this.#loading = true;
    this.#pass = false;
    this.#percentage = -1;
    this.#scanElement = element
    this.#scanElementParent = parentElement

    this.checkIfReal(src)
    //this.checkifrealprototype()
    //private setTooltip()
  }

  checkIfReal(src)
  {
    //Start loading Icon a spinnin round
    var loadingIcon = document.createElement("img");
    loadingIcon.src = chrome.runtime.getURL('/icons&images/GreyLoad.png')
    //Change size and set position of image to the top right.
    loadingIcon .style.width = "50px";
    loadingIcon .style.height = "50px";
    loadingIcon .style.position = "absolute"; //position absolute aligns image relative with nearest ancestor?
    loadingIcon .style.top = "0";
    loadingIcon .style.right = "0";
    loadingIcon.style.animation = "rotate 2s infinite ease-in-out"

    this.#scanElementParent.append(loadingIcon);
    
    // 'Percentage' of how real image could be - Currently random for testing purposes
    let percentage = Math.round(Math.random()*100);

    /*
    const spawner = require('child_process').spawn;
    const data_to_pass_in = "Test";
    console.log("Data sent to python script:", data_to_pass_in);
    const python_process = spawner('python', ['./app.py', JSON.stringify(data_to_pass_in)]);
    python_process.stdout.on('data', (data) => {
      console.log('Data received from python script:', JSON.parse(data.toString()));
    })
    */

    // Timer so you can check out the loading icon. Can probably be removed once ai is implimented.
    setTimeout(() => {
      this.#scanElementParent.append(this.setIcon(percentage));
      this.#scanElementParent.removeChild(loadingIcon);
    }, 2000); // 2000 milliseconds = 2 seconds

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

  //Everything to create and set the green or red outcome icon based on the percentage of it being real
  setIcon(percentage)
  {
      // Create a wrapper div and apply the circle class
      var wrapper = document.createElement("div");
      wrapper.className = "circle";
      wrapper.style.position = "absolute";
      wrapper.style.top = "0";
      wrapper.style.right = "0";

      //Closed and open content
      var contentOpened = document.createElement("p");
      contentOpened.className = "content-opened";
      var contentClosed = document.createElement("p");
      contentClosed.className = "content-closed";
        
      //Exit button
      var button = document.createElement("detectorExitButton");
      button.className = "detectorExitButton-open";
      button.onclick = function(event) {
        event.preventDefault(); 
        this.parentElement.remove(); };
      button.textContent = "X";
    
      //Check chance of being real or fake
      if (percentage >= 50) {
        this.pass = true;
        //alert("It Passed! " + percentage)
        //Stuff to set text and color to match result
        button.style.background = "green";
        wrapper.style.backgroundColor = "green";
        button.onmouseover = function() { this.style.color = "green"; this.style.background = "white"; };
        button.onmouseout = function() { this.style.color = "white"; this.style.background = "green"; };
        contentClosed.textContent = "R";
        contentOpened.innerHTML = `Chances of being real: <strong>${percentage}%</strong> <br><br><br>
        This means you can likely trust that this image is real. But still be careful anyway!`;
      } else {
        this.pass = false;
        //alert("It failed! " + percentage)
        //Stuff to set text and color to match result
        button.style.background = "red";
        wrapper.style.backgroundColor = "red";
        button.onmouseover = function() { this.style.color = "red"; this.style.background = "white"; };
        button.onmouseout = function() { this.style.color = "white"; this.style.background = "red"; };
        contentClosed.textContent = "F";
        contentOpened.innerHTML = `Chances of being real: <strong>${percentage}%</strong> <br><br><br>
        This means the image is suspicious, and should be treated carefully!`;
      }
      // Append the text elements to the wrapper
      wrapper.appendChild(contentClosed);
      wrapper.appendChild(contentOpened);
    
      // Append the button to the wrapper
      wrapper.appendChild(button);
      // Append the wrapper to the parent element
      return wrapper;
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
    var x = e1.clientX, y = e1.clientY; //Cords of mouse pointer
    element = document.elementFromPoint(x, y); //Returns topmost element from position
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
      scanList.push(new ScanObject(src, element, parent_element))
      console.log(parent_element.className)

  }
})