!function(t){t.fn.unveil=function(e,i){function n(){var e=u.filter(function(){var e=t(this);if(!e.is(":hidden")){var i=s.scrollTop(),n=i+s.height(),o=e.offset().top;o+e.height();return n+a>=o}});o=e.trigger("unveil"),u=u.not(o)}var o,s=t(window),a=e||0,r=window.devicePixelRatio>1,l=r?"data-src-retina":"data-src",u=this;return this.one("unveil",function(){var t=this.getAttribute(l);t=t||this.getAttribute("data-src"),t&&this.setAttribute("src",t),"function"==typeof i&&i.call(this)}),s.on("scroll.unveil resize.unveil lookup.unveil",n),n(),this}}(window.jQuery||window.Zepto),function(t){t.fn.imageDynamics=function(e){function i(){if(!o.is(":hidden")){var t=n.scrollTop(),e=t+n.height(),i=o.offset().top,s=i+o.height();e>=i&&s>=t&&o.trigger("imageDynamics")}}var n=t(window),o=this;return this.on("imageDynamics",function(){"function"==typeof e&&e.call(this)}),n.on("scroll.imageDynamics resize.imageDynamics",i),i(),this}}(window.jQuery||window.Zepto),$(function(){var t,e=$(window),i=($("body"),e.outerWidth(),e.outerHeight(),768),n=0,o=4,s=5,a=-5,r=-5;return t=function(){return e.outerWidth()<i?0:-(e.height()*n)},$("#hamburger-icon").click(function(t){t.preventDefault(),$(this).toggleClass("active"),$("#nav-menu").toggleClass("active")}),$("body").hasClass("contact")?($("#subject-select").change(function(){$("#subject-input").attr("value",$("#subject-select option:selected").text())}),$("#name-input, #email-input, #message-input").change(function(){$(this).removeClass("required")}),void $("#support-submit").click(function(t){$("#name-input, #email-input, #message-input").removeClass("required"),(0==$("#name-input").val().length||0==$("#email-input").val().length||0==$("#message-input").val().length)&&(0==$("#name-input").val().length&&$("#name-input").addClass("required"),0==$("#email-input").val().length&&$("#email-input").addClass("required"),0==$("#message-input").val().length&&$("#message-input").addClass("required"),t.preventDefault(),t.stopPropagation())})):$("body").hasClass("faq")?void $(".faq-link").click(function(t){t.preventDefault();var i=$(this).attr("href"),n=$(i),o=e.outerWidth()<600?.05:.3;$("body, html").animate({scrollTop:n.offset().top-e.outerHeight()*o},200,function(){n.addClass("highlight"),setTimeout(function(){n.removeClass("highlight")},1200)})}):($(".details").addClass("invisible"),$("#play-btn").click(function(t){t.preventDefault(),$("#intro-video").toggleClass("active");var e=document.getElementById("video-element");e.currentTime=0,e.play()}),$("#close-video-btn").click(function(t){t.preventDefault(),$("#intro-video").removeClass("active");var e=document.getElementById("video-element");e.pause()}),$("img.lazy-load").removeClass("hidden").addClass("invisible").unveil(t(),function(){this.getAttribute("data-src").indexOf("ipad_icloud_screenshot")>0&&$("#icloud-1").trigger("unveil"),this.getAttribute("data-src").indexOf("doo_complexity_reminder_screenshot")>0&&setTimeout(function(){$(".details").removeClass("invisible")},300),$(this).load(function(){$(this).removeClass("invisible")})}),$("#conclusion-hero").trigger("unveil"),$("#illustration-hero-1").imageDynamics(function(){$("#illustration-hero-2").trigger("unveil");var t=(e.scrollTop()-$(this).offset().top)/e.height(),i=s-t*o;$(this).trigger("unveil").css({transform:"rotate3d(0, 0, 1, "+i+"deg)","-moz-transform":"rotate3d(0, 0, 1, "+i+"deg)","-webkit-transform":"rotate3d(0, 0, 1, "+i+"deg)","-o-transform":"rotate3d(0, 0, 1, "+i+"deg)","-ms-transform":"rotate3d(0, 0, 1, "+i+"deg)"})}),void $("#illustration-hero-2").imageDynamics(function(){var t=(e.scrollTop()-$(this).offset().top)/e.height(),i=r-t*a;$(this).css({transform:"rotate3d(0, 0, 1, "+i+"deg)","-moz-transform":"rotate3d(0, 0, 1, "+i+"deg)","-webkit-transform":"rotate3d(0, 0, 1, "+i+"deg)","-o-transform":"rotate3d(0, 0, 1, "+i+"deg)","-ms-transform":"rotate3d(0, 0, 1, "+i+"deg)"})}))});