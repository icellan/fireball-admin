Meteor.methods({
	saveSiteSettings: function(siteSettings) {
		if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
			Fireball.saveSiteSettings(siteSettings);
		} else {
			throw new Meteor.Error(400, 'User not logged in');
		}
	}
});