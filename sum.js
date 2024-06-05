const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const fs = require('fs');

const service = {
  SumService: {
    SumPort: {
      Sum: function(args) {
        const result = Number(args.a) + Number(args.b);
        return { result };
      }
    }
  }
};

const xml = fs.readFileSync('./service.wsdl', 'utf8');

const app = express();
app.use(bodyParser.raw({ type: function() { return true; }, limit: '5mb' }));
app.use(xmlparser());

app.listen(8000, function() {
  soap.listen(app, '/wsdl', service, xml);
  console.log('SOAP server listening on port 8000');
});
