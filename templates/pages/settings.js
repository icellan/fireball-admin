Template.admin_settings.helpers({
	siteSettings: function() {
		var siteSettings = [];
		var c = 0;
		_.each(Fireball.configuration, function(options, key) {
			var data = {};
			data[key] = Fireball.getSiteSetting(key);
			siteSettings.push({
				id: key,
				counter: c++,
				data: data,
				options: options
			});
		});
		console.log('siteSettings ', siteSettings);
		return siteSettings;
	}
});

Template.admin_settings.events({
	"click .saveSiteSettings, submit .siteSettingsForm": function(e) {
		e.preventDefault();
		var siteSettings = $('form#siteSettingsForm').serializeObject();
		Meteor.call('saveSiteSettings', siteSettings, function(err, res){
			if (err) {
				alert(err);
			} else {
				alert('Site settings saved');
			}
		});
	}
});
