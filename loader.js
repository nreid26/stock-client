var links = $('link[rel="external"]'),
    done  = 0;

links.each(function() {
    $.ajax({
        url: this.href,
        type: 'GET',
        context: this,
        dataType: 'html',
        success: function(data) {
            Em.TEMPLATES[this.id] = Em.Handlebars.compile(data);
            if(++done == links.length) { 
                $('body').append(
                    '<script src="js/helpers.js"></script>' +
                    '<script src="js/extern.js"></script>' +
                    '<script src="js/app.js"></script>'
                );
            }
        }
    });
});