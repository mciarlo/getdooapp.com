$(function () {
	var $window = $(window),
		$body = $("body"),
		$parallax = $(".parallax"),
		$watches = $(".horizontal-parallax"),
		$burgerIcon = $("#hamburger-icon"),
		windowWidth = $window.outerWidth(),
		windowHeight = $window.outerHeight(),
		scrollTop = $window.scrollTop(),
		ANIMATION_CLASS = "will-reveal",
		MIN_WINDOW_WIDTH_FOR_PARALLAX = 768,
		SCROLL_DELAY = 0,
		downloadButtons = $(".download"),
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		};

	var timeout,
	updateParallax = function (el, useVertical) {
		if (!isLargeViewport()) {
			return;
		}

		if (!isElementInViewport(el)) {
			return;
		}

		$el = $(el);
		var translationDistancePercent = $el.attr("data-attr-delay-percent");
		var windowOffset = useVertical ? 0 : windowHeight / 2;
		var distanceFromTop = $el.parent().offset().top + windowOffset - scrollTop;

		if (useVertical) {
			var translationDistance = translationDistancePercent > 0 ? windowHeight * translationDistancePercent : windowHeight / 2,
			percentFromTop = distanceFromTop / windowHeight;
			percentFromTop = percentFromTop > 1.0 ? 1.0 : percentFromTop;
			percentFromTop = percentFromTop < 0 ? 0 : percentFromTop;
			offset = percentFromTop * translationDistance;
			$el.css("transform", "translate3d(0," + offset + "px,0)");

		} else {
			var translationDistance = windowWidth / 2,
			percentFromTop = distanceFromTop / windowHeight;
			percentFromTop = percentFromTop > 1.0 ? 1.0 : percentFromTop;
			percentFromTop = percentFromTop < 0 ? 0 : percentFromTop;
			offset = percentFromTop * translationDistance;
			$el.css("transform", "translate3d(" + offset + "px,0, 0)");
		}
	},
	isLargeViewport = function () {
		return windowWidth >= MIN_WINDOW_WIDTH_FOR_PARALLAX;
	},
	isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	},
	handleJSAbilities = function () {.15
		$body.removeClass("no-js");
		setTimeout(function () {
			$("nav").addClass("animates");
		}, 1000);
	};

	function sendURL(anchor) {
		clearTimeout(timeout)
		window.location = $(anchor).attr("href")
	}

	if (downloadButtons.length > 0) {
		downloadButtons.each(function (idx, el) {
			el.addEventListener("click", function(e){
			e.preventDefault();
			var anchor = e.currentTarget;

			// Creates a timeout to call `submitForm` after one second.
			timeout = setTimeout(function () {
				sendURL(anchor)
			}, 2000);

			var downloadType =
			gtag('event', 'download', {
			  'event_category' : 'download',
			  'event_label' : $(anchor).attr("data-attr-type"),
			  'hitCallback' : sendURL(anchor)
			});
		});
		});
	}

	$burgerIcon.click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		$burgerIcon.toggleClass("active");
		$("nav").toggleClass("active");
	});

	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: SCROLL_DELAY //(milliseconds) adjust to the highest acceptable value
	},
  onScroll = function () {
		if ($parallax.length == 0) {
			return;
		}

		scrollTop = $window.scrollTop();

		$parallax.each(function (index, el) {
			updateParallax(el, true);
		});

		$watches.each(function (index, el) {
			updateParallax(el, false);
		});
	},
	onResize = function () {
		windowHeight = $window.outerHeight();
		windowWidth = $window.outerWidth();
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

	var $questions = $(".question");
	$("#support-input").on("input search", function () {
		var val = $(this).val().toLowerCase();

		$.each($questions, function (idx, el) {
			var $item = $(el);

			if (val.length > 0) {
				var containsInput = $item.text().toLowerCase().indexOf(val) > 0;
				$item.parent()[containsInput ? "show" : "hide"]();

				var $container = $item.parents("section"),
						visibleQuestions = $container.find(".qa-pair"),
						hasVisibleItems = false;

				$.each(visibleQuestions, function (idx, li) {
					if (!($(li).css("display") == "none")) {
						hasVisibleItems = true;
					}
				});

				$container[hasVisibleItems ? "show" : "hide"]();

				if (idx == $questions.length - 1) {
					var visibleItems = $(".question:visible").length;
					$(".results-label").addClass("active").text(visibleItems + " results");
				}

			} else {
				$item.parent().show();
				$("section").show();
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
