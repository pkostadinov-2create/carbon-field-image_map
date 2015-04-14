<?php
/*
Plugin Name: Carbon Field: image_map
Description: Extends base Carbon fields with a image_map field. 
Version: 1.0.0
*/

/**
 * Set text domain
 * @see https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
 */
load_plugin_textdomain('carbon-field-image-map', false, dirname( plugin_basename(__FILE__) ) . '/languages/'); 

/**
 * Hook field initialization
 */
add_action('after_setup_theme', 'crb_init_carbon_field_image_map', 15);
function crb_init_carbon_field_image_map() {
	if (class_exists("Carbon_Field")) {
		include_once dirname(__FILE__) . '/Carbon_Field_Image_Map.php';
	}
}
