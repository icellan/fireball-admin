Package.describe({
  name: 'fireball:admin',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');
  api.use('templating');
  api.use('accounts-password');
  api.use('iron:router');
  api.use('less', 'client');
  api.use('jquery', 'client');
  api.use('pagebakers:ionicons', 'client');
  api.use('linto:jquery-ui', 'client');
  api.use('tkornblit:icheck', 'client');
  api.use('natestrauser:x-editable-bootstrap', 'client');
  api.use('raix:handlebar-helpers', 'client');
  api.use('rubaxa:sortable@1.0.0_1', 'client');
  api.use('alanning:roles@1.2.11');
  api.use('fastclick', 'client');
  api.use('fireball:core');

  api.addFiles('fireball:admin.js');
  api.addFiles('js/app.js', 'client');
  api.addFiles('js/nestedSortable.js', 'client');

  // Templates
  api.addFiles(['templates/layout.html', 'templates/layout.js'], 'client');
  api.addFiles(['templates/header.html', 'templates/header.js'], 'client');
  api.addFiles(['templates/footer.html'], 'client');
  api.addFiles(['templates/sidebar.html', 'templates/sidebar.js'], 'client');
  api.addFiles(['templates/modal.html', 'templates/modal.js'], 'client');

  // Options rendering
  api.addFiles(['templates/options/options.html', 'templates/options/options.js'], 'client');

  // pages
  api.addFiles(['templates/pages/admin.html', 'templates/pages/admin.js'], 'client');
  api.addFiles(['templates/pages/login.html', 'templates/pages/login.js'], 'client');
  api.addFiles(['templates/pages/settings.html', 'templates/pages/settings.js'], 'client');
  api.addFiles(['templates/pages/pages.html', 'templates/pages/pages.js'], 'client');
  api.addFiles(['templates/pages/page_edit.html', 'templates/pages/page_edit.js'], 'client');
  api.addFiles(['templates/pages/users.html', 'templates/pages/users.js'], 'client');

  // CSS
  var css = [
    // Building from scratch does not work yet, problems with namespacing imports
    //'less/AdminLTE.less',
    //'less/skins/skin-blue.less'
      'adminLTE.less',
      'less/nestedSortable.less'
  ];
  api.addFiles(css, 'client');

  // Default routes, rest will be defined in DB
  api.addFiles('routes.js', 'client');

  api.addFiles('methods.js', 'server');
  api.addFiles('startup.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('fireball:admin');
  api.addFiles('fireball:admin-tests.js');
});
