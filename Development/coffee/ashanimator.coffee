(($,TweenMax, Modernizr, window,document) ->
	class AshAnimator
		defaults:
			current: 0,
			arrows: '.intro-arrows'
			item: '.intro-item'
			animate: '.intro-animate'
			animateattr: 'animate'
			setattr: 'set'
			initattr: 'init'
			delayattr: 'delay'
			backgroundattr: 'bg'
			threedimensionalclass: 'threedimensional'
			idattr: 'n'
			perspective: 1000
			ease: Back.easeOut.config(1)
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
			@$el.css(
				'background': @items.eq(@current).attr(@options.backgroundattr)
				'background-size': 'contain'
			)
			@count = 0
			@length = @items.eq(@current).find(@options.animate).length
			@isAnimating = true;
			@items.eq(@current).find(@options.animate).each @animateEachItem

		animateEachItem: (i,v) =>
			t = $(v).hide()
			target = t.find('div')
			animateArr = JSON.parse(t.attr(@options.animateattr))
			setObj = JSON.parse(t.attr(@options.setattr))

			TweenMax.set(t,{perspective:@options.perspective, transformStyle:"preserve-3d"})
			tl = new TimelineLite({delay:t.attr(@options.delayattr)})
			tl.set(target, setObj)

			tl.call( =>
				t.show()
			)
			for obj in animateArr
				s = obj['speed']
				delete obj['speed']
				e = obj['ease']
				if e=="Rough"
					obj.ease = RoughEase.ease.config({ template: Power0.easeNone, strength: 0.7, points: 10, taper: "none", randomize: true, clamp: true})
				else
					obj.ease = @options.ease
				if obj['hide'] != undefined
					target.eq(0).hide()
					target.eq(1).show()
					obj.onUpdate = (t,d) =>
						y = t.target.eq(0).prop('_gsTransform').rotationY
						if y <= -90 && target.eq(0).css('display')=="none"
							target.eq(0).show()
							target.eq(1).hide()
					obj.onUpdateParams = ["{self}",target]
					delete obj['hide']
				if obj['zIndex']
					obj.onStart = (t,z) =>
						TweenMax.set(t,{"zIndex":z})
					obj.onStartParams = [t,obj['zIndex']]
					delete obj['zIndex']
				tl.to(target,s,obj)
			tl.call( =>
				@itemDone( t.parent() )
			)

		changeTo: (next) =>
			@items.eq(@current).hide()
			@items.eq(@current).find(@options.animate).each (i,v) =>
				TweenMax.set( $(v), {'zIndex':0} )
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
				ww = @$el.width()-100
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
				aw = ew+90;
				a.css(
					'width': aw+'px'
					'margin-left': aw/-2+'px'
					'top': et+eh/2-a.height()/2+'px'
				)


	$.fn.extend AshAnimator: (options) ->
		@each ->
			$(this).data('AshAnimator', new AshAnimator(@,options)) 

) jQuery, TweenMax, Modernizr, window, document