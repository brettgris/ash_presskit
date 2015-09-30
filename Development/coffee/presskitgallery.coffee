(($,window,document) ->
	class PressKitGallery
		defaults:
			thumbs: '.thumbs'
			list: '.list'
			attr: 'n'
			current: 0
			viewcontainer: '.container'
			viewer: '.view'
			next: '.next'
			prev: '.prev'
			close: '.close' 
			speed: 1
			selected: 'selected'
			source: '<img src={{path}} />'
			caption: '.image-desc'
			captionsource: '{{caption}}'
			onStart: ->
			onSwitch: ->
			onEnd: ->

		constructor: (el, options) ->
			@options = $.extend({},@defaults,options)
			@$el = $(el)
			@thumbs = @$el.find(@options.thumbs)
			@list = @$el.find(@options.list)
			@viewcontainer = @$el.find(@options.viewcontainer)
			@viewer = @$el.find(@options.viewer)
			@caption = @$el.find(@options.caption)
			@close = @$el.find(@options.close)
			@current = 0;
			@addClickEvents()

		addClickEvents: =>
			@thumbs.click( (evt) =>
				console.log $(evt.target)
				n = Number( $(evt.target).attr(@options.attr) )
				@showViewer( n )	
			)

			@thumbs.children().click (evt) =>
				evt.stopPropagation()
				n = Number( $(evt.target).closest(@options.thumbs).attr(@options.attr) )
				@showViewer( n )
			
			@$el.find(@options.next).click( =>
				n = @current
				n++
				if n==@thumbs.length
					n=0
				@changeTo( n )
			)
			
			@$el.find(@options.prev).click( =>
				n = data.current
				n--
				if n<0
					n=data.thumbs.length-1
				@changeTo( n )
			)
			
			@close.click( =>
				@viewcontainer.hide()
				@list.show()
			)
			
			@viewcontainer.swipe({
				swipeLeft: =>
					@$el.find(@options.next).trigger("click")
				swipeRight: =>
					@$el.find(@options.prev).trigger("click")

			})

		changeTo: (num) =>
			@options.onStart.call( undefined, @thumbs.eq(@current) )

			@viewer.children().fadeOut(@options.speed*1000, =>
				$(this).remove()
				
				@current = num;
				@options.onSwitch.call(undefined, @thumbs.eq(@current))
				
				source = @options.source;
				source = @findandreplace(source, @thumbs.eq(@current))
				@viewer.html(source)
				
				caption = @findandreplace(@options.captionsource, @thumbs.eq(@current) )
				@caption.html( caption )
				
				@viewer.children().hide().fadeIn(@options.speed*1000, =>
					@options.onEnd.call( undefined, @thumbs.eq(@current) )
				)
			)

		showViewer: (num) =>
			@current = num
	    	
			@options.onStart.call( undefined, @thumbs.eq(@current) )
			
			@list.hide()
			@viewer.html("")
			@viewcontainer.show()
			
			source = @options.source

			source = @findandreplace(source, @thumbs.eq(@current))
			console.log @current, @thumbs.eq(@current), source

			@viewer.html(source)
			
			caption = @findandreplace(@options.captionsource, @thumbs.eq(@current) )
			@caption.html( caption )
			
			@viewer.children().hide().fadeIn(@options.speed*1000, =>
				@options.onEnd.call( undefined, @thumbs.eq(@current) )
			)

		findandreplace: (source,target) =>
			arr = source.split('{{')
			
			i = 0
			while i < arr.length
				s = arr[i].split('}}')

				if s.length > 1
	  				s[0] = target.attr(s[0])
	  				
				arr[i] = s.join('')
				i++
			source = arr.join('')
			source

	$.fn.extend PressKitGallery: (options) ->
		@each ->
			$(this).data('PressKitGallery', new PressKitGallery(@,options))

) jQuery, window, document