//Main colors
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


//Returns how far down an element is on page
function getScrollPosition(element) {
  var position = $(element).position().top;
  return position;
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

//Responisve Design
var mobileBreakpoint = 600;
var tabletBreakpoint = 769;


/*===============*/
$(document).ready(function(){
  var position = $(this).scrollTop();
  var expandNavPosition = getScrollPosition('#aboutScroll');
  if(position > expandNavPosition - 60) {
    $('.nav > div').css('height', '100%');
  }else{
    $('.nav > div').css('height', '0%');
  }

  //Remove mobile nav overlay
  $(window).on('resize', function(){
    var width = $(this).outerWidth();
    if($('.hamburger').hasClass('change')) {
      if (width > tabletBreakpoint) {
        $('.menuOverlay').fadeOut();
        $('body').css('overflow-y', 'scroll');
        $('.hamburger').removeClass('change');
      }
    }
  });

  $(document).scroll(function() {
    var position = $(this).scrollTop();
    console.log(position);
    var expandNavPosition = getScrollPosition('#aboutScroll');
    if(position > expandNavPosition - 60) {
      $('.nav > div').css('height', '100%');
    }else{
      $('.nav > div').css('height', '0%');
    }
  });

  //================= OPENING THE OVERLAY ===============
  $('#eventButton, #mapButton, #messagingButton, #groupsButton').click(function() {
    $('body').css('overflow-y', 'hidden');
    var buttonClicked = $(this).attr('id');
    var target = buttonClicked.replace("Button", "Overlay")
    target = '#' + target;
    var targetChild = target + ' > .collapsePanel';
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
    $('body').css('overflow-y', 'scroll');
    theOverlay.css({
      "-webkit-clip-path": "polygon(0 0, 30% 0, 100% 100%, 0 100%)",
       "clip-path": "polygon(0 0, 30% 0, 100% 100%, 0 100%)"
     });
  });

  //================= COLLAPSING THE OVERLAY ===============
  $('.hamburger').click(function(){
    if ($(this).hasClass('change')) {
      $(this).toggleClass('change');
      $('body').css('overflow-y', 'scroll');


      $('.menuOverlay').fadeOut('fast');
      //$('.menuOverlay > div').css('transform', 'translate(-50%, -35%) scale(0.9)');

    } else {
      $(this).toggleClass('change');
      $('body').css('overflow-y', 'hidden');

      var delay = 300;
        $('.menuOverlay > .container > div').each(function(){
            $(this).animate({
  				        opacity: '1',
                 bottom: '0'
  			}, delay );
            delay *= 1.5;
        });

      $('.menuOverlay').fadeIn('fast');
      //$('.menuOverlay > div').css('transform', 'translate(-50%, -50%) scale(1.0)');
    }
  });


  //SMOOTH SCROLLING
  $('a[href*="#"]').on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      $('html, body').stop().animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }
  });

});
