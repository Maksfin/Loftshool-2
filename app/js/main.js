var myModule = (function() {

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

	 var _slider = function () {
        $( "#slider-range" ).slider({
            range: true,
            min: 1000,
            max: 30000,
            values: [ 5000, 15000 ],
            slide: function( event, ui ) {
                $('.price__input-from').val(ui.values[ 0 ]);
                $('.price__input-to').val(ui.values[ 1 ]);
            }
        });

        $('.price__input-from').val($( "#slider-range" ).slider( "values", 0 ));
        $('.price__input-to').val($( "#slider-range" ).slider( "values", 1 ));
    }
	// публичные св-ва и методы
	return {
		init : function() {
			_setUpListners();
			_slider();
		}
	};
})();

$(document).ready(function($) {
	
if ($('.accordeon').length) {
 	myModule.init();
 }
 
}); // --> end
 