Template.admin_header.events({
	'click .signout': function(e) {
		e.preventDefault();
		Meteor.logout();
	}
});