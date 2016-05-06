var data_unicorn = [];
var data_all = [];
var data_granular = [];

d3.csv("/static/files/aggregated-market-scatterline.csv", function(error, data) {

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


    myDataIsReady()
});


d3.csv("/static/files/investments-unicorns.csv", function(error, data) {

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
    var uniColor = d3.scale.ordinal()
    // .range(['#ffff53','#ffffad','#ffff84','#deff84','#9aff84','#bcebae','#99ebae','#00db97','#69e275','#34ed5c','#6da16e','#c3a16e','#ffa16e','#00c9bb','#00ffd5','#89d1c5','#6eccdc','#a8b1c0','#9fd8ef','#b7d2ee','#a4eeda','#b9ff53','#daf741','#d25d00','#ff5a3b','#c55a3b','#ffd1c5 ','#ffb762','#ff8400','#ff804f','#ffb486','#ffbdac','#ff6b02','#007b75','#00a48d'])
    .range(["#007b75","#00a48d","#00c9bb","#00ffd5","#89d1c5","#6eccdc","#a8b1c0","#9fd8ef","#b7d2ee","#a4eeda","#99ebae","#bcebae","#9aff84","#00db97","#69e275","#6da16e","#34ed5c","#b9ff53","#daf741","#ffff53","#deff84","#ffff84","#ffb762","#ffffad","#c7a169","#ffb8a8","#ffcec3","#ffaf7f","#ff804f","#d25d00","#c55a3b","#ff5a3b","#fa5300","#fa7600","#DE4000"])
    .domain(["E-Commerce","Advertising","Software","Storage","Clean Technology","Communities","File Sharing","Technology","Online Shopping","Curated Web","Enterprise Software","Design","Games","Cloud Computing","Shopping","Entertainment","Transportation","Security","Data Security","Peer-to-Peer","Mobile Payments","Search","Fashion","Facebook Applications","Finance Technology","Consumer Electronics","Analytics","Privacy","Mobile Games","News","Hardware + Software","Retail","Mobile","Location Based Services","Biotechnology"]);

    var c20_1 = d3.scale.category20()
    var c20_2 = d3.scale.category20()


    var axisuniMargin = 20,
        uniMargin = 20,
        valueuniMargin = 4,
        width = chart.offsetWidth,
        height = chart.offsetHeight,
        barHeight = (height-axisuniMargin-uniMargin*2)* 0.6/data.length,
        barPadding = (height-axisuniMargin-uniMargin*2)*0.4/data.length,
        data, bar, unisvg, uniScale, uniXaxis, labelWidth = 0;

    max = d3.max(data.map(function(i){ 
      return i[1];
    }));

    max2 = d3.max(data2.map(function(i){ 
      return i[1];
    }));

    unisvg = d3.select(chart)
      .append("svg")
      .attr("width", width)
      .attr("height", height);


    bar = unisvg.selectAll("g")
      .data(data)
      .enter()
      .append("g");

    bar.attr("class", "bar")
      .attr("cx",0)
      .attr("transform", function(d, i) { 
         return "translate(" + uniMargin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
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

    uniScale2 = d3.scale.linear()
      .domain([0, max])
      .range([0, width - uniMargin*2 - labelWidth]);

    uniXaxis = d3.svg.axis()
      .scale(uniScale2)
      .outerTickSize(0)
      // .tickSize(-height + 2*uniMargin + axisuniMargin)
      .orient("bottom");

    bar.append("rect")
      .attr("transform", "translate("+labelWidth+", 0)")
      .attr("height", barHeight)
      .attr("width", function(d){
        return uniScale2(d[1]);
      })
      .attr("class", function(d,i) { return "barclick pt" + d[0].replace(/ /g,''); })
      .attr("fill", function(d) { return uniColor(d[0].replace(/ /g,'')); })
      // .style("fill", function (d) {
      //     return uniColor(d[0]);
      // });
      .call(d3.helper.tooltip()
                .attr("class", "tooltip_css")
                .style({color: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
                .text(function(d, i){ return 'value: '+ uniScale2(d[1]); })
            )
      .on("mouseover", function(d, i) {
            // console.log(i)
            updateline(d[0].replace(/ /g,''))
            d3.selectAll("rect.pt" + d[0].replace(/ /g,''))
              .attr("fill", "Orchid")
              .attr("r", 10)
            d3.selectAll("rect.bar2pt" + d[0].replace(/ /g,'')) 
              .attr("fill", "Orchid")
              .transition().duration(500).attr("width", function(d){return uniScale(d[1])+60;})
              .transition().duration(500).attr("width", function(d){return uniScale(d[1]);})
              .attr("r", 10)
        })
        .on("mouseout", function(d, i) {
            d3.selectAll("rect.pt" + d[0].replace(/ /g,''))
              .attr("fill", function(d) { return uniColor(d[0].replace(/ /g,'')); })
              .attr("r", 10)
            d3.selectAll("rect.bar2pt" + d[0].replace(/ /g,''))
              .transition().duration(500).attr("width", function(d){return uniScale(d[1]);})
              .attr("fill", function(d) { return uniColor(d[0].replace(/ /g,'')); })
              .attr("r", 5)
        });



    unisvg2 = d3.select(chart2)
      .append("svg")
      .attr("width", width)
      .attr("height", height);


    bar2 = unisvg2.selectAll("g")
      .data(data2)
      .enter()
      .append("g");

    bar2.attr("class", "bar")
      .attr("cx",0)
      .attr("transform", function(d, i) { 
         return "translate(" + uniMargin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
      });



    uniScale = d3.scale.linear()
      .domain([0, max2])
      .range([0, width - uniMargin*2 - labelWidth]);

    uniXaxis = d3.svg.axis()
      .scale(uniScale)
      .tickSize(-height + 2*uniMargin + axisuniMargin)
      .outerTickSize(0)
      .orient("bottom");

    bar2.append("rect")
      // .attr("transform", "translate("+(labelWidth)+", 0)")
      .attr("height", barHeight)
      .attr("width", function(d){
        console.log("scale: " + uniScale(d[1]))
        console.log("invertscale: " + uniScale.invert(d[1]))
        return uniScale(d[1]);
      })
      .attr("class", function(d,i) { return "bar2pt" + d[0].replace(/ /g,''); })
      .attr("fill", function(d) { return uniColor(d[0].replace(/ /g,'')); })
      .call(d3.helper.tooltip()
                .attr("class", "tooltip_css")
                .style({color: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
                .text(function(d, i){ return 'value: '+ uniScale(d[1]); })
            )
      .on("mouseover", function(d, i) {
            console.log(i)
            d3.selectAll("rect.bar2pt" + d[0].replace(/ /g,''))
              .attr("fill", "Orchid")
              .attr("r", 10)
            d3.selectAll("rect.pt" + d[0].replace(/ /g,'')) 
              .attr("fill", "Orchid")
              .transition().duration(500).attr("width", function(d){return uniScale2(d[1])+60;})
              .transition().duration(500).attr("width", function(d){return uniScale2(d[1]);})
              .attr("r", 10)
        })
        .on("mouseout", function(d, i) {
            d3.selectAll("rect.bar2pt" + d[0].replace(/ /g,''))
              .attr("fill", function(d) { return uniColor(d[0].replace(/ /g,'')); })
              .attr("r", 10)
            d3.selectAll("rect.pt" + d[0].replace(/ /g,''))
              .transition().duration(500).attr("width", function(d){return uniScale2(d[1]);})
              .attr("fill", function(d) { return uniColor(d[0].replace(/ /g,'')); })
              .attr("r", 5)
        });


}



// Set the dimensions of the canvas / graph
var uniMargin = {top: 15, right: 20, bottom: 20, left: 90},
    width = 700 - uniMargin.left - uniMargin.right,
    height = 500 - uniMargin.top - uniMargin.bottom;

var uniColor = d3.scale.ordinal()
    .range(["#007b75","#00a48d","#00c9bb","#00ffd5","#89d1c5","#6eccdc","#a8b1c0","#9fd8ef","#b7d2ee","#a4eeda","#99ebae","#bcebae","#9aff84","#00db97","#69e275","#6da16e","#34ed5c","#b9ff53","#daf741","#ffff53","#deff84","#ffff84","#ffb762","#ffffad","#c7a169","#ffb8a8","#ffcec3","#ffaf7f","#ff804f","#d25d00","#c55a3b","#ff5a3b","#fa5300","#fa7600","#DE4000"])
    .domain(["E-Commerce","Advertising","Software","Storage","Clean Technology","Communities","File Sharing","Technology","Online Shopping","Curated Web","Enterprise Software","Design","Games","Cloud Computing","Shopping","Entertainment","Transportation","Security","Data Security","Peer-to-Peer","Mobile Payments","Search","Fashion","Facebook Applications","Finance Technology","Consumer Electronics","Analytics","Privacy","Mobile Games","News","Hardware + Software","Retail","Mobile","Location Based Services","Biotechnology"]);
    // .range(["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd"]);

// Parse the date / time
var uniParseDate = d3.time.format("%Y-%m").parse; 

// Set the ranges
var uniX = d3.time.scale().range([0, width]);
var uniY = d3.scale.linear().range([height, 0]);

// Define the axes
var uniXaxis = d3.svg.axis().scale(uniX)
    .orient("bottom").ticks(5);

var uniYaxis = d3.svg.axis().scale(uniY)
    .orient("left").ticks(5);

// Define the line
var priceline = d3.svg.line()
    .x(function(d) { return uniX(d.date); })
    .y(function(d) { return uniY(d.price); });


    
// Adds the svg canvas
var unisvg = d3.select("#chart3")
    .append("svg")
        .attr("width", width + uniMargin.left + uniMargin.right)
        .attr("height", height + uniMargin.top + uniMargin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + uniMargin.left + "," + uniMargin.top + ")");

// Get the data
d3.csv("/static/files/investments-unicorns-cumsum.csv", function(error, data) {
  console.log(data)
    data.forEach(function(d) {
        d.company_name = d.company_name;
        d.price = +d.no_cumulative;
        d.raised_amount_usd = +d.raised_amount_usd;
        d.company_market = d.company_market;
        d.date = uniParseDate(d.funded_month);
        d.unicorn_flag = d.unicorn_flag;
    });

    data = data.filter(function(row) {
      // return row['unicorn_flag'] == 'TRUE' && row['company_market'] == 'E-Commerce';
      return row['unicorn_flag'] == 'True' && row['company_market'] == 'E-Commerce';
      // return row['unicorn_flag'] == 'True';
    })
    console.log(data.length)

    // Scale the range of the data
    uniX.domain(d3.extent(data, function(d) { return d.date; }));
    // uniY.domain([0, d3.max(data, function(d) { return d.price; })]);
    // z.domain([0, d3.max(data, function(d) { return d.raised_amount_usd; })]); 
    uniY.domain([0,5000000000])

    // Add the scatterplot
    unisvg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", function(d) { return d.raised_amount_usd*.00000002 })
        .attr("cx", function(d) { return uniX(d.date); })
        .attr("cy", function(d) { return uniY(d.price); })
        .attr('fill', function(d) { return uniColor(d.company_market.replace(/ /g,'')); })
        .call(d3.helper.tooltip()
                .attr("class", "tooltip_css")
                .style({color: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
                .text(function(d, i){ return 'Company Name: ' + d.company_name + '<br>Round: $'+ d.price; })
            )
        .on('mouseover', function(d, i){ d3.select(this).style({fill: 'skyblue'}); })
        .on('mouseout', function(d, i){ d3.select(this).style({fill: function(d) { return uniColor(d.company_market.replace(/ /g,'')); }})})
        
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
        unisvg.append("path")
            .attr("class", color_market + " line")
            // .attr("class", )
            .attr("stroke", uniColor(color_market) )
            .attr("d", priceline(d.values))

    });

    // Add the X Axis
    unisvg.append("svg:g")
        // .attr("class", "x axis")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(uniXaxis);

    // Add the Y Axis
    unisvg.append("g")
        .attr("class", "y axis")
        .call(uniYaxis);

});

function updateData(_value) {
  var _path = "path.line"
  to_remove = d3.selectAll(_path)
  // console.log("to remove")
  // console.log(_path)
  to_remove.remove()
  d3.selectAll("circle").remove()

  d3.csv("/static/files/investments-unicorns-cumsum.csv", function(error, data) {
  console.log(data)
    data.forEach(function(d) {
        // d.company_name = d.company_name;
      d.price = +d.no_cumulative;
      d.raised_amount_usd = +d.raised_amount_usd;
      d.company_market = d.company_market;
            d.date = uniParseDate(d.funded_month);
            d.unicorn_flag = d.unicorn_flag;
    });

    data = data.filter(function(row) {
      return row['unicorn_flag'] == 'True' && row['company_market'].replace(/ /g,'') == _value;
    })
    console.log("viltereddata: ")
    console.log(data)



        unisvg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", function(d) { return d.raised_amount_usd*.00000002 })
        .attr("cx", function(d) { return uniX(d.date); })
        .attr("cy", function(d) { return uniY(d.price); })
        .attr('fill', function(d) { return uniColor(d.company_market.replace(/ /g,'')); })
        .call(d3.helper.tooltip()
                .attr("class", "tooltip_css")
                .style({color: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
                .text(function(d, i){ return 'Company Name: ' + d.company_name + '<br>Round: $'+ d.price; })
            )
        .on('mouseover', function(d, i){ d3.select(this).style({fill: 'skyblue'}); })
        .on('mouseout', function(d, i){ d3.select(this).style({fill: function(d) { return uniColor(d.company_market.replace(/ /g,'')); }})})

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.company_name;})
        .entries(data);

    // Loop through each symbol / key


    dataNest.forEach(function(d) {
      // console.log("dataNest: ")
      // console.log(d)
      var color_market = d.values[0].company_market.replace(/ /g,'')
        unisvg.append("path")
            .attr("class", color_market + " line")
            // .attr("stroke", "green")
            .attr("stroke", uniColor(color_market) )
            // .attr("stroke", function (d) { return uniColor(d.values[0].company_market.replace(/ /g,'')); })
            // .attr("stroke", function (d) { return uniColor(d.company_market.replace(/ /g,'')); })
            .attr("d", priceline(d.values)); 


    });


  });
}



function updateline(_value) {
  var _path = "path.line"
  to_remove = d3.selectAll(_path)
  // console.log("to remove")
  // console.log(_path)
  to_remove.remove()
  d3.selectAll("circle").remove()

  d3.csv("/static/files/investments-unicorns-cumsum.csv", function(error, data) {
  console.log(data)
    data.forEach(function(d) {
        // d.company_name = d.company_name;
      d.price = +d.no_cumulative;
      d.raised_amount_usd = +d.raised_amount_usd;
      d.company_market = d.company_market;
            d.date = uniParseDate(d.funded_month);
            d.unicorn_flag = d.unicorn_flag;
    });

    data = data.filter(function(row) {
      return row['unicorn_flag'] == 'True' && row['company_market'].replace(/ /g,'') == _value;
    })
    console.log("viltereddata: ")
    console.log(data)



        unisvg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", function(d) { return d.raised_amount_usd*.00000002 })
        .attr("cx", function(d) { return uniX(d.date); })
        .attr("cy", function(d) { return uniY(d.price); })
        .attr('fill', function(d) { return uniColor(d.company_market.replace(/ /g,'')); })
        .call(d3.helper.tooltip()
                .attr("class", "tooltip_css")
                .style({color: 'black', background: 'rgba(183, 210, 238, 0.75)', padding: '0.5em', borderradius: '2px'})
                .text(function(d, i){ return 'Company Name: ' + d.company_name + '<br>Round: $'+ d.price; })
            )
        .on('mouseover', function(d, i){ d3.select(this).style({fill: 'skyblue'}); })
        .on('mouseout', function(d, i){ d3.select(this).style({fill: function(d) { return uniColor(d.company_market.replace(/ /g,'')); }})})

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.company_name;})
        .entries(data);

    // Loop through each symbol / key


    dataNest.forEach(function(d) {
      // console.log("dataNest: ")
      // console.log(d)
      var color_market = d.values[0].company_market.replace(/ /g,'')
        unisvg.append("path")
            .attr("class", color_market + " line")
            // .attr("stroke", "green")
            .attr("stroke", uniColor(color_market) )
            // .attr("stroke", function (d) { return uniColor(d.values[0].company_market.replace(/ /g,'')); })
            // .attr("stroke", function (d) { return uniColor(d.company_market.replace(/ /g,'')); })
            .attr("d", priceline(d.values)); 
    });

  });
}