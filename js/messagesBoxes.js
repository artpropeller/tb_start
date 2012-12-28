$(function(){

    var hover_mes = false;

    var option_scroll = {animateScroll:true, autoReinitialise: true, autoReinitialiseDelay:10};

    $('.box-mes .container-mes, .box-mes .container-mes .scroll').jScrollPane(option_scroll);

    $('.course-list .col').hover(function(){
        hover_mes = false;
        var mes_block = $($(this).attr('rel'));
        var el = $(this);
        mes_block.show(0);
        $('.box-mes .container-mes').data('jsp').reinitialise();
        var blPos = 'w';
        var positionElement = el.offset();

        var blockWidth = mes_block[0].offsetWidth;
        var blockHeight = mes_block[0].offsetHeight;

        var widthElement = el[0].offsetWidth;
        var heightElement = el[0].offsetHeight;

        mes_block.hide(0);

        var tp = {};

        if (positionElement.top > ($(document).scrollTop() + $(window).height()/2)) {
            if (positionElement.top - blockHeight < 0 || positionElement.left + blockWidth/2 > $(window).width()) {
                blPos = positionElement.left + 325 < ($(document).scrollLeft() + $(window).width()) ? 'w' : 'e';
                if (positionElement.top+ 25 + blockHeight/2 > $(window).height()) {
                    blPos = 'nw';
                }

            }
        }
        else {
            blPos = 'n';
            if (positionElement.top + blockHeight + 30 > $(window).height() || positionElement.left + blockWidth/2 > $(window).width()) {
                blPos = positionElement.left + 325 < ($(document).scrollLeft() + $(window).width()) ? 'w' : 'e';
                if (positionElement.top - blockHeight/2 < 0) {
                    blPos = 'ne';
                }
            }

        }


        var blPosTop = positionElement.top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';

        var blPosLeft = positionElement.left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
        console.log(blPos);
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
                mes_block.fadeOut(30);
                mes_block.removeClass('s').removeClass('w').removeClass('n').removeClass('e').removeClass('nw');
            }
        }, 75);
    });

    $('.box-mes').hover(
        function(){
            hover_mes = true;
        },
        function(){
            $(this).fadeOut(30);
            $(this).removeClass('s').removeClass('w').removeClass('n').removeClass('e').removeClass('nw');
            $('.box-mes .bot, .box-mes .inner_mes, .box-mes .head-mes .backs, .box-mes .send_mes_form').hide(0);
            $('.box-mes .foot-mes, .item-mes').show(0);
            $('.box-mes .container-mes').css({'height':'310px', 'min-height':'310px'});
            $('.box-mes .container-mes').data('jsp').reinitialise();
            $('.box-mes .container-mes').data('jsp').scrollToPercentY(0, 0)
        }
    );

    $('.box-mes .item-mes').click(function(){
        $('.item-mes').hide(0);
        $('#'+$(this).attr('rel')).show(0);
        $('.box-mes .bot, .box-mes .head-mes .backs, .box-mes .send_mes_form').show(0);
        $('.box-mes .foot-mes').hide(0);
        $('.box-mes .container-mes').css({'height':'258px', 'min-height':'258px'});
        $('.box-mes .container-mes').data('jsp').reinitialise();
        $('.box-mes .container-mes').data('jsp').scrollToPercentY(0, 0)
    });

    $('.box-mes .backs').click(function(){
        $('.box-mes .bot, .box-mes .inner_mes, .box-mes .head-mes .backs, .box-mes .send_mes_form').hide(0);
        $('.box-mes .foot-mes, .item-mes').show(0);
        $('.box-mes .container-mes').css({'height':'310px', 'min-height':'310px'});
        $('.box-mes .container-mes').data('jsp').reinitialise();
        $('.box-mes .container-mes').data('jsp').scrollToPercentY(0, 0)
    });

});

