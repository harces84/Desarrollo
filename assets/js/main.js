console.log('%c Proudly Crafted with ZiOn.', 'background: #222; color: #bada55');

/* ---------------------------------------------- /*
 * Preloader
 /* ---------------------------------------------- */
jQuery(document).ready(function($) {  

    $(window).load(function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });

});
(function(){
//    $(window).on('load', function() {
//        $('.preloader').fadeOut();
//        $('.page-loader').delay(5).fadeOut('slow');
//    });

    $(document).ready(function() {

        /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
         /* ---------------------------------------------- */

        wow = new WOW({
            mobile: false
        });
        wow.init();


        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });


        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var homeSection = $('.home-section'),
            navbar      = $('.navbar-custom'),
            navHeight   = navbar.height(),
            worksgrid   = $('#works-grid'),
            width       = Math.max($(window).width(), window.innerWidth),
            mobileTest  = false;

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildHomeSection(homeSection);
        navbarAnimation(navbar, homeSection, navHeight);
        navbarSubmenu(width);
        hoverDropdown(width, mobileTest);

        $(window).resize(function() {
            var width = Math.max($(window).width(), window.innerWidth);
            buildHomeSection(homeSection);
            hoverDropdown(width, mobileTest);
        });

        $(window).scroll(function() {
            effectsHomeSection(homeSection, this);
            navbarAnimation(navbar, homeSection, navHeight);
        });

        /* ---------------------------------------------- /*
         * Set sections backgrounds
         /* ---------------------------------------------- */

        var module = $('.home-section, .module, .module-small, .side-image');
        module.each(function(i) {
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */

        function buildHomeSection(homeSection) {
            if (homeSection.length > 0) {
                if (homeSection.hasClass('home-full-height')) {
                    homeSection.height($(window).height());
                } else {
                    homeSection.height($(window).height() * 0.85);
                }
            }
        }


        /* ---------------------------------------------- /*
         * Home section effects
         /* ---------------------------------------------- */

        function effectsHomeSection(homeSection, scrollTopp) {
            if (homeSection.length > 0) {
                var homeSHeight = homeSection.height();
                var topScroll = $(document).scrollTop();
                if ((homeSection.hasClass('home-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    homeSection.css('top', (topScroll * 0.55));
                }
                if (homeSection.hasClass('home-fade') && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    var caption = $('.caption-content');
                    caption.css('opacity', (1 - topScroll/homeSection.height() * 1));
                }
            }
        }

        /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

        function navbarAnimation(navbar, homeSection, navHeight) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && homeSection.length > 0) {
                if(topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }

        /* ---------------------------------------------- /*
         * Navbar submenu
         /* ---------------------------------------------- */

        function navbarSubmenu(width) {
            if (width > 767) {
                $('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
                    var MenuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
                    var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
                    if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                        $(this).children('.dropdown-menu').addClass('leftauto');
                    } else {
                        $(this).children('.dropdown-menu').removeClass('leftauto');
                    }
                    if ($('.dropdown', $(this)).length > 0) {
                        var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
                        if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                            $(this).children('.dropdown-menu').addClass('left-side');
                        } else {
                            $(this).children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desctop
         /* ---------------------------------------------- */

        function hoverDropdown(width, mobileTest) {
            if ((width > 767) && (mobileTest !== true)) {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
                        var $this = $(this);
                        setTimeoutConst = setTimeout(function() {
                            $this.addClass('open');
                            $this.find('.dropdown-toggle').addClass('disabled');
                        }, delay);
                    },
                    function() {
                        clearTimeout(setTimeoutConst);
                        $(this).removeClass('open');
                        $(this).find('.dropdown-toggle').removeClass('disabled');
                    });
            } else {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
                $('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).parent().siblings().removeClass('open');
                    $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    $(this).parent().toggleClass('open');
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar collapse on click
         /* ---------------------------------------------- */

        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
        });


        /* ---------------------------------------------- /*
         * Video popup, Gallery
         /* ---------------------------------------------- */

        $('.video-pop-up').magnificPopup({
            type: 'iframe'
        });

        $(".gallery-item").magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            },
            image: {
                titleSrc: 'title',
                tError: 'The image could not be loaded.'
            }
        });

        /* ---------------------------------------------- /*
         * Progress bar animations
         /* ---------------------------------------------- */

        $('.progress-bar').each(function(i) {
            $(this).appear(function() {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({'width' : percent + '%'});
                $(this).find('span').animate({'opacity' : 1}, 900);
                $(this).find('span').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
            });
        });


        /* ---------------------------------------------- /*
         * Funfact Count-up
         /* ---------------------------------------------- */

        $('.count-item').each(function(i) {
            $(this).appear(function() {
                var number = $(this).find('.count-to').data('countto');
                $(this).find('.count-to').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
            });
        });


        /* ---------------------------------------------- /*
         * Youtube video background
         /* ---------------------------------------------- */

        $(function(){
            $(".video-player").mb_YTPlayer();
        });
        $(function(){
            $(".video-player2").mb_YTPlayer();
        });

        $('#video-play').click(function(event) {
            event.preventDefault();
            if ($(this).hasClass('fa-play')) {
                $('.video-player2').playYTP();
            } else {
                $('.video-player2').pauseYTP();
            }
            $(this).toggleClass('fa-play fa-pause');
            return false;
        });

        $('#video-volume').click(function(event) {
            event.preventDefault();
            if ($(this).hasClass('fa-volume-off')) {
                $('.video-player2').YTPUnmute();
            } else {
                $('.video-player2').YTPMute();
            }
            $(this).toggleClass('fa-volume-off fa-volume-up');
            return false;
        });

        /* ---------------------------------------------- /*
         * Scroll Animation
         /* ---------------------------------------------- */

        $('.section-scroll').bind('click', function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });

        /*===============================================================
         Working Contact Form
         ================================================================*/

        $("#contactForm").submit(function (e) {

            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $cfResponse = $('#contactFormResponse'),
                $cfsubmit = $("#cfsubmit"),
                cfsubmitText = $cfsubmit.text();

            $cfsubmit.text("Sending...");


            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data) {
                        $cfResponse.html(data);
                        $cfsubmit.text(cfsubmitText);
                        $('#contactForm input[name=name]').val('');
                        $('#contactForm input[name=email]').val('');
                        $('#contactForm textarea[name=message]').val('');
                    },
                    error: function (data) {
                        alert("Error occurd! Please try again");
                    }
                });

            return false;

        });


        /*===============================================================
         Working Request A Call Form
         ================================================================*/

        $("#requestACall").submit(function (e) {

            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $cfResponse = $('#requestFormResponse'),
                $cfsubmit = $("#racSubmit"),
                cfsubmitText = $cfsubmit.text();

            $cfsubmit.text("Sending...");


            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data) {
                        $cfResponse.html(data);
                        $cfsubmit.text(cfsubmitText);
                        $('#requestACall input[name=name]').val('');
                        $('#requestACall input[name=subject]').val('');
                        $('#requestACall textarea[name=phone]').val('');
                    },
                    error: function (data) {
                        alert("Error occurd! Please try again");
                    }
                });

            return false;

        });


        /*===============================================================
         Working Reservation Form
         ================================================================*/

        $("#reservationForm").submit(function (e) {

            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $cfResponse = $('#reservationFormResponse'),
                $cfsubmit = $("#rfsubmit"),
                cfsubmitText = $cfsubmit.text();

            $cfsubmit.text("Sending...");


            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data) {
                        $cfResponse.html(data);
                        $cfsubmit.text(cfsubmitText);
                        $('#reservationForm input[name=date]').val('');
                        $('#reservationForm input[name=time]').val('');
                        $('#reservationForm textarea[name=people]').val('');
                        $('#reservationForm textarea[name=email]').val('');
                    },
                    error: function (data) {
                        alert("Error occurd! Please try again");
                    }
                });

            return false;

        });


        /* ---------------------------------------------- /*
         * Subscribe form ajax
         /* ---------------------------------------------- */

        $('#subscription-form').submit(function(e) {

            e.preventDefault();
            var $form           = $('#subscription-form');
            var submit          = $('#subscription-form-submit');
            var ajaxResponse    = $('#subscription-response');
            var email           = $('input#semail').val();

            $.ajax({
                type: 'POST',
                url: 'assets/php/subscribe.php',
                dataType: 'json',
                data: {
                    email: email
                },
                cache: false,
                beforeSend: function(result) {
                    submit.empty();
                    submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
                },
                success: function(result) {
                    if(result.sendstatus == 1) {
                        ajaxResponse.html(result.message);
                        $form.fadeOut(500);
                    } else {
                        ajaxResponse.html(result.message);
                    }
                }
            });

        });


// google map
		var map;
		function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: 19.2695772, lng: -99.629043},
		    zoom: 17
		  });
		}
        /* ---------------------------------------------- /*
         * Google Map
         /* ---------------------------------------------- 
        
        // Google Map for contact section
 window.onload = function() {
     var styles = [{
         featureType: 'water',
         elementType: 'geometry.fill',
         stylers: [{
             color: '#adc9b8'
         }]
     }, {
         featureType: 'landscape.natural',
         elementType: 'all',
         stylers: [{
             hue: '#00aaff'
         }, {
             saturation: '-95'
         }, {
             lightness: 0
         }]
     }, {
         featureType: 'poi',
         elementType: 'geometry',
         stylers: [{
             hue: '#f9e0b7'
         }, {
             lightness: 30
         }]
     }, {
         featureType: 'road',
         elementType: 'geometry',
         stylers: [{
             hue: '#00aaff'
         }, {
             saturation: '-95'
         }, {
             lightness: 14
         }]
     }, ];
     var options = {
         mapTypeControlOptions: {
             mapTypeIds: ['Styled']
         },
         center: new google.maps.LatLng(19.2695772,-99.629043,17.5),
         zoom: 17,
         streetViewControl: false,
         mapTypeControl: false,
         scrollwheel: false,
         mapTypeId: 'Styled'
     };
     var div = document.getElementById('googleMap');
     var map = new google.maps.Map(div, options);
     var marker_img = 'assets/images/gps_marker.png';
     var marker = new google.maps.Marker({
         position: new google.maps.LatLng(19.2687002,-99.6304372,17),
         map: map,
         icon: marker_img,
         title: "Prasanjit Singh"
     });
     var styledMapType = new google.maps.StyledMapType(styles, {
         name: 'Styled'
     });
     map.mapTypes.set('Styled', styledMapType);
 }*/
        
        
  /*      
        function initialize()
        {
        var mapProp = {
          center: new google.maps.LatLng(18.6440144,-91.8317087,21),
          zoom:14,
          streetViewControl: false,
          mapTypeControl: false,
          scrollwheel: false,
          mapTypeId:google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          scrollwheel: false
          };
        var map=new google.maps.Map(document.getElementById("googleMap")
          ,mapProp);
        }

        google.maps.event.addDomListener(window, 'load', initialize);*/

       

    });
})(jQuery);


