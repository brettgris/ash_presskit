$(function() {
  var init, loadGalleries, loadSlideShows, resize, startAnimator;
  init = function() {
    $(window).resize(resize);
    resize();
    startAnimator();
    $.PageSwitcher({
      links: '.plink',
      mobile: '.mplink',
      pages: '.section',
      attr: 'path',
      bgtarget: 'body',
      bgattr: 'bg',
      speed: 250,
      mobilebtn: '.mobile-link',
      mobilecontainer: '.mobile-menu',
      logo: '.logo',
      backgrounds: true,
      current: 'intro',
      onChange: function(t) {
        if (t === "intro") {
          return $('.intro').data('AshAnimator').startAnimate();
        } else {
          return $('.intro').data('AshAnimator').stopAnimate();
        }
      }
    });
    loadSlideShows();
    return loadGalleries();
  };
  startAnimator = function() {
    return $('.intro').AshAnimator({
      perspective: 900,
      delay: 5000,
      ease: Power2.easeOut,
      current: 0
    });
  };
  loadSlideShows = function() {
    $('.cast').PressKitSlideShow({
      thumbs: '.t-cast',
      items: '.character',
      next: '.cast-next',
      prev: '.cast-prev',
      speed: .5,
      selected: 'selected',
      directional: true
    });
    return $('.production').PressKitSlideShow({
      thumbs: '.t-prod',
      items: '.prod',
      next: '.prod-next',
      prev: '.prod-prev',
      speed: .5,
      selected: 'selected',
      directional: true,
      onSwitch: function(next) {
        if (next.attr("image") === "true") {
          return $('.prod-arrows').addClass("withimage");
        } else {
          return $('.prod-arrows').removeClass("withimage");
        }
      }
    });
  };
  loadGalleries = function() {
    $('.gallery').PressKitGallery({
      thumbs: '.gallery-item',
      list: '.gallery-list',
      viewcontainer: '.gallery-view',
      viewer: '.image-view',
      next: '.g-next',
      prev: '.g-prev',
      close: '.g-close',
      speed: .5,
      selected: 'selected',
      source: '<img src="{{path}}" />',
      caption: '.image-desc',
      captionsource: '{{caption}}'
    });
    return $('.videos').PressKitGallery({
      thumbs: '.video-item',
      list: '.video-items',
      viewcontainer: '.video-container',
      viewer: '.videoplayer-content',
      close: '.closevideo',
      speed: .5,
      selected: 'selected',
      source: '<iframe src="{{path}}?footer=false&amp;cid=010815ots1tr1" width="100%" height="100%" frameborder="0"></iframe>',
      path: 'path',
      caption: '.player-copy',
      captionsource: '<div class="video-name">{{name}}</div><div class="video-desc">{{desc}}</div>'
    });
  };
  resize = function() {
    var ah, ct, fh, wh, ww;
    ww = $(window).width();
    wh = $(window).height();
    fh = $('.footer').height();
    ct = Number($('.content').css('top').slice(0, -2));
    ah = wh - fh - ct;
    return $('.keyart').height(ah);
  };
  return init();
});
