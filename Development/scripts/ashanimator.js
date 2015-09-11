var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function($, TweenMax, window, document) {
  var AshAnimator;
  AshAnimator = (function() {
    AshAnimator.prototype.defaults = {
      current: 0,
      item: '.intro-item',
      animate: '.intro-animate',
      animateattr: 'animate',
      speedattr: 'speed'
    };

    function AshAnimator(el, options) {
      this.resize = bind(this.resize, this);
      this.animate = bind(this.animate, this);
      this.stopAnimate = bind(this.stopAnimate, this);
      this.startAnimate = bind(this.startAnimate, this);
      this.options = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.timeout = setTimeout(1);
      this.items = this.$el.find(this.options.item);
      this.current = this.options.current;
      this.resize();
      $(window).resize((function(_this) {
        return function() {
          return _this.resize();
        };
      })(this));
    }

    AshAnimator.prototype.startAnimate = function() {
      return this.animate();
    };

    AshAnimator.prototype.stopAnimate = function() {};

    AshAnimator.prototype.animate = function() {
      return this.items.eq(this.current).find(this.options.animate).each((function(_this) {
        return function(i, v) {
          var t;
          return t = $(v);
        };
      })(this));
    };

    AshAnimator.prototype.resize = function() {
      this.$el.height($(window).height() - $('.footer').height() - $('.header').height());
      return this.items.each((function(_this) {
        return function(i, v) {
          var h, t, w, wh, ww;
          t = $(v);
          w = Number(t.attr('w'));
          h = Number(t.attr('h'));
          ww = t.parent().width();
          wh = t.parent().height();
          return t.css({
            width: w + 'px',
            height: h + 'px',
            'margin-left': w / -2 + 'px'
          });
        };
      })(this));
    };

    return AshAnimator;

  })();
  return $.fn.extend({
    AshAnimator: function(options) {
      return this.each(function() {
        return $(this).data('AshAnimator', new AshAnimator(this, options));
      });
    }
  });
})(jQuery, TweenMax, window, document);
