var gVars = {}

function setUp(color_id, selector, value)
{
  // The colors of the dials:
  var colors = ['orange','blue','green', "red", "yellow"];
  var tmp;
  tmp = $('<div>').attr('class',colors[color_id]+' clock').html(
      '<div class="display"></div>'+
      '<div class="front left"></div>'+
      '<div class="rotate left">'+
      '<div class="bg left"></div>'+
      '</div>'+
      '<div class="rotate right">'+
      '<div class="bg right"></div>'+
      '</div>'
  );
  $(selector).append(tmp);
  // Assigning some of the elements as variables for speed:
  tmp.rotateLeft = tmp.find('.rotate.left');
  tmp.rotateRight = tmp.find('.rotate.right');
  tmp.display = tmp.find('.display');
  gVars[colors[color_id]] = tmp;

  var currentTime = new Date();
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();
  var s = currentTime.getSeconds();

  animation(gVars[colors[color_id]], value , 12);
}

function updateView(clocks){
  var colors = ['orange','blue','green', "red", "yellow"];
  animation(gVars[colors[0]], clocks[0] , 12);
  animation(gVars[colors[1]], clocks[1] , 12);
  animation(gVars[colors[2]], clocks[2] , 12);
  animation(gVars[colors[3]], clocks[3] , 12);
  animation(gVars[colors[4]], clocks[4] , 12);

}

function animation(clock, current, total){
  // Calculating the current angle:
  var angle = (360/total)*(current);
  var element;
  if(current==0)
  {
      console.log("hi");
      // Hiding the right half of the background:
      //clock.rotateRight.hide();
      clock.rotateRight.show();
      clock.rotateLeft.show();

      // Resetting the rotation of the left part:
      //rotateElement(clock.rotateLeft,0);
      rotateElement(clock.rotateLeft,180);
      rotateElement(clock.rotateRight,180);
      clock.display.html("Sucesso");
     return;
  }

  if(current < 7){
    clock.rotateRight.hide();

  }

  if(angle<=180)
  {
      // The left part is rotated, and the right is currently hidden:
      element = clock.rotateLeft;
  }
  else
  {
      // The first part of the rotation has completed, so we start rotating the right part:
      clock.rotateRight.show();
      clock.rotateLeft.show();

      rotateElement(clock.rotateLeft,180);
      element = clock.rotateRight;

      angle = angle-180;
  }

  rotateElement(element,angle);
  // Setting the text inside of the display element, inserting a leading zero if needed:
  clock.display.html(current<10?'0'+current:current);
}

function rotateElement(element,angle)
{
  // Rotating the element, depending on the browser:
  var rotate = 'rotate('+angle+'deg)';
  if(element.css('MozTransform')!=undefined)
      element.css('MozTransform',rotate);

  else if(element.css('WebkitTransform')!=undefined)
      element.css('WebkitTransform',rotate);

  // A version for internet explorer using filters, works but is a bit buggy (no surprise here):

  else if(element.css("filter")!=undefined)
  {
      var cos = Math.cos(Math.PI * 2 / 360 * angle);
      var sin = Math.sin(Math.PI * 2 / 360 * angle);
      element.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12=-"+sin+",M21="+sin+",M22="+cos+",SizingMethod='auto expand',FilterType='nearest neighbor')");
      element.css("left",-Math.floor((element.width()-200)/2));
      element.css("top",-Math.floor((element.height()-200)/2));
  }
}
