Template.fireball_admin_modal.events({
	"click .saveModal": function() {
		if (this.callback) {
			this.callback();
		} else {
			alert('No callback defined');
		}
	}
});