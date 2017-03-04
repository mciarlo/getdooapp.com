$(function () {
	var $window = $(window),
		imageActivationOffset,
		isElementInViewport,
		WIDTH_TO_DISABLE_EFFECTS = 768,
		SCROLL_ANIMATION_DURATION = 250,
		MAX_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 6,
		START_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 0,
		MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE = -6,
		START_ILLUSTRATION_HERO_2_ROTATION_ANGLE = 0,
		HERO_IMAGE_REVEAL_DELAY = 400,
		NAV_DELAY = 400,
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		},
		updateFeatures = function () {
			var $features = $(".feature-compliment:first");

			if ($features.length == 0) {
				return;
			}

			var bottom = $(".key-feature:last").offset().top + $(".key-feature:last").outerHeight();
			var windowBottomForFeatures = $window.scrollTop() + $window.outerHeight();
			var shouldBeFixed = $window.scrollTop() > $(".key-feature:first").offset().top && windowBottomForFeatures < bottom;
			var hasClass = $features.hasClass("fixed");

			if (shouldBeFixed && !hasClass) {
				$features.addClass("fixed");
				$features.css("top", "0px");
			} else if (!shouldBeFixed && hasClass) {
				$features.removeClass("fixed");
				if (windowBottomForFeatures >= bottom) {
					$features.css({"top": "auto", "bottom": "0px"});
				}
			}
		};

	isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    	return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	};

	imageActivationOffset = function () {
		return $window.height();
	};

	$('body').removeClass('no-js');

	if ($('body').hasClass('change-log-page')) {
		$('#doo-for-mac-changes').hide();

		var $changeLogTabs = $('.change-log-tab');
		$changeLogTabs.first().addClass('active');

		$changeLogTabs.click(function (ev) {
			ev.preventDefault();
			ev.stopPropagation();

			var el = $(this).attr('href'), $el = $(el);

			$changeLogTabs.removeClass('active');
			$(this).addClass('active');
			$('.change-log').hide();
			$el.show();
		});
	}

	var $features = $(".feature-compliment:first");

	$window.scroll(function () {
		updateFeatures();
	});

	$window.resize(function () {
		updateFeatures();
	});

	updateFeatures();



	// Enable our hamburger menu for mobile
	$('#hamburger-icon').click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		$(this).toggleClass('active');

		if (!$('#nav-wrapper').hasClass('active')) {
			$('#nav-wrapper').toggleClass('no-click');

		} else {
			setTimeout(function () {
				$('#nav-wrapper').toggleClass('no-click');
			}, NAV_DELAY);
		}

		// Allow repaint
		setTimeout(function () {
			$('#nav-wrapper').toggleClass('active');
		}, 10);
	});
/*
	$('.back-to-top').click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$("body, html").animate({'scrollTop' :  0});
	});

	if ($('img.lazy-load').length > 0) {
		$(".conclusion-hero").trigger("unveil");

		// Lazy load major image assets
	  	$("img.lazy-load").unveil(imageActivationOffset(), function() {
	  		if (this.getAttribute("data-src").indexOf("macbook_icloud") > 0) {
	  			$('.icloud-1, .icloud-2').trigger("unveil");
	  		}
	  		
	  		var $image = $(this);

		  	$image.load(function() {
		  		if (this.getAttribute("src").indexOf("hero") > 0) {
		  			setTimeout(function () {
						$image.removeClass('invisible');
					}, HERO_IMAGE_REVEAL_DELAY);

		  		} else {
		    		$image.removeClass('invisible');
		  		}
		  	});
		});

		// Lazy load cards
	  	$("img.lazy-load-special").unveil(10, function() {
		  	$(this).load(function() {
		    	$(this).removeClass('invisible');
		  	});
		});
	}*/

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
			$("#name-input, #email-input, #message-input").removeClass('required');
			
			if ($("#name-input").val().length == 0 ||
				$("#email-input").val().length == 0 ||
				$("#message-input").val().length == 0) {

				preventDefaultFormAction(ev);

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
			ev.stopPropagation();
			
			var el = $(this).attr('href'), $el = $(el);
			$(this).parent().removeClass('active');
			$(".support-topic-list").show();
		});
	}
});