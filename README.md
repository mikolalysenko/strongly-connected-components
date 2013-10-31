strongly-connected-components
=============================
Given a directed graph, splits it into [strongly connected components](http://en.wikipedia.org/wiki/Strongly_connected_component).

## Example

```javascript
var scc = require("strongly-connected-components")

var edges = [
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

console.log(scc(8, edges))
```

## Install

    npm install strongly-connected-components

## API

### `require("strongly-connected-components")(numVertices, edges)`
Computes the strongly connected components of a graph using Tarjan's algorithm.

* `numVertices` is the number of vertices in the graph
* `edges` is an array of pairs representing the directed edges of the graph

**Returns** An array of arrays representing the partitioning of the vertices in the graph into connected components.

## Credits
(c) 2013 Mikola Lysenko. MIT License.  Based on the [implementation of Tarjan's algorithm on Wikipedia.](http://en.wikipedia.org/wiki/Tarjan's_strongly_connected_components_algorithm)