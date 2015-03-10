App.CompanyIndexRoute = Em.Route.extend({
    redirect: function(model) { //Redirect to the market view for the active company
        this.transitionTo('/exchange/' + this.modelFor('company').get('symbol') + '/market');
    }
});