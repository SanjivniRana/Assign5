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

application.post('/selectCondQAPI', async (request, response) => {
    let selectCondition = request.body.selectCond;
    let query = "SELECT * FROM all_month WHERE " +selectCondition+ " FOR JSON PATH";
    console.log(query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});

application.post('/selectColumnsQAPI', async (request, response) => {
    let selectColumn = request.body.selectCol;
    let selectColCondition = request.body.selectColCond;
    let query = "SELECT " +selectColumn+ " FROM all_month WHERE " +selectColCondition+ " FOR JSON PATH";
    console.log(query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});

application.post('/selectAllSQLQAPI', async (request, response) => {
    let tableName = request.body.sqlTableName;
    let count = request.body.numberOfRecords;

    let query = "SELECT top " +count+ " * FROM " +tableName+ " FOR JSON PATH";
    console.log("SQL query:--->",query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});

//////////////////////////////////////////////////////////////////

application.post('/countColumnsQAPI', async (request, response) => {
    let countCond = request.body.countCond;
    let groupbyCond = request.body.groupbyCond;
    let query = "SELECT " +countCond+ " FROM all_month GROUP BY " +groupbyCond+ " FOR JSON PATH";
    console.log("count query --> " +query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});

////////////////////////////////////////////////////////////////////

// application.post('/question1API', async (request, response) => {
//     let year = request.body.year;
//     let state = request.body.state;
//     let query = "SELECT TOP 6 candidate, candidatevotes * 100.0/ totalvotes 'percentage' FROM [dbo].[presidentialelect] WHERE year = " +year+ " AND state_po = '" +state+ "' ORDER BY candidatevotes DESC FOR JSON PATH";
//     console.log("Q1 query --> " +query);
//     execSQLQuery(query).then(success => {
//         response.send(JSON.parse(success))
//     }).catch(err => { console.log("Error", err)})
// });

application.post('/question1API', async (request, response) => {
    //let latR1 = request.body.latR1;
    let query = request.body.query;
    //let query = "SELECT TOP 6 candidate, candidatevotes * 100.0/ totalvotes 'percentage' FROM [dbo].[presidentialelect] WHERE year = " +year+ " AND state_po = '" +state+ "' ORDER BY candidatevotes DESC FOR JSON PATH";
    console.log("Q1 query --> " +query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});

// application.post('/question2API', async (request, response) => {
//     let year1 = request.body.year1;
//     let year2 = request.body.year2;
//     let state = request.body.state;
//     let query = "SELECT year, sum(totalvotes) AS yearTotalVotes FROM [dbo].[presidentialelect] WHERE year BETWEEN " +year1+ " AND " +year2+ " AND state_po = '" +state+ "' GROUP BY year ORDER BY year ASC FOR JSON PATH";
//     console.log("Q2 query --> " +query);
//     execSQLQuery(query).then(success => {
//         response.send(JSON.parse(success))
//     }).catch(err => { console.log("Error", err)})
// });

application.post('/question2API', async (request, response) => {
    let country = request.body.cName;
    let query = "SELECT year, sum(totalvotes) AS yearTotalVotes FROM [dbo].[presidentialelect] WHERE year BETWEEN " +year1+ " AND " +year2+ " AND state_po = '" +state+ "' GROUP BY year ORDER BY year ASC FOR JSON PATH";
    console.log("Q2 query --> " +query);
    execSQLQuery(query).then(success => {
        response.send(JSON.parse(success))
    }).catch(err => { console.log("Error", err)})
});


// application.post('/question3API', async (request, response) => {
//     let year1 = request.body.year1;
//     let year2 = request.body.year2;
//     let state = request.body.state;
//     let query = "SELECT TOP 20 [year], candidate FROM [dbo].[presidentialelect] WHERE [year] BETWEEN " +year1+ " AND " +year2+ " AND state_po = '" +state+ "' AND candidate IS NOT NULL AND [year] IS NOT NULL ORDER BY [year] FOR JSON PATH";
//     console.log("Q3 query --> " +query);
//     execSQLQuery(query).then(success => {
//         response.send(JSON.parse(success))
//     }).catch(err => { console.log("Error", err)})
// });

application.post('/question3API', async (request, response) => {
    let query = request.body.query;
    //let query = "SELECT TOP 20 [year], candidate FROM [dbo].[presidentialelect] WHERE [year] BETWEEN " +year1+ " AND " +year2+ " AND state_po = '" +state+ "' AND candidate IS NOT NULL AND [year] IS NOT NULL ORDER BY [year] FOR JSON PATH";
    console.log("Q3 query --> " +query);
    execSQLQuery(query).then(success => {
        response.send(success)
    }).catch(err => { console.log("Error", err)})
});


const portName = process.env.portName || 8080;

application.listen(portName, () => console.log(`The server will run on port number ${portName}`));

