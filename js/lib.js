/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

/**
 * Modified for text animation and loading content on refresh above viewport
 */
;(function($) {
  $.fn.unveil = function(threshold, callback) {
    var $w = $(window),
        triggerPoint = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina ? "data-src-retina" : "data-src",
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");

      if (source) {
          this.setAttribute("src", source);
      }
      
      if (typeof callback === "function") callback.call(this);
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var windowTop = $w.scrollTop(),
            windowBottom = windowTop + $w.height(),
            imageTop = $e.offset().top,
            imageBottom = imageTop + $e.height();

        return imageTop <= windowBottom + triggerPoint;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);

/**
 * Run the animation block for our image if
 * it gets scrolled into view or appears on resize
 */
;(function($) {
  $.fn.imageDynamics = function(callback) {
    var $w = $(window), $this = this;

    this.on("imageDynamics", function() {
      if (typeof callback === "function") callback.call(this);
    });

    function imageDynamics() {
      if ($this.is(":hidden")) return;

      var windowTop = $w.scrollTop(),
          windowBottom = windowTop + $w.height(),
          imageTop = $this.offset().top,
          imageBottom = imageTop + $this.height();

      if (imageTop <= windowBottom && imageBottom >= windowTop) {
        $this.trigger("imageDynamics")
      }
    }

    $w.on("scroll.imageDynamics resize.imageDynamics", imageDynamics);

    imageDynamics();

    return this;

  };

})(window.jQuery || window.Zepto);