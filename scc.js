"use strict"

module.exports = stronglyConnectedComponents

function stronglyConnectedComponents(numVertices, edges) {
  var adjList = new Array(numVertices)
  var index = new Array(numVertices)
  var lowValue = new Array(numVertices)
  var active = new Array(numVertices)

  //Initialize tables
  for(var i=0; i<numVertices; ++i) {
    adjList[i] = []
    index[i] = -1
    lowValue[i] = 0
    active[i] = false
  }

  //Build adjacency list representation
  for(var i=0; i<edges.length; ++i) {
    adjList[edges[i][0]].push(edges[i][1])
  }

  var count = 0
  var S = []
  var components = []

  function strongConnect(v) {
    index[v] = count
    lowValue[v] = count
    active[v] = true
    count += 1
    S.push(v)
    var e = adjList[v]
    for(var i=0; i<e.length; ++i) {
      var u = e[i]
      if(index[u] < 0) {
        strongConnect(u)
        lowValue[v] = Math.min(lowValue[v], lowValue[u])|0
      } else if(active[u]) {
        lowValue[v] = Math.min(lowValue[v], lowValue[u])
      }
    }
    if(lowValue[v] === index[v]) {
      var component = []
      for(var i=S.length-1; i>=0; --i) {
        var w = S[i]
        active[w] = false
        component.push(w)
        if(w === v) {
          S.length = i
          break
        }
      }
      components.push(component)
    }
  }

  //Run strong connect starting from each vertex
  for(var i=0; i<numVertices; ++i) {
    if(index[i] < 0) {
      strongConnect(i)
    }
  }

  return components
}