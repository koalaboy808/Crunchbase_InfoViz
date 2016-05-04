var data_combined = [];

d3.csv("/data/investments-unicorns.csv", function(error, data) {

    // console.log(data.length)
    data.forEach(function(d) {
        d.company_name = d.company_name;
        d.raised_amount_usd = +d.raised_amount_usd;
    });

    for (var i = 0; i < data.length; i++) {
      data_combined.push([data[i]['company_name'], data[i]['raised_amount_usd']]);
    }
    // console.log(data_combined)

    data = data.filter(function(row) {
          return row['unicorn_flag'] == 'True';
    })

    myDataIsReady()
});


function myDataIsReady() {
    console.log("data_combined should have values: ")
    data = data_combined.slice(1, 21)
    console.log(data);// will trace the data that was loaded
    // Here you can draw your visualization
    color = d3.scale.ordinal()
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"])
    .domain(["apples","oranges","blueberries","limes","mangoes","strawberries"]);

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

    // max2 = d3.max(data2.map(function(i){ 
    //   return i[1];
    // }));

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
      .tickSize(-height + 2*margin + axisMargin)
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

    bar.append("text")
      .attr("class", "value")
      .attr("y", barHeight / 2)
      .attr("dx", -valueMargin + labelWidth) //margin right
      .attr("dy", ".35em") //vertical align middle
      .attr("text-anchor", "end")
      .text(function(d){
        return d[1];
      })
     .attr("x", function(d){
        var width = this.getBBox().width;
        return Math.max(width + valueMargin, scale(d[1]));
      });

    svg.insert("g",":first-child")
     .attr("class", "axis")
     .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
     .call(xAxis);
}

// var data = [
//   ["apples", 3433],
//   ["oranges",2312], 
//   ["blueberries",2261],
//   ["limes", 994], 
//   ["mangos",674], 
//   ["strawberries", 127]
// ];

// console.log("data old: ")
// console.log(data)

// var data2 = [
//   ["mangos",3000],
//   ["strawberries", 1500],
//   ["blueberries",1000], 
//   ["limes", 994], 
//   ["oranges",500],
//   ["apples", 200]
// ];

// color = d3.scale.ordinal()
//   .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"])
//   .domain(["apples","oranges","blueberries","limes","mangoes","strawberries"]);

// var c20_1 = d3.scale.category20()
// var c20_2 = d3.scale.category20()
// // color = d3.scale.ordinal()
// //     .domain(YOUR_DATA_CATEGORIES)
// //     .range(["#30c514", "#9321ff", ...]);

// var chart = document.getElementById("chart"),
//     axisMargin = 20,
//     margin = 20,
//     valueMargin = 4,
//     width = chart.offsetWidth,
//     height = chart.offsetHeight,
//     barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
//     barPadding = (height-axisMargin-margin*2)*0.6/data.length,
//     data, bar, svg, scale, xAxis, labelWidth = 0;

// max = d3.max(data.map(function(i){ 
//   return i[1];
// }));

// max2 = d3.max(data2.map(function(i){ 
//   return i[1];
// }));

// svg = d3.select(chart)
//   .append("svg")
//   .attr("width", width)
//   .attr("height", 400);


// bar = svg.selectAll("g")
//   .data(data)
//   .enter()
//   .append("g");

// bar.attr("class", "bar")
//   .attr("cx",0)
//   .attr("transform", function(d, i) { 
//      return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
//   });

// bar.append("text")
//   .attr("class", "label")
//   .attr("y", barHeight / 2)
//   .attr("dy", ".35em") //vertical align middle
//   .text(function(d){
//     return d[0];
//   }).each(function() {
//     labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
//   });

// scale = d3.scale.linear()
//   .domain([0, max])
//   .range([0, width - margin*2 - labelWidth]);

// xAxis = d3.svg.axis()
//   .scale(scale)
//   .tickSize(-height + 2*margin + axisMargin)
//   .orient("bottom");

// bar.append("rect")
//   .attr("transform", "translate("+labelWidth+", 0)")
//   .attr("height", barHeight)
//   .attr("width", function(d){
//     return scale(d[1]);
//   })
//   .attr("class", function(d,i) { return "pt" + d[0]; })
//   .attr("fill", function(d) { return color(d[0]); })
//   // .style("fill", function (d) {
//   //     return color(d[0]);
//   // });
//   .on("mouseover", function(d, i) {
//       console.log(i)
//       d3.selectAll("rect.pt" + d[0])
//         .attr("fill", "Orchid")
//         .attr("r", 10)
//   })
//   .on("mouseout", function(d, i) {
//       d3.selectAll("rect.pt" + d[0])
//         .attr("fill", function(d) { return color(d[0]); })
//         .attr("r", 5)
//   });

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

// svg.insert("g",":first-child")
//  .attr("class", "axis")
//  .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
//  .call(xAxis);





// svg2 = d3.select(chart2)
//   .append("svg")
//   .attr("width", width)
//   .attr("height", 400);


// bar2 = svg2.selectAll("g")
//   .data(data2)
//   .enter()
//   .append("g");

// bar2.attr("class", "bar")
//   .attr("cx",0)
//   .attr("transform", function(d, i) { 
//      return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
//   });

// bar2.append("text")
//   .attr("class", "label")
//   .attr("y", barHeight / 2)
//   .attr("dy", ".35em") //vertical align middle
//   .text(function(d){
//     return d[0];
//   }).each(function() {
//     labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
//   });

// scale = d3.scale.linear()
//   .domain([0, max])
//   .range([0, width - margin*2 - labelWidth]);

// xAxis = d3.svg.axis()
//   .scale(scale)
//   .tickSize(-height + 2*margin + axisMargin)
//   .orient("bottom");

// bar2.append("rect")
//   .attr("transform", "translate("+(labelWidth)+", 0)")
//   .attr("height", barHeight)
//   .attr("width", function(d){
//     console.log("scale: " + scale(d[1]))
//     console.log("invertscale: " + scale.invert(d[1]))
//     return scale(d[1]);
//   })
//   .attr("class", function(d,i) { return "pt" + d[0]; })
//   .attr("fill", function(d) { return color(d[0]); })
//   .on("mouseover", function(d, i) {
//         console.log(i)
//         d3.selectAll("rect.pt" + d[0])
//           .attr("fill", "Orchid")
//           .attr("r", 10)
//     })
//     .on("mouseout", function(d, i) {
//         d3.selectAll("rect.pt" + d[0])
//           .attr("fill", function(d) { return color(d[0]); })
//           .attr("r", 5)
//     });



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

// svg.insert("g",":first-child")
//  .attr("class", "axis")
//  .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
//  .call(xAxis);