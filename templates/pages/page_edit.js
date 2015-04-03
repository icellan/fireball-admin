Template.admin_page_edit.helpers({
	pageSettings: function() {
		var self = this;
		var pageSettings = [];
		var c = 0;
		_.each(Fireball.pageConfiguration, function(options, key) {
			var data = {};
			data[key] = Fireball.getSetting(key, self.page.settings);
			pageSettings.push({
				id: key,
				counter: c++,
				data: data,
				options: options
			});
		});
		console.log('pageSettings ', pageSettings);
		return pageSettings;
	}
});

Template.admin_page_edit.events({
	"click .savePage": function(e) {
		e.preventDefault();
		var pageData = $('form[name="general"]').serializeObject();
		pageData.name = pageData.title.toLowerCase().replace(/[^a-z0-9]/g, '_');

		var pageComponents = $('form[name="components"]').serializeObject();
		if (pageComponents) {
			pageData.components = pageComponents.components;
		} else {
			pageData.components = [];
		}

		pageData.settings = {};
		_.each(Fireball.pageConfiguration, function(options, key) {
			var pageSettings = $('form[name="pageSettings_' + key + '"]').serializeObject();
			pageData.settings[key] = pageSettings[key];
		});

		pageData.editedBy = Meteor.userId();
		pageData.editedAt = new Date();

		Fireball.Pages.update({
			_id: this.page._id
		},{
			$set: pageData
		});
		Router.go('/admin/pages');
	}
});

Template.admin_page_edit_components.rendered = function() {
};

Template.admin_page_edit_components.helpers({
	components: function() {
		var self = this;
		var components = [];
		var c = 0;
		_.each(this.page.components, function(comp) {
			comp.pageId = self.page._id;
			comp.c = c++;
			components.push(comp);
		});

		return components;
	},
	sortableOptions: function() {
		return {
			handle: '.sortable-item-type',
			helper: 'clone',
			store: false,
			// event handler for reordering attributes
			onSort: function (event, ui) {
				var pageId = event.data.pageId;
				var page = Fireball.Pages.findOne({
					_id: pageId
				});
				// resort
				var newComponents = _.clone(page.components);
				newComponents.move(event.oldIndex, event.newIndex);

				//save
				Tracker.nonreactive(function() {
					Fireball.Pages.update({
						_id: pageId
					}, {
						$set: {
							components: newComponents
						}
					});
				});
			}
		};
	},
	templateName: function() {
		return this.template + '_edit';
	},
	addComponentCallback: function() {
		return function() {
			var template = $('select[name="componentType"]').val();
			Fireball.Pages.update({
				_id: this.pageId
			},{
				$push: {
					components: {
						$each: [
							{
								template: template,
								settings: {}
							}
						]
					}
				}
			});
		};
	},
	availableTemplates: function() {
		return Fireball.templates;
	}
});

Template.admin_page_edit_components.events({
	"click .removeComponent": function(e) {
		e.preventDefault();
		var pageId = e.currentTarget.id;
		Fireball.Pages.update({
			_id: pageId
		},{
			$pull: {
				components: {
					template: this.template,
					settings: this.settings
				}
			}
		},{
			multi: true
		});
	}
});

Template.admin_page_edit_components_box.rendered = function() {
	$.AdminLTE.boxWidget.activate();
};

Template.admin_page_edit_components_box.helpers({
	templateDefinition: function() {
		var templateDefinition = _.findWhere(Fireball.templates, {template: this.template, type: 'component'});

		var data = {};
		data['components'] = {};
		data['components'][this.c] = {};
		data['components'][this.c]['settings'] = this.settings;
		var settings = {
			id: 'components[' + this.c + '][settings]',
			counter: 0,
			data: data,
			options: templateDefinition
		};
		console.log(settings);

		return settings;
	}
});
