!function(t){t.fn.unveil=function(e,i){function n(){var e=u.filter(function(){var e=t(this);if(!e.is(":hidden")){var i=a.scrollTop(),n=i+a.height(),o=e.offset().top;o+e.height();return n+s>=o}});o=e.trigger("unveil"),u=u.not(o)}var o,a=t(window),s=e||0,r=window.devicePixelRatio>1,l=r?"data-src-retina":"data-src",u=this;return this.one("unveil",function(){var t=this.getAttribute(l);t=t||this.getAttribute("data-src"),t&&this.setAttribute("src",t),"function"==typeof i&&i.call(this)}),a.on("scroll.unveil resize.unveil lookup.unveil",n),n(),this}}(window.jQuery||window.Zepto),function(t){t.fn.imageDynamics=function(e){function i(){if(!o.is(":hidden")){var t=n.scrollTop(),e=t+n.height(),i=o.offset().top,a=i+o.height();e>=i&&a>=t&&o.trigger("imageDynamics")}}var n=t(window),o=this;return this.on("imageDynamics",function(){"function"==typeof e&&e.call(this)}),n.on("scroll.imageDynamics resize.imageDynamics",i),i(),this}}(window.jQuery||window.Zepto),$(function(){var t,e=$(window),i=($("body"),e.outerWidth(),e.outerHeight(),768),n=0,o=4,a=5,s=-5,r=-5;return t=function(){return e.outerWidth()<i?0:-(e.height()*n)},$("#hamburger-icon").click(function(t){t.preventDefault(),$(this).toggleClass("active"),$("#nav-menu").toggleClass("active")}),$("body").hasClass("contact")?($("#subject-select").change(function(){$("#subject-input").attr("value",$("#subject-select option:selected").text())}),$("#name-input, #email-input, #message-input").change(function(){$(this).removeClass("required")}),void $("#support-submit").click(function(t){$("#name-input, #email-input, #message-input").removeClass("required"),(0==$("#name-input").val().length||0==$("#email-input").val().length||0==$("#message-input").val().length)&&(0==$("#name-input").val().length&&$("#name-input").addClass("required"),0==$("#email-input").val().length&&$("#email-input").addClass("required"),0==$("#message-input").val().length&&$("#message-input").addClass("required"),t.preventDefault(),t.stopPropagation())})):($("#play-btn").click(function(t){t.preventDefault(),$("#intro-video").toggleClass("active");var e=document.getElementById("video-element");e.currentTime=0,e.play()}),$("#close-video-btn").click(function(t){t.preventDefault(),$("#intro-video").removeClass("active");var e=document.getElementById("video-element");e.pause()}),$("img.lazy-load").removeClass("hidden").addClass("invisible").unveil(t(),function(){this.getAttribute("data-src").indexOf("ipad_icloud_screenshot")>0&&$("#icloud-1").trigger("unveil"),this.getAttribute("data-src").indexOf("doo_app_extension_screenshot")>0&&$(".details").removeClass("invisible"),$(this).load(function(){$(this).removeClass("invisible")})}),$(".details").addClass("invisible"),$("#illustration-hero-1").imageDynamics(function(){$("#illustration-hero-2").trigger("unveil");var t=(e.scrollTop()-$(this).offset().top)/e.height(),i=a-t*o;$(this).trigger("unveil").css({transform:"rotate3d(0, 0, 1, "+i+"deg)","-moz-transform":"rotate3d(0, 0, 1, "+i+"deg)","-webkit-transform":"rotate3d(0, 0, 1, "+i+"deg)","-o-transform":"rotate3d(0, 0, 1, "+i+"deg)","-ms-transform":"rotate3d(0, 0, 1, "+i+"deg)"})}),void $("#illustration-hero-2").imageDynamics(function(){var t=(e.scrollTop()-$(this).offset().top)/e.height(),i=r-t*s;$(this).css({transform:"rotate3d(0, 0, 1, "+i+"deg)","-moz-transform":"rotate3d(0, 0, 1, "+i+"deg)","-webkit-transform":"rotate3d(0, 0, 1, "+i+"deg)","-o-transform":"rotate3d(0, 0, 1, "+i+"deg)","-ms-transform":"rotate3d(0, 0, 1, "+i+"deg)"})}))});