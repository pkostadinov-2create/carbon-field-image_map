window.carbon = window.carbon || {};

(function($) {
	var carbon = window.carbon;
	var crb_image_map = $('.crb_image_map');
	var $win = $(window);

	if (typeof carbon.fields === 'undefined') {
		return false;
	}

	/*
	|--------------------------------------------------------------------------
	| ImageMap Field MODEL
	|--------------------------------------------------------------------------
	|
	| This class represents the model for the field.
	|
	| A model is responsible for holding the fields current state (data).
	| It also has all the logic surrounding the data management, like: 
	|  - conversion
	|  - validation
	|  - access control
	|
	*/
	carbon.fields.Model.ImageMap = carbon.fields.Model.extend({
		initialize: function() {
			carbon.fields.Model.prototype.initialize.apply(this);  // do not delete
		},
	});

	/*
	|--------------------------------------------------------------------------
	| ImageMap Field VIEW
	|--------------------------------------------------------------------------
	|
	| Holds the field DOM interactions (rendering, error state, etc..).
	| The field view also SYNCs the user entered data with the model.
	|
	| Views reflect what the applications data models look like.
	| They also listen to events and react accordingly.
	|
	| @element: .[id]
	| @holder:  carbon.views[id]
	|
	*/
	carbon.fields.View.ImageMap = carbon.fields.View.extend({
		// Add the events from the parent view and also include new ones
		events: function() {
			return _.extend({}, carbon.fields.View.prototype.events, {
				'click .crb_image_map': 'movePointer',
			});
		},

		initialize: function() {
			// Initialize the parent view
			carbon.fields.View.prototype.initialize.apply(this); // do not delete

			// Wait for the field to be added to the DOM and run an init method
			this.on('field:rendered', this.initField);
		},

		/*
		 * Initialize the code responsible for the DOM manipulations
		 */
		initField: function() {
			// Add your logic here
			var parent			= this.$el,
				$this			= parent.find('.crb_image_map'),
				marker_position = parent.find('input').val();

			if (marker_position && strpos(marker_position, ':') ) {
				var position 	= marker_position.split(":"),
					marker 		= parent.find('span');

				marker.animate({
					'left' 	: position[0] + '%',
					'top' 	: position[1] + '%'
				}, 250)
			};
		},

		movePointer: function() {
			var parent 		= this.$el,
				input_field = parent.find('input'),
				marker 		= parent.find('span'),
				img 		= parent.find('img'),
				img_width 	= img.width(),
				img_height 	= img.height();

			if (input_field.length) {
				// retrieve the click location
				pos_x = event.offsetX ? event.offsetX : event.originalEvent.layerX; // firefox offsetX -> fixed
				pos_x = pos_x - marker.width()/2; 									// remove 50% marker width
				pos_y = event.offsetY ? event.offsetY : event.originalEvent.layerY; // firefox offsetY -> fixed
				pos_y = pos_y - 11; //marker.height()/2; 							// remove 50% marker width
				pos_x_percents = (pos_x * 100) / img_width;
				pos_y_percents = (pos_y * 100) / img_height;

				input_field.val( pos_x_percents + ':' +  pos_y_percents);
				marker.animate({
					'left' 	: pos_x_percents + '%',
					'top' 	: pos_y_percents + '%'
				}, 250)
			};
		},
	});

	function strpos (haystack, needle, offset) {
		var i = (haystack+'').indexOf(needle, (offset || 0));
		return i === -1 ? false : i;
	}
}(jQuery));