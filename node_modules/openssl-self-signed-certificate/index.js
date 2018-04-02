var path = require('path');
var fs = require('fs');

module.exports = {
    key: fs.readFileSync(path.join(__dirname, './key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './cert.pem'))
};
