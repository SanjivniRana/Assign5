//this js file contains the azure db connection configuration and handles the sql query response using promise

const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "jiniadmin",
      password: "Adb@12345"
    },
    type: "default"
  },
  server: "jiniserver.database.windows.net",
  options: {
    database: "earthquakedb",
    encrypt: true
  }
};

const execSQLQuery = (query) => new Promise((resolve, reject) => {
  const con = new Connection(config);
  con.on('connect', err => {
    if (err) {
      console.error(err.message);
    } else {
      con.execSql(request);
    }
  });
  var result = [];
  const request = new Request(query, err => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
  request.on('row', data => {
    var i;
    for (i = 0; i < data.length; i++) {
      result += data[i].value;
    }
  });
  con.connect();
})

  module.exports = {
    execSQLQuery
  };