"use strict"

var scc = require("../scc.js")

require("tape")(function(t) {

  var g = [
    [0,4],
    [1,0],
    [2,1],
    [2,3],
    [3,2],
    [4,1],
    [5,4],
    [5,6],
    [6,5],
    [6,2],
    [7,7],
    [7,6],
    [7,3]
  ]

  console.log(scc(8, g))

  t.end()
})