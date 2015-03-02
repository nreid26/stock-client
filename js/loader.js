$('link[rel="external"]').each(function() {
    $.ajax({
        url: this.href,
        type: 'GET',
        context: this,
        dataType: 'text',
        async: false,
        success: function(data) {
            Em.TEMPLATES[this.id] = Em.Handlebars.template(Em.Handlebars.precompile(data));
        }
    });
});