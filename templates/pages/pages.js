Template.admin_pages.helpers({
	pages: function() {
		return Fireball.Pages.find({
			parent: false
		},{
			sort: {
				order: 1
			}
		});
	},
	addPageCallback: function() {
		return function() {
			var title = $('input[name="page_title"]').val();
			var short = $('input[name="page_short"]').val();
			if (!title || !short) {
				alert('Page title and menu title are both mandatory');
			}

			var name = title.toLowerCase().replace(/[^a-z0-9]/g, '_');

			Fireball.Pages.insert({
				title: title,
				name: name,
				short: short,
				parent: false
			});
		}
	}
});

Template.admin_pages.events({
});

Template.admin_pages_list.rendered = function() {
	$('.page-list').nestable({
		/* config options */
	});
	$('.page-list').on('change', function() {
		/* on change event */
		var pageList = $('.page-list').nestable('serialize');
		//update ordering
		updatePageOrder(pageList, false);
	});
};

var updatePageOrder = function(pageList, parentId) {
	_.each(pageList, function(page, key) {
		console.log(page, key);
		Fireball.Pages.update({
			_id: page.id
		},{
			$set: {
				order: key,
				parent: parentId
			}
		});
		if (page.children) {
			updatePageOrder(page.children, page.id);
		}
	});
};

Template.admin_pages_list.helpers({
	children: function() {
		var children = Fireball.Pages.find({
			parent: this._id
		},{
			sort: {
				order: 1
			}
		});
		if (children.count()) {
			return children;
		} else {
			return false;
		}
	}
});

Template.admin_pages.events({
	"click .removePage": function(e) {
		e.preventDefault();
		if (confirm('Are you sure you want to delete the page?')) {
			Fireball.Pages.remove({
				_id: e.currentTarget.id
			});
		}
	}
});
