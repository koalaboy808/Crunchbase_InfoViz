var top15 = ["Biotechnology", "Software", "Clean Technology", "Health Care", "E-Commerce", "Mobile", "Semiconductors", "Enterprise Software", "Advertising", "Hardware + Software", "Web Hosting", "Games", "Finance", "Curated Web", "Security"];

var areaColor = d3.scale.ordinal()
                    .range(["#DE4000","#00c9bb","#89d1c5","#00ffd5","#007b75","#fa5300","#6eccdc","#99ebae","#00a48d","#c55a3b","#a8b1c0","#9aff84","#b7d2ee","#a4eeda","#b9ff53"])
                    .domain(top15);

trimmedArray = [];
for (i = 0; i < top15.length; i++) {
  trimmedArray.push(top15[i].replace(/ /g,''));
}
    
console.log(trimmedArray);


for (i = 0; i < trimmedArray.length; i++) {
	if (i == 0) {
		$("#_buttons").append('<button class="areaButton" autofocus style="background-color:'+ areaColor(trimmedArray[i]) +'" onClick="updateData(\'' + trimmedArray[i] + '\')">'+trimmedArray[i]+"</button>");
	}
	else {
  	$("#_buttons").append('<button class="areaButton" style="background-color:'+ areaColor(trimmedArray[i]) +'" onClick="updateData(\'' + trimmedArray[i] + '\')">'+trimmedArray[i]+"</button>");
  // $("#_dropdown").append('<a onClick="updateData(\'' + trimmedArray[i] + '\')" >'+trimmedArray[i]+'</a>')
  }
  console.log(trimmedArray[i]);
}

var areaMargin = {top: 30, right: 20, bottom: 30, left: 100},
    width = 850 - areaMargin.left - areaMargin.right,
    height = 230 - areaMargin.top - areaMargin.bottom;

var parseDate = d3.time.format("%Y-%m").parse,
	bisectDate = d3.bisector(function(d) { return d.date; }).left;

var areaX = d3.time.scale()
    .range([0, width]);

var y1 = d3.scale.linear()
    .range([height,0]);

var y2 = d3.scale.linear()
    .range([0,height]);

var y1small = d3.scale.linear()
    .range([height,0]);

var y2small = d3.scale.linear()
    .range([0,height]);


var areaXaxis = d3.svg.axis()
    .scale(areaX)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var area1 = d3.svg.area()
    .interpolate("linear")
    .x(function(d) { return areaX(d.date); })
    .y0(height)
    .y1(function(d) { return y1(d.startup); });

/*var area1line = d3.svg.line()
	.interpolate("linear")
    .x(function(d) { return areaX(d.date); })
    .y(function(d) { return y1(d.startup); });*/

var area1Small = d3.svg.area()
    .interpolate("linear")
    .x(function(d) { return areaX(d.date); })
    .y0(height)
    .y1(function(d) { return y1small(d.startup); });

var area2 = d3.svg.area()
    .interpolate("linear")
    .x(function(d) { return areaX(d.date); })
    .y0(0)
    .y1(function(d) { return y2(d.funding); });

var area2Small = d3.svg.area()
    .interpolate("linear")
    .x(function(d) { return areaX(d.date); })
    .y0(0)
    .y1(function(d) { return y2small(d.funding); });

var svg1 = d3.select("#areachart1").append("svg")
    .attr("width", width + areaMargin.left + areaMargin.right)
    .attr("height", height + areaMargin.top + areaMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + areaMargin.left + "," + areaMargin.top + ")");

var svg2 = d3.select("#areachart2").append("svg")
    .attr("width", width + areaMargin.left + areaMargin.right)
    .attr("height", height + areaMargin.top + areaMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + areaMargin.left + "," + areaMargin.top + ")");



var vertical = d3.select("#areachart1")
        .append("div")
        // .attr("class", "remove")
        .style("position", "absolute")
        //.style("z-index", "19")
        .style("width", "3px")
        .style("height", "400px")
        .style("top", "1300px")
        .style("bottom", "30px")
        //.style("left", "100px")
        //.style("right", areaMargin.right)
        .style("background", "#fff") //#2f3939
        .style("opacity",0);


    //Create tooltip
/*var areaTooltip = d3.select("#areaMain").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);*/

/*var areaTooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");*/

d3.tsv("../static/files/unicorns-time.tsv", function(error, data) {
  if (error) throw error;



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
      return row['market'] == 'Biotechnology';
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
    
  areaX.domain(d3.extent(allData, function(d) { return d.date; }));
/*  y1.domain([0, d3.max(maxStartup)]);
  y2.domain([0, d3.max(maxFunding)]);
  y1small.domain([0, d3.max(maxStartup)]);
  y2small.domain([0, d3.max(maxFunding)]);*/

  y1.domain([0, 1800]);
  y1small.domain([0, 1800]);
  y2.domain([0, 53000000]);
  y2small.domain([0, 53000000]);

  svg1.append("path")
      .datum(allData)
      .attr("class", "area")
      .attr("d", area1)
      /*.call(d3.helper.tooltip()
               // .attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
                .style({areaColor: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
                .text(function(d, i){ return 'value: '+d[i].funding; })
            )*/;


  svg1.append("path")
      .datum(subData)
      .attr("class", "areaY1Small")
      .attr("d", area1Small)
      .style("fill", function(d) { return areaColor("Biotechnology");});

/*  svg1.append("g")
      .attr("class", "areaXaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(areaXaxis)
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

/*   svg1.append("path")
      .datum(allData)
      .attr("class", "line")
      .attr("d", area1line);*/

     var focus1 = svg1.append("g")
      .attr("class", "focus")
      .style("display", "none");
     
  focus1.append("circle")
      .attr("r", 4.5);

  focus1.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

   var focus1small = svg1.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus1small.append("circle")
      .attr("r", 4.5);

  focus1small.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svg2.append("path")
      .datum(allData)
      .attr("class", "area")
      .attr("d", area2);

  svg1.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus1.style("display", null);
      			focus1small.style("display", null); })
      .on("mouseout", function() { focus1.style("display", "none");
      								focus1small.style("display", "none"); })
      .on("mousemove", mousemove1);

  function mousemove1() {
    var x0 = areaX.invert(d3.mouse(this)[0]),
        i = bisectDate(allData, x0, 1),
        d0 = allData[i - 1],
        d1 = allData[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        console.log(y1(d.startup));
    focus1.attr("transform", "translate(" + areaX(d.date) + "," + y1(d.startup) + ")");
    focus1.select("text").text(d.startup);

   	i = bisectDate(subData, x0, 1);
   	d0 = subData[i-1];
   	d1 = subData[i];
    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus1small.attr("transform", "translate(" + areaX(d.date) + "," + y1small(d.startup) + ")");
    focus1small.select("text").text(d.startup);

  }


  svg2.append("path")
      .datum(subData)
      .attr("class", "areaY2Small")
      .attr("d", area2Small)
      .style("fill", function(d) { return areaColor("Biotechnology");});;

  svg2.append("g")
      .attr("class", "areaXaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(areaXaxis)
      .attr("stroke-width",1);

  svg2.append("g")
      .attr("class", "yAxis")
      .call(yAxis2)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -20)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Median Amount Funded");

     var focus2 = svg2.append("g")
      .attr("class", "focus")
      .style("display", "none");
     
  focus2.append("circle")
      .attr("r", 4.5);

  focus2.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

   var focus2small = svg2.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus2small.append("circle")
      .attr("r", 4.5);

  focus2small.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svg2.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus2.style("display", null);
      			focus2small.style("display", null); })
      .on("mouseout", function() { focus2.style("display", "none");
      								focus2small.style("display", "none"); })
      .on("mousemove", mousemove2);

  function mousemove2() {
    var x0 = areaX.invert(d3.mouse(this)[0]),
        i = bisectDate(allData, x0, 1),
        d0 = allData[i - 1],
        d1 = allData[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        console.log(y2(d.funding));
    focus2.attr("transform", "translate(" + areaX(d.date) + "," + y2(d.funding) + ")");
    focus2.select("text").text(d.funding);

   	i = bisectDate(subData, x0, 1);
   	d0 = subData[i-1];
   	d1 = subData[i];
    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus2small.attr("transform", "translate(" + areaX(d.date) + "," + y2small(d.funding) + ")");
    focus2small.select("text").text(d.funding);

  }

});


function updateData(market) {
  console.log(market);

  d3.tsv("../static/files/unicorns-time.tsv", function(error, data) {
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
  
    areaX.domain(d3.extent(allData, function(d) { return d.date; }));


  y1.domain([0, 1800]);
  y1small.domain([0, 1800]);
  y2.domain([0, 53000000]);
  y2small.domain([0, 53000000]);


  d3.selectAll("path.areaY1Small")
      .datum(subData)
      .transition()
      .duration(500)
      .style("fill", function(d) {return areaColor(market);})
      .attr("d", area1Small);
      //.attr("fill", function(d) { return areaColor(d[market])});


  d3.selectAll("path.areaY2Small")
      .datum(subData)
      .transition()
      .duration(500)
      .style("fill", function(d) {return areaColor(market);})
      .attr("d", area2Small);


    });
}
