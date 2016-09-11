/// <reference path="jquery.d.ts" />

export class Common {
	static apiUrl: string = 'http://192.168.15.8';
	
	static makeAPICall = (data: any, moduleUrl: string, method: string, successCallback: any, successParams: any, errorCallback: any, errorParams: any) => {
	
	
	debugger;
		$.ajax({
      		url: Common.apiUrl + '/' + moduleUrl,      		
      		type: method,
      		data: data,     
      		jsonp: false,
      		jsonpCallback : 'callbackFunction',
	        dataType: 'json',
      		error: (data) => {
      			debugger;
      			errorCallback(data, errorParams);
      		},
	        success: (data) => {
	        	debugger;
        		successCallback(data, successParams);
        	}
	   });
	};
}