$.fn.uploadValidation = function(callback) {
	var result = {
		notfound: [],
		found: [],
		status: "",
		status_code: 0,
		not_found_message: ""
	};

	var jqueryObj = $(this);
	if (jqueryObj.length > 0) {
		var p1 = new Promise(function(resolve, reject) {
			var filesReady = jqueryObj.filter(function(){ 
				return (this.files !== null && this.files.length > 0 );
			});
			
			// all files empty
			if (filesReady.length == 0) {
				resolve();
			} else {
				filesReady.each(function(i, o) {
					var f = this.files[0];
					var r = new FileReader();
					r.onload = function(e) {
						result.found.push(f.name);
					}	
					r.onerror = function(e) {
						result.notfound.push(f.name);
					}
					r.onloadend = function() {					
						if (i === (filesReady.length - 1) ) {
							resolve();
						}
					}
					r.readAsArrayBuffer(f);
				});
			}
		});
		p1.then(function(){
			if (result.notfound.length > 0) {
				result.not_found_message = "<br> - File not found:";
				$.each(result.notfound, function(i, o) { 
					result.not_found_message += "<br>\xa0\xa0 \u2022 " + o;
				});
			}
			callback(result);
		});
	} else {
		result.status = "JQuery selector not found";
		result.status_code = 1;
		callback(result);		
	}
}