var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function($, TweenMax, Modernizr, window, document) {
  var AshAnimator;
  AshAnimator = (function() {
    AshAnimator.prototype.defaults = {
      current: 0,
      arrows: '.intro-arrows',
      item: '.intro-item',
      animate: '.intro-animate',
      animateattr: 'animate',
      initattr: 'init',
      speedattr: 'speed',
      delayattr: 'delay',
      threedimensionalclass: 'threedimensional',
      idattr: 'n',
      perspective: 900,
      ease: Back.easeOut.config(1.2),
      delay: 5000
    };

    function AshAnimator(el, options) {
      this.resize = bind(this.resize, this);
      this.itemDone = bind(this.itemDone, this);
      this.changeTo = bind(this.changeTo, this);
      this.animate = bind(this.animate, this);
      this.prevItem = bind(this.prevItem, this);
      this.nextItem = bind(this.nextItem, this);
      this.arrowClick = bind(this.arrowClick, this);
      this.stopAnimate = bind(this.stopAnimate, this);
      this.startAnimate = bind(this.startAnimate, this);
      this.options = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.timeout;
      this.items = this.$el.find(this.options.item);
      this.current = this.options.current;
      this.visible = false;
      this.isAnimating = false;
      this.threed = Modernizr.csstransforms3d;
      this.resize();
      $(window).resize((function(_this) {
        return function() {
          return _this.resize();
        };
      })(this));
      $(this.options.arrows).find('a').click(this.arrowClick);
    }

    AshAnimator.prototype.startAnimate = function() {
      this.visible = true;
      this.items.eq(this.current).show();
      return this.animate();
    };

    AshAnimator.prototype.stopAnimate = function() {
      this.visible = false;
      this.items.eq(this.current).hide();
      return clearTimeout(this.timeout);
    };

    AshAnimator.prototype.arrowClick = function(evt) {
      var t;
      if (this.isAnimating === false) {
        t = $(evt.target);
        if (t.hasClass('next')) {
          return this.nextItem();
        } else if (t.hasClass('prev')) {
          return this.prevItem();
        }
      }
    };

    AshAnimator.prototype.nextItem = function() {
      var next;
      clearTimeout(this.timeout);
      next = this.current + 1;
      if (next === this.items.length) {
        next = 0;
      }
      return this.changeTo(next);
    };

    AshAnimator.prototype.prevItem = function() {
      var next;
      clearTimeout(this.timeout);
      next = this.current - 1;
      if (next < 0) {
        next = this.items.length - 1;
      }
      return this.changeTo(next);
    };

    AshAnimator.prototype.animate = function() {
      this.count = 0;
      this.length = this.items.eq(this.current).find(this.options.animate).length;
      this.isAnimating = true;
      return this.items.eq(this.current).find(this.options.animate).each((function(_this) {
        return function(i, v) {
          var ani, t, target, tl;
          t = $(v).hide();
          ani = JSON.parse(t.attr(_this.options.animateattr));
          ani.ease = _this.options.ease;
          if (!_this.threed) {
            ani = {
              opacity: 0
            };
          }
          ani.onComplete = _this.itemDone;
          tl = new TimelineLite({
            delay: t.attr(_this.options.delayattr)
          });
          if (_this.threed) {
            TweenMax.set(t, {
              perspective: _this.options.perspective
            });
          }
          target = t.find('div');
          return tl.call(function() {
            t.show();
            ani.onCompleteParams = [t.parent()];
            return TweenMax.from(target, t.attr(_this.options.speedattr), ani);
          });
        };
      })(this));
    };

    AshAnimator.prototype.changeTo = function(next) {
      this.items.eq(this.current).hide();
      this.current = next;
      this.items.eq(this.current).show();
      return this.animate();
    };

    AshAnimator.prototype.itemDone = function(container) {
      if (Number(container.attr(this.options.idattr)) === this.current) {
        this.count++;
        if (this.count === this.length && this.visible) {
          this.isAnimating = false;
          return this.timeout = setTimeout((function(_this) {
            return function() {
              return _this.nextItem();
            };
          })(this), this.options.delay);
        }
      }
    };

    AshAnimator.prototype.resize = function() {
      this.$el.height($(window).height() - $('.footer').height() - $('.header').height());
      return this.items.each((function(_this) {
        return function(i, v) {
          var a, aw, eh, et, ew, h, ir, t, w, wh, wr, ww;
          t = $(v);
          w = Number(t.attr('w'));
          h = Number(t.attr('h'));
          ww = _this.$el.width() - 78;
          wh = _this.$el.height();
          ir = w / h;
          wr = ww / wh;
          if (w < ww && h < wh) {
            ew = w;
            eh = h;
            et = (wh - h) / 2;
          } else if (w < ww && h > wh) {
            eh = wh;
            ew = ir * eh;
            et = 0;
          } else if (w > ww && h < wh) {
            ew = ww;
            eh = ew / ir;
            et = (wh - eh) / 2;
          } else {
            if (ir > wr) {
              ew = ww;
              eh = ew / ir;
              et = (wh - eh) / 2;
            } else {
              eh = wh;
              ew = ir * eh;
              et = 0;
            }
          }
          t.css({
            width: ew + 'px',
            height: eh + 'px',
            'margin-left': ew / -2 + 'px',
            'top': et + 'px'
          });
          a = $(_this.options.arrows);
          aw = ew + 68;
          return a.css({
            'width': aw + 'px',
            'margin-left': aw / -2 + 'px',
            'top': et + eh / 2 - a.height() / 2 + 'px'
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
})(jQuery, TweenMax, Modernizr, window, document);
