Template.admin_template_options.helpers({
	options: function() {
		var self = this;
		var options = [];
		_.each(this.options.settings, function(option, key) {
			var id = self.id ? self.id + '[' + key + ']' : key;
			options.push({
				templateName: 'admin_template_options_' + option.type,
				templateData: {
					id: id,
					value: Fireball.getSetting(id, self.data),
					option: option,
					data: self.data
				}
			})
		});
		return options;
	},
	value: function() {
		return Fireball.getSetting(this.id, this.data);
	}
});

Template.admin_template_options_html.rendered = function() {
	$('.editable').editable({
		success: function(response, newValue) {
			//<do something with newValue - usually a collection.update call>
		}
	});
};

Template.admin_template_options_parent.helpers({
	children: function() {
		var options = [];
		var self = this;
		_.each(this.option.children, function(option, key) {
			var id = self.id ? self.id + '[' + key + ']' : key;
			options.push({
				templateName: 'admin_template_options_' + option.type,
				templateData: {
					id: id,
					value: Fireball.getSetting(id, self.data),
					option: option,
					data: self.data
				}
			})
		});

		return options;
	}
});