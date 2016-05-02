$(function () {
	var $window = $(window),
		imageActivationOffset,
		WIDTH_TO_DISABLE_EFFECTS = 768,
		IMAGE_ACTIVATION_PERCNTAGE = 0.5,
		SCROLL_ANIMATION_DURATION = 250,
		MAX_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 6,
		START_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 0,
		MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE = -6,
		START_ILLUSTRATION_HERO_2_ROTATION_ANGLE = 0;

	imageActivationOffset = function () {
		return $window.height() * IMAGE_ACTIVATION_PERCNTAGE;
	};

	// Enable our hamburger menu for mobile
	$('#hamburger-icon').click(function (ev) {
		ev.preventDefault();

		$(this).toggleClass('active');
		$('#nav-menu').toggleClass('active');
	});

	// Support Jumper
	$('.back-to-top').click(function (ev) {
		ev.preventDefault();
		$("body, html").animate({'scrollTop' :  0});
	});

	$("#mac-mini-tour li, #reviews, #app-store").addClass('invisible');

	var numberOfFrames = 8,
		$video = $('#resize-video'),
		scrollTimeout,
		WINDOW_PERCENTAGE_FOR_VIDEO_ANIMATION_START = 0.5,
		WINDOW_PERCENTAGE_FOR_VIDEO_ANIMATION_DURATION = 0.28,
		RESIZE_DELAY = 10,
		animationTimeout,
		WINDOW_PERCENTAGE_FOR_ANIMATION_START = function () {return $window.outerWidth() < 768 ? 0.2 : 0.9},
		WINDOW_PERCENTAGE_FOR_ANIMATION_DURATION = 0.2,
		TIMEOUT_DELAY = 10;

	if ($('.mac').length > 0) {
		function scrollPlay() {
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}

			var distanceForWindow = $window.outerHeight() * WINDOW_PERCENTAGE_FOR_VIDEO_ANIMATION_DURATION;

			scrollTimeout = setTimeout(function () {
				var diff = $video.offset().top - window.pageYOffset - ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_VIDEO_ANIMATION_START);

			  	var framesPercentage = diff < 0 ? Math.abs(diff) / distanceForWindow : 0,
			  		sanitizedPercentage = framesPercentage > 1 ? 1 : framesPercentage,
			  		activeFrame = Math.floor(numberOfFrames * sanitizedPercentage);
				
				$video.removeClass().addClass("frame" + activeFrame);
			}, TIMEOUT_DELAY);
		}

		function textAnimate() {
			if (animationTimeout) {
				clearTimeout(animationTimeout);
			}

			var distanceForWindow = $window.outerHeight() * WINDOW_PERCENTAGE_FOR_ANIMATION_DURATION;

			animationTimeout = setTimeout(function () {
				var diff = $("#mac-mini-tour").offset().top - window.pageYOffset - ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_ANIMATION_START());

			  	if (diff < 0) {
					$("#mac-mini-tour li").removeClass('invisible');
			  	}
			}, TIMEOUT_DELAY);
		}

		$window.scroll(function () {
			scrollPlay();
			textAnimate();
		});
	}

	var textTimeout,
		WINDOW_PERCENTAGE_FOR_TEXT_START = function () {return $window.outerWidth() < 768 ? 0.2 : 0.9},
		WINDOW_PERCENTAGE_FOR_TEXT_DURATION = 0.2,
		$cardDemo = $('.card-demo'),
		numberOfAnimationFrames = 6,
		animationTimeout,
		WINDOW_PERCENTAGE_FOR_ANIMATION_START = function () {return $window.outerWidth() < 768 ? 0.4 : 0.6},
		WINDOW_PERCENTAGE_FOR_ANIMATION_DURATION = 0.2,
		ANIMATION_DELAY = 10;

	function textAnimate2() {
		if (textTimeout) {
			clearTimeout(textTimeout);
		}

		var distanceForWindow = $window.outerHeight() * WINDOW_PERCENTAGE_FOR_TEXT_DURATION;

		textTimeout = setTimeout(function () {
			var diff = $("#reviews").offset().top - window.pageYOffset - ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_TEXT_START());

		  	if (diff < 0) {
				$("#reviews, #app-store").removeClass('invisible');
		  	}
		}, TIMEOUT_DELAY);
	}

	$window.scroll(textAnimate2);

	if ($cardDemo.length > 0) {
		function scrollAnimate() {
			if (animationTimeout) {
				clearTimeout(animationTimeout);
			}

			var distanceForWindow = $window.outerHeight() * WINDOW_PERCENTAGE_FOR_ANIMATION_DURATION;

			animationTimeout = setTimeout(function () {
				var diff = $('#mini-tour').offset().top - window.pageYOffset - ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_ANIMATION_START());

			  	var framesPercentage = diff < 0 ? Math.abs(diff) / distanceForWindow : 0,
			  		sanitizedPercentage = framesPercentage > 1 ? 1 : framesPercentage,
			  		activeFrame = Math.floor(numberOfAnimationFrames * sanitizedPercentage);

				$cardDemo.removeClass('step1 step2 step3 step4 step5 step6 step7 step8 step9').addClass("step" + activeFrame);
			}, ANIMATION_DELAY);
		}

		$window.scroll(scrollAnimate);
	}

	if ($("#subject-select").length > 0) {
		$("#subject-select").change(function () {
			$("#subject-input").attr('value', $("#subject-select option:selected").text());
		});

		$("#name-input, #email-input, #message-input").change(function () {
			$(this).removeClass('required');
		});

		$("#support-submit").click(function (ev) {
			ev.preventDefault();
			ev.stopPropagation();

			$("#name-input, #email-input, #message-input").removeClass('required');
			
			if ($("#name-input").val().length == 0 ||
				$("#email-input").val().length == 0 ||
				$("#message-input").val().length == 0) {

				if ($("#name-input").val().length == 0) {
					$("#name-input").addClass('required');
				}

				if ($("#email-input").val().length == 0) {
					$("#email-input").addClass('required');
				}

				if ($("#message-input").val().length == 0) {
					$("#message-input").addClass('required');
				}
			}
		});
	}

	if ($(".faq-link").length > 0 || $(".support-topic-filter").length > 0) {
		$(".faq-link").click(function (ev) {
			ev.preventDefault();
			
			var el = $(this).attr('href'), $el = $(el), multiplier = $window.outerWidth() < 600 ? .05 : .3;
		    $("body, html").animate({'scrollTop' :  $el.offset().top - ($window.outerHeight() * multiplier)}, SCROLL_ANIMATION_DURATION, function () {
		    	$el.addClass('highlight');
		    	window.location.hash = el;

		    	setTimeout(function () {
		    		$el.removeClass('highlight');
		    	}, 1200);
		    });
		});

		$(".support-topic-filter").click(function (ev) {
			ev.preventDefault();
			$(".support-topic-filter").parent().removeClass('active');
			$(this).parent().addClass('active');

			var el = $(this).attr('href'), $el = $(el), multiplier = 0.03;

			$(".support-topic-list").hide();
			$el.show();

		    $("body, html").animate({'scrollTop' :  $el.offset().top - ($window.outerHeight() * multiplier)}, SCROLL_ANIMATION_DURATION, function () {
		    	$el.addClass('highlight');
		    	window.location.hash = el;

		    	setTimeout(function () {
		    		$el.removeClass('highlight');
		    	}, 1200);
		    });
		});

		$(".topic-cancel-filter").click(function (ev) {
			ev.preventDefault();

			var el = $(this).attr('href'), $el = $(el);
			$(this).parent().removeClass('active');
			$(".support-topic-list").show();
		});
	}

	if ($('img.lazy-load').length > 0) {
		// Prepare text blocks for animation
		$(".details").addClass('invisible');
		$('.details').trigger("unveil");
		$("#conclusion-hero").trigger("unveil");

		// Lazy load major image assets
	  	$("img.lazy-load").removeClass('hidden').addClass('invisible').unveil(imageActivationOffset(), function() {
	  		if (this.getAttribute("data-src").indexOf("macbook_icloud") > 0) {
	  			$('#icloud-1, #icloud-2').trigger("unveil");
	  		}

	  		if (this.getAttribute("data-src").indexOf("doo_complexity_reminder_screenshot") > 0) {
	  			setTimeout(function () {
					$(".details").removeClass('invisible');
	  			}, 100 * 3);
	  		}
	  		
		  	$(this).load(function() {
		    	$(this).removeClass('invisible');
		  	});
		});

		// Lazy load cards
	  	$("img.lazy-load-special").removeClass('hidden').addClass('invisible').unveil(100, function() {
		  	$(this).load(function() {
		    	$(this).removeClass('invisible');
		  	});
		});
	}

	if ($('#feature-custom-alerts').length > 0) {
		// Animate out illustration heros during scroll
		$("#repeat-options-floating").imageDynamics(function() {
		  	var percentageInView = ($window.scrollTop() - $(this).offset().top) / $window.height();
		  	var angle = START_ILLUSTRATION_HERO_1_ROTATION_ANGLE - (percentageInView * MAX_ILLUSTRATION_HERO_1_ROTATION_ANGLE);

		   	$(this).trigger("unveil").css({
		   		'transform'			: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
		   		'-moz-transform'	: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
		   		'-webkit-transform'	: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
		   		'-o-transform'		: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
		   		'-ms-transform'		: 'rotate3d(0, 0, 1, ' + angle + 'deg)'
		   	});
		});

		// Animate out illustration heros during scroll
		$("#date-options-floating").imageDynamics(function() {
		  	var percentageInView = ($window.scrollTop() - $(this).offset().top) / $window.height();
		  	var angle = START_ILLUSTRATION_HERO_2_ROTATION_ANGLE - (percentageInView * MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE);

		   	$(this).trigger("unveil").css({
		   		'transform'			: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
		   		'-moz-transform'	: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
		   		'-webkit-transform'	: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
		   		'-o-transform'		: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
		   		'-ms-transform'		: 'rotate3d(0, 0, 1, ' + angle + 'deg)'
		   	});
		});
	}
});