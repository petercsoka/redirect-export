var fs = require("fs")
    , csv = require("./formats/csv")
    , htaccess = require("./formats/htaccess")
;

function Redirect(logging_file)
{
    if(this instanceof Redirect == false) return new Redirect(logging_file);

    this.stream = fs.createWriteStream(logging_file);

    this.list = [];
}

Redirect.prototype.add = function addFN(old_url, new_url)
{
    this.list.push([old_url,new_url]);
};

Redirect.prototype.write = function writeFn(format)
{
    switch(format) {
        case "csv"      : this.stream.write(csv(this.list));        break;
        case "htaccess" : this.stream.write(htaccess(this.list));   break;
    }
};

Redirect.prototype.close = function closeFN()
{
    this.stream.end();
};

module.exports = Redirect;