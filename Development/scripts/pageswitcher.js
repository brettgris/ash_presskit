var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function($, window, document) {
  var PageSwitcher;
  PageSwitcher = (function() {
    PageSwitcher.prototype.defaults = {
      links: '.plink',
      mobile: 'mplink',
      pages: '.section',
      bgtarget: 'body',
      bgattr: 'bg',
      bgsize: 'cover',
      attr: 'path',
      speed: 500,
      current: 'home',
      mobilebtn: '.mobilelink',
      mobilecontainer: '.mobile-list',
      backgrounds: true,
      onChange: function() {}
    };

    function PageSwitcher(options) {
      this.loadPage = bind(this.loadPage, this);
      this.addClicks = bind(this.addClicks, this);
      this.setupPages = bind(this.setupPages, this);
      this.options = $.extend({}, this.defaults, options);
      this.links = $(this.options.links);
      this.mobile = $(this.options.mobile);
      this.pages = $(this.options.pages);
      this.target = $(this.options.bgtarget);
      this.current = this.options.current;
      this.setupPages();
      this.addClicks();
    }

    PageSwitcher.prototype.setupPages = function() {
      this.pages.hide();
      $('.' + this.current).show();
      this.options.onChange.call(this, this.pages.attr('id'));
      if ($('.l' + this.current).length > 0) {
        this.target.css('background', $('.l' + this.current).attr(this.options.bgattr));
        return this.target.css('background-size', this.options.bgsize);
      } else {
        return this.target.attr('style', '');
      }
    };

    PageSwitcher.prototype.addClicks = function() {
      $(this.options.links + ", " + this.options.mobile + ", " + this.options.logo).click((function(_this) {
        return function(evt) {
          return _this.loadPage($(evt.target).attr(_this.options.attr));
        };
      })(this));
      return $(this.options.mobilebtn).click((function(_this) {
        return function() {
          var c;
          c = $(_this.options.mobilecontainer);
          if (c.css('display') !== 'none') {
            return c.hide();
          } else {
            return c.slideDown(_this.options.speed);
          }
        };
      })(this));
    };

    PageSwitcher.prototype.loadPage = function(t) {
      $(this.options.mobilecontainer).hide();
      if (this.current !== t) {
        return $('.' + this.current).fadeOut(this.options.speed, (function(_this) {
          return function() {
            var n;
            n = $('.' + t).fadeIn(_this.options.speed);
            _this.options.onChange.call(_this, $('.' + t).attr('id'));
            _this.current = t;
            if (_this.options.backgrounds) {
              _this.target.css('background', $('.l' + _this.current).attr(_this.options.bgattr));
              return _this.target.css('background-size', _this.options.bgsize);
            }
          };
        })(this));
      }
    };

    return PageSwitcher;

  })();
  return $.extend({
    PageSwitcher: function(options) {
      return new PageSwitcher(options);
    }
  });
})(jQuery, window, document);
