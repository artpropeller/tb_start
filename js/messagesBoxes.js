$(function(){

    var hover_mes = false;

    var option_scroll = {animateScroll:true, autoReinitialise: true};

    $('.box-mes .container-mes, .box-mes .container-mes .scroll').jScrollPane(option_scroll);

    $('.course-list .col').hover(function(){
        hover_mes = false;
        var mes_block = $($(this).attr('rel'));
        var el = $(this);
        mes_block.show(0);
        $('.box-mes .container-mes').data('jsp').reinitialise();

        var positionElement = el.offset();

        var blockWidth = mes_block[0].offsetWidth;
        var blockHeight = mes_block[0].offsetHeight;

        var widthElement = el[0].offsetWidth;
        var heightElement = el[0].offsetHeight;

        mes_block.hide(0);

        var tp = {};

        if (positionElement.top > ($(document).scrollTop() + $(window).height()/2)) {
            blPos = 's';
            if (positionElement.top - blockHeight < 0 || positionElement.left + blockWidth/2 > $(window).width()) {
                blPos = positionElement.left + 325 < ($(document).scrollLeft() + $(window).width()) ? 'w' : 'e';
                if (positionElement.top+ 25 + blockHeight/2 > $(window).height()) {
                    blPos = 'nw';
                }

            }
        }
        else {
            blPos = 'n';
            if (positionElement.top + blockHeight > $(window).height() || positionElement.left + blockWidth/2 > $(window).width()) {
                blPos = positionElement.left + 325 < ($(document).scrollLeft() + $(window).width()) ? 'w' : 'e';
                if (positionElement.top - blockHeight/2 < 0) {
                    blPos = 'ne';
                }
            }
            console.log(blPos);

        }


        var blPosTop = positionElement.top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';

        var blPosLeft = positionElement.left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';

        switch (blPos) {
            case 'n':
                tp = {top: positionElement.top + heightElement, left: positionElement.left + widthElement / 2 - blockWidth / 2};
                break;
            case 's':
                tp = {top: positionElement.top - blockHeight, left: positionElement.left + widthElement / 2 - blockWidth / 2};
                break;
            case 'e':
                tp = {top: positionElement.top + heightElement / 2 - blockHeight / 2, left: positionElement.left - blockWidth};
                break;
            case 'w':
                tp = {top: positionElement.top + heightElement / 2 - blockHeight / 2, left: positionElement.left + widthElement};
                break;
            case 'nw':
                tp = {top: positionElement.top - blockHeight, left: positionElement.left + widthElement - blockWidth};
                break;
            case 'ne':
                tp = {top: positionElement.top, left: positionElement.left - blockWidth};
                break;
        }

        mes_block.addClass(blPos);

        mes_block.css(tp).fadeIn(100);

    }, function(){
        var mes_block = $($(this).attr('rel'));
        setTimeout(function(){
            if (!hover_mes) {
                mes_block.fadeOut(100);
                mes_block.removeClass('s').removeClass('w').removeClass('n').removeClass('e').removeClass('nw');
            }
        }, 75);
    });

    $('.box-mes').hover(
        function(){
            hover_mes = true;
        },
        function(){
            $(this).fadeOut(100);
            $(this).removeClass('s').removeClass('w').removeClass('n').removeClass('e').removeClass('nw');
        }
    )

});

