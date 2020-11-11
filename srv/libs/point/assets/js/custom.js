(function ($) {
    "use strict";

    /*===================
    01: Main Menu
    =====================*/
    $('.header-menu a[href="#"]').on('click', function (event) {
        event.preventDefault();
    });


    $($(window)).on('scroll', function () {
        if (!$('ul.nav').hasClass('open')) {
            $('#menu-button').removeClass('menu-opened');
        };
    });

    /*========================
    02: Sticky Nav
    ==========================*/
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $(".header-main.style--one").removeClass("sticky fadeInDown animated");
        }
        else {
            $(".header-main.style--one").addClass("sticky fadeInDown animated");
        }
    });

    /*========================
    03: Offcanvas
    ==========================*/
    $('.offcanvas-trigger').on('click', function () {
        $('.offcanvas-wrapper').addClass('active');
        $('.offcanvas-overlay').addClass('show');
    });

    $('.offcanvas-overlay,.offcanvas-close').on('click', function () {
        $('.offcanvas-overlay').removeClass('show');
        $('.offcanvas-wrapper').removeClass('active');
    })

/*========================
    04: Background Image
    ==========================*/
    var $bgImg = $('[data-bg-img]');
    $bgImg.css('background-image', function () {
        return 'url("' + $(this).data('bg-img') + '")';
    }).removeAttr('data-bg-img').addClass('bg-img');

    /*==================================
    05: Check Data
    ====================================*/
    var checkData = function (data, value) {
        return typeof data === 'undefined' ? value : data;
    };

    /*==================================
    06: Owl Carousel
    ====================================*/
    var $owlCarousel = $('.owl-carousel');
    $owlCarousel.each(function () {
        var $t = $(this);

        $t.owlCarousel({
            items: checkData($t.data('owl-items'), 1),
            margin: checkData($t.data('owl-margin'), 0),
            loop: checkData($t.data('owl-loop'), true),
            smartSpeed: 450,
            autoplay: checkData($t.data('owl-autoplay'), true),
            autoplayTimeout: checkData($t.data('owl-speed'), 8000),
            center: checkData($t.data('owl-center'), false),
            animateIn: checkData($t.data('owl-animate-in'), false),
            animateOut: checkData($t.data('owl-animate-out'), false),
            nav: checkData($t.data('owl-nav'), false),
            navText: ['<img src="assets/img/icons/angle-left.svg" class="svg">', '<img src="assets/img/icons/angle-right.svg" class="svg">'],
            dots: checkData($t.data('owl-dots'), false),
            responsive: checkData($t.data('owl-responsive'), {})
        });
    });

    /*==================================
    07: Counter Up
    ====================================*/
    $(".count span").counterUp({
        delay: 30,
        time: 2000
    });

    /*========================
    08: Video Popup
    ==========================*/
    var $popUpVideo = $('.popup-video');
    if ($popUpVideo.length) {
        $popUpVideo.magnificPopup({
            type: 'iframe'
        });
    };

    /*==================================
    09: Changing svg color 
    ====================================*/
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
  


    /*==================================
    12: Isotope
    ====================================*/
    $(window).on('load', function () {
        $('.project-items').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false
            },
            masonry: {
                columnWidth: '.grid-item'
            }
        });

        $('.project_filter li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var filterValue = $(this).attr('data-filter');
            $('.grid').isotope({
                filter: filterValue
            });
        });
    });


}(jQuery));