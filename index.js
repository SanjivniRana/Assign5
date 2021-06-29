const path_stat = require('path');
const exp_server = require('express');
const { executionAsyncResource } = require('async_hooks');
const application = exp_server();
const { execSQLQuery } = require('./Connection/azureSQLConnection');

application.use(exp_server.json());
application.use(exp_server.static(path_stat.join(__dirname,'Public')));

//initial call to our app which will run index.html
application.get('/',(request,response) => {
    respose.sendFile(path_stat.join(__dirname, '/Public/index.html'));
})

application.post('/function1API', async (request, response) => {
    let year = request.body.year;
    let state = request.body.state;
    let query = "SELECT TOP 4 candidate, candidatevotes * 100.0/ totalvotes 'percentage' FROM [dbo].[presidentialelect] WHERE year = " +year+ " AND state_po = '" +state+ "' ORDER BY candidatevotes DESC FOR JSON PATH";
    console.log("F1 query --> " +query);
    execSQLQuery(query).then(success => {
        response.send(success)
    }).catch(err => { console.log("Error", err)})
});

application.post('/function2API', async (request, response) => {
    let year1 = request.body.year1;
    let year2 = request.body.year2;
    let state = request.body.state;
    let query = "SELECT year, sum(totalvotes) AS yearTotalVotes FROM [dbo].[presidentialelect] WHERE year BETWEEN " +year1+ " AND " +year2+ " AND state_po = '" +state+ "' GROUP BY year ORDER BY year ASC FOR JSON PATH";
    console.log("F2 query --> " +query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});

application.post('/function3API', async (request, response) => {
    let country = request.body.country;
    let query = "SELECT TOP 5 [Number], Volcano_Name FROM volcanosxr where Country = '" +country+ "' ORDER BY [Number] ASC FOR JSON PATH";
    console.log("F3 query --> " +query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});

application.post('/function4API', async (request, response) => {
    let country = request.body.country;
    let query = "SELECT TOP 5 [Number], Volcano_Name FROM volcanosxr where Country = '" +country+ "' ORDER BY [Number] ASC FOR JSON PATH";
    console.log("F4 query --> " +query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});

const portName = process.env.portName || 8080;

application.listen(portName, () => console.log(`The server will run on port number ${portName}`));

