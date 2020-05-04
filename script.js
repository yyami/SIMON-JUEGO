const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10


class Juego {
  constructor() {
    //this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
   
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this) // para que la función sig nivel siempre esté asociada al juego (su contexto)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    console.log("inicializa la función ")
    this.nivel = 1 //inicializa el nivel en 1
    console.log("este es el nivel", this.nivel)
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    }
  }
 
  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() *4)) //genera el array de 10 pos, con valores del 0 al 4
    console.log("esta es la secuencia", this.secuencia)
  }

  siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
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
    for (let i = 0; i < this.nivel; i++){
      const color = this.transformarNumeroAColor(this.secuencia[i])
      console.log("estos son los colores de la sec", color)
      setTimeout(() => 
      { console.log("este es el color", color), this.iluminarColor(color)}, 1000 * i)}
  }

  transformarColorANumero(color){
    switch(color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde': 
        return 3
    }
  }


  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor)
    console.log("esto es this", this)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }
 
  eliminarEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    console.log("esto es this", this)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]){
      console.log("este es el subnivel:", this.subnivel);
      this.subnivel++
      console.log("este es el subinivel incrementado:", this.subnivel)
      if(this.subnivel === this.nivel){
        this.nivel++
        console.log("este es el nivel incrementado:", this.nivel)
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)){
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego(){
    swal('Felicitaciones!!', 'Ganaste el juego', 'success') //devuelve una promesa
    .then(()=>{
      this.inicializar()
    })
  }

  perdioElJuego(){
    swal('Perdiste el juego =(', 'vuelve a intentarlo', 'error') //devuelve una promesa
    .then(()=>{
      this.eliminarEventosClick()
      this.inicializar()
    })
   
  }
}



function empezarJuego() {
  window.juego = new Juego()
  console.log("se activo la función empezar juego, y crea la clase juego")
}

