///////////////////////////PIE CHART/////////////////////////////

async function function1() {

  var year = $('#q1Year').val();
  var state = $('#q1State').val();

  let response = await fetch('/function1API', {
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

  var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

  arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.percentage); });

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
    .text(function(d) { return d.data.percentage; 
  });

  svg.append("g")
    .attr("transform", "translate(" + (width / 2 - 200) + "," + 40 + ")")
    .append("text")
    .text("PIE CHART")
    .attr("class", "title")
    .attr("font-size" , "30px");
}

///////////////////////////SCATTER PLOT////////////////////////////

async function function2() {

  var year1 = $('#yearR1').val();
  var year2 = $('#yearR2').val();
  var state = $('#q2State').val();

  let response = await fetch('/function2API', {
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

  // set the dimensions and margins of the graph
  var margin = {top: 80, right: 60, bottom: 60, left: 120},
  width = 1000 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 200)
  .attr("y", -60)
  .attr("font-size", "25px")
  .text("SCATTER PLOT")

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
  .style("fill", "#800080");
}

/////////////////////////VERTICAL BARGRAPH///////////////////////////

async function function3() {

  var country = $('#countryVB').val();

  let response = await fetch('/function3API', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({country: country})
    });
  let responseJSON = await response.json();
  
  if(response.status=200)
  {
    if(responseJSON.length === 0) {
      alert('No Data!');
    }
    else {
      d3VerticalBarGraph(responseJSON);
    }
  }
  else
  {
    alert("Something went wrong")
  }
}

function d3VerticalBarGraph(jsonData) {

  var data = jsonData;
  var colors = d3.scaleOrdinal(d3.schemeCategory20b);

  console.log(data);

  var svg = d3.select("svg"),
            margin = 500,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin

  svg.append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 200)
  .attr("y", 30)
  .attr("font-size", "25px")
  .text("VERTICAL BAR CHART")

  var xScale = d3.scaleBand().range([0, width]).padding(0.4),
      yScale = d3.scaleLinear().range([height, 0]);

  var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

  xScale.domain(data.map(function(d) { return d.Volcano_Name; })); 
  yScale.domain(d3.extent(data.map(function(d) { return d.Number; })));

  g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale))
  .selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("y", "2").attr("transform", "rotate(-90)" )

  g.append("g")
  .append("text")
  .attr("y", margin + 100)
  .attr("x", (width)/2)
  .attr("text-anchor", "end")
  .attr("fill", "black")
  .attr("font-size", "20px")
  .text("Volcano Name");

  g.append("g")
    .call(d3.axisLeft(yScale)
    .tickFormat(function(d){
        return d;
    }).ticks(10))
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 30)
  .attr("x", -150)
  .attr("dy", "-5.1em")
  .attr("text-anchor", "end")
  .attr("fill", "black")
  .attr("font-size", "20px")
  .text("Number");

  let barVer = g.selectAll(".bar")
              .data(data)
              .enter().append("g");
    
  barVer.append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return xScale(d.Volcano_Name); })
  .attr("y", function(d) { return yScale(d.Number); })
  .attr("width", xScale.bandwidth())
  .attr("height", function(d) { return height - yScale(d.Number); })
  .attr("fill",function(d,i){return colors(i)});
    
  barVer.append("text")
  .text(function (d) {
    return d.Number;
  })
  .attr("x", function (d) {
    return xScale(d.Volcano_Name) + xScale.bandwidth() * (0.5 + 0.1); // here 0.1 is the padding scale
  })
  .attr("y", function (d) {
    return yScale(d.Number) - 5 ;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "14px")
  .attr("fill", "black")
  .attr("text-anchor", "middle");
}

////////////////////////HORIZONTAL BARGRAPH//////////////////////////

async function function4() {

  var country = $('#countryHB').val();

  let response = await fetch('/function4API', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({country: country})
    });
  let responseJSON = await response.json();
  
  if(response.status=200)
  {
      if(responseJSON.length === 0) {
          alert('No Data!');
      }
      else {
        d3HorizontalBarGraph(responseJSON);
      }
  }
  else
  {
      alert("Something went wrong")
  }
}

function d3HorizontalBarGraph(jsonData) {

  var dict = {};
  var colors = d3.scaleOrdinal(d3.schemeCategory10);

  jsonData.forEach(i => {
    dict[i.Volcano_Name] = i.Number;
  });

  console.log(dict)

  let data = dict;

  let margin = { top: 80, right: 80, bottom: 80, left: 252 };
  let svgWidth = 800, svgHeight = 600;
  let height = svgHeight - margin.top - margin.bottom, width = svgWidth - margin.left - margin.right;
  let sourceNames = [], sourceCount = [];

  //var maximumY = d3.extent(sourceCount);
  //y.domain([-(maximumY * .02), maximumY]);

  let x = d3.scaleLinear().range([0, width]),
    y = d3.scaleBand().rangeRound([0, height]).padding(0.1);
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      sourceNames.push(key);
      sourceCount.push(parseInt(data[key]));
    }
  }
  x.domain(d3.extent(sourceCount));
  y.domain(sourceNames);

  let svg = d3.select("#horizontalBarChart").append("svg");
  svg.attr('height', svgHeight)
  .attr('width', svgWidth);

  svg.append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 300)
  .attr("y", 20)
  .attr("font-size", "20px")
  .text("HORIZONTAL BAR CHART")

  svg = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
  .attr("transform", "translate(0, " + height + ")")
  .call(d3.axisBottom(x))
  .append("text")
  .attr("y", margin.bottom - 5)
  .attr("x", (svgWidth - margin.right - (margin.left)/3)/2)
  .attr("text-anchor", "end")
  .attr("fill", "black")
  .attr("font-size", "20px")
  .text("Year");

  svg.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -40)
  .attr("x", -150)
  .attr("dy", "-5.1em")
  .attr("text-anchor", "end")
  .attr("fill", "black")
  .attr("font-size", "20px")
  .text("Candidate");

  // Create rectangles
  let bars = svg.selectAll('.bar')
  .data(sourceNames)
  .enter()
  .append("g");

  bars.append('rect')
  .attr('class', 'bar')
  .attr("x", function (d) { return 0; })
  .attr("y", function (d) { return y(d); })
  .attr("width", function (d) { return x(data[d]) })
  .attr("height", function (d) { return y.bandwidth(); })
  .attr("fill",function(d,i){return colors(i)});

  bars.append("text")
  .text(function (d) {
    return data[d];
  })
  .attr("x", function (d) {
    return x(data[d]) + 20;
  })
  .attr("y", function (d) {
    console.log(d);
    return y(d) + y.bandwidth() * (0.5 + 0.1); // here 0.1 is the padding scale
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "14px")
  .attr("fill", "black")
  .attr("text-anchor", "middle");
}