Router.route('/admin', {
	name: 'admin_home',
	controller: RouteController.extend({
		layoutTemplate: 'AdminLayout',
		template: 'admin_home'
	})
});

Router.route('/admin/settings', {
	name: 'admin_settings',
	controller: RouteController.extend({
		layoutTemplate: 'AdminLayout',
		template: 'admin_settings',

		waitOn: function () {
			return [
				Meteor.subscribe('settings')
			];
		}
	})
});

Router.route('/admin/pages', {
	name: 'admin_pages',
	controller: RouteController.extend({
		layoutTemplate: 'AdminLayout',
		template: 'admin_pages',

		waitOn: function () {
			return [
				Meteor.subscribe('pages'),
				Meteor.subscribe('settings')
			];
		}
	})
});

Router.route('/admin/page/:_id', {
	name: 'admin_page_edit',
	controller: RouteController.extend({
		layoutTemplate: 'AdminLayout',
		template: 'admin_page_edit',

		waitOn: function () {
			return [
				Meteor.subscribe('pages'),
				Meteor.subscribe('settings')
			];
		},

		data: function () {
			//return Posts.findOne({_id: this.params._id})
			return {
				page: Fireball.Pages.findOne({_id: this.params._id})
			}
		}
	})
});

Router.route('/admin/users', {
	name: 'admin_users',
	controller: RouteController.extend({
		layoutTemplate: 'AdminLayout',
		template: 'admin_users',

		waitOn: function () {
			return Meteor.subscribe('users');
		}
	})
});
