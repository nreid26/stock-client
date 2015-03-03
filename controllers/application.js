App.ApplicationController = Em.ArrayController.extend({
    itemController: 'applicationItem',
    sortKeys: ['name:asc', 'volume:desc'],
    sortedView: Ember.computed.sort('@this', 'sortKeys'),

    actions: {
        resort: function(key) {
            this.set('sortKeys', ['name:asc', key]);
        }
    }
});

App.ApplicationItemController = Em.ObjectController.extend({
    delta: function() {
        var open = this.get('openPrice'),
            ret = {value: this.get('currentPrice') - open};

        ret.percent = ret.value / open * 100;
        ret.image = 'images/' + ((ret.value > 0) ? 'up' : ((ret.value < 0) ? 'down' : 'none')) + '.png';

        return ret;
    }.property('currentPrice', 'openPrice'),
});