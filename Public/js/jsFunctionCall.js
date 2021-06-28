//////////////////////////////////////////////////////

async function countColumn() {
    
  var countCond = $('#fetchData').val();
  var groupbyCond = $('#columnName').val();

  var apiStart = window.performance.now();
  let response = await fetch('/countColumnsQAPI', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({countCond: countCond, groupbyCond: groupbyCond})
    });
  var apiStop = window.performance.now();
  var execTime = apiStop - apiStart;
  let responseJSON = await response.json();

  if(response.status=200)
  {
      $('#selectColExecTime').empty().append("Time expended to perform the query is " +execTime+ " ms.");
      alert("Selection Complete!");
      if(responseJSON.length === 0) {
          alert('No data!');
      }
      else {

        usingd3(responseJSON);
      }
  }
  else
  {
      alert("Something went wrong")
  }
  //document.getElementById('selectColumns').value = "";
  //document.getElementById('selectColCondition').value = "";
}

//////////////////////////////////////////////////////

async function question1() {

  var year = $('#q1Year').val();
  var state = $('#q1State').val();

  let response = await fetch('/question1API', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({year: year, state: state})
    });
  let responseJSON = await response.json();
  
  if(response.status=200)
  {
      alert("Query Complete! Click Ok to see the result.");
      if(responseJSON.length === 0) {
          alert('No Data!');
      }
      else {
         d3PieChart(responseJSON);
      }
  }
  else
  {
      alert("Something went wrong")
  }
}

function d3PieChart(jsonData) {

  //var data = [2, 4, 8, 10];
  var data = jsonData;
        
  var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 3;
        
  var g = svg.append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c','#F08080']);

  var pie = d3.pie().value(function(d) { 
          return d.percentage; 
      });

  var path = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

  var label = d3.arc()
                .outerRadius(radius)
                .innerRadius(radius - 200);

  // d3.csv("browseruse.csv", function(error, data) {
      // if (error) {
      //     throw error;
      // }
      var arc = g.selectAll(".arc")
                  .data(pie(data))
                  .enter().append("g")
                  .attr("class", "arc");

      arc.append("path")
          .attr("d", path)
          .attr("fill", function(d) { return color(d.data.percentage); });
  
      console.log(arc)

      arc.append("text") 
        .attr("transform", function(d,i) {
            var centroid_value = label.centroid(d);

            var pieValue = ((d.endAngle - d.startAngle)*100)/(2*Math.PI);                
            var accuratePieValue = pieValue.toFixed(0);
            if(accuratePieValue <= 5){
                var pieLableArc = d3.arc().innerRadius(i*20).outerRadius(radius + i*20);
                centroid_value = pieLableArc.centroid(d);
            }
            return "translate(" + centroid_value + ")";
        }).attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("opacity", 1)
        .text(function(d) { return d.data.percentage; });
  
      // arc.append("text")
      //     .attr("transform", function(d) { 
      //             return "translate(" + label.centroid(d) + ")"; 
      //     }).attr("dy", ".35em")
      //     .style("text-anchor", "middle")
      //     .style("opacity", 1)
      //     .text(function(d) { return d.data.percentage; });
      //});

      svg.append("g")
          .attr("transform", "translate(" + (width / 2 - 200) + "," + 40 + ")")
          .append("text")
          .text("Browser use statistics - Jan 2017")
          .attr("class", "title")
          .attr("font-size" , "30px")

}

///////////////////////////////////////////////////////////////

async function question2() {

  var year1 = $('#yearR1').val();
  var year2 = $('#yearR2').val();
  var state = $('#q2State').val();

  let response = await fetch('/question2API', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({year1: year1, year2: year2, state: state})
    });
  let responseJSON = await response.json();
  
  if(response.status=200)
  {
      alert("Query Complete! Click Ok to see the result.");
      if(responseJSON.length === 0) {
          alert('No Data!');
      }
      else {
        d3ScatterPlot(responseJSON);
      }
  }
  else
  {
      alert("Something went wrong")
  }
}

function d3ScatterPlot(jsonData)     
 {    
    var data = jsonData;

  //   var data = [
  //     {
  //         "yearTotalVotes": 615,
  //         "year": "DEM"
  //     },
  //     {
  //         "yearTotalVotes": 535,
  //         "year": "LIB"
  //     },
  //     {
  //         "yearTotalVotes": 613,
  //         "year": "REP"
  //     },
  //     {
  //         "yearTotalVotes": 2524,
  //         "year": "OTHER"
  //     }
  // ];
     
    // set the dimensions and margins of the graph
var margin = {top: 10, right: 60, bottom: 60, left: 120},
width = 1000 - margin.left - margin.right,
height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
.domain(d3.extent(data, function(d) { return d.year; }))
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain(d3.extent(data, function(d) { return d.yearTotalVotes; }))
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

//Add lines
var valueline = d3.line()
     .x(function (d) {
          return x(d.year);
     })
     .y(function (d) {
          return y(d.yearTotalVotes);
     });

svg.append("path")
     .data([data])
     .attr("class", "line")
     .attr("d", valueline)
     //styling:
     .attr("stroke", "#32CD32")
     .attr("stroke-width", 2)
     .attr("fill", "#FFFFFF");

// Add the text label for the x axis
svg.append("text")
.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
.style("text-anchor", "middle")
.text("Year");

// Add the text label for the Y axis
svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Total Votes");

// Add dots
svg.append('g')
.selectAll("dot")
.data(data)
.enter()
.append("circle")
  .attr("cx", function (d) { return x(d.year); } )
  .attr("cy", function (d) { return y(d.yearTotalVotes); } )
  .attr("r", 5)
  .style("fill", "#800080")

 }

///////////////////////////////////////////////////////////////

async function question3() {

  var year1 = $('#year1').val();
  var year2 = $('#year2').val();
  var state = $('#q3State').val();

  let response = await fetch('/question3API', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({year1: year1, year2: year2, state: state})
    });
  let responseJSON = await response.json();
  
  if(response.status=200)
  {
      alert("Query Complete! Click Ok to see the result.");
      if(responseJSON.length === 0) {
          alert('No Data!');
      }
      else {
        //d3barchart(responseJSON);
        verticalBarChart(responseJSON);
        // d3BAR(responseJSON);
      }
  }
  else
  {
      alert("Something went wrong")
  }
}

function d3barchart(jsonData) {
  var data = jsonData;
  console.log("data" +data);
  // set the dimensions and margins of the graph
var margin = {top: 20, right: 60, bottom: 60, left: 180},
width = 960 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;

var colors = d3.scaleOrdinal(d3.schemeCategory10);

// append the svg object to the body of the page
var svg = d3.select("#horizontalBarChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleBand()
.domain(data.map(function(d) { return d.year; }))
.range([0, width]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
.range([height, 0])
.domain(data.map(function(d) { return d.candidate; }))
.padding(.1);
svg.append("g")
.call(d3.axisLeft(y))

// svg.selectAll("rect")
//   .data(data)
//   .enter().append("rect")
//   .attr("class", "bar")
//   .attr("x", x(0))
//   .attr("y", function(d) { return y(d.candidate); })  
//   .attr("width", function(d) { return x(d.year); } )
//   .attr("height", y.bandwidth() )
//   .attr("fill",function(d,i){return colors(i)})

//var barPadding = 5;  
//var barWidth = (width / data.length);

// //Bars
let bars = svg.selectAll("myRect")
.data(data)
.enter()
.append("rect")
.attr("class", "bar")
.attr("x", x(0))
.attr("y", function(d) { return y(d.candidate); })  
.attr("width", function(d) { return x(d.year); } )
.attr("height", y.bandwidth() )
.attr("fill",function(d,i){return colors(i)})

bars.append("text")
    .text(function(d) { 
        return d.year;
    })
    .attr("x", function(d){
        return x(d.year) + 15;
    })
    .attr("y", function(d){
        console.log(d);
        return y(d.candidate) + y.bandwidth() * (0.5 + 0.1); // here 0.1 is the padding scale
    })
    .attr("class", "text")
    .attr("text-anchor", "middle")  
    .attr("font-family" , "sans-serif")
    .attr("font-size" , "14px")
    .attr("fill" , "black")
    .attr("text-anchor", "middle");

}

function verticalBarChart(data) {

  //var data = jsonData;
  var colors = d3.scaleOrdinal(d3.schemeCategory10);

  console.log("data -->" +data);

  var svg = d3.select("svg"),
        margin = 500,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("XYZ Foods Stock Price")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleBand().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");


        xScale.domain(data.map(function(d) { return d.candidate; }));
        yScale.domain(data.map(function(d) { return d.year; }));

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("y", "2").attr("transform", "rotate(-90)" )
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Year");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Stock Price");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.candidate); })
         .attr("y", function(d) { return yScale(d.year); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.year); })
         .attr("fill",function(d,i){return colors(i)});
}