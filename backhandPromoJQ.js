//Main colors in HSB

var red = {
  hue: 3,
  saturation: 66,
  lightness: 65
}
var green = {
  hue: 154,
  saturation: 100,
  lightness: 46
}
var teal = {
  hue: 184,
  saturation: 87,
  lightness: 49
}
var blue = {
  hue: 212,
  saturation: 91,
  lightness: 65
}
var purple = {
  hue: 277,
  saturation: 91,
  lightness: 65
}

/* ============== */
var redHex = '#F75B54';
var greenHex = '#00E985';
var tealHex = '#10DBE8';
var blueHex = '#54A0F7';
var purpleHex = '#B954F7';
/* ============= */

//To simulate "passing by reference"
//to determine if scrolling up or down
var lastScrollPosition = 0;

//Variable for fading colors
var changeDistance = 284;

//Calculate the difference in values between main colors for fading
//Always returns a positive value
function calcHSLDifference(starting, next) {
  var result = {};
  var hueDiff = next.hue - starting.hue;
  //hueDiff = -hueDiff > 0 ? -hueDiff : hueDiff;

  var saturationDiff = next.saturation - starting.saturation;
  //saturationDiff = -saturationDiff > 0 ? -saturationDiff : saturationDiff;

  var lightnessDiff = next.lightness - starting.lightness;
  //brightnessDiff = -brightnessDiff > 0 ? -brightnessDiff : brightnessDiff;
  result = {
    hue: hueDiff,
    saturation: saturationDiff,
    lightness: lightnessDiff
  }
  return result;
}

//How much the color must change per scroll
function calcChangePerPixel(section) {
  var goingTo = section[1];
  var hueChange = 0;
  var saturationChange = 0;
  var lightnessChange = 0;

  if(goingTo == 'events') {
    hueChange = red.hue - green.hue;
    //hueChange = -hueChange > 0 ? -hueChange : hueChange;

    saturationChange = red.saturation - green.saturation;
    //saturationChange = -saturationChange > 0 ? -saturationChange : saturationChange;

    lightnessChange = red.lightness - green.lightness;
    //lightnessChange = -lightnessChange > 0 ? -lightnessChange : lightnessChange;

  }else if (goingTo == 'messaging') {
    hueChange = green.hue - blue.hue;
    //hueChange = -hueChange > 0 ? -hueChange : hueChange;

    saturationChange = green.saturation - blue.saturation;
    //saturationChange = -saturationChange > 0 ? -saturationChange : saturationChange;

    lightnessChange = green.lightness - blue.lightness;
    //lightnessChange = -lightnessChange > 0 ? -lightnessChange : lightnessChange;

  }else if (goingTo == 'groups') {
    hueChange = blue.hue - purple.hue;
    //hueChange = -hueChange > 0 ? -hueChange : hueChange;

    saturationChange = blue.saturation - purple.saturation;
    //saturationChange = -saturationChange > 0 ? -saturationChange : saturationChange;

    lightnessChange = blue.lightness - purple.lightness;
    //lightnessChange = -lightnessChange > 0 ? -lightnessChange : lightnessChange;
  }
  return [hueChange, saturationChange, lightnessChange];
}

//Get the position of a fade start
function getFadePos(section) {
  var fadeHeightTop = ($('.'+ section).position().top) + ($('.'+section).height() / 2);
  fadeHeightTop = Math.round(fadeHeightTop);
  var fadeHeightBottom = ($('.'+ section).position().top) + ($('.'+section).height()-50);
  fadeHeightBottom = Math.round(fadeHeightBottom);
  return [fadeHeightTop, fadeHeightBottom];
}

//Get the height of the area that will be faded across
function getFadeHeight(section) {
  var fadeHeightTop = ($('.'+ section).position().top) + ($('.'+section).height() / 2);
  fadeHeightTop = Math.round(fadeHeightTop);
  var fadeHeightBottom = ($('.'+ section).position().top) + ($('.'+section).height()-50);
  fadeHeightBottom = Math.round(fadeHeightBottom);
  return [fadeHeightTop, fadeHeightBottom];
}

//Determines if we are in a zone to fade colors
//and return areas that are being faded
function isInTransitionZone(position) {
  var transition = new Array();
  var mapFade = getFadeHeight('map');
  var eventsFade = getFadeHeight('events');
  var messagingFade = getFadeHeight('messaging');
  var groupsFade = getFadeHeight('groups');
  if(position > mapFade[0] && position < mapFade[1]){
    transition = ['map', 'events'];
    return transition;
  }else if (position > eventsFade[0] && position < eventsFade[1]) {
    transition = ['events', 'messaging'];
    return transition;
  }else if (position > messagingFade[0] && position < messagingFade[1]) {
    transition = ['messaging', 'groups'];
    return transition;
  }else{
    return false;
  }
}

//Determines if the user is scrolling up (true) or down (false)
function isScrollingUp(pos) {
  if(lastScrollPosition > pos) {
    lastScrollPosition = pos;
    return true;
  }else{
    lastScrollPosition = pos;
    return false;
  }
}

//Returns which section is currently being transitioned to
function scrollingTo(pos) {
  var goingTo = isInTransitionZone(pos);
  if(isScrollingUp(pos)) {
    goingTo = goingTo[0];
  }else{
    goingTo = goingTo[1];
  }
  return goingTo;
}

function getHSLText(color) {
  hue = color[0]/changeDistance;
  console.log('hue: ' + hue);
  saturation = color[1]/changeDistance;
  lightness = color[2]/changeDistance;
  return [hue, saturation, lightness];
}

/*===============*/
$(document).ready(function(){
  var offset = $('#mapButton').offset();

  var top = offset.top;
  var left = offset.left;
  console.log(offset);

  //Get the positions of each section for color fading
  // var greenPosition = ($('.map').position().top) - ($('.map').height()/2);
  // var bluePosition = ($('.messaging').position().top) - ($('.messaging').height()/2);
  // var purplePosition = ($('.groups').position().top) - ($('.groups').height()/2);

  $(document).scroll(function() {
    var position = $(this).scrollTop();

    // var greenPosition = ($('.map').position().top) - ($('.map').height()/2);
    // var bluePosition = ($('.messaging').position().top) - ($('.messaging').height()/2);
    // var purplePosition = ($('.groups').position().top) - ($('.groups').height()/2);
  //
  //   if(position > greenPosition && position < bluePosition) {
  //     $('.map, .events, .messaging, .groups').css('background-color', greenHex);
  //     $('.map > .aside').fadeIn('500');
  //   }else if (position > bluePosition && position < purplePosition) {
  //     $('.map, .events, .messaging, .groups').css('background-color', blueHex);
  //     $('.messaging > .aside').fadeIn('fast ');
  //     //$('.messaging > .aside').animate({right: '30px'}, 300);
  //   }else if (position > purplePosition) {
  //     $('.map, .events, .messaging, .groups').css('background-color', purpleHex);
  //     $('.groups > .aside').fadeIn('500');
  //   }else {
  //     $('.map, .events, .messaging, .groups').css('background-color', redHex);
  //   }
  });

  //================= OPENING THE OVERLAY ===============
  $('#eventButton, #mapButton, #messagingButton, #groupsButton').click(function() {
    $('body').toggleClass('noScroll');
    var buttonClicked = $(this).attr('id');
    var target = buttonClicked.replace("Button", "Overlay")
    target = '#' + target;
    var targetChild = target + ' > .collapsePanel';
    console.log(targetChild);
    $(target).css('width', '100%');
    $('.contentOverlay').addClass('contentOverlayDarken');
    $(target).children('.collapsePanel').delay(500).animate({left: '0'}, 0);

    //SHOW OVERFLOW OF TOGGLED OVERLAY **IE & EDGE FIX** -----
    $(target).find('.overlayContent').css('overflow-y', 'scroll');

    $('.overlayContent').delay(600).fadeIn(200);
    $(target).css({
      "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
       "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
     });
  });

  //=============== HOVER EFFECTS ON FEATURE BUTTONS =============
  $('#eventButton, #mapButton, #messagingButton, #groupsButton').hover(function() {
    //$(this).children('.iconContainer').animate({ 'bottom': '10%' }, 200 );
    $(this).children('.buttonOverlay').addClass('expandedButtonOverlay');
    $(this).find('.expandOverlayContainer').css('right', '0');
    }, function(){
    $(this).children('.buttonOverlay').removeClass("expandedButtonOverlay");
    $(this).find('.expandOverlayContainer').css('right', '-20%');
  });

  //================= COLLAPSING THE OVERLAY ===============
  $('.collapsePanel').click(function(){
    var theOverlay = $(this).parents('.overlay');
    theOverlay.css('width', '0');
    $(theOverlay).children('.collapsePanel').animate({left: '-60px'}, 0);
    $('.overlayContent').fadeOut(100);
    $('.contentOverlay').removeClass('contentOverlayDarken');
    $('body').toggleClass('noScroll');
    theOverlay.css({
      "-webkit-clip-path": "polygon(0 0, 30% 0, 100% 100%, 0 100%)",
       "clip-path": "polygon(0 0, 30% 0, 100% 100%, 0 100%)"
     });
  });



  // SMOOTH SCROLLING
  // $(".campusesButton").on('click', function(event) {
  //   // Make sure this.hash has a value before overriding default behavior
  //   if (this.hash !== "") {
  //     // Prevent default anchor click behavior
  //     event.preventDefault();
  //     // Store hash
  //     var hash = this.hash;
  //     $('html, body').animate({
  //       scrollTop: $(hash).offset().top
  //     }, 800, function(){
  //       // Add hash (#) to URL when done scrolling (default click behavior)
  //       window.location.hash = hash;
  //     });
  //   }
  // });

});
