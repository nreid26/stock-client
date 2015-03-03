Em.Handlebars.helper('num', function(num, dp) {
    if(!/^-?\d+(\.\d*)?/.test(num)) { return ''; }

    num = String(num);
    var parts = num.split('.');

    if(!(dp || dp === 0)) { dp = 2 * (parts.length - 1); } //Default values if none given

    if(dp == 0) { return parts[0]; }
    else {
        parts.push('');
        for(var i = 0; i < dp; i++) { parts[1] += '0'; }
        return parts[0] + '.' + parts[1].substring(0, dp);
    }    
});