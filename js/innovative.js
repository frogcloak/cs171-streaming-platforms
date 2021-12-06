(async function test() {

  var width = 800,
      height = 1200;
    let colors = ['#cf3038', '#ff7f0e', '#7f0eff', '#27d6d5', '#9467bd', '#398f6d','#398f6d' ,'#62bc51', '#e377c2', '#8f8b39', '#bcbd22', '#8f5639','#faa223' ,'#1f77b4', '#0279ad', '#2ca02c','#8f5639','#39858f','#6a6391','#b581c7', '#bb2b77']

    // ['#cf3038', '#ff7f0e', '#7f0eff', '#27d6d5', '#9467bd', '#62bc51', '#e377c2', '#faa223', '#bcbd22', '#0279ad', '#1f77b4', '#ff7f0e', '#2ca02c']
          //

    // let colors = ['#cf3038', '#ff7f0e', '#7f0eff', '#27d6d5', '#9467bd', '#398f6d','#398f6d' ,'#62bc51', '#e377c2', '#8f8b39', '#bcbd22', '#8f5639','#faa223' ,'#1f77b4', '#0279ad', '#2ca02c','#8f5639','#39858f','#6a6391','#b581c7', '#bb2b77']

    // colors = d3.scale.category10();

  //var colors = [#E50914, #ff7f0e, #2ca02c, #d62728, #9467bd, #66aa33, #e377c2, #00A8E1, #bcbd22, #006e99, #1f77b4, #ff7f0e, #2ca02c]

  //#E50914 -- Netflix RED
    //#66aa33 -- Hulu Green
    //#00A8E1 -- Prime Blue
    // #393E8F -- Disney plus


  var setChar = 'ABCDEFGHIJKLMN',
      charFn = i => setChar[i],
      setLength = 5,
      sets = d3.range(setLength).map(function(d, i) {
        return setChar[i]
      })



  var opts = {
    dataLength: 70,
    setLength: 5,
    duration: 800,
    circleOpacity: 0.4,
    innerOpacity: 0
  };


  // Build simple getter and setter Functions
  for (var key in opts) {
    test[key] = getSet(key, test).bind(opts);
  }

  function getSet(option, component) {
    return function(_) {
      if (!arguments.length) {
        return this[option];
      }
      this[option] = _;
      return component;
    };
  }

  async function refreshInput() {
    var sel = d3.select(this),
        name = sel.attr("name"),
        value = sel.property("value")
    test[name](value);
    if (name == 'dataLength' || name == 'setLength') {
      if (name == 'setLength') {
        globalData = [] // we reshuffle everything
      }
      return refresh(await generateData())
    }
    refresh();
  }

  //set input value accorging to options and handle change of input
  d3.selectAll('#inputs input')
      .each(function() {
        var sel = d3.select(this),
            name = sel.attr("name");
        sel.property("value", test[name]())
      })
      .on('input', refreshInput)

  var layout = d3.layout.venn()
      .size([width, height])
      .padding(0)
      .packingStragegy(d3.layout.venn.force)

    console.log(layout)

  // .setsSize(x => (Math.log(x) ))
  // .value(x => 1),
  svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height),
      isFirstLayout = true;

  var globalData = [],
      generator = 0;

  async function generateData() {
      const rawData = await new Promise((resolve, reject) => {
          d3.csv("../data/allplatforms.csv", row => {
              row.Hulu = +row.Hulu;
              row.Prime_Video = +row.Prime_Video;
              row.Netflix = +row.Netflix;
              row.DisneyPlus = +row.DisneyPlus;
              // row.Runtime = parseFloat(row.Runtime);
              row.Rotten_Tomatoes = +row.Rotten_Tomatoes
              // row.Rotten_Tomatoes = eval(row.Rotten_Tomatoes)*10
              // row.IMDb = eval(row.IMDb)

              return row


          })
              .get(function(error, csv) {
                  if(error){
                      reject(error)
                  }else{
                      resolve(csv)
                  }
              })
      })

      console.log(rawData)


      var userValue = document.getElementById('dataLength').value;

      const newData = rawData.filter(data => {
          var Rotten_Tomatoes = data['Rotten_Tomatoes']// 98/100
          var Rating = data['rating']
         // Rotten_Tomatoes = Rotten_Tomatoes.replace('/100', '')
         //  Rotten_Tomatoes = parseInt(Rotten_Tomatoes)

          return Rotten_Tomatoes >= userValue && Rating != null;
      }).map((data, index) => {
          const set = []

          if(data["Netflix"] === "1"){
              set.push('N')
          }

          if(data["Hulu"] === "1"){
              set.push('H')
          }

          if(data["Prime_Video"] === "1"){
              set.push('P')
          }

          if(data["DisneyPlus"] === "1"){
              set.push('D')
          }

          if(data["HBO"] === "1"){
              set.push('O')
          }


          return {
              set,
              r: 4,
              name: 'node_' + index,
              title: data.Title,
              rating:data.Rotten_Tomatoes,
              year:data.Year
          }
      })

      return newData


    // var dataLength = test.dataLength(),
    //     setLength = test.setLength(),
    //     diff = dataLength - globalData.length;
    //
    // if (diff > 0) {
    //
    //   globalData = globalData.concat(d3.range(diff).map((d, i) => {
    //     var l = Math.floor((Math.random() * setLength / 3) + 1),
    //         set = [],
    //         c,
    //         i;
    //     for (i = -1; ++i < l;) {
    //       c = charFn(Math.floor((Math.random() * setLength)));
    //       if (set.indexOf(c) == -1) {
    //         set.push(c)
    //       }
    //     }
    //     return {
    //       set: set,
    //       r: 8,
    //       name: 'node_' + generator++
    //     }
    //   }))
    // } else {
    //   globalData.splice(0, -diff);
    // }
    //
    // return globalData;
  }

  function refresh(data) {
    if (data) {
      // we recalculate the layout for new data only
      layout.nodes(data)
    }


    var vennArea = svg.selectAll("g.venn-area")
        .data(layout.sets().values(), function(d) {
          return d.__key__;
        });

    var vennEnter = vennArea.enter()
        .append('g')
        .attr("class", function(d) {
          return "venn-area venn-" +
              (d.sets.length == 1 ? "circle" : "intersection");
        })
        .attr('fill', function(d, i) {
          return colors[i]
        })

      console.log(vennEnter)

    vennEnter.append('path')
        .attr('class', 'venn-area-path');

    vennEnter.append('circle')
        .attr('class', 'inner')
        .attr('fill', 'grey');

    vennEnter.append("text")
        .attr("class", "label")
        .attr("text-anchor", "left")
        .attr("dy", ".35em")
        .attr("font-weight", "heavy")


      vennArea.on("mouseover", function(d, i) {
          var node = d3.select(this).transition();
          node.select("path").style("fill-opacity", 0.8);
          node.select("text").style("font-weight", "100")
              .style("font-size", "36px");
      })
          .on("mouseout", function(d, i) {
              var node = d3.select(this).transition();
              node.select("path").style("fill-opacity", 1);
              node.select("text").style("font-weight", "100")
                  .style("font-size", "24px");
          });



      vennArea.selectAll('path.venn-area-path').transition()
        .duration(isFirstLayout ? 0 : test.duration())
        .attr('opacity', test.circleOpacity())
        .attrTween('d', function(d) {
          return d.d
        });



      // var tooltip = d3.select("#venn").append("div")
      //     .attr("class", "venntooltip");
      //
      // vennArea.selectAll("path")
      //     .style("stroke-opacity", 0)
      //     .style("stroke", "rgba(22,22,22,1)")
      //     .style("stroke-width", 2)
      //     .style("transform-origin", "50% 50%");
      //
      // vennArea.selectAll('path.venn-area-path').on('mouseenter', function () {
      //     //
      //     // alert("hello")
      //
      //     // tooltip.transition().duration(300).style("opacity", 1);
      //
      //     const node = d3.select(this).transition();
      //     node.select('path').style('fill-opacity', 0.2);
      //
      //     // var selection = d3.select(this).transition("tooltip").duration(300);
      //     // selection.select("path")
      //     //     .style("fill-opacity", 1)
      //     //     .style("stroke-opacity", 1)
      //     //     .style("transform", "scale(1.01,1.01)")
      //     //     .style("transform-origin", "50% 50%");
      //   })
      //     // .on("mouseout", function(d, i) {
      //     //     tooltip.transition().duration(500).style("opacity", 0);
      //     //     var selection = d3.select(this).transition("tooltip").duration(400);
      //     //     selection.select("path")
      //     //         .style("fill-opacity", d.sets.length == 1 ? 1 : 1)
      //     //         .style("stroke-opacity", 0)
      //     //         .style("transform", "scale(1,1)")
      //     //         .style("transform-origin", "50% 50%");
      //     //     // d3.select("#venn").selectAll("path").transition("opacity").duration(250).style("opacity", 1);
      //     //     // d3.select(this).lower();
      //     //
      //     // });


    //we need to rebind data so that parent data propagetes to child nodes (otherwise, updating parent has no effect on child.__data__ property)
    // vennArea.selectAll("text.label").data(function(d) {
    //   return [d];
    // })
    //     .text(function(d) {
    //       return d.__key__;
    //       console.log(d.__key__)
    //     })
    //     .attr("x", function(d) {
    //       return d.center.x
    //     })
    //     .attr("y", function(d) {
    //       return d.center.y
    //     });

    //we need to rebind data so that parent data propagetes to child nodes (otherwise, updating parent has no effect on child.__data__ property)
    vennArea.selectAll('circle.inner').data(function(d) {
      return [d];
    }).transition()
        .duration(isFirstLayout ? 0 : test.duration())
        .attr('opacity', test.innerOpacity())
        .attr("cx", function(d) {
          return d.center.x
        })
        .attr("cy", function(d) {
          return d.center.y
        })
        .attr('r', function(d) {
          return d.innerRadius
        });

    vennArea.exit().transition()
        .duration(test.duration())
        .attrTween('d', function(d) {
          return d.d
        })
        .remove()

    // need this so that nodes always on top
    var circleContainer = svg.selectAll("g.venn-circle-container")
        .data(layout.sets().values(), function(d) {
          return d.__key__;
        });

    circleContainer.enter()
        .append('g')
        .attr("class", "venn-circle-container")
        .attr('fill', function(d, i) {
          return colors[i]
        });
    circleContainer.exit().remove();

    var points = circleContainer.selectAll("circle.node")
        .data(function(d) {
          return d.nodes
        }, function(d) {
          return d.name
        })


    var pointsEnter = points.enter()
        .append('circle')
        .attr('r', 0)
        .attr('class', 'node')
        .call(layout.packer().drag)
      console.log(pointsEnter)

      var tooltip = d3.selectAll("body").append("div")
          .attr("class", "venntooltip");


      pointsEnter.on('mouseover', function (d,i) {

          console.log(d)

          // alert("hey")
         tooltip.transition().duration(0).style("opacity", 1);
         tooltip.text(d.title + " " +"-" + " " + d.year);

      })
          .on("mousemove", function() {
              tooltip.style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
          })
          // .on("mouseout", function(d, i) {
          //     tooltip.transition().duration(20).style("opacity", 0);})
          //     var selection = d3.select(this).transition("tooltip").duration(40);
          //     selection.select("path")
          //         .style("stroke-width", 3)
          //         // .style("fill-opacity", d.sets.length == 1 ? .8 : 0)
          //         .style("stroke-opacity", 1);
          // });




      var linear = d3.scale.ordinal()
          .domain(["Netflix", "Prime", "Disney+", "Hulu", "HBO"])
          .range(["#cf3038", "#faa223", "#0279ad", "#62bc51", "#bb2b77"]);

      svg.append("g")
          .attr("class", "legendLinear")
          .attr("transform", "translate(20,250)");

      var legendLinear = d3.legend.color()
          .shapeWidth(60)
          .shapeHeight(30)
          .orient('horizontal')
          .scale(linear);

      svg.select(".legendLinear")
          .call(legendLinear);




      points.transition()
        .duration(isFirstLayout ? 0 : test.duration())
        .attr('r', function(d) {
          return d.r
        })


    points.exit().transition()
        .attr('r', 0)
        .remove()

    isFirstLayout = false;

    //set the force ticker    
    layout.packingConfig({
      ticker: function() {
        points.attr("cx", function(d) {
          return d.x
        })
            .attr("cy", function(d) {
              return d.y
            })

      }
    })
    //start the force layout
    layout.packer().start()
    return test
  }


  return refresh(await generateData())
})();
