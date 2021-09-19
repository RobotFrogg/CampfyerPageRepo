const s = function( canvas ) {
    let x
    let y
    //setup canvas
    canvas.setup = function() {
        canvas.createCanvas(canvas.windowWidth, canvas.windowHeight)
        canvas.rectMode(canvas.CENTER)
        canvas.colorMode(canvas.HSB)
        canvas.background(255)
        x = canvas.windowWidth / 2
        y = canvas.windowHeight / 2
        canvas.mouseY
        canvas.mouseX        
    }

    //mouse down detection
    let mouseDown = false
      document.body.onmousedown = function() {
      mouseDown = true
    }
      document.body.onmouseup = function() {
      mouseDown = false
    }

    //draws canvas
    canvas.draw = function() {
        let { min_size, max_size, radius, styles, draw_range, c_range, c_shift, saturation, brightness, light_dither, opacity, opacity_dither} = controls

        size = canvas.random(min_size, max_size)

        let hue = canvas.floor(canvas.random(c_range)+c_shift)
        //^this isn't working as intended: c_range + c_shift equals number higher than intended

        //determins style
        if (styles == 'fill') {
            canvas.noStroke()
            canvas.fill(hue, saturation, brightness + canvas.random(light_dither), opacity)
            
        } else {
            canvas.noStroke()
            canvas.stroke(0, 0, 0, 100)
            canvas.fill(0, 0, 100, 100)
        }

        //determins if auto drawing is paused
        if(!controls.pause){
            canvas.rect(x, y, canvas.random(size-5, size), canvas.random(size-3, size), 0)
        }else if(controls.pause && mouseDown){  
          //enables user to draw with mouse when paused
            x = canvas.mouseX
            y = canvas.mouseY
            canvas.rect(x, y, canvas.random(size-5, size), canvas.random(size-3, size), 0)
        }
          
          
          
        //randomizes auto drawing
        let r = canvas.floor(canvas.random(5))
        if(!mouseDown){
          switch(r) {
            case 0: 
              x = (x + draw_range) % canvas.windowWidth 
              break
            case 1:
              x = Math.abs( (x - draw_range) % canvas.windowWidth )
              break
            case 2:
              y = (y + draw_range) % canvas.windowHeight
              break
            case 3: 
              y = Math.abs( (y - draw_range) % canvas.windowHeight )
              break
          }

    
        }
    }
}



const Controls = function() {
  //default values
    this.min_size = 20
    this.max_size = 120

    this.draw_range = 30

    this.c_range = 30
    this.c_shift = 0
    this.saturation = 0

    this.brightness = 80
    this.light_dither = 3
    this.opacity = 1
    this.opacity_dither = 3

    this.styles = 'fill'
    this.pause = false
    this.save = function() {
        myp5.save('appealing-shape.png')
    }
}

const controls = new Controls()
const myp5 = new p5(s)

window.onload = function() {
    const gui = new dat.GUI()
    gui.add(controls, 'min_size',5, 50)
    gui.add(controls, 'max_size', 5, 200)
    gui.add(controls, 'draw_range', 1, 100)
    gui.add(controls, 'c_range', 0, 360)
    gui.add(controls, 'c_shift', 0, 360)
    gui.add(controls, 'saturation', 0, 100)
    gui.add(controls, 'brightness', 0, 100)
    gui.add(controls, 'light_dither', 0, 10)
    gui.add(controls, 'opacity', 0, 1)
    gui.add(controls, 'opacity_dither', 0, 10)
    gui.add(controls, 'styles', [ 'fill', 'nocolour'] );
    pause = gui.add(controls, 'pause')
    gui.add(controls, 'save')
}

