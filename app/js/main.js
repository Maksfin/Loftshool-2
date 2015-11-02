var AccordeonModule = (function() {

		_setUpListners = function() {
		$('.accordeon__trigger').on('click', _openList);
	},

		_openList = function(e) {
			$this = $(this),
			container = $this.closest('.accordeon__item'),
			list = $this.closest('.accordeon'),
			items = list.find('.accordeon__item'),
			trigger = list.find('.accordeon__trigger'),
			content = container.find('.accordeon__inner'),
			otherContent = list.find('.accordeon__inner'),
			duration = 400;

			if(!container.hasClass('active')) {
					otherContent.stop(true, true).slideUp(duration, function() {
						items.removeClass('active');
					});
					content.stop(true, true).slideDown(duration, function() {
						container.addClass('active');
					});

			} else {
					content.stop(true, true).slideUp(duration, function() {
						container.removeClass('active');
					});
			}

			if($this.hasClass('accordeon__trigger-open')) {
				trigger.removeClass('accordeon__trigger-open')
				.addClass('accordeon__trigger-close');
				 $this.removeClass('accordeon__trigger-open')
				.addClass('accordeon__trigger-close');
			} else {
				trigger.removeClass('accordeon__trigger-open')
				.addClass('accordeon__trigger-close');
				$this.removeClass('accordeon__trigger-close')
			 .addClass('accordeon__trigger-open');

			}
			 return false;
			
	};

	return {
		init : function() {
			_setUpListners();
		}
	};
})();


/*------ Slider ----------*/
var SliderModule = (function() {
  
return {
		init : function() { 
			$( "#slider-range" ).slider({
         range: true,
         min: 1000,
         max: 30000,
         values: [ 5000, 15000 ],
         slide: function( event, ui ) {
             $('.price__input-from')
             .val(ui.values[ 0 ]);
             $('.price__input-to').val(ui.values[ 1 ]);
         }
     });

     $('.price__input-from').val($( "#slider-range" ).slider( "values", 0 ));
     $('.price__input-to').val($( "#slider-range" ).slider( "values", 1 ));	
		}
	};
})();

/*--------- Slide show ----------*/
var SlideShow = (function() {

	var _changeImage = function($this){
		var
			container = $this.closest('.products__slideshow'),
			path = $this.find('img').attr('src'),
			display = container.find('.products__slideshow-display-img');

			$this.closest('.products__slideshow-item').addClass('active')
			.siblings().removeClass('active');

			display.fadeOut(function() {
				$(this).attr('src', path).fadeIn();
					
				});
			};	
	
	return{
		init: function() {
			$('.products__slideshow-link').on('click', function(e){
				e.preventDefault();
				_changeImage($(this));

			})
		}
	}
})();

/*-----Raiting------*/
var RatingModule = (function () {

	var _getStars = function (ratingQuality) {

		var
			starsArray = [];

		for (var i = 0; i < 5; i++) {

					var
						starClassName = (i < ratingQuality) ? 'products__rating-item products__rating-item_active' : 'products__rating-item';

					var		
						star = $('<li>', {
							class : starClassName
						});

					starsArray.push(star);
				}

			return starsArray;
		}

	var _generatorMarkup = function(ratingQuality, elemToAppend) {
		var
			ul = $('<ul>', {
				class : 'products__rating-list',
				html : _getStars(ratingQuality)
		});

		var 
			ratingShow = $('<div>', {
			class : 'products__rating-status',
			text : ratingQuality
		});

		elemToAppend.append([ul, ratingShow]);	
	}

	return {
		init: function () {
			$('.products__rating').each(function() {
				var
					$this = $(this),
					ratingQuality = parseInt($this.data('rating'));

				_generatorMarkup(ratingQuality, $this);

				});
			}
		}	
})();

/*----- Views --------*/
var ViewsChange = (function() {
	var _prevClass = ' ';

	var _changeView = function($this) {
		var 
			item = $this.closest('.sort__view-item'),
			view = item.data('view'),
			list = $('.products__list'),
			modification = 'products__list_',
			classView = modification + view;

			if (_prevClass == ' ') {
				_prevClass = list.attr('class');
			}
			list.attr('class', _prevClass + ' ' + classView);
	};

	var _activeClass = function($this) {

		$this.closest('.sort__view-item').addClass('active')
				.siblings().removeClass('active');
	}

	return {
		init: function() {
			$('.sort__view-link').on('click', function(e) {
				e.preventDefault();
					_changeView($(this));
					_activeClass($(this));
			});
		}
	}
})();


$(document).ready(function($) {

	$('.accordeon__reset').on('click', function(e){
 		e.preventDefault();
 		var
 			$this = $(this),
 			container = $this.closest('.accordeon__item'),
 			checkbox = container.find('input:checkbox');

 			checkbox.each(function(){
 				$(this).removeProp('checked');
 		});
 	});


if ($('.accordeon').length) {
 	AccordeonModule.init();
 }

 if ($('#slider-range').length) {
 	SliderModule.init();
 }

 if ($('.products__rating').length) {
 	RatingModule.init();
 }

 if ($('.sort__select-item').length) {
 	$('.sort__select-item').select2({
 		minimumResultsForSearch: Infinity
 	});
 }

 if ($('.products__list').length) {
 	ViewsChange.init();
 }

 if ($('.products__slideshow-display').length) {
 	SlideShow.init();
 }

 $('.important__text').columnize({
 		width:550
 });

}); // --> end
 