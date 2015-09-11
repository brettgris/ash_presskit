var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function($, window, document) {
  var PressKitGallery;
  PressKitGallery = (function() {
    PressKitGallery.prototype.defaults = {
      thumbs: '.thumbs',
      list: '.list',
      attr: 'n',
      current: 0,
      viewcontainer: '.container',
      viewer: '.view',
      next: '.next',
      prev: '.prev',
      close: '.close',
      speed: 1,
      selected: 'selected',
      source: '<img src={{path}} />',
      caption: '.image-desc',
      captionsource: '{{caption}}',
      onStart: function() {},
      onSwitch: function() {},
      onEnd: function() {}
    };

    function PressKitGallery(el, options) {
      this.findandreplace = bind(this.findandreplace, this);
      this.showViewer = bind(this.showViewer, this);
      this.changeTo = bind(this.changeTo, this);
      this.addClickEvents = bind(this.addClickEvents, this);
      this.options = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.thumbs = this.$el.find(this.options.thumbs);
      this.list = this.$el.find(this.options.list);
      this.viewcontainer = this.$el.find(this.options.viewcontainer);
      this.viewer = this.$el.find(this.options.viewer);
      this.caption = this.$el.find(this.options.caption);
      this.close = this.$el.find(this.options.close);
      this.current = 0;
      this.addClickEvents();
    }

    PressKitGallery.prototype.addClickEvents = function() {
      this.thumbs.click((function(_this) {
        return function(evt) {
          var n;
          n = Number($(evt.target).attr(_this.options.attr));
          return _this.showViewer(n);
        };
      })(this));
      this.$el.find(this.options.next).click((function(_this) {
        return function() {
          var n;
          n = _this.current;
          n++;
          if (n === _this.thumbs.length) {
            n = 0;
          }
          return _this.changeTo(n);
        };
      })(this));
      this.$el.find(this.options.prev).click((function(_this) {
        return function() {
          var n;
          n = data.current;
          n--;
          if (n < 0) {
            n = data.thumbs.length - 1;
          }
          return _this.changeTo(n);
        };
      })(this));
      this.close.click((function(_this) {
        return function() {
          _this.viewcontainer.hide();
          return _this.list.show();
        };
      })(this));
      return this.viewcontainer.swipe({
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

    PressKitGallery.prototype.changeTo = function(num) {
      this.options.onStart.call(void 0, this.thumbs.eq(this.current));
      return this.viewer.children().fadeOut(this.options.speed * 1000, (function(_this) {
        return function() {
          var caption, source;
          $(_this).remove();
          _this.current = num;
          _this.options.onSwitch.call(void 0, _this.thumbs.eq(_this.current));
          source = _this.options.source;
          source = _this.findandreplace(source, _this.thumbs.eq(_this.current));
          _this.viewer.html(source);
          caption = _this.findandreplace(_this.options.captionsource, _this.thumbs.eq(_this.current));
          _this.caption.html(caption);
          return _this.viewer.children().hide().fadeIn(_this.options.speed * 1000, function() {
            return _this.options.onEnd.call(void 0, _this.thumbs.eq(_this.current));
          });
        };
      })(this));
    };

    PressKitGallery.prototype.showViewer = function(num) {
      var caption, source;
      this.current = num;
      this.options.onStart.call(void 0, this.thumbs.eq(this.current));
      this.list.hide();
      this.viewer.html("");
      this.viewcontainer.show();
      source = this.options.source;
      source = this.findandreplace(source, this.thumbs.eq(this.current));
      this.viewer.html(source);
      caption = this.findandreplace(this.options.captionsource, this.thumbs.eq(this.current));
      this.caption.html(caption);
      return this.viewer.children().hide().fadeIn(this.options.speed * 1000, (function(_this) {
        return function() {
          return _this.options.onEnd.call(void 0, _this.thumbs.eq(_this.current));
        };
      })(this));
    };

    PressKitGallery.prototype.findandreplace = function(source, target) {
      var arr, i, s;
      arr = source.split('{{');
      i = 0;
      while (i < arr.length) {
        s = arr[i].split('}}');
        if (s.length > 1) {
          s[0] = target.attr(s[0]);
        }
        arr[i] = s.join('');
        i++;
      }
      source = arr.join('');
      return source;
    };

    return PressKitGallery;

  })();
  return $.fn.extend({
    PressKitGallery: function(options) {
      return this.each(function() {
        return $(this).data('PressKitGallery', new PressKitGallery(this, options));
      });
    }
  });
})(jQuery, window, document);
