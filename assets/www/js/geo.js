function getCurrentPosition() {
	PhoneGap.exec(geoNameSuccess, geoNameFailure, "NearMePlugin", "startNearMeActivity", [preferencesDB.get('language')]);
}

function geoNameSuccess(wikipediaUrl) {
	if(wikipediaUrl) {
		$('#search').addClass('inProgress');
		$.ajax({url: "https://en.m.wikipedia.org",
			success: function(data) {
				if(data) {
					app.navigateToPage('https://'+wikipediaUrl)
				} else {
					chrome.showNoConnectionMessage();
					navigator.app.exitApp();
				}
			},
			error: function(xhr) {
				chrome.showNoConnectionMessage();
			},
			timeout: 3000
		});
	}
}

function geoNameFailure(error) {
	console.log(error);
	alert('Google Maps service is not available on this device.');
}
