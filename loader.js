$('link[rel="external"]').each(function() {
    $.ajax({
        url: this.href,
        type: 'GET',
        context: this,
        async: false,
        dataType: 'text',
        success: function(data) {
            Em.TEMPLATES[this.id] = Em.Handlebars.compile(data);
        }
    });
});