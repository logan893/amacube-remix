/*
This file is part of the amacube Roundcube plugin
Copyright (C) 2013, Alexander Köb

Licensed under the GNU General Public License version 3. 
See the COPYING file for a full license statement.          

*/
var settings = { sort_by: 'priority',
								 sort_order: 'ASC',
							 };
						
$( document ).ready(function() {
  update_thead_width();
});

$( window ).resize(function() {
  update_thead_width();
});

if (window.rcmail) {
	// Register Event Listeners
	rcmail.addEventListener( 'plugin.response_wblist', response_wblist );
	
  rcmail.addEventListener('init', function(evt) {
				rcmail.register_command('plugin.request_add_entry', request_add_entry, true);
				rcmail.register_command('plugin.request_delete_entry', request_delete_entry, true);
				rcmail.register_command('plugin.request_sort_by', request_sort_by, true );
  });
	
	// Populate Quarantine Table
		request_initialize();
}

// Helper Functions
function set_wblist_loading_state() {
		// Clear Contents
		$( 'table#messagelist tbody' ).html( '' );
		
		// Enable Loader Icon
		$( 'div#messagelist' ).addClass( 'loading' );
}

function set_wblist_loaded_state( content ) {
		// Disable Loader Icon
		$( 'div#messagelist' ).removeClass( 'loading' );
		
		// Write Response
		$( 'table#messagelist tbody' ).html( content );
}

function update_thead_width() {
	$( "div#messagelist table.fixedcopy" ).css( 'width', $( "table#messagelist" ).css( 'width' ) );
}

function update_sort_arrows( sender, order ) {
	$( 'div#messagelist table.fixedcopy thead tr td a' ).addClass( 'ac_sort_none' ).removeClass( 'ac_sort_desc' ).removeClass( 'ac_sort_asc');
		
	switch( order ) {
		case 'ASC':
			$( sender ).removeClass( 'ac_sort_none' ).addClass( 'ac_sort_asc' );
			break;
		case 'DESC':
			$( sender ).removeClass( 'ac_sort_none' ).addClass( 'ac_sort_desc' );
			break;
	}
}

// Request Handlers
function request_initialize() {
	set_wblist_loading_state();
	rcmail.http_post( 'plugin.request_ajax', { action: 'show_wblist', settings: settings} );
}

function request_add_entry() {
	var wblist_priority = $( 'form#amacube_wblist_form input[name=_wblist_priority]' ).val();
	var wblist_policy = $( 'form#amacube_wblist_form select[name=_wblist_policy] option:selected' ).val();
	var wblist_address = $( 'form#amacube_wblist_form input[name=_wblist_address]' ).val();
	
	set_wblist_loading_state();
	rcmail.http_post( 'plugin.request_ajax', { action: 'add_entry', settings: settings, address: wblist_address, priority: wblist_priority, policy: wblist_policy } );
}

function request_delete_entry( sender ) {
	var value = 0;
	
	if( $( sender ).parent() && $( sender ).parent().attr( 'id' ) )
		value = $( sender ).parent().attr( 'id' );
		
	set_wblist_loading_state();
	rcmail.http_post( 'plugin.request_ajax', { action: 'delete_entry', settings: settings, sender_id: value } );
}

function request_sort_by( sender ) {
	switch( $( sender ).attr( 'id' ) ) {
		case 'sort_by_policy':
			if( settings['sort_by'] == 'policy' ) {
				settings['sort_order'] = ( settings['sort_order'] == 'ASC' ) ? 'DESC' : 'ASC';
			} else {
				settings['sort_by'] = 'policy';
				settings['sort_order'] = 'ASC';
			}
			
			update_sort_arrows( sender, settings['sort_order'] );
			break;
		case 'sort_by_priority':
			if( settings['sort_by'] == 'priority' ) {
				settings['sort_order'] = ( settings['sort_order'] == 'ASC' ) ? 'DESC' : 'ASC';
			} else {
				settings['sort_by'] = 'priority';
				settings['sort_order'] = 'ASC';
			}
			
			update_sort_arrows( sender, settings['sort_order'] );
			break;
		case 'sort_by_sender':
			if( settings['sort_by'] == 'sender' ) {
				settings['sort_order'] = ( settings['sort_order'] == 'ASC' ) ? 'DESC' : 'ASC';
			} else {
				settings['sort_by'] = 'sender';
				settings['sort_order'] = 'ASC';
			}
			
			update_sort_arrows( sender, settings['sort_order'] );
			break;
		default:
			return;
	}
	
	set_wblist_loading_state();
	rcmail.http_post( 'plugin.request_ajax', { action: 'show_wblist', settings: settings} );
}

// Response Handlers
function response_wblist( response ) {
	if( response.raw ) {
		set_wblist_loaded_state( response.raw );
		
		// Reset Form Fields
		$( 'form#amacube_wblist_form input[name=_wblist_priority]' ).val( '' );
		$( 'form#amacube_wblist_form input[name=_wblist_address]' ).val( '' );
		$( 'form#amacube_wblist_form select[name=_wblist_policy] option:selected' ).removeAttr( 'selected' );
	}
}