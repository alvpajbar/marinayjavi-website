$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Nav Transformicon ******************/

    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });

    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');
    });

    /***************** Header BG Scroll ******************/

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 20) {
            $('section.navigation').addClass('fixed');
            $('header').css({
                "border-bottom": "none",
                "padding": "35px 0"
            });
            $('header .member-actions').css({ "top": "26px" });
            $('header .navicon').css({ "top": "34px" });
        } else {
            $('section.navigation').removeClass('fixed');
            $('header').css({
                "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                "padding": "50px 0"
            });
            $('header .member-actions').css({ "top": "41px" });
            $('header .navicon').css({ "top": "48px" });
        }
    });

    /***************** Smooth Scrolling ******************/

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 90
                }, 2000);
                return false;
            }
        }
    });

    /***************** Add to Calendar ******************/

    var myCalendar = createCalendar({
        options: {
            class: '',
            id: ''
        },
        data: {
            title: "Boda de Marina y Javi",
            start: new Date('Oct 17, 2026 11:30'),
            end: new Date('Oct 18, 2026 00:00'),
            address: 'Real Parroquia de Santa Ana (Triana)',
            description: "¡Os esperamos en nuestra boda!"
        }
    });

    $('#add-to-cal').html(myCalendar);

    /***************** RSVP ******************/

    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        $('#alert-wrapper').html(alert_markup('info', '<strong>¡Un momento!</strong> Estamos guardando tu información.'));
        $.post('https://script.google.com/macros/s/AKfycbzSfgDo4oTAlleD9gbBSphZ51f2If0amTvUwdMJMj2QqDEJo9W_DdB1B66DIFCqIlk_/exec', data)
            .done(function (data) {
                console.log(data);
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function (data) {
                console.log(data);
                $('#alert-wrapper').html(alert_markup('danger', '<strong>¡Lo sentimos!</strong> Hay algún problema con el servidor. '));
            });
    });

});

function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}
