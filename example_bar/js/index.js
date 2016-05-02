var data = [
  ["oranges",2312],
  ["mangos",674], 
  ["limes", 994], 
  ["apples", 3433], 
  ["strawberries", 127],
  ["blueberries",2261]
];

var data2 = [
  ["oranges",500],
  ["mangos",3000], 
  ["limes", 994], 
  ["apples", 200], 
  ["strawberries", 1500],
  ["blueberries",1000]
];


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
  .attr("height", 400);


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
  .attr("class", function(d,i) { return "pt" + i; })
  .on("mouseover", function(d, i) {
      console.log(i)
      d3.selectAll("rect.pt" + i)
        .attr("fill", "Orchid")
        .attr("r", 10)
  })
  .on("mouseout", function(d, i) {
      d3.selectAll("rect.pt" + i)
        .attr("fill", "slateblue")
        .attr("r", 5)
  });







svg2 = d3.select(chart2)
  .append("svg")
  .attr("width", width)
  .attr("height", 400);


bar = svg2.selectAll("g")
  .data(data2)
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
  .attr("class", function(d,i) { return "pt" + i; })
  .on("mouseover", function(d, i) {
        console.log(i)
        d3.selectAll("rect.pt" + i)
          .attr("fill", "Orchid")
          .attr("r", 10)
    })
    .on("mouseout", function(d, i) {
        d3.selectAll("rect.pt" + i)
          .attr("fill", "slateblue")
          .attr("r", 5)
    })
    .on("click", function() {
        sortBars();
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

// svg.insert("g",":first-child")
//  .attr("class", "axis")
//  .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
//  .call(xAxis);