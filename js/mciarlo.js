$(function () {
	var $window = $(window),
		imageActivationOffset,
		isElementInViewport,
		NAV_SCROLL_DISTANCE = 40,
		TOUR_ITEM_TOP_OFFSET = 220,
		TOUR_ITEM_ACTIVATION_DISTANCE = 200,
		WIDTH_TO_DISABLE_EFFECTS = 768,
		CARD_ITEM_ACTIVATION_DISTANCE = 500,
		SCROLL_ANIMATION_DURATION = 250,
		MAX_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 6,
		START_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 0,
		MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE = -6,
		START_ILLUSTRATION_HERO_2_ROTATION_ANGLE = 0,
		HERO_IMAGE_REVEAL_DELAY = 400,
		NAV_DELAY = 400,
		NUMBER_OF_FEATURES = 6,
		$miniTour = $(".mini-tour:first"),
		setUpScrollingFeatures = function () {
			var featuresLeftOffset = Math.round($window.outerWidth() * .1),
				featuresLeftRightPadding = featuresLeftOffset * 2,
				featureWidth = Math.round(($window.outerWidth() - featuresLeftRightPadding) / 3);
			$(".key-features ul").css({
				"width": (featureWidth * NUMBER_OF_FEATURES) + featuresLeftRightPadding,
				"left" : featuresLeftOffset
			}).find("li").css("width", featureWidth);

		},
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		},
		setActiveCard = function (index) {
			switch(index){
				case 1: {
					$(".card.coffee").removeClass("one two three four completed").addClass("completed");
					$(".card.groceries").removeClass("one two three four snoozed").addClass("one");
					$(".card.meeting").removeClass("one two three four completed").addClass("two");
					$(".card.cleaning").removeClass("one two three four").addClass("three");
					$(".doo-app-header .count").text(3);
					break;
				}
				case 2: {
					$(".card.coffee").removeClass("one two three four completed").addClass("completed");
					$(".card.groceries").removeClass("one two three four snoozed").addClass("snoozed");
					$(".card.meeting").removeClass("one two three four completed").addClass("one");
					$(".card.cleaning").removeClass("one two three four").addClass("two");
					$(".doo-app-header .count").text(2);
					break;
				}
				case 3: {
					$(".card.coffee").removeClass("one two three four completed").addClass("completed");
					$(".card.groceries").removeClass("one two three four snoozed").addClass("snoozed");
					$(".card.meeting").removeClass("one two three four completed").addClass("completed");
					$(".card.cleaning").removeClass("one two three four").addClass("one");
					$(".doo-app-header .count").text(1);
					break;
				}
				case 4: {
					$(".card.cleaning").removeClass("two three four").addClass("skipped");
					
					setTimeout(function () {
						$(".card.cleaning").removeClass("one two three four skipped").addClass("four");
						$(".card.coffee").removeClass("one two three four completed").addClass("one");
						$(".card.groceries").removeClass("one two three four snoozed").addClass("two");
						$(".card.meeting").removeClass("one two three four snoozed").addClass("three");
					}, 300);

					break;
				}
				default: {
					$(".card.cleaning").removeClass("one two three four skipped").addClass("one");
					$(".card.coffee").removeClass("one two three four completed").addClass("two");
					$(".card.groceries").removeClass("one two three four snoozed").addClass("three");
					$(".card.meeting").removeClass("one two three four completed").addClass("four");
					$(".doo-app-header .count").text(4);
					break;
				}
			}
		},
		detectScrollBehaviorForItem = function ($item, topOffset, minY, nextItemY) {
			var scrollTop = $window.scrollTop();

			if (scrollTop > topOffset && scrollTop < nextItemY) {
				$item.removeClass("fadedOut scrolling").addClass("fixed").find("h2").css("top", TOUR_ITEM_TOP_OFFSET);

			} else if (scrollTop < topOffset) {				
				$item.removeClass("fixed scrolling").addClass("fadedOut").find("h2").css("top", "auto");

			} else {
				if ($item.hasClass("scrolling")) {
					return;
				}

				$item.removeClass("fixed fadedOut").addClass("scrolling").find("h2").css("top", scrollTop - TOUR_ITEM_TOP_OFFSET);
			}
		},
		updateMiniTour = function () {
			var $features = $(".mini-tour--item:first");

			if ($features.length == 0) {
				return;
			}

			var scrollTop = $window.scrollTop(),
				itemHeight = Math.round($(".mini-tour--item:first").outerHeight()),
				transformationTopOffset = $miniTour.offset().top,
				completionTopOffset = itemHeight,
				snoozeTopOffset = itemHeight * 2,
				focusTopOffset = itemHeight * 3,
				iPhoneTopSnap = itemHeight * 4;

			if (scrollTop < transformationTopOffset) {
				setActiveCard(0);

			} else if (scrollTop > transformationTopOffset + CARD_ITEM_ACTIVATION_DISTANCE && scrollTop < completionTopOffset) {
				setActiveCard(4);

			} else if (scrollTop > completionTopOffset + CARD_ITEM_ACTIVATION_DISTANCE && scrollTop < snoozeTopOffset) {
				setActiveCard(1);

			} else if (scrollTop > snoozeTopOffset + CARD_ITEM_ACTIVATION_DISTANCE && scrollTop < focusTopOffset) {
				setActiveCard(2);

			} else if (scrollTop > focusTopOffset + CARD_ITEM_ACTIVATION_DISTANCE) {
				setActiveCard(3);
			}

			detectScrollBehaviorForItem($(".mini-tour--item.transformation"), transformationTopOffset, transformationTopOffset, completionTopOffset);
			detectScrollBehaviorForItem($(".mini-tour--item.completion"), completionTopOffset, transformationTopOffset, snoozeTopOffset);
			detectScrollBehaviorForItem($(".mini-tour--item.snooze"), snoozeTopOffset, transformationTopOffset, focusTopOffset);
			detectScrollBehaviorForItem($(".mini-tour--item.focus"), focusTopOffset, transformationTopOffset, focusTopOffset + completionTopOffset);

			if (scrollTop > iPhoneTopSnap) {
				if ($(".floating-iphone-container").hasClass("scroll")) {
					return;
				}

				$(".floating-iphone-container").addClass("scroll").css("top", focusTopOffset + completionTopOffset);

			} else {
				$(".floating-iphone-container").removeClass("scroll").css("top", "0");
			}

		},
		updateNav = function () {
			var percentage = $window.scrollTop() / NAV_SCROLL_DISTANCE;
			percentage = $window.scrollTop() == 0 ? 0 : percentage;
			percentage = Math.min(percentage, 1);
			$("#sticky-nav").css("background-color", "rgba(106, 59, 191," + percentage + ")");
		};

	isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    	return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	};

	$('body').removeClass('no-js');
	$(".mini-tour--item.transformation, .mini-tour--item.completion, .mini-tour--item.snooze, .mini-tour--item.focus").addClass("fadedOut");

	$window.scroll(function () {
		updateNav();
		updateMiniTour();
	});

	$window.resize(function () {
		//setUpScrollingFeatures();
	});

	//setUpScrollingFeatures();
	updateMiniTour();

	$(".features-prev").click(function (ev) {
		preventDefaultFormAction(ev);

	});

	$(".features-next").click(function (ev) {
		preventDefaultFormAction(ev);
	});

/*
	var dragUX = interact('.draggable').draggable({
		snap: { targets: [
			{ x: 0, y: 0, range: 50 }
		]},
		onmove: dragMoveListener,
			restrict     : {
			restriction: 'parent',
			elementRect: { top: 0, left: .4, bottom: 0, right: .5 }
		},
		inertia      : true,
		axis         : "x"
	});

	interact.createSnapGrid({
	  	x: 50, 
	  	y: 50, 
	  	range: 10,
	  	offset: { x: 5, y: 10 }
	});

	$('.draggable img').on('dragstart', function(event) { event.preventDefault(); });

	  function dragMoveListener (event) {
	    var target = event.target,
	        // keep the dragged position in the data-x/data-y attributes
	        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform =
	      'translate(' + x + 'px, ' + 0 + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
	  }

	  // this is used later in the resizing and gesture demos
	  window.dragMoveListener = dragMoveListener;
*/
	// Enable our hamburger menu for mobile
	$('#hamburger-icon').click(function (ev) {
		preventDefaultFormAction(ev);

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

	/******
	 ****** Changelog
	 ******
	*/
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

	/******
	 ****** FAQ, Support, and Contact
	 ******
	*/
	$('.back-to-top').click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$("body, html").animate({'scrollTop' :  0});
	});

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