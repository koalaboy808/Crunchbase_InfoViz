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

    myScatterDataIsReady()
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
      .attr("class", function(d,i) { return "pt" + d[0].replace(/ /g,''); })
      .attr("fill", function(d) { return color(d[0].replace(/ /g,'')); })
      // .style("fill", function (d) {
      //     return color(d[0]);
      // });
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

function myScatterDataIsReady() {
  
}