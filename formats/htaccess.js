module.exports = function(data){

    var final_data = [];

    for(i = 0; i < data.length; i ++) {
        final_data.push("RewriteRule " + data[i][0].replace(/^\//gi, "\^") + "$ " + data[i][1] + " [R=301,NC,L]" );
    }

    return final_data.join("\n");
};