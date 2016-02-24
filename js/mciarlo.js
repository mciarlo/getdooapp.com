$(function () {
	var $window = $(window),
		$body = $('body'),
		windowWidth = $window.outerWidth(),
		windowHeight = $window.outerHeight(),
		imageActivationOffset,
		WIDTH_TO_DISABLE_EFFECTS = 768,
		IMAGE_ACTIVATION_PERCNTAGE = 0.0,
		MAX_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 4,
		START_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 5,
		MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE = -5,
		START_ILLUSTRATION_HERO_2_ROTATION_ANGLE = -5;

	imageActivationOffset = function () {
		return $window.outerWidth() < WIDTH_TO_DISABLE_EFFECTS ? 0 : - ($window.height() * IMAGE_ACTIVATION_PERCNTAGE);
	};

	// Enable our hamburger menu for mobile
	$('#hamburger-icon').click(function (ev) {
		ev.preventDefault();

		$(this).toggleClass('active');
		$('#nav-menu').toggleClass('active');
	});

	if ($('body').hasClass('contact')) {
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

				if ($("#name-input").val().length == 0) {
					$("#name-input").addClass('required');
				}

				if ($("#email-input").val().length == 0) {
					$("#email-input").addClass('required');
				}

				if ($("#message-input").val().length == 0) {
					$("#message-input").addClass('required');
				}

				ev.preventDefault();
				ev.stopPropagation();
			}

		});

		return;
	}

	if ($('body').hasClass('faq')) {
		$(".faq-link").click(function (ev) {
			ev.preventDefault();
			
			var el = $(this).attr('href'), $el = $(el);
		    $body.animate({'scrollTop' :  $el.offset().top - ($window.outerHeight() * .4)}, 200, function () {
		    	$el.addClass('highlight');

		    	setTimeout(function () {
		    		$el.removeClass('highlight');
		    	}, 1200);
		    });
		});

		return;
	}

	// Prepare text blocks for animation
	$(".details").addClass('invisible');

	$("#play-btn").click(function (ev) {
		ev.preventDefault();
		$("#intro-video").toggleClass('active');

	    var activeVideo = document.getElementById("video-element");
	    activeVideo.currentTime = 0;
	    activeVideo.play();
	});

	$("#close-video-btn").click(function (ev) {
		ev.preventDefault();
		
		$("#intro-video").removeClass('active');
		var activeVideo = document.getElementById("video-element");
	    activeVideo.pause();
	});

	// Lazy load major image assets
  	$("img.lazy-load").removeClass('hidden').addClass('invisible').unveil(imageActivationOffset(), function() {
  		if (this.getAttribute("data-src").indexOf("ipad_icloud_screenshot") > 0) {
  			$('#icloud-1').trigger("unveil");
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

	$("#conclusion-hero").trigger("unveil");

	// Animate out illustration heros during scroll
	$("#illustration-hero-1").imageDynamics(function() {
		$("#illustration-hero-2").trigger("unveil");
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

	$("#illustration-hero-2").imageDynamics(function() {
	  	var percentageInView = ($window.scrollTop() - $(this).offset().top) / $window.height();
	  	var angle = START_ILLUSTRATION_HERO_2_ROTATION_ANGLE - (percentageInView * MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE);

	   	$(this).css({
	   		'transform'			: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
	   		'-moz-transform'	: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
	   		'-webkit-transform'	: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
	   		'-o-transform'		: 'rotate3d(0, 0, 1, ' + angle + 'deg)',
	   		'-ms-transform'		: 'rotate3d(0, 0, 1, ' + angle + 'deg)'
	   	});
	});
});