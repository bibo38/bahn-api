/*global module, require*/

const request = require('request');
const store = require('../store');

module.exports = {
  get: function (req, res) {
    var url = "http://reiseauskunft.bahn.de/bin/ajax-getstop.exe/dn"
      + "?start=1&tpl=sls&REQ0JourneyStopsB=12&REQ0JourneyStopsS0A=1&getstop=1&noSession=yes&iER=yes&S=Karlsruhe?&js=false";
    request({
      url: url,
      //qs: {
      //  start: 1,
      //  tpl: "sls",
      //  REQ0JourneyStopsB: "12",
      //  REQ0JourneyStopsS0A: "1",
      //  getstop: "1",
      //  noSession: "yes",
      //  iER: "yes",
      //  S: "Karlsruhe",
      //  js: "false"
      //}
    }, function (err, response, body) {
      if (err) {
        return res.json({
          err: err
        });
      }

      var jsonString = body.replace('SLs.sls=','').replace(';SLs.showSuggestion();', '');
      var data = JSON.parse(jsonString);
      res.json(data.suggestions);
    });
  },
  post: function (req, res) {
    res.json(store.get(store.put(req.body)));
  }
};