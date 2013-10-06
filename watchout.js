var score = 0;
var highScore = 0;
var w = 700;
var h = 500;
var n = 25;
var r = 10;
var enemyCoord = [];
var mouseCoord = [];
var player;

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h)
    .on('mousemove',mouseMove);

var update = function(data){
  var enemies = svg.selectAll('.enemy')
    .data(data);

  enemies.enter().append('circle')
    .attr('class','enemy')
    .attr('r',r)
    .attr('fill','white')
    .attr('cx',function(d) { return d.x; })
    .attr('cy',function(d) { return d.y; });

  var checkCollision = function(enemyPosition,playerPosition) {
    if (Math.sqrt(Math.pow(enemyPosition.x-playerPosition.x, 2)
      + Math.pow(enemyPosition.y-playerPosition.y, 2)) < (2*r)) {
      if (highScore < score) {
        highScore = score;
      }

      score = 0;
      d3.select('.player').attr('fill', 'red');

      setTimeout(function(){
        d3.select('.player').attr('fill', 'orange');
      },200);
    }
  };

  var moveCollide = function(d) {
    score++;
    var enemy = d3.select(this);
    var enemyStarting = {
      x: parseFloat(enemy.attr('cx')),
      y: parseFloat(enemy.attr('cy'))
    };
    var enemyEnding = {
      x: d.x,
      y: d.y
    };

    return function(t) {
      var playerPosition = {
        x: parseFloat(player.attr('cx')),
        y: parseFloat(player.attr('cy'))
      };
      var enemyPosition = {
        x: enemyStarting.x + (enemyEnding.x - enemyStarting.x) * t,
        y: enemyStarting.y + (enemyEnding.y - enemyStarting.y) * t
      };

      checkCollision(enemyPosition,playerPosition);

      return enemy.attr('cx', enemyPosition.x).attr('cy', enemyPosition.y);
    };
  };

  enemies
  .transition()
  .duration(2000)
  .tween('custom', moveCollide);
};

var createPlayer = function() {
  player = svg.append('circle')
  .attr('class', 'player')
  .attr('fill', 'orange')
  .attr('r', r)
  .attr('cx', w/2)
  .attr('cy', h/2);
}();

function mouseMove(d,i) {
  mouseCoord = d3.mouse(this);
  player.attr('cx', mouseCoord[0])
  .attr('cy', mouseCoord[1]);
}

var start = function() {
  setInterval(function(){
    for (var i = 0; i < n; i++) {
      enemyCoord.push({
        x: Math.max((Math.random()*(w-r)),r),
        y: Math.max((Math.random()*(h-r)),r)
      });
    }
    update(enemyCoord);
    enemyCoord = [];
  }, 2000);

  setInterval(function(){
    score++;
    d3.select('.scoreboard').html('High Score: ' + highScore.toString()
    + '</br> Current Score: ' + score.toString());
  },100);
}();
