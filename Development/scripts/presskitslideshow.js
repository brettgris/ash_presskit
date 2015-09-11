var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function($, TweenLite, window, document) {
  var PressKitSlideShow;
  PressKitSlideShow = (function() {
    PressKitSlideShow.prototype.defaults = {
      thumbs: '.thumbs',
      attr: 'n',
      current: 0,
      items: '.items',
      next: '.next',
      prev: '.prev',
      speed: 1,
      selected: 'selected',
      directional: true,
      onStart: function() {},
      onSwitch: function() {},
      onEnd: function() {}
    };

    function PressKitSlideShow(el, options) {
      this.changeTo = bind(this.changeTo, this);
      this.addClickEvents = bind(this.addClickEvents, this);
      this.options = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.current = this.options.current;
      this.items = this.$el.find(this.options.items);
      this.thumbs = this.$el.find(this.options.thumbs);
      this.thumbs.eq(this.current).addClass(this.options.selected);
      this.addClickEvents();
    }

    PressKitSlideShow.prototype.addClickEvents = function() {
      this.thumbs.click((function(_this) {
        return function(evt) {
          var d, n, ref;
          n = Number($(evt.target).attr(_this.options.attr));
          if (n !== _this.current) {
            d = (ref = n > _this.current) != null ? ref : {
              1: 0
            };
            return _this.changeTo(n, d);
          }
        };
      })(this));
      this.$el.find(this.options.next).click((function(_this) {
        return function(evt) {
          var n;
          n = _this.current;
          n++;
          if (n === _this.items.length) {
            n = 0;
          }
          return _this.changeTo(n, 1);
        };
      })(this));
      this.$el.find(this.options.prev).click((function(_this) {
        return function(evt) {
          var n;
          n = _this.current;
          n--;
          if (n < 0) {
            n = _this.items.length - 1;
          }
          return _this.changeTo(n, -1);
        };
      })(this));
      return this.items.swipe({
        swipeLeft: (function(_this) {
          return function() {
            return _this.$el.find(_this.options.next).trigger("click");
          };
        })(this),
        swipeRight: (function(_this) {
          return function() {
            return _this.$el.find(_this.options.prev).trigger("click");
          };
        })(this)
      });
    };

    PressKitSlideShow.prototype.changeTo = function(num, d) {
      var e, s;
      if (d === 1 || !this.options.directional) {
        s = "-100%";
        e = "200%";
      } else {
        s = "200%";
        e = "-100%";
      }
      this.options.onStart.call(void 0, this.items.eq(this.current));
      TweenLite.to(this.items.eq(this.current), this.options.speed, {
        'left': s,
        onComplete: (function(_this) {
          return function() {
            _this.items.eq(_this.current).attr("style", "").hide();
            _this.options.onSwitch.call(void 0, _this.items.eq(_this.current));
            TweenLite.from(_this.items.eq(_this.current), _this.options.speed, {
              'left': e,
              onComplete: function() {
                _this.options.onEnd.call(void 0, _this.items.eq(_this.current));
                return _this.items.eq(_this.current).attr("style", "").show();
              }
            });
            return _this.items.eq(_this.current).show();
          };
        })(this)
      });
      this.thumbs.eq(this.current).removeClass(this.options.selected);
      this.current = num;
      return this.thumbs.eq(this.current).addClass(this.options.selected);
    };

    return PressKitSlideShow;

  })();
  return $.fn.extend({
    PressKitSlideShow: function(options) {
      return this.each(function() {
        return $(this).data('PressKitSlideShow', new PressKitSlideShow(this, options));
      });
    }
  });
})(jQuery, TweenLite, window, document);
