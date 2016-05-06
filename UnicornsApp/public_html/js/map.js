  $.getJSON("../map_nested_json.json", function(json) {

      var width = 800,
          height = 500;

      var projection = d3.geo.mercator()
          .scale(140)
          .translate([width / 2, height / 2])
          .precision(.1);

      var path = d3.geo.path()
          .projection(projection);

      var tooltip = d3.select("body #map").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

      var graticule = d3.geo.graticule();

      var svg = d3.select("body #map").append("svg")
          .attr("width", width)
          .attr("height", height);

      d3_queue.queue()
        .defer(d3.json, "world-110m.json")
        .defer(d3.tsv, "world-country-names.tsv")
        .await(ready);

      function ready(error, world, names) {
          var countries = topojson.feature(world, world.objects.countries).features,
              neighbors = topojson.neighbors(world.objects.countries.geometries);

          countries.forEach(function(d) {
            d.name = names.filter(function(n) { return d.id == n.id});
          });

          svg.selectAll(".country")
              .data(countries)
              .enter().insert("path", ".graticule")
              .attr("class", "country")
              .attr("title", function(d) {
                try {
                  return d.name[0].name
                } catch(err) {
                  return ""
                }})
              .attr("d", path)
              .on("mouseover", function(d) {
                tooltip.transition()
                .style("opacity", .9);
                tooltip.html("helllllooooo")
                .style("left", (d3.event.pageX) + "px")
                 .style("top", (d3.event.pageY) + "px");
              })

            .on("mouseout",  function(d) {
              tooltip.transition()
                      .style("opacity", 0);
            });

          svg.insert("path", ".graticule")
              .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
              .attr("class", "boundary")
              .attr("d", path);

          var cantons = topojson.feature(world, world.objects.countries);
              var group=svg.selectAll("g")
                .data(cantons.features)
                .enter()
                .append("g");

          var areas= group.append("path")
      			.attr("d", path)
      			.attr("class", "area")
            .attr("fill","#000");

          overall_city_dict = []
          display_dates = ['Jan-04','Feb-04','Mar-04','Apr-04','May-04','Jun-04','Jul-04','Aug-04','Sep-04','Oct-04','Nov-04','Dec-04','Jan-05','Feb-05','Mar-05','Apr-05','May-05','Jun-05','Jul-05','Aug-05','Sep-05','Oct-05','Nov-05','Dec-05','Jan-06','Feb-06','Mar-06','Apr-06','May-06','Jun-06','Jul-06','Aug-06','Sep-06','Oct-06','Nov-06','Dec-06','Jan-07','Feb-07','Mar-07','Apr-07','May-07','Jun-07','Jul-07','Aug-07','Sep-07','Oct-07','Nov-07','Dec-07','Jan-08','Feb-08','Mar-08','Apr-08','May-08','Jun-08','Jul-08','Aug-08','Sep-08','Oct-08','Nov-08','Dec-08','Jan-09','Feb-09','Mar-09','Apr-09','May-09','Jun-09','Jul-09','Aug-09','Sep-09','Oct-09','Nov-09','Dec-09','Jan-10','Feb-10','Mar-10','Apr-10','May-10','Jun-10','Jul-10','Aug-10','Sep-10','Oct-10','Nov-10','Dec-10','Jan-11','Feb-11','Mar-11','Apr-11','May-11','Jun-11','Jul-11','Aug-11','Sep-11','Oct-11','Nov-11','Dec-11','Jan-12','Feb-12','Mar-12','Apr-12','May-12','Jun-12','Jul-12','Aug-12','Sep-12','Oct-12','Nov-12','Dec-12','Jan-13','Feb-13','Mar-13','Apr-13','May-13','Jun-13','Jul-13','Aug-13','Sep-13','Oct-13','Nov-13','Dec-13']
          dates = ['2004-1','2004-2','2004-3','2004-4','2004-5','2004-6','2004-7','2004-8','2004-9','2004-10','2004-11','2004-12','2005-1','2005-2','2005-3','2005-4','2005-5','2005-6','2005-7','2005-8','2005-9','2005-10','2005-11','2005-12','2006-1','2006-2','2006-3','2006-4','2006-5','2006-6','2006-7','2006-8','2006-9','2006-10','2006-11','2006-12','2007-1','2007-2','2007-3','2007-4','2007-5','2007-6','2007-7','2007-8','2007-9','2007-10','2007-11','2007-12','2008-1','2008-2','2008-3','2008-4','2008-5','2008-6','2008-7','2008-8','2008-9','2008-10','2008-11','2008-12','2009-1','2009-2','2009-3','2009-4','2009-5','2009-6','2009-7','2009-8','2009-9','2009-10','2009-11','2009-12','2010-1','2010-2','2010-3','2010-4','2010-5','2010-6','2010-7','2010-8','2010-9','2010-10','2010-11','2010-12','2011-1','2011-2','2011-3','2011-4','2011-5','2011-6','2011-7','2011-8','2011-9','2011-10','2011-11','2011-12','2012-1','2012-2','2012-3','2012-4','2012-5','2012-6','2012-7','2012-8','2012-9','2012-10','2012-11','2012-12','2013-1','2013-2','2013-3','2013-4','2013-5','2013-6','2013-7','2013-8','2013-9','2013-10','2013-11','2013-12']
          rounds = [7,3,8,7,5,9,12,5,6,9,5,9,57,34,59,45,43,54,38,35,52,52,35,47,103,50,66,54,59,71,59,47,66,64,51,38,86,66,67,51,82,77,77,58,80,58,42,59,98,78,89,105,73,67,48,66,57,78,47,50,66,44,54,55,40,47,68,64,48,71,97,80,73,46,82,83,71,80,78,52,52,76,58,84,71,93,77,77,66,96,113,92,104,108,98,83,70,147,73,87,112,116,130,141,87,79,127,78,80,98,94,99,136,100,106,124,100,131,132,101,95]
          top_vc = ['Menlo Park','New York','Menlo Park','New York','Boston','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Palo Alto','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','New York','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','New York','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','New York','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park','New York','Menlo Park','Menlo Park','Menlo Park','Menlo Park','Menlo Park']
            // LOADING ALL THE DATES INTO A LIST
            // dates = []
            // $.each(json, function(n, elem) {
            //   dates.push(n)
            // })

            for (i = 0; i < dates.length; i++) {
                    $.each(json, function(n, elem) {
                        if (n == dates[i]){
                          var city_dict = []
                          for (j = 0; j < elem.length; j++) {
                            city_dict.push(elem[j])
                          }
                          overall_city_dict.push(city_dict)
                          // animate_circle(city_dict)
              }})}
          // console.log(overall_city_dict)

          // Prepopulate circles
          // svg.selectAll("circle").enter().append("circle")
          var circleGroup = svg.append("g")

          for (i = 0; i < overall_city_dict.length; i++) {
            (function(ind) {
              setTimeout(function() {
                requestAnimationFrame(function() {
                  var circles = circleGroup.selectAll("circle")
                  .data(overall_city_dict[ind])
                  .enter().append("circle")
                  $("#year").html('<p>' + display_dates[ind]+'<p>');
                  $("#investor").html('<h1>Top City: ' + top_vc[ind]+'</h1>');
                  $("#rounds").html('<h1> ' + rounds[ind] +' Rounds</h1>');

                  var circlesAttributes = circles.attr("r", 0) //initial size zero so its not seen
                  .attr("transform", function(d) {
                  return "translate(" + projection([
                    d.lng,
                    d.lat
                  ]) + ")";
                  })
                  // .each(pulse);
                  circleGroup.call(pulse)
                  //
                  // console.log(ind)
                  // console.log(overall_city_dict[ind].length)
                  // console.log(test)
                  // console.log(overall_city_dict[ind])
              })
            },1700*ind);
          }(i))}

            function pulse() {
              var circle = svg.selectAll("circle");
              (function repeat() {
                circle = circle.transition()
                  .duration(800)
                  .transition()
                  .style('fill',"#99ff99") //transition to lighter shade
                  .attr("r", function(d) {
                    // scale = d3.scale.log().domain([1, 10]).range([0, 10]);
                     return d.count*4
                  })
                  .style('fill-opacity',0)
                  .ease('sine')
                  .remove();
              })();
            }};
    });
