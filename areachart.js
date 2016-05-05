var top15 = ["Biotechnology", "Software", "Clean Technology", "Health Care", "E-Commerce", "Mobile", "Semiconductors", "Enterprise Software", "Advertising", "Hardware + Software", "Web Hosting", "Games", "Finance", "Curated Web", "Security"];

trimmedArray = [];
for (i = 0; i < top15.length; i++) {
  trimmedArray.push(top15[i].replace(/ /g,''));
}
    
console.log(trimmedArray);


for (i = 0; i < trimmedArray.length; i++) {
  //$("#_buttons").append('<button onClick="updateData(\'' + trimmedArray[i] + '\')">'+trimmedArray[i]+"</button>")
  $("#_dropdown").append('<a onClick="updateData(\'' + trimmedArray[i] + '\')" href="#">'+trimmedArray[i]+'</a>')
}

var margin = {top: 0, right: 20, bottom: 20, left: 100},
    width = 950 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m").parse;

var x = d3.time.scale()
    .range([0, width]);

var y1 = d3.scale.linear()
    .range([height,0]);

var y2 = d3.scale.linear()
    .range([0,height]);

var y1small = d3.scale.linear()
    .range([height,0]);

var y2small = d3.scale.linear()
    .range([0,height]);


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var area1 = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y1(d.startup); });

var area1Small = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y1small(d.startup); });

var area2 = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(0)
    .y1(function(d) { return y2(d.funding); });

var area2Small = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(0)
    .y1(function(d) { return y2small(d.funding); });

var svg1 = d3.select("#areachart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#areachart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color = d3.scale.ordinal()
                    .range(["#DE4000","#00c9bb","#89d1c5","#00ffd5","#007b75","#fa5300","#6eccdc","#99ebae","#00a48d","#c55a3b","#a8b1c0","#9aff84","#b7d2ee","#a4eeda","#b9ff53"])
                    .domain(top15);


var vertical = d3.select("#areaMain")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "3px")
        .style("height", height*2)
        .style("top", "50px")
        .style("bottom", "30px")
        .style("left", margin.left)
        .style("right", margin.right)
        .style("background", "#fff");

    //Create tooltip
/*var areaTooltip = d3.select("#areaMain").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);*/

var areaTooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

d3.tsv("/convert_data/unicorns-time.tsv", function(error, data) {
  if (error) throw error;

/*x.domain(d3.extent(data, function(d) { return d.date; }));
  y1.domain([0, d3.max(data, function(d) { return d.startup; })]);
  y2.domain([0, d3.max(data, function(d) { return d.funding; })]);
  y1small.domain([0, d3.max(data, function(d) { return d.startup; })]);
  y2small.domain([0, d3.max(data, function(d) { return d.funding; })]);*/

  data.forEach(function(d) {
    //console.log(d.date+" "+d.startup)
    var market = '';
    allData = data.filter(function(row) {

      return row['market'] == 'All'; 
    })
    d.date = parseDate(d.date);
    d.startup = +d.startup;
    d.funding = +d.funding;  

    subData = data.filter(function(row) {
      return row['market'] == 'E-Commerce';
    })
    d.startup = +d.startup;
    d.funding = +d.funding;
    /*else {
      d.startup_ecommerce = +d.startup_ecommerce;
      d.funding_ecommerce = +d.funding_ecommerce;  
    }*/
    /*d.startupMarket = {};
    for(i=0; i < trimmedArray.length; i++) {
      d.startupMarket[trimmedArray[i]] = +d.startup_+trimmedArray[i]
      console.log(d.startup_Biotechnology);
    }*/
  /*  d.startup_biotech = +d.startup_biotech;
    d.funding_biotech = +d.funding_biotech;*/
    
  });

  var maxStartup = [d3.max(allData, function(d) { return d.startup; }), d3.max(subData, function(d) {return d.startup; })];
  var maxFunding = [d3.max(allData, function(d) { return d.funding; }), d3.max(subData, function(d) {return d.funding; })];
    
  x.domain(d3.extent(allData, function(d) { return d.date; }));
/*  y1.domain([0, d3.max(maxStartup)]);
  y2.domain([0, d3.max(maxFunding)]);
  y1small.domain([0, d3.max(maxStartup)]);
  y2small.domain([0, d3.max(maxFunding)]);*/

  y1.domain([0, 1900]);
  y1small.domain([0, 1900]);
  y2.domain([0, 45000000]);
  y2small.domain([0, 45000000]);

  svg1.append("path")
      .datum(allData)
      .attr("class", "area")
      .attr("d", area1)
      /*.call(d3.helper.tooltip()
               // .attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
                .style({color: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
                .text(function(d, i){ return 'value: '+d[i].funding; })
            )*/;


  svg1.append("path")
      .datum(subData)
      .attr("class", "areaY1Small")
      .attr("d", area1Small)
      .style("fill", function(d) { return color("E-Commerce");});

/*  svg1.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .attr("stroke-width",0);*/

  svg1.append("g")
      .attr("class", "yAxis")
      .call(yAxis1)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -10)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No. of Startups Funded");

  svg2.append("path")
      .datum(allData)
      .attr("class", "area")
      .attr("d", area2);

  svg2.append("path")
      .datum(subData)
      .attr("class", "areaY2Small")
      .attr("d", area2Small)
      .style("fill", function(d) { return color("E-Commerce");});;

  svg2.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .attr("stroke-width",1);

  svg2.append("g")
      .attr("class", "yAxis")
      .call(yAxis2)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -120)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Median Amount Funded");

  d3.selectAll("#areachart1")
    .on("mousemove", function(){  
       mousepos = d3.mouse(this);
       mousex = mousepos[0] + 5;
       mousey = mousepos[1];
       vertical.style("left", mousex + "px" )

       var invertedx = x.invert(mousex);
      invertedx = invertedx.getMonth() + invertedx.getDate();
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date
        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      }

      mousedate = datearray.indexOf(invertedx);
      pro = d.values[mousedate].value;
      
     })
    .on("mouseover", function(){  
       mousex = d3.mouse(this);
       mousex = mousex[0] + 5;
       vertical.transition()
              .style("opacity",1)
              .style("left", mousex + "px")
        areaTooltip.transition()
                  .style("opacity",1);
        areaTooltip.html("<p>Helllooo"+pro+"</p")
                  .style("left", mousex + "px")
              .style("top", mousey + "px");
        })
    .on("mouseout", function() {
          vertical.transition()
              .style("opacity", 0);
          areaTooltip.transition()
                    .style("opacity",0);
      });
});


function updateData(market) {
  console.log(market);

/*  d3.selectAll("path.areaY1Small")
                    .remove();
  d3.selectAll("path.areaY2Small")
                    .remove();  */                  
/*  d3.selectAll("g.yAxis")
      .remove();
  d3.selectAll("path.area")
      .remove();
*/
  d3.tsv("/convert_data/unicorns-time.tsv", function(error, data) {
    if (error) throw error;


    
    data.forEach(function(d) {

      allData = data.filter(function(row) {

        return row['market'] == 'All'; 
      })
      d.date = parseDate(d.date);
      d.startup = +d.startup;
      d.funding = +d.funding; 

      subData = data.filter(function(row) {
        return row['market'].replace(/ /g,'') == market;
      })
      d.startup = +d.startup;
      d.funding = +d.funding;
      //console.log(subData)
    });
/*    var maxStartup = [d3.max(allData, function(d) { return d.startup; }), d3.max(subData, function(d) {return d.startup; })];
  var maxFunding = [d3.max(allData, function(d) { return d.funding; }), d3.max(subData, function(d) {return d.funding; })];*/
    
    x.domain(d3.extent(allData, function(d) { return d.date; }));
/*  y1.domain([0, d3.max(maxStartup)]);
  y2.domain([0, d3.max(maxFunding)]);
  y1small.domain([0, d3.max(maxStartup)]);
  y2small.domain([0, d3.max(maxFunding)]);
*/

  y1.domain([0, 1900]);
  y1small.domain([0, 1900]);
  y2.domain([0, 45000000]);
  y2small.domain([0, 45000000]);

/*  svg1.append("path")
      .datum(allData)
      .attr("class", "area")
      .attr("d", area1);*/

/*  svg1.append("path")
      .datum(subData)
      .attr("class", "areaY1Small")
      .attr("d", area1Small)*/

  d3.selectAll("path.areaY1Small")
      .datum(subData)
      
      .transition()
      .duration(500)
      .style("fill", function(d) {return color(market);})
      .attr("d", area1Small);
      //.attr("fill", function(d) { return color(d[market])});


/*  svg1.append("g")
      .attr("class", "yAxis")
      .call(yAxis1)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No. of Startups Funded");*/

/*  svg2.append("path")
      .datum(allData)
      .attr("class", "area")
      .attr("d", area2);*/

/*  svg2.append("path")
      .datum(subData)
      .attr("class", "areaY2Small")
      .attr("d", area2Small);*/
  d3.selectAll("path.areaY2Small")
      .datum(subData)
      .transition()
      .duration(500)
      .style("fill", function(d) {return color(market);})
      .attr("d", area2Small);

/*  svg2.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .attr("stroke-width",1);*/

/*  svg2.append("g")
      .attr("class", "yAxis")
      .call(yAxis2)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -170)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Amount Funded");  */

    });
}
