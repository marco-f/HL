function GCodeParser(handlers){this.handlers = handlers || {}}

GCodeParser.prototype.parseLine = function(text){
        text = text.replace(/;.*$/, '').trim()
        if(text){
                var tokens = text.split(' ')
                if(tokens){
                        var cmd = tokens[0]
                        var args = {'cmd': cmd}
                        tokens.splice(1).forEach(function(token){
                                var key = token[0].toLowerCase()
                                var value = parseFloat(token.substring(1))
                                args[key] = value
                        })
                        var handler = this.handlers[tokens[0]]
                        if(handler){return handler(args)}
                }
        }
}

GCodeParser.prototype.parse = function(gcode) {
        var lines = gcode.split('\n')
        for (var i = 0; i < lines.length; i++){
                if (this.parseLine(lines[i], i) === false){break}
        }
}


function createObjectFromGCode(gcode) {
        var lastLine = {x:0, y:0, z:0, e:0, f:0, extruding:false}
 
 	var layers = [], layer = undefined
 	var bbbox =  {min: {x:100000,y:100000,z:100000}, max: {x:-100000,y:-100000,z:-100000}}
 	
 	function newLayer(line) {layer = { type: {}, z: line.z, }; layers.push(layer)}
 	
 	function getLineGroup(line) {
 		if (layer == undefined)newLayer(line)
 		var speed = Math.round(line.e / 1000)
 		var grouptype = (line.extruding ? 10000 : 0) + speed
 		var color = new THREE.Color(line.extruding ? 0xffffff: 0x0000ff)
 		if (layer.type[grouptype] == undefined){
 			layer.type[grouptype] = {
 				type: grouptype,
 				feed: line.e,
 				extruding: line.extruding,
 				color: color,
 				segmentCount: 0,
 				material: new THREE.LineBasicMaterial({
					  opacity:line.extruding ? 0.5 : 0.4,
					  transparent: true,
					  linewidth: 1,
					  vertexColors: THREE.FaceColors }),
				geometry: new THREE.Geometry()
			}
		}
		return layer.type[grouptype]
 	}
 	function addSegment(p1, p2) {
		var group = getLineGroup(p2)
		var geometry = group.geometry
		
		group.segmentCount++
                geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(p1.x, p1.y, p1.z)))
                geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(p2.x, p2.y, p2.z)))
                geometry.colors.push(group.color)
                geometry.colors.push(group.color)
                if (p2.extruding){
			bbbox.min.x = Math.min(bbbox.min.x, p2.x);
			bbbox.min.y = Math.min(bbbox.min.y, p2.y);
			bbbox.min.z = Math.min(bbbox.min.z, p2.z);
			bbbox.max.x = Math.max(bbbox.max.x, p2.x);
			bbbox.max.y = Math.max(bbbox.max.y, p2.y);
			bbbox.max.z = Math.max(bbbox.max.z, p2.z);
		}
 	}
  	var relative = false
	function delta(v1, v2){return relative ? v2 : v2 - v1}
	function absolute (v1, v2){return relative ? v1 + v2 : v2}

        var parser = new GCodeParser({  	
                G1: function(args, line){
                        var newLine = {
                                x: args.x !== undefined ? absolute(lastLine.x, args.x) : lastLine.x,
                                y: args.y !== undefined ? absolute(lastLine.y, args.y) : lastLine.y,
                                z: args.z !== undefined ? absolute(lastLine.z, args.z) : lastLine.z,
                                e: args.e !== undefined ? absolute(lastLine.e, args.e) : lastLine.e,
                                f: args.f !== undefined ? absolute(lastLine.f, args.f) : lastLine.f,
                        }
                        
                        if (delta(lastLine.e, newLine.e) > 0) {
                                newLine.extruding = delta(lastLine.e, newLine.e) > 0
                                if (layer == undefined || newLine.z != layer.z)
                                        newLayer(newLine)
                        }
                        addSegment(lastLine, newLine); lastLine = newLine
                },

                G21: function(args){},
                G90: function(args){relative = false},
                G91: function(args){relative = true},
                G92: function(args){
                        var newLine = lastLine;
                        newLine.x= args.x !== undefined ? args.x : newLine.x;
                        newLine.y= args.y !== undefined ? args.y : newLine.y;
                        newLine.z= args.z !== undefined ? args.z : newLine.z;
                        newLine.e= args.e !== undefined ? args.e : newLine.e;
                        lastLine = newLine;
                },
                M82: function(args){},
                M84: function(args){},
        })

        parser.parse(gcode)
        var object = new THREE.Object3D()	
	for (var lid in layers){
		var layer = layers[lid];
		for (var tid in layer.type){
			var type = layer.type[tid];
		  object.add(new THREE.Line(type.geometry, type.material, THREE.LinePieces))
		}
	}; console.log("bbox ", bbbox)

        var scale = 3
        var center = new THREE.Vector3(
  		bbbox.min.x + ((bbbox.max.x - bbbox.min.x) / 2),
  		bbbox.min.y + ((bbbox.max.y - bbbox.min.y) / 2),
  		bbbox.min.z + ((bbbox.max.z - bbbox.min.z) / 2))
	console.log("center ", center);
  
        object.position = center.multiplyScalar(-scale)
        object.scale.multiplyScalar(scale)
        return object
}






