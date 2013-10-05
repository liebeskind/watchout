var r = 10;
var svgWidth = 1000;
var svgHeight = 1000;
var color = 'red';

var cx = 25;
var cy = 25;


var gameBoard = d3.select(".gameBoard")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var enemy = gameBoard.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", r)
  .style("fill", color);