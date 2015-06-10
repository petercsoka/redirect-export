var fs = require("fs")
    , csv = require("./formats/csv")
    , htaccess = require("./formats/htaccess")
    ;

function Redirect()
{
    if(this instanceof Redirect == false) return new Redirect();

    this.list = [];
}

Redirect.prototype.add = function addFN(old_url, new_url)
{
    this.list.push([old_url,new_url]);
};

Redirect.prototype.write = function writeFn(format, file)
{
    var stream = fs.createWriteStream(file);

    switch(format) {
        case "csv"      : stream.write(csv(this.list));        break;
        case "htaccess" : stream.write(htaccess(this.list));   break;
    }
};

Redirect.prototype.close = function closeFN()
{
    this.stream.end();
};

module.exports = Redirect;