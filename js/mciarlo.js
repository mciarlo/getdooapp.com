$(function () {
	var $window = $(window),
		imageActivationOffset,
		WIDTH_TO_DISABLE_EFFECTS = 768,
		IMAGE_ACTIVATION_PERCNTAGE = 0.5,
		SCROLL_ANIMATION_DURATION = 250;

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

	var numberOfFrames = 8,
		$video = $('#resize-video'),
		scrollTimeout,
		WINDOW_PERCENTAGE_FOR_ANIMATION_START = 0.5,
		WINDOW_PERCENTAGE_FOR_ANIMATION_DURATION = 0.5;

	if ($video.length > 0) {
		function scrollPlay() {
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}

			var distanceForWindow = $window.outerHeight() * WINDOW_PERCENTAGE_FOR_ANIMATION_DURATION;

			scrollTimeout = setTimeout(function () {
				var diff = $video.offset().top - window.pageYOffset - ($window.outerHeight() * WINDOW_PERCENTAGE_FOR_ANIMATION_START);

			  	var framesPercentage = diff < 0 ? Math.abs(diff) / distanceForWindow : 0,
			  		sanitizedPercentage = framesPercentage > 1 ? 1 : framesPercentage,
			  		activeFrame = Math.floor(numberOfFrames * sanitizedPercentage);

			  		console.log(activeFrame);
				
				$video.removeClass().addClass("frame" + activeFrame);
			}, 14);
		}

		$window.scroll(scrollPlay);
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
	}
});