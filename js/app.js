var calculadora ={

  visor: document.getElementById("display"),
  valorVisor: "0",
  operacion: "",
  valor1: 0,
  valor2: 0,
  valor3: 0,
  resultado: 0,
  auxTeclaIgual: false,

  init: (function(){
    this.eventos(".tecla");
    this.eventosaFuncion();
  }),

  eventosaFuncion: function(){
    document.getElementById("0").addEventListener("click", function() {calculadora.ingresarNumero("0");});
    document.getElementById("1").addEventListener("click", function() {calculadora.ingresarNumero("1");});
    document.getElementById("2").addEventListener("click", function() {calculadora.ingresarNumero("2");});
    document.getElementById("3").addEventListener("click", function() {calculadora.ingresarNumero("3");});
    document.getElementById("4").addEventListener("click", function() {calculadora.ingresarNumero("4");});
    document.getElementById("5").addEventListener("click", function() {calculadora.ingresarNumero("5");});
    document.getElementById("6").addEventListener("click", function() {calculadora.ingresarNumero("6");});
    document.getElementById("7").addEventListener("click", function() {calculadora.ingresarNumero("7");});
    document.getElementById("8").addEventListener("click", function() {calculadora.ingresarNumero("8");});
    document.getElementById("9").addEventListener("click", function() {calculadora.ingresarNumero("9");});
    document.getElementById("on").addEventListener("click", function() {calculadora.limpiar();});
    document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
    document.getElementById("punto").addEventListener("click", function() {calculadora.ingresarDecimal();});
    document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
    document.getElementById("raiz").addEventListener("click", function() {calculadora.operacion1("raiz");});
    document.getElementById("dividido").addEventListener("click", function() {calculadora.operacion1("/");});
    document.getElementById("por").addEventListener("click", function() {calculadora.operacion1("*");});
    document.getElementById("menos").addEventListener("click", function() {calculadora.operacion1("-");});
    document.getElementById("mas").addEventListener("click", function() {calculadora.operacion1("+");});
  },

  limpiar: function(){
    this.valorVisor = "0";
    this.operacion = "";
    this.valor1 = 0;
    this.valor2 = 0;
    this.resultado = 0;
    this.operación = "";
    this.auxTeclaIgual = false;
    this.valor3 = 0;
    this.updateVisor();
  },

  ingresarNumero: function(valor){
    if (this.valorVisor.length < 8) {

      if (this.valorVisor=="0") {
        this.valorVisor = "";
        this.valorVisor = this.valorVisor + valor;
      } else {
        this.valorVisor = this.valorVisor + valor;
      }
    this.updateVisor();
    }
  },

   operacion1: function(oper){
    this.valor1 = parseFloat(this.valorVisor);
    this.valorVisor = "";
    this.operacion = oper;
    this.auxTeclaIgual = false;
    this.updateVisor();
  },

  ingresarDecimal: function(){
    if (this.valorVisor.indexOf(".")== -1) {
      if (this.valorVisor == ""){
        this.valorVisor = this.valorVisor + "0.";
      } else {
        this.valorVisor = this.valorVisor + ".";
      }
      this.updateVisor();
    }
  },

  cambiarSigno: function(){
		if (this.valorVisor !="0") {
			var aux;
			if (this.valorVisor.charAt(0)=="-") {
				aux = this.valorVisor.slice(1);
			}	else {
				aux = "-" + this.valorVisor;
			}
		this.valorVisor = "";
		this.valorVisor = aux;
		this.updateVisor();
		}
	},

  verResultado: function(){
    if(!this.auxTeclaIgual){
      this.valor2 = parseFloat(this.valorVisor);
      this.valor3 = this.valor2;
      this.efectuarOperacion(this.valor1, this.valor2, this.operacion);
    } else {
      this.efectuarOperacion(this.valor1, this.valor3, this.operacion);
    }
    this.valor1 = this.resultado;
    this.valorVisor = "";
    if (this.resultado.toString().length < 9){
      this.valorVisor = this.resultado.toString();
    } else {
      this.valorVisor = this.resultado.toString().slice(0,8) + "...";
    }
    this.auxTeclaIgual = true;
    this.updateVisor();
  },

  efectuarOperacion: function(valor1, valor2, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(valor1 + valor2);
			break;
			case "-":
				this.resultado = eval(valor1 - valor2);
			break;
			case "*":
				this.resultado = eval(valor1 * valor2);
			break;
			case "/":
				this.resultado = eval(valor1 / valor2);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(valor1));
		}
	},
		updateVisor: function(){
		this.visor.innerHTML = this.valorVisor;
	},

	//Evetos formato de botones
    eventos: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoReducirBoton;
			x[i].onmouseleave = this.eventoOriginalBoton;
		};
	},

	  eventoReducirBoton: function(event){
		calculadora.ReducirBoton(event.target);
	},

    eventoOriginalBoton: function(event){
		calculadora.OriginalBoton(event.target);
	},

	//Formato de botones

	ReducirBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},

	OriginalBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
};

calculadora.init();
