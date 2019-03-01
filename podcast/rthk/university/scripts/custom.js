jQuery.noConflict();

google.load("webfont", "1");
 
function isSmartPhone() {	//sniff a mobile phone browser
	if( navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPod/i)
		){
			
			return true;
	}	
}
function isMobile() {	//sniff a mobile browser
	if( navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPod/i)
		){
			
			return true;
	}	
}
 
jQuery(function(){
	
	var mobTop;
	
   jQuery('a[href*=#]').live('click',function() {

		if(jQuery('header').css('position')!='relative' && jQuery(this).attr('href')!='#top_anchor'){
			mobTop = 58;
		} else {
			mobTop = 0;
		}
		
		var t = jQuery(this);

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length && target
            || jQuery('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var targetOffset = (target.offset().top-mobTop);
				jQuery('html,body')
				.animate({scrollTop: targetOffset}, 1000, 'easeInOutQuint');
                return false;
            }
        }
    });
});
jQuery(window).bind('load resize',function(){
	if(isMobile() && jQuery('header').css('position')=='fixed'){
		var top = jQuery(window).scrollTop();
		jQuery('header').css({position:'absolute',top:top});
	}
});
jQuery(window).bind('scroll',function(){
	if(isMobile() && jQuery('header').css('position')=='absolute'){
		var top = jQuery(window).scrollTop();
		jQuery('header').css({top:top});
	}
});
	
jQuery(function() {
	google.setOnLoadCallback(function() {
		WebFont.load({
			google: {
				families: [ 'Droid+Serif:400,700,400italic,700italic:latin', 'Asap:400,700,400italic,700italic:latin' ]
			}
		});
	});
});


jQuery(function(){
	jQuery('#camera_index').each(function(){
		var t = jQuery(this);
		var s = 0;
		if (isSmartPhone()){
		        t.camera({
			       height: '40%',
			       opacityOnGrid: true,
			       portrait: true,
			       thumbnails: true
		       });
		} else {
		        t.camera({
			       height: '45%',
			       opacityOnGrid: true,
			       portrait: true,
			       thumbnails: true
		       })};
	});
});

jQuery(function(){
	jQuery('#camera_test').each(function(){
		var t = jQuery(this);
		var s = 0;
		t.camera({
			height: '41%',
			opacityOnGrid: true,
			thumbnails: true,
			portrait: true,
			fx: 'scrollHorz',
			onLoaded: function(){
				var ind = t.find('.camera_target .cameraSlide.cameranext').index();
				console.log('next='+ind);
			},
			onEndTransition: function(){
				var ind = t.find('.camera_target .cameraSlide.cameracurrent').index();
				console.log('current='+ind);
			}
		});
	});
});

jQuery(window).one('load',function(){
	jQuery('nav > ul > li:has(>ul) > a').bind('mouseenter',function(){
		jQuery(this).addClass('pix_hover');
	});
	jQuery('nav > ul li').not(':has(ul)').bind('mouseleave',function(){
		jQuery('> a ',this).removeClass('pix_hover');
	});
	if (isMobile()) {
		jQuery('nav > ul.nav_max > li ul').append('<span class="close_x">x</span>');
	}
	jQuery('nav > ul.nav_max > li:has(>ul)').each(function(){
		var	setIn,
			setOut,
			setVal,
			off,
			off2,
			ulW,
			navW,
			ulH,
			pass = 0,
			t = jQuery(this);
			ulH = jQuery('> ul',t).css('height');
			jQuery('> ul',t).animate({opacity:0},0);
		jQuery('> ul',t).css({height:0});
		jQuery('> ul > li:first > a',t).css({borderTop:0});
		jQuery('> ul > li:last > a',t).css({borderBottom:0});
		if (isMobile()) {
			jQuery('> a',t).bind('click',function(){
				if(!jQuery(this).hasClass('mob_open')){
					jQuery(this).addClass('mob_open');
					off = jQuery('> ul',t).offset();
					ulW = jQuery('> ul',t).outerWidth();
					off2 = jQuery('nav').offset();
					navW = jQuery('nav').outerWidth();
					if((off.left+ulW)>(off2.left+navW)){
						jQuery('> ul',t).css({marginLeft:'-'+((off.left+ulW)-(off2.left+navW))+'px'});
					}
					jQuery('> ul',t).css({top:28,left:'auto',right:'-15px'});
					jQuery('> ul',t).stop(true,true).animate({height:ulH,opacity:1},220,'easeOutQuart');
					return false;
				}
			});
			jQuery('.close_x',t).bind('click',function(){
				jQuery('> a',t).removeClass('mob_open');
				jQuery('> ul',t).stop(true,false).animate({height:0,opacity:0},150,'easeInQuart',function(){
					jQuery(this).css({top:'-9999px',left:'-9999px'});
					jQuery('> a',t).removeClass('pix_hover');
				});
			});
		} else {
			jQuery('> a, > ul',t).bind('mouseenter',function(){
				if (!(jQuery.browser.msie && jQuery.browser.version < 9)) {
					jQuery('nav ul ul, nav ul div').css({zIndex:10});
					jQuery(' > ul',t).css({zIndex:11});
				}
				clearTimeout(setIn);
				off = jQuery('> ul',t).offset();
				ulW = jQuery('> ul',t).outerWidth();
				off2 = jQuery('nav').offset();
				navW = jQuery('nav').outerWidth();
				setVal = 0;
				setOut = setTimeout(function(){
					if((off.left+ulW)>(off2.left+navW)){
						jQuery('> ul',t).css({marginLeft:'-'+((off.left+ulW)-(off2.left+navW))+'px'});
					}
					jQuery('> ul',t).css({top:28,left:'auto',right:'-15px'});
					jQuery('> ul',t).stop(true,true).animate({height:ulH,opacity:1},220,'easeOutQuart',function(){
						setVal = 200;
					});
				},150);
			});
			t.bind('mouseleave',function(){
				clearTimeout(setOut);
				if(setVal==0){
					jQuery('> a',t).removeClass('pix_hover');
				}
				setIn = setTimeout(function(){
					jQuery('> ul',t).stop(true,false).animate({height:0,opacity:0},150,'easeInQuart',function(){
						jQuery(this).css({top:'-9999px',left:'-9999px'});
						jQuery('> a',t).removeClass('pix_hover');
					});
				},setVal);
			});
		}
	});
});

jQuery(window).one('load',function(){
	jQuery('nav > ul.nav_min > li > a').live('click',function(){
		if(jQuery(this).hasClass('open')){
			jQuery(this).removeClass('open');
			jQuery(this).next('ul').slideUp(200);
		} else {
			jQuery(this).addClass('open');
			jQuery(this).next('ul').slideDown(200);
		}
		return false;
	});
	
	jQuery('nav > ul.nav_min li:has(>ul)').each(function(){
		var thisLi = jQuery(this);
		jQuery('>a',thisLi).each(function(){
			jQuery(this).prepend('<span class="openclose">+ </span>');
			if(jQuery(this).attr('href')!='#'){
				var cloneLink = jQuery(this).clone();
				jQuery('>ul',thisLi).prepend(cloneLink);
				jQuery(this).attr('href','#');
			}
		});
		jQuery('>a',thisLi).click(function(){
			if(jQuery(this).hasClass('pix_open')){
				jQuery(this).removeClass('pix_open').find('.openclose').text('+ ');
				jQuery(this).parent().find('>ul').slideUp(200);
			} else {
				jQuery(this).addClass('pix_open').find('.openclose').text('- ');
				jQuery(this).parent().find('>ul').slideDown(200);
			}
			return false;
		});
	});
	
});


function adaptiveLayout(){
	setOut = setTimeout(function(){
		var columnW = (jQuery('.pix_1280').outerWidth()),
			sum = (parseFloat(jQuery('#logo').outerWidth())+parseFloat(jQuery('#subtitle').outerWidth())+40),
			amountLi = jQuery('nav > ul.nav_max > li').length,
			countLi = 0;
			
		while(countLi < amountLi) {
			sum = (sum + parseFloat(jQuery('nav > ul.nav_max > li').eq(countLi).outerWidth()));
			countLi++;
			if(sum > columnW){
				jQuery('nav .nav_max').css({position:'absolute',visibility:'hidden'});
				jQuery('nav .nav_min').show();
			} else {
				jQuery('nav .nav_max').css({position:'relative',visibility:'visible'});
				jQuery('nav .nav_min').hide();
			}
		}
	},200);

}
jQuery(window).bind('load resize',function(){
	adaptiveLayout();
});

jQuery(window).bind('load resize',function() {
	var id,
		ind;
	jQuery('.anchor_points').waypoint({offset:'30%'});
	jQuery('.anchor_points').bind('waypoint.reached',function(event, direction) {
		ind = jQuery(this).index('.anchor_points');
		jQuery('nav > ul > li > a').removeClass('current');
		if (direction === 'up') {
			id = jQuery('.anchor_points:eq('+(ind-1)+')').attr('id'); 
		}
		else {
			id = jQuery('.anchor_points:eq('+ind+')').attr('id'); 
		}
		jQuery('nav > ul > li > a[href="#'+id+'"]').addClass('current');
	});
});


jQuery(function(){
	if(!isMobile()){
		var payIn,
			payOut,
			formH;
		jQuery('#paypal_hide').bind('mouseenter',function(){
			var t = jQuery('.paypal_form',this);
			if(!t.hasClass('paypal_open')){
				clearTimeout(payIn);
				t.addClass('paypal_open').show().animate({opacity:0},0);
				formH = t.outerHeight();
				t.css({top:'-'+formH+'px'});
				payOut = setTimeout(function(){
					t.stop(true,false).animate({marginTop:80,opacity:1},250,'easeOutQuart');
				},150);
			}
		});
		jQuery('#paypal_hide').bind('mouseleave',function(){
			var t = jQuery('.paypal_form',this);
			if(t.hasClass('paypal_open')){
				clearTimeout(payOut);
				payIn = setTimeout(function(){
					t.stop(true,false).animate({marginTop:100,opacity:0},150,'easeInQuart',function(){
						t.hide();
						t.removeClass('paypal_open');
					});
				},150,function(){
				});
			}
		});
		jQuery('.p_download').each(function(){
			jQuery(this).hover(function(){
				jQuery('.paypal_form').not('.current').css({marginTop:15,opacity:0}).hide().removeClass('paypal_open');
				var t = jQuery('.paypal_form',this).addClass('current');
				if(!t.hasClass('paypal_open')){
					clearTimeout(payIn);
					t.addClass('paypal_open').show().animate({opacity:0},0);
					formH = t.outerHeight();
					t.css({top:'-'+formH+'px',marginTop:15});
					payOut = setTimeout(function(){
						t.stop(true,false).animate({marginTop:-5,opacity:1},250,'easeOutQuart');
					},150);
				}
			},function(){
				var t = jQuery('.paypal_form',this).removeClass('current');
				if(t.hasClass('paypal_open')){
					clearTimeout(payOut);
					payIn = setTimeout(function(){
						t.stop(true,false).animate({marginTop:15,opacity:0},150,'easeInQuart',function(){
							t.hide();
							t.removeClass('paypal_open');
						});
					},150,function(){
					});
				}
			});
		});
	}
	jQuery('#via_paypal').click(function(){
		jQuery('#pp_pix_donation').submit();
		return false;
	});
});

jQuery(function(){
	jQuery('.p_download form').bind('submit',function(){
		var href = jQuery('a.fake_pay_link',this).attr('href');
		if(jQuery('input[name=amount]',this).val()==''){
			return false
		} else if (jQuery('input[name=amount]',this).val()=='0'){
			window.open(href);
			return false
		} else {
			window.open(href);
			return true;
		}
	});
});


jQuery(function(){
	var spt = jQuery('span.mailme');
	var at = / at /;
	var dot = / dot /g;
	var addr = jQuery(spt).text().replace(at,"@").replace(dot,".");
	jQuery(spt).after('<a href="mailto:'+addr+'" title="Send an email">'+ addr +'</a>')
	.hover(function(){window.status="Send a letter!";}, function(){window.status="";});
	jQuery(spt).remove();
});


jQuery(document).bind("mobileinit", function(){
  jQuery.mobile.ajaxEnabled = false;
});

// jQuery(window).one("load", function(){
//  jQuery.colorbox({
//	  href: 'promo.htm',
//	  iframe: true,
//	  innerWidth: 800,
//	  innerHeight: 407,
//	  scrolling: false,
//	  opacity: .5
//  });
// });
