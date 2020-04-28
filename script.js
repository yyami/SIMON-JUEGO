const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
    this.siguienteNivel()

  }

  inicializar() {
    console.log("inicializa la función ")
    btnEmpezar.classList.add('hide')//oculta el botón "empezar a jugar"
    this.nivel = 1 //inicializa el nivel en 1
    console.log("este es el nivel", this.nivel)
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() *4)) //genera el array de 10 pos, con valores del 0 al 4
    console.log("esta es la secuencia", this.secuencia)
  }

  siguienteNivel() {
    this.iluminarSecuencia()
  }
  
  transformarNumeroAColor(numero){
    switch(numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3: 
        return 'verde'
    }
  }

  iluminarSecuencia(){
    for (var i = 0; i < this.nivel; i++){
      console.log("este es i", i)
      var color = this.transformarNumeroAColor(this.secuencia[i])
      console.log("este es el color", color)
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }
}

function empezarJuego() {
  window.juego = new Juego()
  console.log("se activo la función empezar juego, y crea la clase juego")
}

