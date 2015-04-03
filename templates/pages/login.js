Template.admin_login.rendered = function() {
};

Template.admin_login.events({
	"submit .login-form": function(e) {
		e.preventDefault();
		var username = $('input[name="email"]').val();
		var password = $('input[name="password"]').val();
		Meteor.loginWithPassword(username, password, function(err) {
			if (err) {
				alert(err);
				return false;
			}
		});
	},
	"click .signin": function(e) {
		e.preventDefault();
		var username = $('input[name="email"]').val();
		var password = $('input[name="password"]').val();
		Meteor.loginWithPassword(username, password, function(err) {
			if (err) {
				alert(err);
				return false;
			}
		});
	}
});