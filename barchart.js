var Barchart = (function(){
	
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width,
    height;

function render(options)
{
	var container = document.getElementById(options.currentLevelsId).getBoundingClientRect();
	width = container.width - margin.left - margin.right;
	height = container.height - margin.top - margin.bottom;
		
	var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
	    .range([height, 0]);
	
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");
	
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(0.2);
	
	d3.select("#" + options.currentLevelsId).selectAll("svg").remove();
	
	var svg = d3.select("#" + options.currentLevelsId).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	var data = options.intersectingEvents;
	
	x.domain(data.map(function(d) { return d.circuit; }));
	y.domain([0, d3.max(data, function(d) { return d.avgKW; })]);
	
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);
	
	svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	  .append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("KW");
	
	svg.selectAll(".bar")
	    .data(data)
	  .enter().append("rect")
	    .attr("class", "bar")
	    .attr("x", function(d) { return x(d.circuit); })
	    .attr("width", x.rangeBand())
	    .attr("y", function(d) { return y(d.avgKW); })
	    .attr("height", function(d) { return height - y(d.avgKW); });
}

return {"render": render};

})();
