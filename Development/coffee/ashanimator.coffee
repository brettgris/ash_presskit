(($,TweenMax, window,document) ->
	class AshAnimator
		defaults:
			current: 0,
			item: '.intro-item'
			animate: '.intro-animate'
			animateattr: 'animate'
			speedattr: 'speed'

		constructor: (el, options) ->
			#vars
			@options = $.extend({},@defaults,options)
			@$el = $(el)
			@timeout = setTimeout(1)
			@items = @$el.find(@options.item)
			@current = @options.current
			#methods
			@resize()
			$(window).resize =>
				@resize()
			
		startAnimate: =>
			@animate()

		stopAnimate: =>


		animate: =>
			@items.eq(@current).find(@options.animate).each (i,v) =>
				t = $(v)
				#TweenMax.from(t,t.attr(@options.speedattr),{bottom:'100px'})

		resize: =>
			@$el.height($(window).height()-$('.footer').height()-$('.header').height())
			@items.each (i,v) =>
				t = $(v)
				w = Number(t.attr('w'))
				h = Number(t.attr('h'))
				ww = t.parent().width()
				wh = t.parent().height()
				
				t.css(
					width: w+'px'
					height: h+'px'
					'margin-left': w/-2+'px'
				) 


	$.fn.extend AshAnimator: (options) ->
		@each ->
			$(this).data('AshAnimator', new AshAnimator(@,options)) 

) jQuery, TweenMax, window, document