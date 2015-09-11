(($,window,document) ->
	class PageSwitcher
		defaults:
			links: '.plink'
			mobile: 'mplink'
			pages: '.section'
			bgtarget: 'body'
			bgattr: 'bg'
			bgsize: 'cover'
			attr: 'path'
			speed: 500
			current: 'home'
			mobilebtn: '.mobilelink'
			mobilecontainer: '.mobile-list'
			backgrounds: true
			onChange: ->
		
		constructor: (options) ->
			@options = $.extend({},@defaults,options)
			@links = $(@options.links)
			@mobile = $(@options.mobile)
			@pages = $(@options.pages)
			@target = $(@options.bgtarget)
			@current = @options.current
			@setupPages()
			@addClicks()

		setupPages: =>
			@pages.hide()
			$('.'+@current).show()
			@options.onChange.call(@,  @pages.attr('id') )
			if $('.l'+@current ).length>0
				 @target.css('background', $('.l'+@current ).attr(@options.bgattr) )
				 @target.css('background-size', @options.bgsize);
			else 
				@target.attr( 'style', '' );

		addClicks: =>
			$( @options.links+", "+@options.mobile+", "+@options.logo ).click( (evt) =>
				@loadPage( $(evt.target).attr(@options.attr) )
			)
			
			$( @options.mobilebtn ).click( =>
				c = $( @options.mobilecontainer )
				if c.css('display')!='none'
					c.hide();
				else
					c.slideDown(@options.speed);
			)

		loadPage: (t) =>
			$( @options.mobilecontainer ).hide()

			if @current != t
				$('.'+@current ).fadeOut(@options.speed, => 
					n = $('.'+t).fadeIn(@options.speed)
					@options.onChange.call(@,  $('.'+t).attr('id') )
					@current = t
					if @options.backgrounds
						@target.css('background', $('.l'+@current).attr(@options.bgattr))
						@target.css('background-size', @options.bgsize)
				)
				

	$.extend PageSwitcher: (options) ->
		new PageSwitcher(options)

			
) jQuery, window, document