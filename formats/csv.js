module.exports = function(data){

    var final_data = [];

    for(i = 0; i < data.length; i ++) {
        final_data.push(data[i].join(","));
    }

    return final_data.join("\n");
};