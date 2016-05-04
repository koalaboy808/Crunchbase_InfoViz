var data_unicorn = [];
var data_all = [];
var data_granular = [];

d3.csv("/data/aggregated-market-scatterline.csv", function(error, data) {

    // console.log(data.length)
    data.forEach(function(d) {
        d.company_market = d.company_market;
        d.unicorns_amount_usd = +d.unicorns_amount_usd;
        d.all_amount_usd = +d.all_amount_usd;
    });

    for (var i = 0; i < data.length; i++) {
      data_unicorn.push([data[i]['company_market'], data[i]['unicorns_amount_usd']]);
    }

    for (var i = 0; i < data.length; i++) {
      data_all.push([data[i]['company_market'], data[i]['all_amount_usd']]);
    }
    // console.log(data_combined)

    // data = data.filter(function(row) {
    //       return row['unicorn_flag'] == 'True';
    // })

    myDataIsReady()
});


d3.csv("/data/investments-unicorns.csv", function(error, data) {

    // console.log(data.length)
    data.forEach(function(d) {
        d.company_name = d.company_name;
        d.company_market = d.company_market;
        d.raised_amount_usd = +d.raised_amount_usd;
    });

    data = data.filter(function(row) {
      return row['unicorn_flag'] == 'True';
    })

    for (var i = 0; i < data.length; i++) {
      data_granular.push([data[i]['company_name'], data[i]['raised_amount_usd'], data[i]['company_market']]);
    }

    console.log("data_granular")
    console.log(data_granular)

    // myScatterDataIsReady()
});

function myDataIsReady() {
    console.log("data_combined should have values: ")
    data = data_unicorn.slice(0, 35)
    data2 = data_all.slice(0, 35)
    data2.sort(function(a, b) { 
        return a[1] < b[1] ? 1 : -1;
    });
    console.log(data);// will trace the data that was loaded
    // Here you can draw your visualization
    color = d3.scale.ordinal()
    .range(["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd"]);
    // .domain(["apples","oranges","blueberries","limes","mangoes","strawberries"]);

    var c20_1 = d3.scale.category20()
    var c20_2 = d3.scale.category20()


    var chart = document.getElementById("chart"),
        axisMargin = 20,
        margin = 20,
        valueMargin = 4,
        width = chart.offsetWidth,
        height = chart.offsetHeight,
        barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
        barPadding = (height-axisMargin-margin*2)*0.6/data.length,
        data, bar, svg, scale, xAxis, labelWidth = 0;

    max = d3.max(data.map(function(i){ 
      return i[1];
    }));

    max2 = d3.max(data2.map(function(i){ 
      return i[1];
    }));

    svg = d3.select(chart)
      .append("svg")
      .attr("width", width)
      .attr("height", height);


    bar = svg.selectAll("g")
      .data(data)
      .enter()
      .append("g");

    bar.attr("class", "bar")
      .attr("cx",0)
      .attr("transform", function(d, i) { 
         return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
      });

    bar.append("text")
      .attr("class", "label")
      .attr("y", barHeight / 2)
      .attr("dy", ".35em") //vertical align middle
      .text(function(d){
        return d[0];
      }).each(function() {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
      });

    scale = d3.scale.linear()
      .domain([0, max])
      .range([0, width - margin*2 - labelWidth]);

    xAxis = d3.svg.axis()
      .scale(scale)
      // .tickSize(-height + 2*margin + axisMargin)
      .orient("bottom");

    bar.append("rect")
      .attr("transform", "translate("+labelWidth+", 0)")
      .attr("height", barHeight)
      .attr("width", function(d){
        return scale(d[1]);
      })
      .attr("class", function(d,i) { return "barclick pt" + d[0].replace(/ /g,''); })
      .attr("fill", function(d) { return color(d[0].replace(/ /g,'')); })
      // .style("fill", function (d) {
      //     return color(d[0]);
      // });
      .on("mouseover", function(d, i) {
          updateline(d[0].replace(/ /g,''))
          d3.selectAll("rect.pt" + d[0].replace(/ /g,''))
            .attr("fill", "Orchid")
            .attr("r", 10)
      })
      .on("mouseout", function(d, i) {
          d3.selectAll("rect.pt" + d[0].replace(/ /g,''))
            .attr("fill", function(d) { return color(d[0].replace(/ /g,'')); })
            .attr("r", 5)
      });

    // bar.append("text")
    //   .attr("class", "value")
    //   .attr("y", barHeight / 2)
    //   .attr("dx", -valueMargin + labelWidth) //margin right
    //   .attr("dy", ".35em") //vertical align middle
    //   .attr("text-anchor", "end")
    //   .text(function(d){
    //     return d[1];
    //   })
    //  .attr("x", function(d){
    //     var width = this.getBBox().width;
    //     return Math.max(width + valueMargin, scale(d[1]));
    //   });

    svg.insert("g",":first-child")
     .attr("class", "axis")
     .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
     .call(xAxis);



    svg2 = d3.select(chart2)
      .append("svg")
      .attr("width", width)
      .attr("height", height);


    bar2 = svg2.selectAll("g")
      .data(data2)
      .enter()
      .append("g");

    bar2.attr("class", "bar")
      .attr("cx",0)
      .attr("transform", function(d, i) { 
         return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
      });

    bar2.append("text")
      .attr("class", "label")
      .attr("y", barHeight / 2)
      .attr("dy", ".35em") //vertical align middle
      .text(function(d){
        return d[0];
      }).each(function() {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
      });

    scale = d3.scale.linear()
      .domain([0, max2])
      .range([0, width - margin*2 - labelWidth]);

    xAxis = d3.svg.axis()
      .scale(scale)
      .tickSize(-height + 2*margin + axisMargin)
      .orient("bottom");

    bar2.append("rect")
      .attr("transform", "translate("+(labelWidth)+", 0)")
      .attr("height", barHeight)
      .attr("width", function(d){
        console.log("scale: " + scale(d[1]))
        console.log("invertscale: " + scale.invert(d[1]))
        return scale(d[1]);
      })
      .attr("class", function(d,i) { return "pt" + d[0].replace(/ /g,''); })
      .attr("fill", function(d) { return color(d[0].replace(/ /g,'')); })
      .on("mouseover", function(d, i) {
            console.log(i)
            d3.selectAll("rect.pt" + d[0].replace(/ /g,''))
              .attr("fill", "Orchid")
              .attr("r", 10)
        })
        .on("mouseout", function(d, i) {
            d3.selectAll("rect.pt" + d[0].replace(/ /g,''))
              .attr("fill", function(d) { return color(d[0].replace(/ /g,'')); })
              .attr("r", 5)
        });



    // bar2.append("text")
    //   .attr("class", "value")
    //   .attr("y", barHeight / 2)
    //   .attr("dx", -valueMargin + labelWidth) //margin right
    //   .attr("dy", ".35em") //vertical align middle
    //   .attr("text-anchor", "end")
    //   .text(function(d){
    //     return d[1];
    //   })
    //  .attr("x", function(d){
    //     var width = this.getBBox().width;
    //     return Math.max(width + valueMargin, scale(d[1]));
    //   });

    svg.insert("g",":first-child")
     .attr("class", "axis")
     .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
     .call(xAxis);
}

// var top25 = ["E-Commerce","Advertising","Software","Storage","Clean Technology","Communities","File Sharing","Technology","Online Shopping","Curated Web","Enterprise Software","Design","Games","Cloud Computing","Shopping","Entertainment","Transportation","Security","Data Security","Peer-to-Peer","Mobile Payments","Search","Fashion","Facebook Applications","Finance Technology","Consumer Electronics","Analytics","Privacy","Mobile Games","News","Hardware + Software","Retail","Mobile","Location Based Services","Biotechnology"]

// trimmedArray = []
// for (i = 0; i < top25.length; i++) {
//   trimmedArray.push(top25[i].replace(/ /g,''));
// }
    
// console.log(trimmedArray)

// for (i = 0; i < trimmedArray.length; i++) {
//   $("#_buttons").append('<button onClick="updateData(\'' + trimmedArray[i] + '\')">'+trimmedArray[i]+"</button>")
// }

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 90},
    width = 500 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var color = d3.scale.ordinal()
    .range(["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd"]);

// Parse the date / time
var parseDate = d3.time.format("%Y-%m").parse; 

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var priceline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.price); });


    
// Adds the svg canvas
var svg = d3.select("#chart3")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("/data/investments-unicorns-cumsum.csv", function(error, data) {
  console.log(data)
    data.forEach(function(d) {
        d.company_name = d.company_name;
      d.price = +d.no_cumulative;
      d.raised_amount_usd = +d.raised_amount_usd;
      d.company_market = d.company_market;
            d.date = parseDate(d.funded_month);
            d.unicorn_flag = d.unicorn_flag;
    });

    data = data.filter(function(row) {
      // return row['unicorn_flag'] == 'TRUE' && row['company_market'] == 'E-Commerce';
      // return row['unicorn_flag'] == 'True' && row['company_market'] == 'E-Commerce';
      return row['unicorn_flag'] == 'True';
    })
    console.log(data.length)

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    // y.domain([0, d3.max(data, function(d) { return d.price; })]);
    // z.domain([0, d3.max(data, function(d) { return d.raised_amount_usd; })]); 
    y.domain([0,5000000000])

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", function(d) { return d.raised_amount_usd*.00000002 })
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.price); });
        
        // .attr("r", function(d) {return d.number_downloaded*1.5; })

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.company_name;})
        .sortKeys(d3.ascending)
        .entries(data);

    // Loop through each symbol / key
    dataNest.forEach(function(d) {
      console.log("dataNest: ")
      console.log(d)
      var color_market = d.values[0].company_market.replace(/ /g,'')
        svg.append("path")
            .attr("class", color_market + " line")
            // .attr("class", )
            .attr("stroke", color(color_market) )
            .attr("d", priceline(d.values))

    });

    // Add the X Axis
    svg.append("svg:g")
        // .attr("class", "x axis")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});

function updateData(_value) {
  var _path = "path.line"
  to_remove = d3.selectAll(_path)
  // console.log("to remove")
  // console.log(_path)
  to_remove.remove()
  d3.selectAll("circle").remove()

  d3.csv("/data/investments-unicorns-cumsum.csv", function(error, data) {
  console.log(data)
    data.forEach(function(d) {
        // d.company_name = d.company_name;
      d.price = +d.no_cumulative;
      d.raised_amount_usd = +d.raised_amount_usd;
      d.company_market = d.company_market;
            d.date = parseDate(d.funded_month);
            d.unicorn_flag = d.unicorn_flag;
    });

    data = data.filter(function(row) {
      return row['unicorn_flag'] == 'True' && row['company_market'].replace(/ /g,'') == _value;
    })
    console.log("viltereddata: ")
    console.log(data)

    // Scale the range of the data
    // x.domain(d3.extent(data, function(d) { return d.date; }));
    // y.domain([0, d3.max(data, function(d) { return d.price; })]); 
    // y.domain([0,10000000000])

        svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", function(d) { return d.raised_amount_usd*.00000002 })
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.price); });

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.company_name;})
        .entries(data);

    // Loop through each symbol / key


    dataNest.forEach(function(d) {
      // console.log("dataNest: ")
      // console.log(d)
      var color_market = d.values[0].company_market.replace(/ /g,'')
        svg.append("path")
            .attr("class", color_market + " line")
            // .attr("stroke", "green")
            .attr("stroke", color(color_market) )
            // .attr("stroke", function (d) { return color(d.values[0].company_market.replace(/ /g,'')); })
            // .attr("stroke", function (d) { return color(d.company_market.replace(/ /g,'')); })
            .attr("d", priceline(d.values)); 


    });

 //        // Add the X Axis
 //    svg.append("svg:g")
 //        // .attr("class", "x axis")
 //        .classed("x axis", true)
 //        .attr("transform", "translate(0," + height + ")")
 //        .call(xAxis);

 //    // Add the Y Axis
 //    svg.append("g")
 //        .attr("class", "y axis")
 //        .call(yAxis);

  });
}

// $( "#outer" ).mouseover(function() {
//   alert( "<div>Handler for .mouseover() called.</div>" );
// });

// $("text.barclick").click(function() {
//   alert( "Handler for .click() called." );
// });

function updateline(_value) {
  var _path = "path.line"
  to_remove = d3.selectAll(_path)
  // console.log("to remove")
  // console.log(_path)
  to_remove.remove()
  d3.selectAll("circle").remove()

  d3.csv("/data/investments-unicorns-cumsum.csv", function(error, data) {
  console.log(data)
    data.forEach(function(d) {
        // d.company_name = d.company_name;
      d.price = +d.no_cumulative;
      d.raised_amount_usd = +d.raised_amount_usd;
      d.company_market = d.company_market;
            d.date = parseDate(d.funded_month);
            d.unicorn_flag = d.unicorn_flag;
    });

    data = data.filter(function(row) {
      return row['unicorn_flag'] == 'True' && row['company_market'].replace(/ /g,'') == _value;
    })
    console.log("viltereddata: ")
    console.log(data)

    // Scale the range of the data
    // x.domain(d3.extent(data, function(d) { return d.date; }));
    // y.domain([0, d3.max(data, function(d) { return d.price; })]); 
    // y.domain([0,10000000000])

        svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", function(d) { return d.raised_amount_usd*.00000002 })
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.price); });

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.company_name;})
        .entries(data);

    // Loop through each symbol / key


    dataNest.forEach(function(d) {
      // console.log("dataNest: ")
      // console.log(d)
      var color_market = d.values[0].company_market.replace(/ /g,'')
        svg.append("path")
            .attr("class", color_market + " line")
            // .attr("stroke", "green")
            .attr("stroke", color(color_market) )
            // .attr("stroke", function (d) { return color(d.values[0].company_market.replace(/ /g,'')); })
            // .attr("stroke", function (d) { return color(d.company_market.replace(/ /g,'')); })
            .attr("d", priceline(d.values)); 


    });

 //        // Add the X Axis
 //    svg.append("svg:g")
 //        // .attr("class", "x axis")
 //        .classed("x axis", true)
 //        .attr("transform", "translate(0," + height + ")")
 //        .call(xAxis);

 //    // Add the Y Axis
 //    svg.append("g")
 //        .attr("class", "y axis")
 //        .call(yAxis);

  });
}