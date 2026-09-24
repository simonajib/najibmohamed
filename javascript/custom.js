(function ($) {
    "use strict";

    var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    $.fx.off = motionPreference.matches;
    motionPreference.addEventListener('change', function (event) {
        $.fx.off = event.matches;
        if (event.matches) {
            $(':animated').stop(true, true);
        }
    });

    var preloaderFallbackDelay = 1200;
    var preloaderLoadDelay = 80;
    var preloaderFadeDuration = 260;
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
            if (!isOpen && $.contains($('#menu-options')[0], document.activeElement)) {
                $menuToggle.trigger('focus');
            }
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
                        $('html,body').stop(true).animate({
                            scrollTop: target.offset().top
                        }, 900, "swing");
                        return false;
                    }
                }
            });
        });


        /***SCROLL TO TOP***/
        var $scrollup = $('#scrollup');
        var scrollupVisible = false;

        function updateScrollup() {
            var shouldShow = $(window).scrollTop() >= 50;
            if (shouldShow === scrollupVisible) {
                return;
            }
            scrollupVisible = shouldShow;
            $scrollup.stop(true, true);
            if (shouldShow) {
                $scrollup
                    .fadeIn(200, function () {
                        $(this).css('display', 'inline-flex');
                    });
            } else {
                $scrollup.fadeOut(200);
            }
        }

        $(window).on('scroll pageshow', updateScrollup);
        updateScrollup();


        $('#scrollup').on('click', function () {
            $("html,body").stop(true).animate({
                scrollTop: 0
            }, 600);

            return false;
        });


        /***SKILLS***/
        $('div.skillbar').each(function () {
            var percent = parseFloat($(this).attr('data-percent')) || 0;
            this.style.setProperty('--skill-level', Math.max(0, Math.min(percent, 100)) / 100);
        });

        /***CONTACT FORM***/
        var contactForm = $('form#contact-form');
        var emailFallback = $('#contact-email-fallback');
        var contactRecipient = emailFallback.attr('href').replace(/^mailto:/, '').split('?')[0];

        function updateEmailDraft() {
            var name = $.trim(contactForm.find('[name="name"]').val());
            var email = $.trim(contactForm.find('[name="email"]').val());
            var subject = $.trim(contactForm.find('[name="subject"]').val());
            var message = $.trim(contactForm.find('[name="message"]').val());
            var body = message;
            var details = [];

            if (name) {
                details.push('Nom : ' + name);
            }
            if (email) {
                details.push('Email : ' + email);
            }
            if (details.length) {
                body += (body ? '\r\n\r\n' : '') + details.join('\r\n');
            }

            emailFallback.attr('href', 'mailto:' + contactRecipient +
                '?subject=' + encodeURIComponent(subject ? 'Portfolio - ' + subject : 'Contact depuis le portfolio') +
                '&body=' + encodeURIComponent(body));
        }

        contactForm.on('input change', 'input, textarea', updateEmailDraft);
        emailFallback.on('click', function () {
            updateEmailDraft();
            $('#contact-status').text('Un email prérempli est proposé à votre messagerie. Vérifiez son contenu puis cliquez sur Envoyer dans celle-ci.');
        });
        updateEmailDraft();

        contactForm.on('submit', function (e) {
            e.preventDefault();

            var form = $(this);
            var submitButton = $("#submit");
            if (submitButton.prop('disabled')) {
                return;
            }
            var formLoader = $('div#form-loader');
            var statusNode = $('#contact-status');
            var endpoint = form.attr('action');
            var name = $.trim($('#first_name').val());
            var subject = $.trim($('#sub').val());
            var email = $.trim($('#email').val());
            var message = $.trim($('#textarea1').val());
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var finalSubject = subject ? 'Portfolio - ' + subject : 'Nouveau message depuis le portfolio de Mohamed Najib';

            function showSubmissionError(response, reason) {
                var errorMessage = reason || 'L’envoi depuis le site a échoué.';
                if (response && typeof response.message === 'string' && $.trim(response.message)) {
                    errorMessage += ' Réponse du service : ' + $.trim(response.message);
                }
                errorMessage += ' Votre texte est conservé. Utilisez « Ouvrir ma messagerie » pour envoyer votre message.';
                statusNode.text(errorMessage);
                Materialize.toast('Envoi impossible. Utilisez « Ouvrir ma messagerie ».', 5000);
            }

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

            if (window.location.protocol === 'file:') {
                showSubmissionError(null, 'L’envoi direct est indisponible depuis un fichier ouvert sur votre ordinateur.');
                return;
            }

            submitButton.attr('disabled', 'disabled');
            statusNode.text('Envoi du message en cours...');
            form.find('input[name="_replyto"]').val(email);
            form.find('input[name="_subject"]').val(finalSubject);
            formLoader.stop(true, true).removeClass('is-hidden').fadeIn(200);

            $.ajax({
                url: endpoint,
                method: 'POST',
                data: form.serialize(),
                dataType: 'json',
                timeout: 15000
            })
                .done(function (response) {
                    if (!response || (response.success !== true && response.success !== 'true')) {
                        showSubmissionError(response);
                        return;
                    }

                    var successMessage = 'Votre message a été accepté par le service d’envoi. Merci de votre prise de contact.';
                    statusNode.text(successMessage);
                    Materialize.toast(successMessage, 4000);
                    form[0].reset();
                    form.find('input[name="_subject"]').val('Nouveau message depuis le portfolio de Mohamed Najib');
                    form.find('input[name="_replyto"]').val('');
                    updateEmailDraft();
                    Materialize.updateTextFields();
                })
                .fail(function (xhr, textStatus) {
                    var reason = textStatus === 'timeout' ? 'Le service d’envoi met trop de temps à répondre.' : null;
                    showSubmissionError(xhr.responseJSON, reason);
                })
                .always(function () {
                    formLoader.stop(true, true).fadeOut(200, function () {
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
        if (motionPreference.matches || typeof ScrollReveal !== 'function') {
            return;
        }

        window.sr = ScrollReveal({
            reset: false,
            afterReveal: function (element) {
                // Release ScrollReveal's inline styles so CSS hover transitions work again.
                ['transform', '-webkit-transform', 'transition', '-webkit-transition', 'opacity'].forEach(function (property) {
                    element.style.removeProperty(property);
                });
            }
        });
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


