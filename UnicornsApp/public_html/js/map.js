
   
    $.getJSON("../map_nested_json.json", function(json) {

      var width = 800,
          height = 500;

      // var color= d3.scale.ordinal()
      //       .domain([1,2,3,4,5,6,7,8,9])
      //       .range(colorbrewer.Oranges[9]);

      var projection = d3.geo.mercator()
          .scale(150)
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
        //
        // d3.json("world-110m.json", function(error, world){
        //   if (error) throw error;
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
              // .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); });

          svg.insert("path", ".graticule")
              .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
              .attr("class", "boundary")
              .attr("d", path);

          // svg.selectAll(".country")
          //   .data(countries)
          //   .on("mousemove", function(d,i) {
          //     var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d) } );
          //
          //     tooltip
          //       .classed("hidden", false)
          //       .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
          //       .html("fadsf")

            // })
            // svg.selectAll(".country")
            //   .data(countries)
            //   .on("mouseover", function(d) {
            //     tooltip.transition()
            //     .style("opacity", .9);
            //     tooltip.html("helllllooooo")
            //     .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px");
            //   })
            //
            // .on("mouseout",  function(d) {
            //   tooltip.transition()
            //           .style("opacity", 0);
            // });

          var cantons = topojson.feature(world, world.objects.countries);
              var group=svg.selectAll("g")
                .data(cantons.features)
                .enter()
                .append("g");

          var areas= group.append("path")
      			.attr("d", path)
      			.attr("class", "area")
            .attr("fill","#000");

          // svg.selectAll(".subunit-label")
          //     .data(topojson.feature(world, world.objects.countries).features)
          //   .enter().append("text")
          //     .attr("class", function(d) { return "subunit-label " + d.id; })
          //     .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
          //     .attr("dy", ".35em")
          //     .text(function(d) {return names.filter(function(n) { return d.id == n.id})[0].name;});
          //
          overall_city_dict = []
          //   dates = ['2004-1', '2004-2','2004-3', '2004-1', '2004-2','2004-3','2004-1', '2004-2','2004-3','2004-1', '2004-2','2004-3','2004-1', '2004-2','2004-3','2004-1', '2004-2','2004-3','2004-1', '2004-2','2004-3']

            // LOADING ALL THE DATES INTO A LIST
            dates = []
            $.each(json, function(n, elem) {
              dates.push(n)
            })

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
          console.log(overall_city_dict)

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
                  $("#year").html('<p>' + dates[ind]+'<p>');
                  var circlesAttributes = circles.attr("r", 0) //initial size zero so its not seen
                  .attr("transform", function(d) {
                  return "translate(" + projection([
                    d.lng,
                    d.lat
                  ]) + ")";
                  })
                  // .each(pulse);
                  circleGroup.call(pulse)

                  console.log(ind)
                  console.log(overall_city_dict[ind].length)
                  // console.log(test)
                  // console.log(overall_city_dict[ind])
              })
            },1700*ind);
          }(i))}

          // var animate = function(){
          //   dates = ['2004-1', '2004-2']
          //   for (i = 0; i < dates.length; i++) {
          //     (function(i){
          //         setTimeout(function(){
          //           $.each(json, function(n, elem) {
          //               if (n == dates[i]){
          //                 var city_dict = []
          //                 for (j = 0; j < elem.length; j++) {
          //                   city_dict.push(elem[j])
          //                 }
          //                 animate_circle(city_dict)
          //               }})
          //         },1000*i);
          //     }(i));
          //       }}

        //   var animate_circle = function(city_dict) {
        //     svg.selectAll("circle")
        //     .data(city_dict)
        //     .enter().append("circle")
        //     .attr("r", 0) //initial size zero so its not seen
        //     .attr("transform", function(d) {
        //     return "translate(" + projection([
        //       d.lng,
        //       d.lat
        //     ]) + ")";
        //     })
        //     .each(pulse);
        // };




            // var nested_data = d3.nest().key(function(d) { return d.year; }).key(function(d) { return d.month; }).entries(json);
            // alert(nested_data)

            function pulse() {
              var circle = svg.selectAll("circle");
              (function repeat() {
                circle = circle.transition()
                  .duration(800)
                  .transition()
                  // .duration(700)
                  .style('fill',"#99ff99") //transition to lighter shade
                  // .delay(function(d, i) {
                  //             return i * 300;  // Dynamic delay (i.e. each item delays a little longer)
                  //         })
                  .attr("r", function(d) {
                    scale = d3.scale.log().domain([1, 10]).range([0, 10]);
                     return scale(d.count*100)
                  })
                  .style('fill-opacity',0)
                  .ease('sine')
                  .remove();
              })();
            }};
    });

    // var axis = d3.svg.axis().orient("top").ticks(4);
    // d3.select('#slider').call(d3.slider().axis(true).min(2004).max(2013).step(1));
