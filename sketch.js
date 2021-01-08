let tablero;
let columnas, renglones;
let celda_tamanio = 10;
let generaciones=1;
let colorR,colorG,colorB;
let valor=[];
let numeroMax;

function setup() {
  let vivosInicio=0;
  colorR= floor(random(255));
  colorG= floor(random(255));
  colorB=floor(random(255));
  input = createInput();
  input.position(0, 20);
  createCanvas(600, 400);

  columnas = width/celda_tamanio;
  renglones = height/celda_tamanio;
  tablero = creaTablero(columnas, renglones);
  for(let x = 1; x < columnas-1; x++){
    for(let y = 1; y < renglones-1; y++){
      tablero[x][y] = floor(random(2));
      if (tablero[x][y]==1){
        vivosInicio++;
      }
    }
  }
  valor[1]=vivosInicio;
}

function draw() {
  numeroMax = input.value();
  background(220);
  pintaTablero(colorR, colorG, colorB);
  fill('white');
  noStroke();

  rect(0,height-celda_tamanio, width, celda_tamanio);
  rect(2,2, 250, 18);
  fill('black');
  text("Elige el número de generaciones que pasarán: ", 2, 15);

  if(generaciones != numeroMax && (key =="i" || key =='I')){
    colorR= (colorR+1)%255;
    colorG= (colorG+2)%255;
    colorB= (colorB+3)%255;
    valor= siguienteGeneracion();
    generaciones++;

  }
  fill('black');
  noStroke();
  text ("Generaciones: ", celda_tamanio, height-1);
  text(generaciones, celda_tamanio+80, height-1);
  text ("Vivos: ", celda_tamanio+130, height-1);
  text(valor[1], celda_tamanio+170, height-1);
  text ("Nacimientos: ", celda_tamanio+230, height-1);
  text(valor[0], celda_tamanio+310, height-1);
  text ("Muertes: ", celda_tamanio+360, height-1);
  text(valor[2], celda_tamanio+420, height-1);
  text("Fernanda y Yusdivia ", width-110, height-1);
}

function siguienteGeneracion(){
  let valores=[];
  let tablero_siguiente = creaTablero(columnas, renglones);
  let vivos=0;
  let nacimientos=0;
  let muertes=0;

  for(let x = 1; x < columnas-1; x++){
    for(let y = 1; y < renglones-1; y++){
      let celda = tablero[x][y];
      let vecinos = cuentaVecinos(x, y);
      if(celda == 0 && vecinos == 3){
        tablero_siguiente[x][y] = 1;
        nacimientos++;
      }else if(celda == 1 && (vecinos > 3 || vecinos < 2)){
        tablero_siguiente[x][y] = 0;
        muertes++;
      }else{
        tablero_siguiente[x][y] = celda;
      }
      if(celda==1){
        vivos++;
      }
    }
  }
  tablero = tablero_siguiente;
  valores[0]= nacimientos;
  valores[1]= vivos;
  valores[2]= muertes;
  return valores;
}

function cuentaVecinos(x, y){
  let suma_vecinos = 0;
  suma_vecinos += tablero[x-1][y-1];
  suma_vecinos += tablero[x][y-1];
  suma_vecinos += tablero[x+1][y-1];
  suma_vecinos += tablero[x-1][y];
  suma_vecinos += tablero[x+1][y];
  suma_vecinos += tablero[x-1][y+1];
  suma_vecinos += tablero[x][y+1];
  suma_vecinos += tablero[x+1][y+1];
  return suma_vecinos;
}

function pintaTablero(colR, colG, colB){
  for(let x = 0; x < columnas; x++){
    for(let y = 0; y < renglones; y++){
      let posx = x*celda_tamanio;
      let posy = y*celda_tamanio;
      if(tablero[x][y] == 1){
        fill(colR, colG, colB);
        stroke(0);
        rect(posx, posy, celda_tamanio);
      }
    }
  }
}

function creaTablero(cols, ren){
  let tab = new Array(cols);
  for(let i = 0; i < tab.length; i++){
    tab[i] = new Array(ren);
  }
  return tab;
}
