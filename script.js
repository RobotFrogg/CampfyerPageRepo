const s = function( canvas ) {
    let x
    let y
    //setup canvas
    canvas.setup = function() {
        canvas.createCanvas(canvas.windowWidth, canvas.windowHeight).parent("canvasDiv")


        canvas.rectMode(canvas.CENTER)
        canvas.colorMode(canvas.HSB)
        canvas.background('#f7f7f7')
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
        let { min_size, max_size, radius, styles, draw_range, colour_dither, colour, saturation, brightness, light_dither, opacity, opacity_dither, bg_colour} = controls

        //brush size
        size = canvas.random(min_size, max_size)

        let hue = canvas.floor(canvas.random(colour_dither)+colour)
        //^this isn't working as intended: colour_dither + colour equals number higher than intended

        //determines style
        if (styles == 'fill') {
            canvas.noStroke()
            canvas.fill(hue, saturation, brightness + canvas.random(light_dither), opacity)
            
        } else {
            canvas.noStroke()
            canvas.stroke(0, 0, 0, 100)
            canvas.fill(0, 0, 100, 100)
        }

        //determines if auto drawing is paused
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



const Controls = function() {
  //default values
    this.min_size = 20
    this.max_size = 120

    this.draw_range = 30

    this.colour_dither = 30
    this.colour = 0
    this.saturation = 0

    this.brightness = 80
    this.light_dither = 3
    this.opacity = 1
    this.opacity_dither = 3
    this.bg_colour = '#f7f7f7'
    this.styles = 'fill'
    this.pause = false
    this.save = function() {
        myp5.save('appealing-shape.png')
    }
}

const controls = new Controls()
const myp5 = new p5(s)

window.onload = function() {
    let gui = new dat.GUI()
    let folderBrush = gui.addFolder('Brush Settings');
    folderBrush.add(controls, 'min_size',5, 50)
    folderBrush.add(controls, 'max_size', 5, 200)
    folderBrush.add(controls, 'styles', [ 'fill', 'nocolour'] );

    let folderColour = gui.addFolder('Colour Settings');
    folderColour.add(controls, 'colour', 0, 360)
    folderColour.add(controls, 'colour_dither', 0, 360)
    folderColour.add(controls, 'saturation', 0, 100)
    folderColour.add(controls, 'brightness', 0, 100)
    folderColour.add(controls, 'light_dither', 0, 10)
    folderColour.add(controls, 'opacity', 0, 1)
    folderColour.add(controls, 'opacity_dither', 0, 10)


    let folderAutoDraw = gui.addFolder('Auto Draw Settings')

    folderAutoDraw.add(controls, 'draw_range', 1, 100)
    pause = folderAutoDraw.add(controls, 'pause')
    folderAutoDraw.add(controls, 'save')
}

