<?php

class Carbon_Field_Image_Map extends Carbon_Field {
	/*
	 * Properties
	 */
	// protected $image_map_src;
	protected $image_map_src = '';

	/**
	 * to_json()
	 * 
	 * You can use this method to modify the field properties that are added to the JSON object.
	 * The JSON object is used by the Backbone Model and the Underscore template.
	 * 
	 * @param bool $load  Should the value be loaded from the database or use the value from the current instance.
	 * @return array
	 */
	function to_json($load) {
		$field_data = parent::to_json($load); // do not delete

		if ( empty($this->image_map_src) ) {
			$page_id = get_the_id();
			if ( has_post_thumbnail($page_id) ) {
				$this->image_map_src = crb_wp_get_attachment_image_src(get_post_thumbnail_id($page_id), 'crb_map_inner_images');
			}
		}

		$field_data = array_merge($field_data, array(
			'image_map_src' => $this->image_map_src,
		));


		return $field_data;
	}

	/**
	 * template()
	 *
	 * Prints the main Underscore template
	 **/
	function template() {
		?>
		<input id="{{{ id }}}" type="hidden" name="{{{ name }}}" value="{{ value }}" class="regular-text" />

		<div class="crb_image_map" id="<?php echo time(); ?>">
			<div>
				<span>&nbsp;</span>
				<img src="{{{ image_map_src }}}" />
			</div>
		</div>

		<% if (image_map_src) { %>
		<% } %>
		
		<?php
	}

	/**
	 * admin_enqueue_scripts()
	 * 
	 * This method is called in the admin_enqueue_scripts action. It is called once per field type.
	 * Use this method to enqueue CSS + JavaScript files.
	 * 
	 */
	function admin_enqueue_scripts() {
		$template_dir = get_template_directory_uri();

		# Enqueue JS
		crb_enqueue_script('carbon-field-image-map', $template_dir . '/includes/Carbon_Field_Image_Map/js/field.js', array('carbon-fields'));

		# Enqueue CSS
		crb_enqueue_style('carbon-field-image-map', $template_dir . '/includes/Carbon_Field_Image_Map/css/field.css');
	}

	function set_image($url) {
		$this->image_map_src = $url;
		return $this;
	}
}
