App.AllRoute = Em.Route.extend({
    redirect: function() { this.transitionTo('/error'); }
});