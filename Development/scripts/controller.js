$(function(){var e,t,i,r,o;return e=function(){return $(window).resize(r),r(),o(),$.PageSwitcher({links:".plink",mobile:".mplink",pages:".section",attr:"path",bgtarget:"body",bgattr:"bg",speed:250,mobilebtn:".mobile-link",mobilecontainer:".mobile-menu",logo:".logo",backgrounds:!0,current:"downloads",onChange:function(e){return"intro"===e?$(".intro").data("AshAnimator").startAnimate():$(".intro").data("AshAnimator").stopAnimate()}}),i(),t()},o=function(){return $(".intro").AshAnimator({perspective:900,delay:1e4,ease:Power2.easeOut,current:0})},i=function(){return $(".cast").PressKitSlideShow({thumbs:".t-cast",items:".character",next:".cast-next",prev:".cast-prev",speed:.5,selected:"selected",directional:!0}),$(".production").PressKitSlideShow({thumbs:".t-prod",items:".prod",next:".prod-next",prev:".prod-prev",speed:.5,selected:"selected",directional:!0,onSwitch:function(e){return"true"===e.attr("image")?$(".prod-arrows").addClass("withimage"):$(".prod-arrows").removeClass("withimage")}})},t=function(){return $(".gallery").PressKitGallery({thumbs:".gallery-item",list:".gallery-list",viewcontainer:".gallery-view",viewer:".image-view",next:".g-next",prev:".g-prev",close:".g-close",speed:.5,selected:"selected",source:'<img src="{{path}}" />',caption:".image-desc",captionsource:"{{caption}}"}),$(".videos").PressKitGallery({thumbs:".video-item",list:".video-items",viewcontainer:".video-container",viewer:".videoplayer-content",close:".closevideo",speed:.5,selected:"selected",source:'<iframe src="{{path}}?footer=false&amp;cid=010815ots1tr1" width="100%" height="100%" frameborder="0"></iframe>',path:"path",caption:".player-copy",captionsource:'<div class="video-name">{{name}}</div><div class="video-desc">{{desc}}</div>'})},r=function(){var e,t,i,r,o;return o=$(window).width(),r=$(window).height(),i=$(".footer").height(),t=Number($(".content").css("top").slice(0,-2)),e=r-i-t,$(".keyart").height(e)},e()});