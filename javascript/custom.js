(function ($) {
    "use strict";

    var preloaderDelay = 2000;
    var preloaderFadeDuration = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 260;
    var preloaderHidden = false;
    var preloaderTimer = null;

    function hidePreloader(delay) {
        window.clearTimeout(preloaderTimer);
        preloaderTimer = window.setTimeout(function () {
            if (preloaderHidden) {
                return;
            }

            preloaderHidden = true;
            $('div#loading').stop(true, true).animate({
                opacity: 0
            }, preloaderFadeDuration, function () {
                $(this).addClass('preloader-hidden');
            });
        }, Math.max(delay || 0, 0));
    }

    function forceHidePreloader() {
        if (preloaderHidden) {
            return;
        }

        preloaderHidden = true;
        window.clearTimeout(preloaderTimer);
        $('div#loading').stop(true, true).addClass('preloader-hidden');
    }

    jQuery(document).ready(function () {
        hidePreloader(preloaderDelay);

        /***MENU TOGGLE ANIMATION***/
        $('.toggle-normal').on('click', function() {
                $('.top-bar').toggleClass('top-transform');
                $('.middle-bar').toggleClass('middle-transform');
                $('.bottom-bar').toggleClass('bottom-transform');
            });


        /***MENU CLOSE***/
        $('.section,div#menu-options a').on('click', function () {
            $('nav#theMenu').removeClass('menu-open');
            $('.top-bar').removeClass('top-transform');
            $('.middle-bar').removeClass('middle-transform');
            $('.bottom-bar').removeClass('bottom-transform');
        });

        /***MENU OPEN***/
        $('div#menuToggle').on('click', function () {
            $('div#menuToggle').toggleClass('active');
            $('body').toggleClass('body-push-toright');
            $('nav#theMenu').toggleClass('menu-open');
        });


        /***SMOOTH SCROLL***/
        $(function () {
            $('div#menu-options,div#about-btn').find('a[href*=#]:not([href=#])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 900, "swing");
                        return false;
                    }
                }
            });
        });


        /***SCROLL TO TOP***/
        $(window).scroll(function () {
            if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
                $('div#scrollup').addClass('animated flipInY').fadeIn(200);    // Fade in the arrow
            } else {
                $('div#scrollup').fadeOut(200);
            }
        });


        $('div#scrollup').on('click', function () {
            $("html,body").animate({
                scrollTop: 0
            }, 600);

            return false;
        });


        /***PORTFOLIO GALLERY***/
        var all = '#a,#b,#c';
        var afterFirst = '#b,#c';

        $(afterFirst).addClass('hide');

        $('a#all-sample').on('click', function () {
            $('#add-more').removeClass('hide');
            $(all).removeClass('tab-pane');
            $(afterFirst).addClass('hide');
        });
        $('a.cate').on('click', function () {
            $('#add-more').addClass('hide');
            $(afterFirst).removeClass('hide');
            $(all).addClass('tab-pane');

        });
        $('#add-more').on('click', function () {
            if ($(all).hasClass('')) {
                $(all).removeClass('tab-pane hide').addClass('x');
                $('#port-add-icon').removeClass('fa-plus').addClass('fa-arrow-up');
            } else {
                $(afterFirst).addClass('hide');
                $(all).removeClass('x');
                $('#port-add-icon').addClass('fa-plus').removeClass('fa-arrow-up');
            }

        });


        /***PORTFOLIO***/
        $('li.list-shuffle,#add-more').on('click', function () {
            $(".inLeft")
                .removeClass('InLeft')
                .hide()
                .addClass('InLeft')
                .show();
            $(".inRight")
                .removeClass('InRight')
                .hide()
                .addClass('InRight')
                .show();
        });


        /***SKILLS***/
        $('div.skillbar').each(function () {
            $(this).find('div.skillbar-bar').css({
                width: $(this).attr('data-percent')
            });
        });



        /***CLIENT SLIDER***/
        function clint() {
            var $clientcarousel = $('ul#clients-list');
            var clients = $clientcarousel.children().length;
            var clientwidth = (clients * 140); // 140px width for each client item
            $clientcarousel.css('width', clientwidth);

            var rotating = true;
            var clientspeed = 1800;
            setInterval(rotateClients, clientspeed);

            $(document).on({
                mouseenter: function () {
                    rotating = false;
                    // Turn off rotation when hovering
                },
                mouseleave: function () {
                    rotating = true;
                }
            }, '#clients');

            function rotateClients() {
                if (rotating !== false) {
                    var $first = $('ul#clients-list').find('li:first');
                    $first.animate({'margin-left': '-140px'}, 2000, function () {
                        $first.remove().css({'margin-left': '0px'});
                        $('ul#clients-list').find('li:last').after($first);
                    });
                }
            }
        }

        /***CLIENT SLIDER INITIALIZATION***/
        if ($('ul#clients-list').length) {
            clint();
        }

        /***GOOGLE MAP***/
        function init() {
            var mapNode = document.getElementById('myMap');

            if (!mapNode || typeof google === 'undefined' || !google.maps || typeof MarkerWithLabel === 'undefined') {
                return;
            }

            var mapOptions = {
                zoom: 17,
                center: new google.maps.LatLng(51.5287352, -0.3817831),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                disableDefaultUI: false
            };

            var myMap = new google.maps.Map(mapNode, mapOptions);

            new MarkerWithLabel({
                position: myMap.getCenter(),
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 0
                },
                map: myMap,
                labelAnchor: new google.maps.Point(10, 10),
                labelClass: "map-label", // The CSS class for the label
                draggable: false

            });
        }

        /***GOOGLE MAP INITIALIZATION***/
        init();

        /***CAROUSAL SWIPE***/
        $(".carousel-inner").swipe( {
            //Generic swipe handler for all directions
            swipeLeft:function() {
                $(this).parent().carousel('next');
            },
            swipeRight: function() {
                $(this).parent().carousel('prev');
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:0
        });

        /***CONTACT EMAIL LINK***/
        $('form#contact-form').on('submit', function (e) {
            e.preventDefault();

            var form = $(this);
            var submitButton = $("#submit");
            var recipient = $.trim(String(form.data('recipientEmail') || 'najibsimons01@gmail.com')).replace(/\s+/g, '');
            var name = $.trim($('#first_name').val());
            var subject = $.trim($('#sub').val());
            var email = $.trim($('#email').val());
            var message = $.trim($('#textarea1').val());
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                Materialize.toast('Please fill in your name, email, and message.', 4000);
                return;
            }

            if (!emailPattern.test(email)) {
                Materialize.toast('Please enter a valid email address.', 4000);
                return;
            }

            if (!subject) {
                subject = 'Portfolio contact from ' + name;
            }

            var body = [
                'Hello Mohamed Najib,',
                '',
                'Name: ' + name,
                'Email: ' + email,
                '',
                'Message:',
                message
            ].join('\n');

            var mailtoUrl = 'mailto:' + recipient +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);

            submitButton.attr('disabled', 'disabled');
            Materialize.toast('Your email app is opening. If it does not open, send directly to ' + recipient + '.', 5000);
            window.location.href = mailtoUrl;

            window.setTimeout(function () {
                submitButton.removeAttr('disabled');
            }, 800);
        });


    });

    jQuery(window).on('pageshow', function (event) {
        var nativeEvent = event.originalEvent;

        if (nativeEvent && nativeEvent.persisted) {
            forceHidePreloader();
        }
    });

    jQuery(window).on('load', function () {

        /***SCROLL ANIMATION***/
        window.sr = ScrollReveal({reset: false}); // reset false stops repetition of animation
        var commonCards = '#port-add-icon,#map-card,.interest-icon-even,.interest-icon,' +
            '.timeline-dot, .timeline-content,#add-more,#skills-card,#testimonials-card,' +
            '#portfolios-card,#interest-card,#p-one,#p-two,#p-three,#blog-card,#contact-card,#clients';
        // Customizing a reveal set
        sr.reveal(commonCards, {duration: 1100});
        sr.reveal('#about-card,.map-label', {duration: 1400, delay: 500});
        sr.reveal('#v-card-holder', {duration: 1400, distance: '150px'});
        sr.reveal('.skillbar-bar', {duration: 1800, delay: 300, distance: '0'});
    });


})(jQuery);


