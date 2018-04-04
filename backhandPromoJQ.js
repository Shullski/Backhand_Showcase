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
var windowHeight = 0;

//Returns how far down an element is on page
function getScrollPosition(element) {
  var position = $(element).position().top;
  return position;
}

///Determine which nav option the user is currently scrolled over
function getScrollArea(pos) {

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

  windowHeight = $(window).height();
  //Element scroll positions------
  var homePosition = getScrollPosition('#jumbotronScroll');
  var featuresPosition = getScrollPosition('#featuresScroll');
  var aboutPosition = getScrollPosition('#aboutScroll');
  var prototypePosition = getScrollPosition('#prototypeScroll');
  var problemPosition = getScrollPosition('#problemScroll');

  function getScrollArea(pos) {

  }
  //------------------------------

  var prototypeHeight = $('.footer').height();
  $('.prototype').css('margin-bottom', prototypeHeight);
  var position = $(this).scrollTop();
  var expandNavPosition = getScrollPosition('#aboutScroll');
  if(position > expandNavPosition - 60) {
    $('.nav > div').css('height', '100%');
  }else{
    $('.nav > div').css('height', '0%');
  }

  //Remove mobile nav overlay
  $(window).on('resize', function(){
    windowHeight = $(window).height();
    var width = $(this).outerWidth();
    prototypeHeight = $('.footer').height();
    $('.prototype').css('margin-bottom', prototypeHeight);
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

    if (position < homePosition + (windowHeight/2)) {
      $('.scrollIndicator > #home').find('.inner').css({'height': '140%','width': '140%'});
    } else if (position > homePosition + (windowHeight/2) && position < featuresPosition + (windowHeight/2)) {
      console.log('about');
    } else if (position > featuresPosition + (windowHeight/2) && position < problemPosition - (windowHeight/2)) {
      console.log('features');
    }else{
      console.log('problem');
    }



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


  //============== CLICKABLE PROTOTYPE ================
  $('#prototypeToggle').click(function(){
    if($(this).hasClass('.toggled')) {
      $(this).toggleClass('.toggled');
      $('.prototype').css('height', '580');
      $('.prototype').find('span').fadeOut('20');
      $(this).animate({top: '6%'}, 800);
      $(this).css('height','40px');
      $(this).css('width','40px');
      $(this).css('border-radius','50%');
      $('.prototype').find('img').delay('700').fadeIn('slow');
      $('.prototype').children('iframe').delay('600').fadeIn('200');
    }else{
      $('.prototype').children('iframe').fadeOut('50');
      $('.prototype').find('img').fadeOut('fast');
      $(this).toggleClass('.toggled');
      $('.prototype').css('height', '250');
      $('.prototype').find('span').delay('1000').fadeIn('200');
      $(this).animate({top: '50%'}, 800);
      $(this).css('height','60px');
      $(this).css('width','300px');
      $(this).css('border-radius','5px');

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
        scrollTop: ($(hash).offset().top - $('.nav').height() - 10)
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = hash;
      });
    }
  });

});
