var fs = require("fs")
    , csv = require("./formats/csv")
    , htaccess = require("./formats/htaccess")
    ;

function Redirect(config)
{
    if(this instanceof Redirect == false) return new Redirect(config);

    this.list = [];
    this.config = config || {};
    this.config.format = config.format || "csv";
    this.config.file = config.file || "redirects.csv";
}

Redirect.prototype.formatFactory = function formatFactoryFN(format, data)
{
    switch(format) {
        case "csv"      : return csv(data);        break;
        case "htaccess" : return htaccess(data);   break;
        default         : throw Error("No script specified for "+ format + " format"); break;
    }
};

Redirect.prototype.add = function addFN(old_url, new_url)
{
    var entry = [ old_url, new_url ];
    this.list.push(entry);
    var format_output = this.formatFactory(this.config.format, [entry]);

    if (typeof this.config.inMemory == "undefined" || this.config.inMemory == false) {
        fs.appendFile(this.config.file, format_output + "\n", function (err) {
            if (err) throw err;
        });
    }
};

Redirect.prototype.write = function writeFn(format, file)
{
    var stream = fs.createWriteStream(file);

    stream.write(this.formatFactory(format, this.list));

};

Redirect.prototype.close = function closeFN()
{
    this.stream.end();
};

module.exports = Redirect;