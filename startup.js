Meteor.startup(function() {
	// Check whether we have an admin user, otherwise create it
	var adminUser = Meteor.users.findOne({
		username: 'admin'
	});
	if (!adminUser) {
		var userId = Accounts.createUser({
			username: 'admin',
			password: 'admin'
		});
		Roles.addUsersToRoles(userId, ['admin']);
	}
});
