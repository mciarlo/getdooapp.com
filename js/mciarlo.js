$(function () {
	var $window = $(window),
		imageActivationOffset,
		isElementInViewport,
		NAV_SCROLL_DISTANCE = 40,
		TOUR_ITEM_TOP_OFFSET = 420,
		TOUR_ITEM_ACTIVATION_DISTANCE = 200,
		WIDTH_TO_DISABLE_EFFECTS = 768,
		CARD_ITEM_ACTIVATION_DISTANCE = 500,
		SCROLL_ANIMATION_DURATION = 250,
		MAX_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 6,
		START_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 0,
		MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE = -6,
		START_ILLUSTRATION_HERO_2_ROTATION_ANGLE = 0,
		HERO_IMAGE_REVEAL_DELAY = 400,
		IPHONE_LEFT_FIXED_OFFSET = .22,
		NAV_DELAY = 400,
		IPHONE_FIXED_TOP = 140,
		NAV_TOP_ACTIVATION = 30,
		NUMBER_OF_FEATURES = 6,
		$miniTour = $(".mini-tour:first"),
		$features = $(".mini-tour--item:first"),
		$nav = $("nav:first"),
		$iphone = $(".floating-iphone-container"),
		$floatingPhone = $iphone.find(".floating-iphone:first"),
		itemHeight = Math.round($(".mini-tour:first").outerHeight() / 4),
		iPhoneFixedCenteringOffset = 140,
		iPhoneTop = 0,
		calculateiPhoneOffsets = function () {
			if ($iphone.length) {
				var windowHeight = $window.height();
				iPhoneTop = $iphone.offset().top;
				iPhoneFixedCenteringOffset = Math.round((windowHeight - $(".floating-iphone-body:first").outerHeight()) / 2) - IPHONE_FIXED_TOP;
			}
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
					$(".doo-app-header .count").text(2);
					break;
				}
				case 2: {
					$(".card.coffee").removeClass("one two three four completed").addClass("completed");
					$(".card.groceries").removeClass("one two three four snoozed").addClass("snoozed");
					$(".card.meeting").removeClass("one two three four completed").addClass("one");
					$(".doo-app-header .count").text(1).fadeIn();
					break;
				}
				case 3: {
					$(".card.coffee").removeClass("one two three four completed").addClass("completed");
					$(".card.groceries").removeClass("one two three four snoozed").addClass("snoozed");
					$(".card.meeting").removeClass("one two three four completed").addClass("completed");
					$(".doo-app-header .count").text(0).fadeOut();
					break;
				}
				default: {
					$(".card.coffee").removeClass("one two three four completed").addClass("one");
					$(".card.groceries").removeClass("one two three four snoozed").addClass("two");
					$(".card.meeting").removeClass("one two three four completed").addClass("three");
					$(".doo-app-header .count").text(3);
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
			if ($features.length == 0) {
				return;
			}

			calculateiPhoneOffsets();

			iPhoneTop = $iphone.offset().top;

			var scrollTop = $window.scrollTop(),
				transformationTopOffset = $miniTour.offset().top,
				itemHeight = $miniTour.outerHeight() / 4,
				completionTopOffset = itemHeight + (itemHeight * .9),
				snoozeTopOffset = itemHeight * 2 + (itemHeight * 1.1),
				focusTopOffset = itemHeight * 4 + (itemHeight * .5),
				iphoneWindowWidthOffset = $window.width() * IPHONE_LEFT_FIXED_OFFSET,
				iPhonePercent = Math.max(0, (scrollTop / (iPhoneTop + $window.height() / 3)));

			if ($window.width() < 982) {
				completionTopOffset = itemHeight + (itemHeight * 1.05);
				snoozeTopOffset = itemHeight * 2 + (itemHeight * 1.4);
				focusTopOffset = itemHeight * 4 + (itemHeight * .8);

			} else if ($window.width() >= 982 && $window.width() < 1220) {
				completionTopOffset = itemHeight + (itemHeight * 1.05);
				snoozeTopOffset = itemHeight * 3 + (itemHeight * .4);
				focusTopOffset = itemHeight * 4 + (itemHeight * .85);

			} else if ($window.width() >= 1220 && $window.width() < 1440) {
				completionTopOffset = itemHeight + (itemHeight * .75);
				snoozeTopOffset = itemHeight * 2 + (itemHeight * .9);
				focusTopOffset = itemHeight * 4 + (itemHeight * .6);
			}
			
			var iPhoneTopSnap = transformationTopOffset + $miniTour.outerHeight() - $(".floating-iphone-body").outerHeight() - IPHONE_FIXED_TOP - parseInt($(".key-features").css("padding-top")),
				iPhonePercent = Math.min(1, iPhonePercent);

			var scrollingOffset = iPhoneFixedCenteringOffset + ($nav.outerHeight() / 2);
			var iPhoneBecomesFixedOffset = $(".floating-iphone-container").offset().top - IPHONE_FIXED_TOP - scrollingOffset;
			
			var shouldBeFixed = scrollTop >= iPhoneBecomesFixedOffset;
			var yOffset = (shouldBeFixed || shouldBeScrolling) ? scrollingOffset : 0;
			iPhoneTopSnap = iPhoneTopSnap - scrollingOffset;
			var shouldBeScrolling = scrollTop > iPhoneTopSnap;

			console.log("Offset for centering is" + iPhoneFixedCenteringOffset);

			$floatingPhone.css({
				"-webkit-transform": "translate3d(" + (-iPhonePercent * iphoneWindowWidthOffset) + "px," + yOffset + "px,0)",
				"-moz-transform": "translate3d(" + (-iPhonePercent * iphoneWindowWidthOffset) + "px," + yOffset + "px,0)",
				"-ms-transform": "translate3d(" + (-iPhonePercent * iphoneWindowWidthOffset) + "px," + yOffset + "px,0)",
				"-o-transform": "translate3d(" + (-iPhonePercent * iphoneWindowWidthOffset) + "px," + yOffset + "px,0)",
				"transform": "translate3d(" + (-iPhonePercent * iphoneWindowWidthOffset) + "px," + yOffset + "px,0)"
			});

			if (shouldBeFixed) {
				if (!$floatingPhone.hasClass("fixed")) {
					$floatingPhone.addClass("fixed");
				}
			} else {
				$floatingPhone.removeClass("fixed");
			}

			if (scrollTop < completionTopOffset) {
				setActiveCard(0);

			} else if (scrollTop > completionTopOffset  && scrollTop < snoozeTopOffset) {
				setActiveCard(1);

			} else if (scrollTop > snoozeTopOffset && scrollTop < focusTopOffset) {
				setActiveCard(2);

			} else if (scrollTop > focusTopOffset) {
				setActiveCard(3);
			}

			$(".phone-zero-state")[scrollTop > focusTopOffset ? "addClass" : "removeClass"]("active");

			if (shouldBeScrolling) {
				if ($floatingPhone.hasClass("scroll")) {
					//return;
				}
				$floatingPhone.addClass("scroll").css("top", iPhoneTopSnap - $(".introduction").outerHeight() + IPHONE_FIXED_TOP);

			} else {
				$floatingPhone.removeClass("scroll").css("top", "");
			}

		},
		updateNav = function () {
			var percentage = Math.max($window.scrollTop() - NAV_TOP_ACTIVATION, 0) / NAV_SCROLL_DISTANCE;
			percentage = $window.scrollTop() == 0 ? 0 : percentage;
			percentage = Math.min(percentage, 1);
			$("#sticky-nav").css("background-color", "rgba(106, 59, 191," + percentage + ")");
			$("#sticky-nav")[percentage > 0 ? "removeClass" : "addClass"]("bordered");
		};

	isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    	return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	};

	$(".mini-tour--item.transformation, .mini-tour--item.completion, .mini-tour--item.snooze, .mini-tour--item.focus").addClass("fadedOut");

	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: 50 //(milliseconds) adjust to the highest acceptable value
	};

	var onScroll = function () {
		var windowWidth = $window.width();

		if (windowWidth >= 768) {
			if (scrollHandling.allow) {
				updateNav();
				updateMiniTour();
		        scrollHandling.allow = false;
				setTimeout(scrollHandling.reallow, scrollHandling.delay);
			}
		}
	};

	$window.scroll(function () {
		onScroll();
	});

	var onResize = function () {
		itemHeight = Math.round($(".mini-tour:first").outerHeight() / 4);

		var windowWidth = $window.width(),
			windowHeight = $window.height();

		calculateiPhoneOffsets();

		$('body')[windowWidth < 768 ? "addClass" : "removeClass"]('no-js');

		$iphone.removeClass("xsmall small medium large xlarge");
		
		if (windowHeight < 800) {
			$iphone.addClass("xsmall");

		} else if (windowHeight >= 800 && windowHeight < 940) {
			$iphone.addClass("small");

		} else if (windowHeight >= 940 && windowHeight < 1200) {
			if (windowWidth > 1000) {
				$iphone.addClass("medium");
			} else {
				$iphone.addClass("small");
			}

		} else if (windowHeight >= 1200 && windowWidth > 1000) {
			if (windowWidth > 1000) {
				$iphone.addClass("large");
			} else {
				$iphone.addClass("small");
			}
		}

		if (windowWidth >= 768) {
			if (scrollHandling.allow) {
				updateNav();
				updateMiniTour();
		        scrollHandling.allow = false;
				setTimeout(scrollHandling.reallow, scrollHandling.delay);
			}
		}
	};

	$window.resize(function () {
		onResize();
	});

	onResize();
	updateMiniTour();

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
			
			var navHeight = $nav.height(),
				el = $(this).attr('href'), $el = $(el), multiplier = $window.outerWidth() < 600 ? .05 : .3;
		    $("body, html").animate({'scrollTop' :  $el.offset().top - ($window.outerHeight() * multiplier) + navHeight}, SCROLL_ANIMATION_DURATION, function () {
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

			var el = $(this).attr('href'), $el = $(el), multiplier = 0.2;

			$(".support-topic-list").hide();
			$el.show();

		    $("body, html").animate({'scrollTop' :  $el.offset().top - $("nav:first").outerHeight()}, SCROLL_ANIMATION_DURATION, function () {
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