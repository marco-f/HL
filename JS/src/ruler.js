class Ruler{
        constructor(element, options = {}) {
                this.element = element
                this.options = Object.assign({
                        showLabel: true,
                        unit: 'mm', tickMajor: 100,
                        tickMinor: 20, tickMicro: 10,
                        startX: 0, startY: 0, zoomLevel: 1
                }, options)

                this._$container = null
                this._$corner = null
                this._$topRuler = null
                this._$leftRuler = null
                this._$topArrow = null
                this._$leftArrow = null
                this._$stage = null
                this._scrollTop = 0
                this._scrollLeft = 0
                this._scrollBarWidth = 0
                this._unitDiv = 1
                this._lastTopRulerPos = 0
                this._lastLeftRulerPos = 0
                this._create()
        }

        _create() {
                this._scrollBarWidth = this._calcScrollBarWidth()

                this._$container = document.createElement('div')
                this._$container.classList.add('ef-ruler')
                this._$container.style.marginLeft = '0'

                this._$corner = document.createElement('div')
                this._$corner.classList.add('corner')
                this._$container.appendChild(this._$corner)

                this._$topRuler = document.createElement('div')
                this._$topRuler.classList.add('ruler', 'top')
                this._$container.appendChild(this._$topRuler)

                this._$leftRuler = document.createElement('div')
                this._$leftRuler.classList.add('ruler', 'left')
                this._$container.appendChild(this._$leftRuler)

                this._$topArrow = document.createElement('div')
                this._$topArrow.classList.add('top-line')
                this._$topRuler.appendChild(this._$topArrow)
                this._$container.appendChild(this._$topArrow)

                this._$leftArrow = document.createElement('div');
                this._$leftArrow.classList.add('left-line')
                this._$leftRuler.appendChild(this._$leftArrow)
                this._$container.appendChild(this._$leftArrow)

                this._$stage = document.createElement('div')
                this._$stage.classList.add('stage')
                while (this.element.firstChild) {
                        this._$stage.appendChild(this.element.firstChild)
                }
                this._$container.appendChild(this._$stage)
                this.element.appendChild(this._$container)
                this.refresh();

                this._$container.addEventListener('scroll', () => {
                        this._scrollTop = this._$container.scrollTop
                        this._scrollLeft = this._$container.scrollLeft
                        this._fixRulerPosition();
                })

                this.element.addEventListener('mousemove', (event) => {
                        this._fixArrowsPosition(event.clientX, event.clientY)
                })

                window.addEventListener('resize', () => this._onWindowResize())
        }

        _onWindowResize() {
                this._fixRulerSize(); this._updateRulerTicks()
        }
        _destroy(){
                this._$container.removeEventListener('scroll', this._fixRulerPosition)
                this.element.removeEventListener('mousemove', this._fixArrowsPosition)
                window.removeEventListener('resize', this._onWindowResize)

                while (this._$stage.firstChild){
                        this.element.appendChild(this._$stage.firstChild)
                }
                this._$container.remove()
        }
        _setOption(key, value){
                switch (key) {
                        case 'unit':
                                value = this._constrainUnit(value); break
                        case 'tickMajor':
                        case 'tickMinor':
                        case 'tickMicro':
                                value = this._constrainTick(value); break
                        case 'startX':
                        case 'startY':
                                value = this._constrainStart(value); break
                }
                this.options[key] = value
                this.refresh()
        }
        _setOptions(options){
                Object.keys(options).forEach(key => {
                        this._setOption(key, options[key])
                })
        }
        _constrainUnit(unit){ return 'mm' }
        _constrainTick(tick){ return isNaN(tick) || tick < 0 ? 0 : tick }
        _constrainStart(start){
                const value = parseInt(start, 10)
                return isNaN(value) ? 0 : value
        }
        _calcScrollBarWidth(){
                const tmpEl = document.createElement('div')
                tmpEl.style.cssText = 'position:absolute;top:-999px;left:-999px;width:100px;height:100px;overflow:hidden;'
                this.element.appendChild(tmpEl)
                const w1 = tmpEl.offsetWidth
                tmpEl.style.overflow = 'scroll'
                const w2 = tmpEl.offsetWidth
                this.element.removeChild(tmpEl)
                return w1 - (w2 === w1 ? tmpEl.clientWidth : w2)
        }
        _calcPixelsPerMM(){ return 3.7795275591 }
        _fixRulerPosition(){
                this._$topRuler.style.top = '0'
                this._$topRuler.style.left = `${this._scrollLeft}px`
                this._$leftRuler.style.top = `${this._scrollTop}px`
                this._$leftRuler.style.left = '0'
                this._$corner.style.top = `${this._scrollTop}px`
                this._$corner.style.left = `${this._scrollLeft}px`
        }
        _fixRulerSize(){
                const wContainer = this._$container.clientWidth
                const hContainer = this._$container.clientHeight
                const wStage = this._$stage.scrollWidth
                const hStage = this._$stage.scrollHeight
                this._$topRuler.style.width = `${Math.max(wStage, wContainer - this._$corner.clientWidth - this._scrollBarWidth)}px`
                this._$leftRuler.style.height = `${Math.max(hStage, hContainer - this._scrollBarWidth)}px`
                this._updateRulerTicks()
        }
        _updateRulerTicks(reset = false){
                if (reset){
                        this._$topRuler.innerHTML = ''
                        this._$leftRuler.innerHTML = ''
                        this._lastTopRulerPos = this._lastLeftRulerPos = 0
                }
                let unitPos
                const createTickElement = (className, position, isTop = true) => {
                        const tick = document.createElement('div')
                        tick.classList.add('tick', className)
                        if (isTop) tick.style.left = `${position}px`
                        else tick.style.top = `${position}px`
                        return tick
                }
                unitPos = (this._lastTopRulerPos + this.options.startX) * this._unitDiv
                const topRulerWidth = this._$topRuler.offsetWidth + 100
                while (this._lastTopRulerPos < topRulerWidth){
                        if (this.options.tickMajor > 0 && (unitPos % this.options.tickMajor) === 0){
                                const tick = createTickElement('major', this._lastTopRulerPos)
                                if (this.options.showLabel) tick.textContent = unitPos
                                this._$topRuler.appendChild(tick)
                        } else if (this.options.tickMinor > 0 && (unitPos % this.options.tickMinor) === 0){
                                const tick = createTickElement('minor', this._lastTopRulerPos)
                                this._$topRuler.appendChild(tick)
                        } else if (this.options.tickMicro > 0 && (unitPos % this.options.tickMicro) === 0){
                                const tick = createTickElement('micro', this._lastTopRulerPos)
                                this._$topRuler.appendChild(tick)
                        }
                        this._lastTopRulerPos += this._unitDiv
                        unitPos++
                }
                unitPos = (this._lastLeftRulerPos + this.options.startY) * this._unitDiv
                const leftRulerHeight = this._$leftRuler.offsetHeight + 100
                while (this._lastLeftRulerPos < leftRulerHeight){
                        if (this.options.tickMajor > 0 && (unitPos % this.options.tickMajor) === 0){
                                const tick = createTickElement('major', this._lastLeftRulerPos, false)
                                if (this.options.showLabel){
                                         const span = document.createElement('span')
                                         span.textContent = unitPos
                                         tick.appendChild(span)
                                }
                                this._$leftRuler.appendChild(tick)
                        } else if (this.options.tickMinor > 0 && (unitPos % this.options.tickMinor) === 0){
                                const tick = createTickElement('minor', this._lastLeftRulerPos, false)
                                this._$leftRuler.appendChild(tick)
                        } else if (this.options.tickMicro > 0 && (unitPos % this.options.tickMicro) === 0){
                                const tick = createTickElement('micro', this._lastLeftRulerPos, false)
                                this._$leftRuler.appendChild(tick)
                        }
                        this._lastLeftRulerPos += this._unitDiv
                        unitPos++
                }
        }
        _fixArrowsPosition(mouseX, mouseY) {
                const rect = this.element.getBoundingClientRect()
                const arrowX = mouseX - rect.left + this._scrollLeft
                const arrowY = mouseY - rect.top + this._scrollTop
                this._$topArrow.style.left = `${arrowX - 1}px`
                this._$leftArrow.style.top = `${arrowY - this._$topRuler.offsetHeight}px`
        } 
        refresh(){
                this._unitDiv = this._calcPixelsPerMM() / this.options.zoomLevel
                this._fixRulerPosition()
                this._fixRulerSize()
                this._fixArrowsPosition(0, 0)
                this._updateRulerTicks(true)
        }
}
