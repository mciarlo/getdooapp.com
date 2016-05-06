$(function () {
	var $window = $(window),
		imageActivationOffset,
		WIDTH_TO_DISABLE_EFFECTS = 768,
		IMAGE_ACTIVATION_PERCNTAGE = 0.5,
		SCROLL_ANIMATION_DURATION = 250,
		MAX_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 6,
		START_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 0,
		MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE = -6,
		START_ILLUSTRATION_HERO_2_ROTATION_ANGLE = 0,
		HERO_IMAGE_REVEAL_DELAY = 400;

	imageActivationOffset = function () {
		return $window.height() * IMAGE_ACTIVATION_PERCNTAGE;
	};

	$('#intro-hero').addClass('invisible');

	setTimeout(function () {
		$('#intro-hero').removeClass('invisible');

	}, HERO_IMAGE_REVEAL_DELAY);

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

	$(".core-feature, #mac-mini-tour, #reviews, #app-store").addClass('invisible');

	$("#mac-feature-helpful-suggestions").textDynamics(function () {
		return $window.outerHeight() * 0.5;
	}, function () {
		$("#mac-feature-helpful-suggestions").removeClass('invisible');
	});

	$("#mac-feature-custom-repeat").textDynamics(function () {
		return $window.outerHeight() * 0.5;
	}, function () {
		$("#mac-feature-custom-repeat").removeClass('invisible');
	});

	$("#mac-feature-custom-alerts").textDynamics(function () {
		return $window.outerHeight() * 0.4;
	}, function () {
		$("#mac-feature-custom-alerts").removeClass('invisible');
	});

	$("#feature-helpful-suggestions").textDynamics(function () {
		return $window.outerHeight() * 0.5;
	}, function () {
		$("#feature-helpful-suggestions").removeClass('invisible');
	});

	$("#feature-custom-repeat").textDynamics(function () {
		return $window.outerHeight() * 0.6;
	}, function () {
		$("#feature-custom-repeat").removeClass('invisible');
	});

	$("#feature-custom-alerts").textDynamics(function () {
		return $window.outerHeight() * 0.8;
	}, function () {
		$("#feature-custom-alerts").removeClass('invisible');
	});

	$("#feature-extension").textDynamics(function () {
		return $window.outerHeight() * 0.3;
	}, function () {
		$("#feature-extension").removeClass('invisible');
	});

	$('#mac-mini-tour').textDynamics(function () {
		return $window.outerHeight() * 0.4;
	}, function () {
		$('#mac-mini-tour').removeClass('invisible');
	});

	$('#app-store').textDynamics(function () {
		return $window.outerHeight() * 0.3;
	}, function () {
		$('#app-store, #reviews').removeClass('invisible');
	});

	var numberOfFrames = 7,
		WINDOW_PERCENTAGE_FOR_MINI_TOUR_START = function () {return $window.outerWidth() < 768 ? 0.3 : 0.3},
		WINDOW_PERCENTAGE_FOR_APP_SIZE = function () {return $window.outerWidth() < 768 ? 0.3 : 0.6},
		distanceForVideoWindow = 240,
		$miniTour = $('#mini-tour'),
		$appSizeContainer = $('#app-size-container');

	$appSizeContainer.removeClass().addClass('animated0');

	$appSizeContainer.cssFrameAnimation(function () {
		return $window.outerHeight() * WINDOW_PERCENTAGE_FOR_APP_SIZE();
	}, function () {
		var diff = $appSizeContainer.offset().top + ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_APP_SIZE()) - ($window.scrollTop() + $window.height());

	  	var framesPercentage = diff < 0 ? Math.abs(diff) / distanceForVideoWindow : 0,
	  		sanitizedPercentage = framesPercentage > 1 ? 1 : framesPercentage,
	  		activeFrame = Math.floor(numberOfFrames * sanitizedPercentage);
		
		$appSizeContainer.removeClass().addClass("animated" + activeFrame);
	}, function () {
		var diff = $appSizeContainer.offset().top + ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_APP_SIZE()) - ($window.scrollTop() + $window.height());

		if (diff > 0) {
			$appSizeContainer.removeClass().addClass("animated0");
		} else {
			$appSizeContainer.removeClass().addClass("animated4");
		}
	});

	$window.scroll(function () {
		if ($miniTour.length > 0) {
			var diff = $miniTour.offset().top + ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_MINI_TOUR_START()) - ($window.scrollTop() + $window.height());
			var classToAdd = diff > 0 ? "starting" : "animated";
			$miniTour.removeClass().addClass(classToAdd);
		}

		// if ($appSizeContainer.length > 0) {
		// 	var diff = $appSizeContainer.offset().top + ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_APP_SIZE()) - ($window.scrollTop() + $window.height());
		// 	var classToAdd = diff > 0 ? "starting" : "animated";
		// 	$appSizeContainer.removeClass().addClass(classToAdd);
		// }
	});

	if ($('img.lazy-load').length > 0) {
		$("#conclusion-hero").trigger("unveil");

		// Lazy load major image assets
	  	$("img.lazy-load").removeClass('hidden').addClass('invisible').unveil(imageActivationOffset(), function() {
	  		if (this.getAttribute("data-src").indexOf("macbook_icloud") > 0) {
	  			$('#icloud-1, #icloud-2').trigger("unveil");
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

	/******
	 ****** FAQ, Support, and Contact
	 ******
	*/
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
});