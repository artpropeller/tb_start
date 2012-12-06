var arrow_box = '';

$(function(){
    $('.progress-block').hover(function(){
        var df = $(this).find('.arrow_box');
        df.show(0);
        arrow_box = df.clone();
        arrow_box.css({
            'z-index':'12000',
            'left':df.offset().left + 'px',
            'top':df.offset().top + 'px',
            'display':'block'
        });
        $('body').prepend(arrow_box);
        df.hide(0);


    }, function(){
        arrow_box.remove();
    });


});