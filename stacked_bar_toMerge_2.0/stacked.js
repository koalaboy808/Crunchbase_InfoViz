var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var dates_stack = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013']
// console.log(dates_stack)

// for (i = 0; i < dates_stack.length; i++) {
// 	 $("#placeholder_buttons").append('<button " onClick="update_stack(\'' + dates_stack[i] + '\')">'+dates_stack[i]+"</button>")
// }

var xstack = d3.scale.ordinal()
    .rangeRoundBands([0, width-50], .1);

var ystack = d3.scale.linear()
    .rangeRound([height, 0]);

var color_stack = d3.scale.ordinal()
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    .range(['#ffff53','#ffffad','#ffff84','#deff84','#9aff84','#bcebae','#99ebae','#00db97','#69e275','#34ed5c','#6da16e','#c3a16e','#ffa16e','#00c9bb','#00ffd5','#89d1c5','#6eccdc','#a8b1c0','#9fd8ef','#b7d2ee','#a4eeda','#b9ff53','#daf741','#d25d00','#ff5a3b','#c55a3b','#ffd1c5','#ffb762','#ff8400','#ff804f','#ffb486','#ffbdac','#ff6b02','#007b75','#00a48d']);

var xAxis_stack = d3.svg.axis()
    .scale(xstack)
    .orient("bottom");

var yAxis_stack = d3.svg.axis()
    .scale(ystack)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg_stack = d3.select("#stacked_bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("YEAR-country-summed-stacked-split.csv", function(error, data) {
  if (error) throw error;

    data = data.filter(function(row) {
		return row['Date'] == "2004";
	})

  // get first row except for first element (ie Investor) and use company_country as color keys
  color_stack.domain(d3.keys(data[0]).filter(function(key) { return key !== "Investor"  && key !== "Date"; }));

  // height????? how ages and total relate?
  data.forEach(function(d) {
    var y0 = 0;
    d.ages = color_stack.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
  });

  // sort the data by total
  data.sort(function(a, b) { return b.total - a.total; });

  // x value for each investor
  // xstack.domain(data.map(function(d) { return d.Investor; }));
  // xstack.domain(['QAT', 'GRC', 'NGA', 'USA', 'LUX', 'ISR', 'CYP', 'TWN', 'DEU', 'LKA', 'BGR', 'MEX', 'GBR', 'CAN', 'ISL', 'EGY', 'KOR', 'COL', 'SVK', 'JOR', 'PAK', 'BEL', 'SGP', 'HUN', 'ARE', 'AZE', 'KHM', 'PRT', 'POL', 'TTO', 'NLD', 'BMU', 'LBN', 'HKG', 'CYM', 'KWT', 'SAU', 'FRA', 'EST', 'CHE', 'LTU', 'ESP', 'SWE', 'HRV', 'CHL', 'CHN', 'UKR', 'ROM', 'AUS', 'LVA', 'IRL', 'DNK', 'MUS', 'FIN', 'THA', 'NZL', 'KEN', 'JPN', 'GHA', 'TUR', 'PHL', 'ITA', 'BRA', 'CZE', 'ARG', 'IND', 'RUS', 'BHS', 'BHR', 'SVN', 'MYS', 'NOR', 'AUT']);
  xstack.domain(['USA', 'GBR', 'CAN', 'CHN', 'DEU', 'ISR', 'FRA', 'CHE', 'JPN', 'RUS'])
  // ystack.domain([0, d3.max(data, function(d) { return d.total; })]);
  ystack.domain([0,650000000000])

  svg_stack.append("g")
      .attr("class", "xstack axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis_stack);

  svg_stack.append("g")
      .attr("class", "y axis")
      .call(yAxis_stack)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population");

  var state = svg_stack.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + xstack(d.Investor) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("class", "stack_rect")
      .attr("width", xstack.rangeBand())
      .attr("y", function(d) { return ystack(d.y1); })
      .attr("height", function(d) { return ystack(d.y0) - ystack(d.y1); })
      .style("fill", function(d) { return color_stack(d.name); })
	  .call(d3.helper.tooltip()
		    .attr("class", "tooltip_css")
		    .style({color: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
		    .text(function(d) { return "Startup Country: " +  d.name + "</br>Total Funding: $" + d.y1.toLocaleString(); })
	  );

  var legend = svg_stack.selectAll(".legend")
      .data(color_stack.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

  legend.append("rect")
      .attr("x", width+10)
      .attr("width", 18)
      .attr("height", 10)
      .style("fill", color_stack);

  legend.append("text")
      .attr("x", width)
      .attr("y", 5)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});


// $("#fakebutton").click(function(stack_filter) {
function update_stack(stack_filter) {
	// alert("hello")
	// svg.selectAll("rect").remove()
	// svg.selectAll("rect").remove()
// });
  d3.csv("YEAR-country-summed-stacked-split.csv", function(error, data) {
	  if (error) throw error;
	  	console.log(stack_filter)
	  	console.log(typeof stack_filter)
	  	// console.log(data)
		sub_stack_data = data.filter(function(row) {
		      return row['Date'] == stack_filter;
		})
		console.log(sub_stack_data)
	// })
	  color_stack.domain(d3.keys(sub_stack_data[0]).filter(function(key) { return key !== "Investor" && key !== "Date"; }));

	  sub_stack_data.forEach(function(d) {
	    var y0 = 0;
	    d.ages = color_stack.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
	    d.total = d.ages[d.ages.length - 1].y1;
	  });

	  sub_stack_data.sort(function(a, b) { return b.total - a.total; });
	  

	  // OLD REMOVE SHITTY
	  svg_stack.selectAll("rect.stack_rect").remove()
	  var state = svg_stack.selectAll(".state")
	      .data(sub_stack_data)
	      .enter().append("g")
	      .attr("class", "g")
	      .attr("transform", function(d) { return "translate(" + xstack(d.Investor) + ",0)"; });

	  state.selectAll("rect")
	      .data(function(d) { return d.ages; })
	      .enter().append("rect")
	      .attr("class", "stack_rect")
	      .attr("width", xstack.rangeBand())
	      .attr("y", function(d) { return ystack(d.y1); })
	      .attr("height", function(d) { return ystack(d.y0) - ystack(d.y1); })
	      .style("fill", function(d) { return color_stack(d.name); })	  
	      .call(d3.helper.tooltip()
		    .attr("class", "tooltip_css")
		    .style({color: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
		    .text(function(d) { return "Startup Country: " +  d.name + "</br>Total Funding: $" + d.y1.toLocaleString(); })
	  	  );

	});


	
	  // TRANSITIONING PLEASE

	  // svg.selectAll("rect")
	  //     .data(data)
	  //   	.transition()
	  //   	.duration(1000)
	  //     .attr("width", x.rangeBand())
	  //     .attr("y", function(d) { return y(d.y1); })
	  //     .attr("height", function(d) { return y(d.y0) - y(d.y1); })
	  //     .style("fill", function(d) { return color(d.name); });


            // d3.selectAll("rect.bar2pt" + d[0].replace(/ /g,'')) 
            //   .attr("fill", "Orchid")
            //   .transition().duration(500).attr("width", function(d){return scale(d[1])+60;})
            //   .transition().duration(500).attr("width", function(d){return scale(d[1]);})
};

	  	  
for (i = 0; i< dates_stack.length; i++) {
	update_stack(dates_stack[i])
}


