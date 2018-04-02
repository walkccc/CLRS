[![npm version](https://badge.fury.io/js/openssl-self-signed-certificate.svg)](https://badge.fury.io/js/openssl-self-signed-certificate)

# openssl-self-signed-certificate

Self-signed certificate for development use, generated using openssl. Expires in 4754-06-06.

```
$ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 999999 -nodes
Generating a 2048 bit RSA private key
..............................+++
.....+++
writing new private key to 'key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:.
State or Province Name (full name) [Some-State]:.
Locality Name (eg, city) []:.
Organization Name (eg, company) [Internet Widgits Pty Ltd]:.
Organizational Unit Name (eg, section) []:.
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:.
```
# Install

```
npm install --save-dev openssl-self-signed-certificate
```

# Example

```js
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(port);
console.log(`HTTP started on port ${port}.`);

if (process.env.NODE_ENV !== 'production') {
    var https = require('https');
    var selfSigned = require('openssl-self-signed-certificate');

    var options = {
        key: selfSigned.key,
        cert: selfSigned.cert
    };

    https.createServer(options, app).listen(port + 1);
    console.log(`HTTPS started on port ${port + 1} (dev only).`);
}
```
