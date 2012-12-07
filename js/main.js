$(function () {
    $('.records').click(function () {
        $(this).parents('.disabled-event').find('.pop_up_rec').slideToggle(200);
        return false;
    });

    $('.pop_up_rec .del').click(function(){
        var par = $(this).parents('.pop_up_rec');
        $(this).parent().parent().remove();
        var s = par.find('li').size();
        if ( s > 0) {
            par.prev().find('em').text('('+s+')');
        }
        else {
            par.prev().find('em').text('('+s+')');
            par.remove();
        }
        return false;
    });

    $('.blue-more').click(function(){
        $('.events-list').data('jsp').scrollTo(0, 0);
        return false;
    });

    function addTooltipsVideo(){

    $('.one-event').each(function(){
        var a = $(this).find('h3 a');
        var h3 = $(this).find('h3');
        h3.css('width', 'auto');
        var pad = 0;
        $(this).find('.vbtn').each(function(){
            console.log(pad);
            pad = pad + $(this)[0].offsetWidth;
        });
        pad = pad + 10;
        h3.css('width', (h3[0].offsetWidth - pad) + 'px');

        if (h3[0].offsetWidth < a[0].offsetWidth) {
            a.addClass('tooltip');
        }
        else {
            a.removeClass('tooltip');
        }

        tooltip();
    });

    }

    addTooltipsVideo();

    $(window).resize(function(){
        addTooltipsVideo();
    });




});


this.tooltip = function(){
    /* CONFIG */
    xOffset = -23;
    yOffset = 13;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
    /* END CONFIG */
    $(".tooltip").hover(function(e){
            if ($(this).is('.tooltip')) {
            this.t = $(this).text();
            $("body").append("<p id='tooltip'>"+ this.t +"</p>");
            $("#tooltip")
                .css("top",(e.pageY - xOffset) + "px")
                .css("left",(e.pageX + yOffset) + "px")
                .fadeIn("fast");}
        },
        function(){
            $("#tooltip").remove();
        });
    $(".tooltip").mousemove(function(e){
        $("#tooltip")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px");
    });
};