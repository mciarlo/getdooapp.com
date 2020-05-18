$(function () {
	var $window = $(window),
		SCROLL_ANIMATION_DURATION = 1200,
		MIN_DEVICE_PARALLAX = 0,
		MAX_DEVICE_PARALLAX_LEFT = 150,
		MAX_DEVICE_PARALLAX_RIGHT = 250,
		$body = $("body"),
		$platformLinks = $("#platform-switch a"),
		$taskCreation = $(".task-creation"),
		$purposefulUI = $(".purpose-built-ui"),
		$illustrations = $(".illustrations"),
		$privacy = $(".privacy"),
		$highlightedFeatures = $(".highlighted-features"),
		ANIMATION_CLASS = "will-reveal",
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		};

	var isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    	return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	},
	handleJSAbilities = function () {
		$body.removeClass("no-js");
	};

	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: 100 //(milliseconds) adjust to the highest acceptable value
	},
  onScroll = function () {
		var windowCenter = $window.scrollTop() + ($window.outerHeight() * .7);

		if ($taskCreation.offset().top < windowCenter) {
			$taskCreation.removeClass(ANIMATION_CLASS);
		}

		if ($purposefulUI.offset().top < windowCenter) {
			$purposefulUI.removeClass(ANIMATION_CLASS);
		}

		if ($illustrations.offset().top < windowCenter) {
			$illustrations.removeClass(ANIMATION_CLASS);
		}

		if ($privacy.offset().top < windowCenter) {
			$privacy.removeClass(ANIMATION_CLASS);
		}

		if ($privacy.offset().top < windowCenter) {
			$privacy.removeClass(ANIMATION_CLASS);
		}

		if ($highlightedFeatures.offset().top < windowCenter) {
			$highlightedFeatures.removeClass(ANIMATION_CLASS);
		}
	},
	onResize = function () {

	};

	$window.resize(function () {
		onResize();
	});

	$window.scroll(function () {
		if (scrollHandling.allow) {
			onScroll();
			scrollHandling.allow = false;
			setTimeout(scrollHandling.reallow, scrollHandling.delay);
		}
	});

	onResize();
	handleJSAbilities();

	$(".task-creation, .purpose-built-ui, .illustrations, .privacy, .highlighted-features").addClass(ANIMATION_CLASS);

	$platformLinks.click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		var $this = $(this),
				index = $platformLinks.index($this),
				urlRoute = $this.attr("data-resource"),
				pageTitle = $this.attr("title");

		$body.removeClass("mac-platform-transition-in ios-platform-transition-in");

		if (index == 1) {
			$body.addClass("ios-platform-transition-out");

			setTimeout(function () {
				$body.removeClass("ios-platform-transition-out ios-platform").addClass("mac-platform-transition-in mac-platform");
			}, 500);

			setTimeout(function () {
				$body.removeClass("mac-platform-transition-in");
			}, 500);

		} else {
			$body.addClass("mac-platform-transition-out");

			setTimeout(function () {
				$body.removeClass("mac-platform-transition-out mac-platform").addClass("ios-platform-transition-in ios-platform");
			}, 500);

			setTimeout(function () {
				$body.removeClass("ios-platform-transition-in");
			}, 500);
		}

		$platformLinks.removeClass("active");
		$this.addClass("active");
		window.history.pushState('', pageTitle, urlRoute);
		document.title = pageTitle;
	});

	var $questions = $(".question");
	$("#support-input").on("input search", function () {
		var val = $(this).val();

		$.each($questions, function (idx, el) {
			var $item = $(el);

			if (val.length > 0) {
				var containsInput = $item.text().indexOf(val) > 0;
				$item.parent()[containsInput ? "show" : "hide"]();

				var $container = $item.parents(".content-wrapper"),
						visibleQuestions = $container.find(".question:visible");
				$container[visibleQuestions.length > 0 ? "show" : "hide"]();

				$(".results-label").addClass("active").text(visibleQuestions.length + " results below");

			} else {
				$item.parent().show();
				$(".content-wrapper").show();
				$(".results-label").removeClass("active");
			}
		});
	});

	// FAQ
	$(".question").click(function (ev) {
		ev.preventDefault();

		$(this).parent().toggleClass("active");
	});

	if ($('img.lazy-load').length > 0) {
		// Lazy load major image assets
	  $("img.lazy-load").unveil(200, function() {
			var $image = $(this);
	  	$image.on("load", function() {
	    	$image.removeClass('invisible');
	  	});
		});
	}
});
