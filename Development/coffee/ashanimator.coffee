(($,TweenMax, Modernizr, window,document) ->
	class AshAnimator
		defaults:
			current: 0,
			arrows: '.intro-arrows'
			item: '.intro-item'
			animate: '.intro-animate'
			animateattr: 'animate'
			initattr: 'init'
			speedattr: 'speed'
			delayattr: 'delay'
			threedimensionalclass: 'threedimensional'
			idattr: 'n'
			perspective: 900
			ease: Back.easeOut.config(1.2)
			delay: 5000

		constructor: (el, options) ->
			#vars
			@options = $.extend({},@defaults,options)
			@$el = $(el)
			@timeout
			@items = @$el.find(@options.item)
			@current = @options.current
			@visible = false
			@isAnimating = false
			@threed = Modernizr.csstransforms3d
			
			#methods
			@resize()
			$(window).resize =>
				@resize()
			$(@options.arrows).find('a').click( @arrowClick )
			
		startAnimate: =>
			@visible = true
			@items.eq(@current).show()
			@animate()

		stopAnimate: =>
			@visible = false
			@items.eq(@current).hide()
			clearTimeout( @timeout )

		arrowClick: (evt) =>
			if @isAnimating == false
				t = $(evt.target)
				if t.hasClass('next')
					@nextItem()
				else if t.hasClass('prev')
					@prevItem()

		nextItem: =>
			clearTimeout( @timeout )
			next = @current+1
			if next==@items.length then next = 0
			@changeTo(next)

		prevItem: =>
			clearTimeout( @timeout )
			next = @current-1
			if next<0 then next = @items.length-1
			@changeTo(next)

		animate: =>
			@count = 0
			@length = @items.eq(@current).find(@options.animate).length
			@isAnimating = true;
			@items.eq(@current).find(@options.animate).each (i,v) =>
				t = $(v).hide()
				ani = JSON.parse(t.attr(@options.animateattr))
				ani.ease = @options.ease
				if !@threed then ani = {opacity:0}
				ani.onComplete = @itemDone
				
				tl = new TimelineLite({delay:t.attr(@options.delayattr)})
				if @threed then TweenMax.set(t,{perspective:@options.perspective})
				target = t.find('div')
				tl.call =>
					t.show()
					ani.onCompleteParams = [t.parent()]
					TweenMax.from(target,t.attr(@options.speedattr),ani)

		changeTo: (next) =>
			@items.eq(@current).hide()
			@current = next
			@items.eq(@current).show()
			@animate()

		itemDone: (container) =>
			if ( Number(container.attr(@options.idattr))==@current) 
				@count++
				if @count==@length && @visible
					@isAnimating = false
					@timeout = setTimeout(=>
						@nextItem()
					,@options.delay)

		resize: =>

			@$el.height($(window).height()-$('.footer').height()-$('.header').height())
			@items.each (i,v) =>
				t = $(v)
				w = Number(t.attr('w'))
				h = Number(t.attr('h'))
				ww = @$el.width()-78
				wh = @$el.height()
				ir = w/h
				wr = ww/wh
				if w<ww and h<wh
					ew = w
					eh = h
					et = (wh-h)/2
				else if w<ww and h>wh
					eh = wh
					ew = ir*eh
					et = 0
				else if w>ww and h<wh
					ew = ww
					eh = ew/ir
					et = (wh-eh)/2
				else 
					if ir>wr
						ew = ww
						eh = ew/ir
						et = (wh-eh)/2
					else
						eh = wh
						ew = ir*eh
						et = 0
				t.css(
					width: ew+'px'
					height: eh+'px'
					'margin-left': ew/-2+'px'
					'top': et+'px'
				)
				a = $(@options.arrows);
				aw = ew+68;
				a.css(
					'width': aw+'px'
					'margin-left': aw/-2+'px'
					'top': et+eh/2-a.height()/2+'px'
				)


	$.fn.extend AshAnimator: (options) ->
		@each ->
			$(this).data('AshAnimator', new AshAnimator(@,options)) 

) jQuery, TweenMax, Modernizr, window, document