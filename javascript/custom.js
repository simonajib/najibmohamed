(function ($) {
    "use strict";

    var preloaderFallbackDelay = 1200;
    var preloaderLoadDelay = 80;
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

    function schedulePreloaderFallback() {
        window.clearTimeout(preloaderTimer);
        preloaderTimer = window.setTimeout(forceHidePreloader, preloaderFallbackDelay);
    }

    jQuery(document).ready(function () {
        var $menuToggle = $('#menuToggle');
        var $menu = $('nav#theMenu');

        schedulePreloaderFallback();

        function syncMenuButton(isOpen) {
            $menuToggle.attr('aria-expanded', isOpen ? 'true' : 'false');
            $menuToggle.attr('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
        }

        function setMenuState(isOpen) {
            $menu.toggleClass('menu-open', isOpen);
            $('body').toggleClass('body-push-toright', isOpen);
            $menuToggle.toggleClass('active', isOpen);
            $('.top-bar').toggleClass('top-transform', isOpen);
            $('.middle-bar').toggleClass('middle-transform', isOpen);
            $('.bottom-bar').toggleClass('bottom-transform', isOpen);
            syncMenuButton(isOpen);
        }

        syncMenuButton(false);
        $('#scrollup').hide();

        /***MENU CLOSE***/
        $('.section,#menu-options a').on('click', function () {
            setMenuState(false);
        });

        /***MENU OPEN***/
        $('#menuToggle').on('click', function () {
            setMenuState(!$menu.hasClass('menu-open'));
        });

        $(document).on('keydown', function (event) {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
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
                $('#scrollup')
                    .addClass('animated flipInY')
                    .stop(true, true)
                    .fadeIn(200, function () {
                        $(this).css('display', 'inline-flex');
                    });    // Fade in the arrow
            } else {
                $('#scrollup').stop(true, true).fadeOut(200);
            }
        });


        $('#scrollup').on('click', function () {
            $("html,body").animate({
                scrollTop: 0
            }, 600);

            return false;
        });


        /***SKILLS***/
        $('div.skillbar').each(function () {
            $(this).find('div.skillbar-bar').css({
                width: $(this).attr('data-percent')
            });
        });

        /***CONTACT FORM***/
        $('form#contact-form').on('submit', function (e) {
            e.preventDefault();

            var form = $(this);
            var submitButton = $("#submit");
            var formLoader = $('div#form-loader');
            var statusNode = $('#contact-status');
            var endpoint = form.attr('action');
            var name = $.trim($('#first_name').val());
            var subject = $.trim($('#sub').val());
            var email = $.trim($('#email').val());
            var message = $.trim($('#textarea1').val());
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var finalSubject = subject ? 'Portfolio - ' + subject : 'Nouveau message depuis le portfolio de Mohamed Najib';

            if (!name || !email || !message) {
                Materialize.toast('Veuillez renseigner votre nom, votre email et votre message.', 4000);
                statusNode.text('Veuillez renseigner votre nom, votre email et votre message.');
                return;
            }

            if (!emailPattern.test(email)) {
                Materialize.toast('Veuillez entrer une adresse email valide.', 4000);
                statusNode.text('Veuillez entrer une adresse email valide.');
                return;
            }

            submitButton.attr('disabled', 'disabled');
            statusNode.text('Envoi du message en cours...');
            form.find('input[name="_replyto"]').val(email);
            form.find('input[name="_subject"]').val(finalSubject);
            formLoader.removeClass('is-hidden').fadeIn(200);

            $.ajax({
                url: endpoint,
                method: 'POST',
                data: form.serialize(),
                dataType: 'json'
            })
                .done(function () {
                    var successMessage = 'Message envoyé avec succès. Je vous répondrai dès que possible.';
                    statusNode.text(successMessage);
                    Materialize.toast(successMessage, 4000);
                    form[0].reset();
                    form.find('input[name="_subject"]').val('Nouveau message depuis le portfolio de Mohamed Najib');
                    form.find('input[name="_replyto"]').val('');
                    Materialize.updateTextFields();
                })
                .fail(function () {
                    var errorMessage = 'Impossible d\'envoyer le message pour le moment. Vous pouvez écrire directement à najibsimons01@gmail.com.';
                    statusNode.text(errorMessage);
                    Materialize.toast(errorMessage, 5000);
                })
                .always(function () {
                    formLoader.fadeOut(200, function () {
                        $(this).addClass('is-hidden');
                    });
                    submitButton.removeAttr('disabled');
                });
        });


    });

    jQuery(window).on('pageshow', function (event) {
        var nativeEvent = event.originalEvent;

        if (nativeEvent && nativeEvent.persisted) {
            forceHidePreloader();
        }
    });

    jQuery(window).on('load', function () {
        hidePreloader(preloaderLoadDelay);

        /***SCROLL ANIMATION***/
        window.sr = ScrollReveal({reset: false}); // reset false stops repetition of animation
        var commonCards = '.interest-icon-even,.interest-icon,.timeline-dot,.timeline-content,' +
            '#skills-card,#interest-card,#blog-card,#contact-card,#contact-highlights,' +
            '#certifications .collection-item';
        // Customizing a reveal set
        sr.reveal(commonCards, {duration: 1100});
        sr.reveal('#about-card', {duration: 1400, delay: 500});
        sr.reveal('#v-card-holder', {duration: 1400, distance: '150px'});
        sr.reveal('.skillbar-bar', {duration: 1800, delay: 300, distance: '0'});
    });


})(jQuery);


