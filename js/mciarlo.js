$(function () {
	var $window = $(window),
		SCROLL_ANIMATION_DURATION = 1200,
		MIN_DEVICE_PARALLAX = 0,
		MAX_DEVICE_PARALLAX_LEFT = 150,
		MAX_DEVICE_PARALLAX_RIGHT = 250,
		$body = $("body"),
		$sectionA = $(".task-creation"),
		$sectionB = $(".today-mode"),
		$sectionC = $(".doo-design"),
		$sectionD = $(".privacy"),
		$sectionE = $(".highlighted-features"),
		videoB = document.getElementById("video_02"),
		$videoB = $("#video_02"),
		videoD = document.getElementById("video_04"),
		$videoD = $("#video_04"),
		$burgerIcon = $("#hamburger-icon"),
		ANIMATION_CLASS = "will-reveal",
		DID_PLAY_02 = false,
		DID_PLAY_04 = false,
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		};

	if ($videoB.length > 0) {
		videoB.onended = function () {
			DID_PLAY_02 = true;
			$("#replay-btn-02").addClass("active");
		};

		videoB.onplay = function () {
			$("#replay-btn-02").removeClass("active");
		};
	}

	if ($videoD.length > 0) {
		videoD.onended = function () {
			DID_PLAY_04 = true;
			$("#replay-btn-04").addClass("active");
		};

		videoD.onplay = function () {
			$("#replay-btn-04").removeClass("active");
		};
	}

	var isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    	return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	},
	handleJSAbilities = function () {
		$body.removeClass("no-js");
	};

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
	    delay: 100 //(milliseconds) adjust to the highest acceptable value
	},
  onScroll = function () {
		if ($sectionA.length == 0) {
			return;
		}

		var windowCenterDefault = $window.scrollTop() + ($window.outerHeight() * .65),
		windowCenterDelayed = $window.scrollTop() + ($window.outerHeight() * .45);

		if ($sectionA.offset().top < windowCenterDefault) {
			$sectionA.removeClass(ANIMATION_CLASS);
		}

		if ($sectionB.offset().top < windowCenterDefault) {
			$sectionB.removeClass(ANIMATION_CLASS);
		}

		if ($sectionC.offset().top < windowCenterDefault) {
			$sectionC.removeClass(ANIMATION_CLASS);
		}

		if ($sectionD.offset().top < windowCenterDefault) {
			$sectionD.removeClass(ANIMATION_CLASS);
		}

		if ($sectionE.offset().top < windowCenterDefault) {
			$sectionE.removeClass(ANIMATION_CLASS);
		}

		var catchAutoPlayForVideoWithCatchBlock = function (video, catchBlock) {
			var promise = video.play();

			if (promise !== undefined) {
				promise.then(_ => {
					// Autoplay successful
				}).catch(error => {
					catchBlock();
				});
			}
		};

		if ($videoB.length > 0) {
			if ($videoB.offset().top < windowCenterDefault) {
				if (DID_PLAY_02) {
					return;
				}
				catchAutoPlayForVideoWithCatchBlock(videoB, function () {
					$("#replay-btn-02").addClass("active");
				});
			}
		}

		if ($videoD.length > 0) {
			if ($videoD.offset().top < windowCenterDefault) {
				if (DID_PLAY_04) {
					return;
				}
				catchAutoPlayForVideoWithCatchBlock(videoD, function () {
					$("#replay-btn-04").addClass("active");
				});
			}
		}
	},
	onResize = function () {

	};

	$window.resize(function () {
		onResize();
	});

	$(".replay-btn").click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$this = $(this);
		video = document.getElementById($this.attr("data-attr-id"));
		video.play();
		$this.removeClass("active");
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

	if ($sectionA.length > 0 && $window.outerWidth() >= 768) {
		$sectionA.addClass(ANIMATION_CLASS);
		$sectionB.addClass(ANIMATION_CLASS);
		$sectionC.addClass(ANIMATION_CLASS);
		$sectionD.addClass(ANIMATION_CLASS);
		$sectionE.addClass(ANIMATION_CLASS);
	}

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
