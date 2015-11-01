var AccordeonModule = (function() {

	// прослушка событий
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

	// публичные методы
	return {
		init : function() {
			_setUpListners();
		}
	};
})();

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

	var _generatorMarkup = function (ratingQuality, elemToAppend) {
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
			$('.products__rating').each(function () {
				var
					$this = $(this),
					ratingQuality = parseInt($this.data('rating'));

				_generatorMarkup(ratingQuality, $this);

				});
			}
		}	
})();

$(document).ready(function($) {
	
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
}); // --> end
 