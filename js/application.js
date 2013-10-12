/**
 * Created by david on 10/11/13.
 */

var DemoApp = Ember.Application.create(
    {
       LOG_TRANSITIONS: true,
       LOG_BINDINGS: true,
       LOG_VIEW_LOOKUPS: true,
       LOG_STACKTRACE_ON_DEPRECATION: true,
       LOG_VERSION: true,
       debugMode: true
});

Roller.Router.map(function () {
    this.resource("roll");
});
