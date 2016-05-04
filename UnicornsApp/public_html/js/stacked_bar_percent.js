var margin = {top: 20, right: 100, bottom: 30, left: 40},
    width = 870 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
 
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .05);
 
var y = d3.scale.linear()
    .rangeRound([height, 0]);
 
var color = d3.scale.ordinal()
 
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0, 0, 0)
    .tickPadding(6);
 
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".0%"))
    .tickSize(0, 0, 0)
    .tickPadding(-1);
 
var svg = d3.select("body #percentage_stack_cont").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
d3.csv("static/files/stack_bar.txt", function(error, data) {
    var categories = d3.keys(data[0]).filter(function(key) { return key !== "Sample"; });
    var categories_shift = categories;
    console.log(categories);
    color.domain(categories);
    color.range(colorbrewer.Spectral[categories.length]);
 
    data.forEach(function(d) {
  var y0 = 0;
  d.genes = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
  d.genes.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
    });
    data.sort(function(a, b) { return b.genes[0].y1 - a.genes[0].y1; });
 
    x.domain(data.map(function(d) { return d.Sample; }));
 
    svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);
 
    svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);
 
    var rotate = function(arr){
  var temp = arr.shift();
  arr.push(temp);
    }
    
    var sample = svg.selectAll(".sample")
  .data(data)
  .enter().append("g")
  .attr("class", "sample")
  .attr("transform", function(d) { return "translate(" + x(d.Sample) + ",0)"; });
 
  sample.selectAll("rect")
    .data(function(d) { return d.genes; })
    .enter().append("rect")
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.y1); })
    .attr("height", function(d) { return y(d.y0) - y(d.y1); })
    .style("fill", function(d) { return color(d.name);})
    .on("click", function(d) {
        var gene_index = categories_shift.indexOf(d.name);
        moveStuff(gene_index);
     });
 
  var moveStuff = function(gene_index){
  categories_shift = categories;
  for (var i=0; i<gene_index; i++){
      rotate(categories_shift);
  }
  data.forEach(function(d) {
      var y0 = 0;
      d.genes = categories_shift.map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.genes.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
  })
  data.sort(function(a, b) { return b.genes[0].y1 - a.genes[0].y1; });
  x.domain(data.map(function(d) { return d.Sample; }));
  svg.select(".x.axis")
      .transition()
      .duration(1000)
      .call(xAxis);
  sample = svg.selectAll(".sample")
      .data(data)
      .attr("transform", function(d) { return "translate(" + x(d.Sample) + ",0)"; });
 
  sample.selectAll("rect")
      .data(function(d) { return d.genes; })
      .transition()
      .delay(function(d, i) { return i * 50})
      .attr("y", function(d) {return y(d.y1);})
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name);});
 
  last_sample = data[data.length - 1];
  };
  
 
 
  console.log(data);
  console.log(data[data.length - 1].genes);
  var last_sample = data[data.length - 1];
  console.log( x(last_sample.Sample));
  svg.selectAll("text")
  .data(last_sample.genes)
  .enter()
  .append("text")
  .text(function(d) {
      return d.name;
  })
  .attr("x", function(d) {
      return x(last_sample.Sample) + x.rangeBand() + 15;
  })
  .attr("y", function(d) {
      return (y(d.y0) + y(d.y1)) / 2;
  })
  .attr("font-size", "11px")
  .attr("fill", "black");
  
  
});