var show_course_name_popup = false;

$(document).ready(function(e) {
	
	$('ul.course-list li span.name').mouseover(function(){
		var window_height = $(window).height();
		var full_name = $(this).data('name');
		var show_popup = $(this).data('showPopup');
		$('.course-name-popup .content').html(full_name);
		var offset1 = $(this).offset();
		var t = parseInt($('.current-course-list .jspPane').css('top'));
		var h1 = $('.course-name-popup').height();
		if (full_name && full_name.length && show_popup == 1)
		{
			show_course_name_popup = true;
			// определим, где выводит попап - сверху или снизу
			if (offset1.top <= window_height / 2)
			{
				// сверху
				$('.course-name-popup').css({'top': offset1.top - t - 90}).removeClass('bottom').addClass('top');	
			}
			else
			{
				// снизу
				$('.course-name-popup').css({'top': offset1.top - t - h1 - 140}).removeClass('top').addClass('bottom');
			}
			showCourseNamePopup();
		}
	});
	
	$('ul.course-list li span.name').mouseout(function(){
		show_course_name_popup = false;
		$('.course-name-popup').hide();
	});
	
	
	$('ul.feed li .show-more-link').click(function(){
		var _this = $(this);
		_this.closest('li').find('.event span').show();
		_this.hide();
		var api = _this.closest('.inner-block').data('jsp');
		api.reinitialise();
	});
	
	if($('.progress-block-admin').size()){
		$('.progress-block-admin').each(function(index, element) {
			b=Number($(element).find('b.progress-total').text());
			bb= new Array();
			aa= new Array();
			for(i=0;i<3;i++){
				sp=$(element).find('span').eq(i);
				n=Number(sp.text());
				sp.width(n*100/b+'%').html('');
				bb[i]=n;
				aa[i]=n*56/b;
			}
			
			
			$(element).append('<div class="progress-detail"><i class="top-info"/><strong>'+b+' слушателей</strong><table><tr><td>Не начали</td><td style="width:56px;"><span class="progress-unbegin" style="width:'+aa[0]+'px;"></span></td><td>'+bb[0]+'</td></tr><tr><td>Начали</td><td><span class="progress-begin" style="width:'+aa[1]+'px;"></span></td><td>'+bb[1]+'</td></tr><tr><td>Закончили</td><td><span class="progress-end" style="width:'+aa[2]+'px;"></span></td><td>'+bb[2]+'</td></tr></table></div>');
		});
	}
	
	
	$('.search-animate input[type=text]').focus(function(e) {
		$(this).parents('.search-animate').addClass('focused');
		$(this).parents('.search-animate').stop(true,false).animate({width:175}).addClass('focus');
	}).blur(function(e) {
		$(this).parents('.search-animate').removeClass('focused');
		$(this).parents('.search-animate').stop(true,false).animate({width:119}).removeClass('focus');
	});
	$('.inner-search input[type=text]').focus(function(e) {
		$(this).parents('.content-block').addClass('hover');
	}).blur(function(e) {
		$(this).parents('.content-block').removeClass('hover');
	});
	
	/*.blur(function(e){
		$('.search-animate').animate({width:119}).removeClass('focus');
		if($(this).val()=='Поиск по сайту...')$(this).val('');
	});*/
	
	
//	$('.progress-block').each(function(index, element) {
//		$(element).prepend('<b style="width:'+$(element).text()+'"/>');
//	});
	
	
	
	if($('.content-wrapper-column').size()){resHome();$(window).resize(function(e) {resHome();});}
	if($('.file-list').size()){
		var api;var api2;
		var intLoad = setTimeout(function(){},0);
		setTimeout(function(){
			$('.file-list-inner').jScrollPane();
			api = $('.file-list-inner').data('jsp');
			$('.folders-list').jScrollPane();
			api2 = $('.folders-list').data('jsp');
			resInner(intLoad,api,api2);
		},101);		
		$(window).resize(function(e) {
			resInner(intLoad,api,api2);
		});
	}
	
	
	
	if($('.dashed-container').size()){
		$('.events-list').jScrollPane({animateScroll:true, autoReinitialise: true});
		aa= $('.events-list').data('jsp');
		resOther('.dashed-container','.events-list');
		if($('.scrollTo').size()){
			aa.scrollTo(0,$('.scrollTo').offset().top-175)
		}
		$(window).resize(function(e) {
			resOther('.dashed-container','.events-list');
		});
	}
	
	if($('.over-left').size()){
		var ap;var ap2;
		var intLoad2 = setTimeout(function(){},0);
		setTimeout(function(){
			$('.over-left').jScrollPane();
			ap = $('.over-left').data('jsp');
			$('.over-right-inner').jScrollPane();
			ap2 = $('.over-right-inner').data('jsp');
			resInner2(intLoad2,ap,ap2);
		},101);		
		$(window).resize(function(e) {
			resInner2(intLoad2,ap,ap2);
		});
	}
	
	
	if($('.message-body').size()){
		$('.message-list').show();
		$('.message-body').jScrollPane();
		$('.message-list').hide();
		apMess = $('.message-body').data('jsp');
		$('.message-body li').click(function(e){
			if(!$(this).hasClass('active')){
				$(this).addClass('active').parents('.message-list').addClass('one-mess');
				apMess.reinitialise();
			}
		});
		$('.back-mess').click(function(e) {
			$(this).parents('.message-list').removeClass('one-mess').find('li.active').removeClass('active');
			apMess.reinitialise();
			return false;
		});
		$('.listener').click(function(e) {
			$(this).toggleClass('active');
			if(!$(this).hasClass('active')){
				$('.message-list').hide();
			}
			else{
				$('.message-list').show();
			}
			l = $(this).offset().left-150;
			t = $(this).offset().top+28;
			if(t+400>$('#main').height()){
				$('.message-list').addClass('bott').css('left',l).css('top','auto').css('bottom',$('#main').height()-t+38);
			}
			else{
				$('.message-list').css('left',l).css('top',t).removeClass('bott');
			}
			return false;
		});
	}

	
});

function recountCourseNames(){
	$('.admin-page .course-list span.name').each(function(){
		var _this = $(this);
		var name = _this.data('name');
		var w = _this.closest('li').width();
		// примем в среднем, что один символ по ширине занимает 5 пикселей.
		// тогда посмотрим, сколько символов влезет в ячейку при данной ширине
		var count = Math.floor(w / 6);
		var name_to_show = '';
		if (name.length <= count)
		{
			name_to_show = name;
			_this.data('showPopup', '0').attr('data-show-popup', '0');
		}
		else
		{
			name_to_show = name.substring(0, count) + '...' + name.substring(name.length - 4, name.length);
			if (name_to_show.length > name.length)
			{
				name_to_show = name;
				_this.data('showPopup', '0').attr('data-show-popup', '0');
			}
			else
			{
				_this.data('showPopup', '1').attr('data-show-popup', '1');
			}
		}
		_this.html(name_to_show);
	});	
}

function showCourseNamePopup()
{
	setTimeout(function(){
		if (show_course_name_popup)
		{
			$('.course-name-popup').show();	
		}
	}, 500);
	
}

function resOther(d,e){
//	$(d).height($('#main').height()-170);
	$(e).height($('#main').height()-200);
	api=$(e).data('jsp');
	api.reinitialise();
}

function resHome(){
	$('#main').width()>1400  ? $('#main').addClass('wide') : $('#main').removeClass('wide');
	h=$('#main').height();
	if(h>500){
		if($('.wide').size()){$('.content-wrapper-column').height(h-90);}
		else{$('.content-wrapper-column').height(h/2-59);$('.first-column').height(h-90);}
	}
}
function resInner(intLoad,api,api2){
	h=$('#main').height()-130;
	if(h>550){$('.inner-content').height(h);}
	if(h>350){
		clearTimeout(intLoad);
		intLoad = setTimeout(function(){
			if($('.file-list').size()){
				t=$('.top-part').height();
				hh=h-$('.file-list').offset().top+40;
				$('.file-list').height(hh);
				$('.folders-list').height(h-35);
				
				
				var item_w = parseInt($('.folders-list .jspPane>ul>li').width()) +
							parseInt($('.folders-list .jspPane>ul>li').css('margin-left')) + 
							parseInt($('.folders-list .jspPane>ul>li').css('padding-left')) +
							parseInt($('.folders-list .jspPane>ul>li').css('padding-right')) + 6;
				$('.folders-list-container').width(Math.floor($('.folders-list-container').parent().width()/item_w) * item_w);

				api.reinitialise();
				api2.reinitialise();			
			}			
		},50)
		
	}
}
function resInner2(intLoad2,ap,ap2){
	h=$('#main').height()-130;
	if(h>550){$('.inner-content').height(h);}
	if(h>350){
		clearTimeout(intLoad2);
		intLoad2 = setTimeout(function(){
			if($('.over-left').size()){
				t=$('.top-part').height();
				hh=h-$('.over-left').offset().top+40;
				$('.over-left').height(hh);
				$('.over-right').height(h-35);
				$('.over-right-inner').height(h-40);
				ap.reinitialise();
				ap2.reinitialise();
			}			
		},100)
		
	}
}

