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
        lowValue[v] = Math.min(lowValue[v],lowValue[u])|0
      } else if(active[u]) {
        lowValue[v] = Math.min(lowValue[v],lowValue[u])|0
      }
      if (scc[u] >= 0) {
        // Node v is not yet assigned an scc, but once it is that scc can apparently reach scc[u].
        sccLinks[v].push(scc[u])
      }
    }
    if(lowValue[v] === index[v]) {
      var component = []
      var links = []
      for(var i=S.length-1; i>=0; --i) {
        var w = S[i]
        active[w] = false
        component.push(w)
        links.push(sccLinks[w])
        scc[w] = components.length
        if(w === v) {
          S.length = i
          break
        }
      }
      components.push(component)
      sccAdjList.push(Array.prototype.concat.apply([], links))
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
