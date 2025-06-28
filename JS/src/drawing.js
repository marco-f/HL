var PATH = ``, GRID = 18.8976377955

var getCADBounds = () => {
        var cadElement = document.getElementById("canvas")
        if (cadElement){
                var rect = cadElement.getBoundingClientRect()
                return{
                        left: rect.left, right: rect.right,
                        top: rect.top, bottom: rect.bottom
                }
        }; return null
}

var stateInitialize = {
        path: [],
        history: [],
        historyIndex: 0,
        activePoint: null,

        strokeWidth: 1,
        gridSnapSize: GRID,
        gridSnapOn: true,
        selectDistance: GRID,
        pointRadius: 1.5,

        placeholderPath: PATH,         
        drawPointType: 'Q',
        fillPath: true,
        showAllPointMarkers: true
}

var mouseInitialize = {
        x: 0, y: 0, unitPx: null, nearby: [],
        left:  {down: false, from: {x:null, y:null}},
        right: {down: false, from: {x:null, y:null}},
        highlightIndex: null, lastSelectedIndex: null
}

var mouse, state
var initialize = () =>{       
        mouse = JSON.parse(JSON.stringify(mouseInitialize))
        state = JSON.parse(JSON.stringify(stateInitialize))

        setJsBasedStyles(); renderLoop()
}

var renderLoop = () =>{
        try{
                window.svgPath.setAttribute('d', makePath())
        }catch{}
        updateHighlightedPoint()
        updateSelectedPoint()

        var adjustedHighlightedPath = state.highlightedPath.replace(/(\d+(\.\d+)?) (\d+(\.\d+)?)/g, (match, x, _, y) => {
                var adjustedX = parseInt(x) - 18
                var adjustedY = parseInt(y) - 60
                return `${adjustedX.toFixed()} ${adjustedY.toFixed()}`
        })

        window.datadiv.innerHTML = ''
        //window.datadiv.innerHTML += state.highlightedPath /**/
        window.datadiv.innerHTML += adjustedHighlightedPath /**/
        window.requestAnimationFrame(() => renderLoop())
}

var handleMouseDown = e =>{
        var {button} = e
        handleMouseMove(e, {down: true})                
        if (button === RIGHT_MOUSE_BUTTON){
                var len = state.path.length
                if (state.activePoint === len - 1){
                        var previousM = state.activePoint
                        while ((previousM--, state.path[previousM].type !== 'M'));

                        state.path[state.activePoint] ={
                                type: state.drawPointType,
                                x: state.path[previousM].x,
                                y: state.path[previousM].y,
                                xC: isDoublePointType(state.drawPointType) ? state.path[previousM].x : undefined,
                                yC: isDoublePointType(state.drawPointType) ? state.path[previousM].y : undefined,
                                xC2: isTripplePointType(state.drawPointType) ? state.path[previousM].x : undefined,
                                yC2: isTripplePointType(state.drawPointType) ? state.path[previousM].y : undefined,
                                isCurved: false
                        }
                        state.path[state.activePoint + 1] = {type: 'Z'}
                }
                if (state.path[len - 2] && state.path[len - 2].type === 'M'){state.path.pop()}
                state.activePoint = null
                mouse.lastSelectedIndex = null
                return handleMouseMove(e, {down: true})
        }

        if(mouse.left.down &&  mouse.nearby.length >= 1 && 
        mouse.nearby.indexOf(mouse.lastSelectedIndex) > -1 &&
        state.activePoint === null){
                state.activePoint = mouse.lastSelectedIndex 
                return handleMouseMove(e, {down: true})
        }     
}

var handleMouseUp = e => {
        var {button} = e
        updateMousePosition(e, {up: true})

        var selectedPoint = state.path[mouse.lastSelectedIndex]
        var isControlPointNearby = selectedPoint && selectedPoint.xC !== undefined
                ? (mouse.x - selectedPoint.xC) ** 2 + (mouse.y - selectedPoint.yC) ** 2 < state.selectDistance ** 2 : null
        var isControlPoint2Nearby = selectedPoint && selectedPoint.xC2 !== undefined
                ? (mouse.x - selectedPoint.xC2) ** 2 + (mouse.y - selectedPoint.yC2) ** 2 < state.selectDistance ** 2 : null

        var isDrawing = state.activePoint !== null
                ? state.path.length - 1 === state.activePoint : false

        if (button == LEFT_MOUSE_BUTTON && mouse.nearby.length >= 1 && state.activePoint == null) {
                var rndNearbyIndex = Math.floor(Math.random() * mouse.nearby.length)
                var rndNearbyPathPointIndex = mouse.nearby[rndNearbyIndex]
                mouse.lastSelectedIndex = rndNearbyPathPointIndex; return
        }

        if ((!selectedPoint || isDrawing) && (!isControlPointNearby || isDrawing) &&
        (!isControlPoint2Nearby || isDrawing) && button === LEFT_MOUSE_BUTTON &&
        !mouse.right.down && mouse.nearby.length === 0) {

                if (state.activePoint === null) {
                        state.path.push({type: 'M', x: mouse.x, y: mouse.y})
                }

                var lastMIndex = state.path.length - 1
                while (lastMIndex > 0 && state.path[lastMIndex].type !== 'M')
                        lastMIndex--
                var firstPoint = state.path[lastMIndex]
                var dx = mouse.x - firstPoint.x
                var dy = mouse.y - firstPoint.y
                var distSq = dx * dx + dy * dy

                if (distSq < state.selectDistance * state.selectDistance && state.path.length > lastMIndex + 1) {
                        state.path.push({type: 'Z'})
                        state.activePoint = null
                        mouse.lastSelectedIndex = null
                        handleMouseMove(e, {up: true})
                        updateHistory();
                        //setTimeout(() => {bV = false; addPOLYLINE()}, 500)
                        return
                }

                state.path.push({
                        type: state.drawPointType,
                        x: mouse.x, y: mouse.y,
                        xC: isDoublePointType(state.drawPointType) || isTripplePointType(state.drawPointType)
                                ? null : undefined,
                        yC: isDoublePointType(state.drawPointType) || isTripplePointType(state.drawPointType)
                                ? null : undefined,
                        xC2: isTripplePointType(state.drawPointType) ? null : undefined,
                        yC2: isTripplePointType(state.drawPointType) ? null : undefined,
                        isCurved: false
                })

                state.activePoint = state.path.length - 1
                mouse.lastSelectedIndex = state.activePoint
                handleMouseMove(e, {up: true})
                
                updateHistory(); return
        }

        if (!mouse.left.down && state.activePoint !== null && !isDrawing) {
                state.activePoint = null
                handleMouseMove(e, {up: true})
                updateHistory()
                return
        }

        if (!mouse.left.down && state.activePoint === null &&
        !isControlPointNearby && !isControlPoint2Nearby &&
        mouse.nearby.length === 0 && !isDrawing) {
                mouse.lastSelectedIndex = null
                handleMouseMove(e, { up: true })
                updateHistory()
                return
        }

        updateHistory()
}


var handleMouseMove = (e, {down = false, up = false} = {}) =>{
        updateMousePosition(e, {down, up})
        if (state.activePoint === null) {checkNearbyVertex()}

        var wasLeftDraggedFarEnough = mouse.left.from.x === null
                ? false : (mouse.x - mouse.left.from.x) ** 2 +
                (mouse.y - mouse.left.from.y) ** 2 > state.selectDistance ** 2
        var wasRightDraggedFarEnough = mouse.right.from.x === null
                ? false : (mouse.x - mouse.right.from.x) ** 2 +
                (mouse.y - mouse.right.from.y) ** 2 > state.selectDistance ** 2
        var active = state.path[state.activePoint]
        var nextToActive = active ? state.path[state.activePoint + 1] : null
        var isNextZ = nextToActive ? nextToActive.type === 'Z' : null
        var selected = state.path[mouse.lastSelectedIndex]
       
        var previousIndexM = active ? state.activePoint : null
        if(active) while (state.path[--previousIndexM].type !== 'M');
        var previousM = active ? state.path[previousIndexM] : null

        var isDrawing = active ? state.path.length - 1 === state.activePoint : false
        if (active && isNextZ && previousM) {
                previousM.x = mouse.x
                previousM.y = mouse.y
        }
        if(active && isSinglePointType(active.type)){
                active.x = mouse.x
                active.y = mouse.y
        }
        if (active && (isDoublePointType(active.type) || isTripplePointType(active.type))){
                active.x = mouse.x
                active.y = mouse.y
                if(active.xC === null){
                        active.xC = mouse.x
                        active.yC = mouse.y
                }
                if(active.xC2 === null){
                        active.xC2 = mouse.x
                        active.yC2 = mouse.y
                }
                if(isDrawing && !mouse.left.down && !active.isCurved){
                        active.xC = mouse.x
                        active.yC = mouse.y
                        if (isTripplePointType(active.type)){
                                active.xC2 = mouse.x
                                active.yC2 = mouse.y
                        }
                }
                if(isDrawing && mouse.left.down){
                        if (wasLeftDraggedFarEnough) {
                                active.xC = mouse.left.from.x
                                active.yC = mouse.left.from.y
                                if (isTripplePointType(active.type)) {
                                        active.xC2 = active.xC
                                        active.yC2 = active.yC
                                }
                                active.isCurved = true
                        }
                }
                if(!isDrawing && mouse.left.down) {active.isCurved = true}
        }

        if (!up && !down && !active && !isDrawing && selected &&  mouse.left.down &&
        (isDoublePointType(selected.type) || isTripplePointType(selected.type)) ){
                var isControlPointAroundMouse =
                        (mouse.x - selected.xC) ** 2 + (mouse.y - selected.yC) ** 2 <
                        100 * state.selectDistance ** 2
                var isControlPointNearMouse =
                        (mouse.x - selected.xC) ** 2 + (mouse.y - selected.yC) ** 2 <
                        4 * state.selectDistance ** 2
                var isMouseCloserToEndPointThanControlPoint =
                        (mouse.x - selected.xC) ** 2 + (mouse.y - selected.yC) ** 2 >
                        (mouse.x - selected.x) ** 2 + (mouse.y - selected.y) ** 2
                var isControlPointNearEndPoint =
                        (selected.x - selected.xC) ** 2 + (selected.y - selected.yC) ** 2 <
                        4 * state.selectDistance ** 2
                var isControlPoint2NearEndPoint =
                        selected.xC2 === null || selected.xC2 === undefined
                                ? false
                                : (selected.x - selected.xC2) ** 2 + (selected.y - selected.yC2) ** 2 <
                                4 * state.selectDistance ** 2
                var isControlPoint2AroundMouse =
                        (mouse.x - selected.xC2) ** 2 + (mouse.y - selected.yC2) ** 2 <
                        100 * state.selectDistance ** 2
                var isControlPoint2NearMouse =
                        selected.xC2 === null || selected.xC2 === undefined
                                ? false
                                : (mouse.x - selected.xC2) ** 2 + (mouse.y - selected.yC2) ** 2 <
                                4 * state.selectDistance ** 2
                var isControlPoint2CloserThan1 =
                        selected.xC2 === null || selected.xC2 === undefined
                                ? false
                                : (mouse.x - selected.xC) ** 2 + (mouse.y - selected.yC) ** 2 >=
                                (mouse.x - selected.xC2) ** 2 + (mouse.y - selected.yC2) ** 2
                var isMouseCloserToEndPointThanControlPoint2 =
                        selected.xC2 === null || selected.xC2 === undefined
                                ? false
                                : (mouse.x - selected.xC2) ** 2 + (mouse.y - selected.yC2) ** 2 >
                                (mouse.x - selected.x) ** 2 + (mouse.y - selected.y) ** 2

                if (isControlPoint2CloserThan1 &&
                isControlPoint2AroundMouse &&
                !isMouseCloserToEndPointThanControlPoint2){
                        selected.xC2 = mouse.x
                        selected.yC2 = mouse.y
                        selected.isCurved = true
                } else if (
                !isControlPoint2CloserThan1 && 
                isControlPointAroundMouse && 
                !isMouseCloserToEndPointThanControlPoint){
                        selected.xC = mouse.x
                        selected.yC = mouse.y
                        selected.isCurved = true
                }

                if (isControlPointNearMouse && isControlPointNearEndPoint){
                        selected.xC = selected.x
                        selected.yC = selected.y
                        if (selected.type === 'Q') selected.isCurved = false
                }
                if (isControlPoint2NearMouse && isControlPoint2NearEndPoint){
                        selected.xC2 = selected.x
                        selected.yC2 = selected.y
                }
        }
        if(up){window.datadiv.style.cursor = 'default'}
}

var updateMousePosition = (e, {down = false, up = false} = {}) =>{
        var cadBounds = getCADBounds()
        if (cadBounds) {
                if (e.x < cadBounds.left || e.x > cadBounds.right || e.y < cadBounds.top || e.y > cadBounds.bottom){return}
        }
        
        var { button } = e
        mouse.x = state.gridSnapOn
                ? Math.round(e.x / state.gridSnapSize) * state.gridSnapSize : e.x
        mouse.y = state.gridSnapOn
                ? Math.round(e.y / state.gridSnapSize) * state.gridSnapSize + 4 : e.y + 4
        oX = mouse.x; oY = mouse.y
        if (down && button === LEFT_MOUSE_BUTTON){
                mouse.left.down = true
                mouse.left.from.x = mouse.x
                mouse.left.from.y = mouse.y
        }
        if (up && button === LEFT_MOUSE_BUTTON){
                mouse.left.down = false
                mouse.left.from.x = null
                mouse.left.from.y = null
        }
        if (up && button === RIGHT_MOUSE_BUTTON){
                mouse.right.down = false
                mouse.right.from.x = null
                mouse.right.from.y = null
                setTimeout(() => {bV = false; addPOLYLINE()}, 500)/*----------------------------------------------------------------------------------------*/
        }
}

var checkNearbyVertex = () =>{
        var nearby = [],
        toMouseDistanceSq,
        cutoffSq = state.selectDistance ** 2,
        point,
        closestSq = Infinity,
        closestIndex = 0

        for (var i = 0; i < state.path.length; i++){
                point = state.path[i]
                if (point.type !== 'Z' && point.type !== 'M'){
                        toMouseDistanceSq = (mouse.x - point.x) ** 2 + (mouse.y - point.y) ** 2
                        if (toMouseDistanceSq < cutoffSq) nearby.push(i)
                        else continue
                        if (toMouseDistanceSq < closestSq){
                                closestIndex = i
                                closestSq = toMouseDistanceSq
                        }
                }
        }
        if (nearby.length){mouse.highlightIndex = closestIndex}
        else {mouse.highlightIndex = null}
        mouse.nearby = nearby
}

var updateHighlightedPoint = () =>{
        var circle = window.highlightCircle
        if (mouse.highlightIndex !== null && state.path[mouse.highlightIndex]){
                circle.setAttribute('cx', state.path[mouse.highlightIndex].x)
                circle.setAttribute('cy', state.path[mouse.highlightIndex].y)
                circle.setAttribute('r', state.pointRadius)}
        else {circle.setAttribute('r', 0)}
}

var updateSelectedPoint = () =>{
        var circle = window.selectionCircle
        var controlCircle = window.controlCircle
        var controlCircle2 = window.controlCircle2
        var controlPath1 = window.controlPath1
        var controlPath2 = window.controlPath2
        var selectedPoint = state.path[mouse.lastSelectedIndex]

        if (mouse.lastSelectedIndex !== null && selectedPoint){
                circle.setAttribute('cx', selectedPoint.x)
                circle.setAttribute('cy', selectedPoint.y)
                circle.setAttribute('r', state.pointRadius)}
        else {circle.setAttribute('r', 0)}
        if (mouse.lastSelectedIndex !== null &&
        selectedPoint && isDoublePointType(selectedPoint.type)){
                controlCircle.setAttribute('cx', selectedPoint.xC)
                controlCircle.setAttribute('cy', selectedPoint.yC)
                controlCircle.setAttribute('r', state.pointRadius)

                var beforeSelectedPoint = state.path[mouse.lastSelectedIndex - 1]
                var controlPath1Value = '', controlPath2Value = ''
                if (beforeSelectedPoint)
                        controlPath1Value += `M ${selectedPoint.xC} ${selectedPoint.yC} L ${beforeSelectedPoint.x} ${beforeSelectedPoint.y}`

                controlPath2Value += `M ${selectedPoint.xC} ${selectedPoint.yC} L ${selectedPoint.x} ${selectedPoint.y}`
                controlPath1.setAttribute('d', controlPath1Value)
                controlPath2.setAttribute('d', controlPath2Value)}
        else {
                controlCircle.setAttribute('r', 0)
                controlPath1.setAttribute('d', '')
                controlPath2.setAttribute('d', '')
        }
        if (mouse.lastSelectedIndex !== null &&
        selectedPoint && isTripplePointType(selectedPoint.type)){
                controlCircle.setAttribute('cx', selectedPoint.xC)
                controlCircle.setAttribute('cy', selectedPoint.yC)
                controlCircle.setAttribute('r', state.pointRadius)
                controlCircle2.setAttribute('cx', selectedPoint.xC2)
                controlCircle2.setAttribute('cy', selectedPoint.yC2)
                controlCircle2.setAttribute('r', state.pointRadius)

                var beforeSelectedPoint = state.path[mouse.lastSelectedIndex - 1]
                var controlPath1Value = '', controlPath2Value = ''
                if (beforeSelectedPoint)
                        controlPath1Value += `M ${selectedPoint.xC} ${selectedPoint.yC} L ${beforeSelectedPoint.x} ${beforeSelectedPoint.y}`

                controlPath2Value += `M ${selectedPoint.xC2} ${selectedPoint.yC2} L ${selectedPoint.x} ${selectedPoint.y}`
                controlPath1.setAttribute('d', controlPath1Value)
                controlPath2.setAttribute('d', controlPath2Value)}
        else {controlCircle2.setAttribute('r', 0)}
}

var setJsBasedStyles = () =>{
        if (state.fillPath)
                updateHeader(
                `path{fill: var(--fillColor); stroke-width: ${state.strokeWidth}}`, 'for_path')
        else
                updateHeader(
                `path{fill: none; stroke-width: ${state.strokeWidth}}`, 'for_path')

        window.controlPath1.setAttribute('stroke-dasharray', state.pointRadius)
        window.controlPath2.setAttribute('stroke-dasharray', state.pointRadius)
        window.controlPath1.setAttribute('stroke-dashoffset', state.pointRadius)
        window.controlPath2.setAttribute('stroke-dashoffset', state.pointRadius)

        if (state.showAllPointMarkers){
                window.markerdot.setAttribute('fill', 'var(--strokeColor)')
        } else {window.markerdot.setAttribute('fill', 'transparent')}
}

var makePath = () =>{
        try{
                var path = ''
                state.highlightedPath = ''
                for (var i = 0; i < state.path.length; i++){
                        var point = state.path[i]
                        var d = v => v.toFixed(state.decimals)
                        var thisSegment = ''
                        if (point.type === 'Z') thisSegment += `${point.type} `
                        else if (isSinglePointType(point.type))
                                thisSegment += `${point.type} ${d(point.x)} ${d(point.y)} `
                        else if (!point.isCurved && point.type === 'Q')
                                thisSegment += `L ${d(point.x)} ${d(point.y)} `
                        else if (isDoublePointType(point.type))
                                thisSegment += `${point.type} ${d(point.xC)} ${d(point.yC)} ${d(point.x)} ${d(point.y)} `
                        else if (isTripplePointType(point.type))
                                thisSegment += `${point.type} ${d(point.xC)} ${d(point.yC)} ${d(point.xC2)} ${d(point.yC2)} ${d(point.x)} ${d(point.y)} `
                        else console.warn('unknown point type:', i, point)

                        path += thisSegment
                        if(mouse.lastSelectedIndex !== null && i === mouse.lastSelectedIndex){
                                state.highlightedPath += '<span>' + thisSegment + '</span>'
                        } else{state.highlightedPath += thisSegment}
                }; return path
        }catch{}
}

var updateHeader = (cssString, forWho = 'for_html') =>{
        if (window[forWho]) window[forWho].outerHTML = ''
        var styleEl = document.createElement('style')
        styleEl.type = 'text/css'; styleEl.id = forWho
        styleEl.appendChild(document.createTextNode(cssString))
        document.head.appendChild(styleEl)
}

//------ undo/redo history
var updateHistory = () =>{
        state.history = state.history.slice(0, state.historyIndex + 1)
        var newState = JSON.stringify(state.path)
        if (newState !== state.history[state.historyIndex])
                state.history.push(newState)
                //console.log('Updated SVG path:', makePath())
        state.historyIndex = state.history.length - 1
}



var isSelectabvarype = v => ['Q', 'T', 'S', 'L', 'C'].indexOf(v) > -1
var isSinglePointType = v => ['M', 'T', 'L'].indexOf(v) > -1
var isDoublePointType = v => ['Q', 'S'].indexOf(v) > -1
var isTripplePointType = v => v === 'C'

var [LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON] = [0, 2]









