"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/281

module.exports = new ZwaveDriver( path.basename(__dirname), {
	//debug: true,
	capabilities: {
		'onoff': {
			'command_class'				: 'COMMAND_CLASS_SWITCH_BINARY',
			'command_get'				: 'SWITCH_BINARY_GET',
			'command_get_cb'			: false,
			'command_set'				: 'SWITCH_BINARY_SET',
			'command_set_parser'		: function( value ){
				return {
					'Switch Value': value
				}
			},
			'command_report'			: 'SWITCH_BINARY_REPORT',
			'command_report_parser'		: function( report ){
				return report['Value'] === 'on/enable';
			},
			'pollInterval': "poll_interval"
		},
		'meter_power': {
			'command_class'				: 'COMMAND_CLASS_METER',
			'command_get'				: 'METER_GET',
			'command_get_cb'			: false,
			'command_get_parser'		: function(power){
				return {
					'Properties1': {
						'Scale': 0
					}
				}
			},
			'command_report'			: 'METER_REPORT',
			'command_report_parser'		: function( report ) {
				return report['Meter Value (parsed)'];
				
			},
			'pollInterval': "poll_interval"
		}
	},
	settings: {}
})