"use strict"

var assert = require('assert')

module.exports = stronglyConnectedComponents

function stronglyConnectedComponents(adjList) {
  var numVertices = adjList.length;
  var index = new Array(numVertices)
  var lowValue = new Array(numVertices)
  var active = new Array(numVertices)
  var scc = new Array(numVertices)
  var sccLinks = new Array(numVertices)
  
  //Initialize tables
  for(var i=0; i<numVertices; ++i) {
    index[i] = -1
    lowValue[i] = 0
    active[i] = false
    scc[i] = -1
    sccLinks[i] = []
  }

  // The strongConnect function
  var count = 0
  var S = []
  var components = []
  var sccAdjList = []

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
        if (lowValue[u] < lowValue[v]) { // Part of the same scc
          sccLinks[lowValue[u]] = sccLinks[lowValue[u]].concat(sccLinks[lowValue[v]])
          lowValue[v] = lowValue[u]
        }
      } else if(active[u]) {
        if (lowValue[u] < lowValue[v]) { // Part of the same scc
          sccLinks[lowValue[u]] = sccLinks[lowValue[u]].concat(sccLinks[lowValue[v]])
          lowValue[v] = lowValue[u]
        }
      }
      if (scc[u] >= 0) {
        // Node v is not yet assigned an scc, but once it is that scc can apparently reach scc[u].
        sccLinks[lowValue[v]].push(scc[u])
      }
    }
    if(lowValue[v] === index[v]) {
      var component = []
      for(var i=S.length-1; i>=0; --i) {
        var w = S[i]
        active[w] = false
        component.push(w)
        scc[w] = components.length
        if(w === v) {
          S.length = i
          break
        }
      }
      components.push(component)
      sccAdjList.push(sccLinks[index[v]])
    }
  }

  //Run strong connect starting from each vertex
  for(var i=0; i<numVertices; ++i) {
    if(index[i] < 0) {
      strongConnect(i)
    }
  }
  
  // Compact sccAdjList
  var newE
  for(var i=0; i<sccAdjList.length; i++) {
    var e = sccAdjList[i]
    if (e.length === 0) continue
    e.sort(function (a,b) { return a-b; })
    newE = [e[0]]
    for(var j=1; j<e.length; j++) {
      if (e[j] !== e[j-1]) {
        newE.push(e[j])
      }
    }
    sccAdjList[i] = newE
  }  

  return {components: components, adjacencyList: sccAdjList}
}
