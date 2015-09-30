$ ->
	init = ->
		$(window).resize(resize)
		resize()
		startAnimator()
		$.PageSwitcher({
			links: '.plink'
			mobile: '.mplink'
			pages: '.section'
			attr: 'path'
			bgtarget: 'body'
			bgattr: 'bg'
			speed: 250
			mobilebtn: '.mobile-link'
			mobilecontainer: '.mobile-menu'
			logo: '.logo'
			backgrounds: true
			current: 'keyart'
			onChange: (t) ->
				if t=="intro"
					$('.intro').data('AshAnimator').startAnimate()
				else
					$('.intro').data('AshAnimator').stopAnimate()
		})
		loadSlideShows()
		loadGalleries()

	startAnimator = ->
		$('.intro').AshAnimator({
			perspective: 900
			delay: 10000
			ease: Power2.easeOut
			current: 0
		})

	loadSlideShows = ->		
		$('.cast').PressKitSlideShow({
			thumbs:'.t-cast'
			items:'.character'
			next: '.cast-next'
			prev: '.cast-prev'
			speed: .5
			selected: 'selected'
			directional: true
		})
		
		$('.production').PressKitSlideShow({
			thumbs:'.t-prod'
			items:'.prod'
			next: '.prod-next'
			prev: '.prod-prev'
			speed: .5
			selected: 'selected'
			directional: true
			onSwitch:  (next) ->
				if next.attr("image")=="true"
					$('.prod-arrows').addClass("withimage")
				else 
					$('.prod-arrows').removeClass("withimage")

		})

	loadGalleries = ->
		$('.gallery').PressKitGallery({
			thumbs:'.gallery-item'
			list: '.gallery-list'
			viewcontainer: '.gallery-view'
			viewer:'.image-view'
			next: '.g-next'
			prev: '.g-prev'
			close: '.g-close'
			speed: .5
			selected: 'selected'
			source: '<img src="{{path}}" />'
			caption: '.image-desc'
			captionsource: '{{caption}}'
		})
			
		$('.videos').PressKitGallery({
			thumbs:'.video-item'
			list: '.video-items'
			viewcontainer: '.video-container'
			viewer:'.videoplayer-content'
			close: '.closevideo'
			speed: .5
			selected: 'selected'
			source: '<iframe src="{{path}}?footer=false&amp;cid=010815ots1tr1" width="100%" height="100%" frameborder="0"></iframe>'
			path: 'path'
			caption: '.player-copy'
			captionsource: '<div class="video-name">{{name}}</div><div class="video-desc">{{desc}}</div>'
		})

	resize = ->
		ww = $(window).width();
		wh = $(window).height();
		fh = $('.footer').height();
		ct = Number( $('.content').css('top').slice(0,-2) );
		ah = wh-fh-ct;
		$('.keyart').height(ah);

	init()
