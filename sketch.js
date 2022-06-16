class pendulo{
  constructor(m, l, I, k, theta, w, M, d, G, proximidade){
    this.m = m;
    this.l = l;
    this.I = I;
    this.k=k;
    this.theta = theta;
    this.w = w;
    this.alfa=0;
    this.M = M;
    this.d = d;
    this.G = G;
    this.proximidade = proximidade;
    this.torqueG = 0;
  }
  show(){
    //massas auxiliares
    if(this.proximidade){
      noStroke()
      fill(100,255,0)
      circle(300-100*this.l, 250+100*this.d, 50)
      circle(300+100*this.l, 250-100*this.d, 50)
    }
    
    //pendulo
    strokeWeight(4);
    stroke(255)
    line(300-100*this.l*cos(this.theta),
         250+100*this.l*sin(this.theta),
         300+100*this.l*cos(this.theta),
         250-100*this.l*sin(this.theta));
    strokeWeight(2);
    stroke(255,0,0)
    line(300, 250, 360,330);
    line(300,250,
         300-250*((3-4*tan(2*this.theta))/(4+3*tan(2*this.theta))),500);
    stroke(150)
    line(50,500,300,500);
    noStroke();
    fill(150);
    quad(356,333,364,327,376,343,368,349)
    stroke(0)
    strokeWeight(3);
    line(112,495,112,505)
    strokeWeight(5);
    stroke(0,120,150)
    line(300-10*this.l*cos(this.theta),
         250+10*this.l*sin(this.theta),
         300+10*this.l*cos(this.theta),
         250-10*this.l*sin(this.theta))
    noStroke();
    fill(255,100,0)
    circle(300-100*this.l*cos(this.theta),
         250+100*this.l*sin(this.theta),30)
    circle(300+100*this.l*cos(this.theta),
         250-100*this.l*sin(this.theta),30)
    
  }
  move(){
    //console.log(this.torqueG)
    this.torqueG = 2*this.G*this.M*this.m/
    ((this.d-this.l*sin(this.theta))*(this.d-this.l*sin(this.theta)));
    if(this.proximidade == 0){
      this.torqueG=0;
    }
    this.alfa = (this.torqueG -this.k*this.theta - 50*this.w)/this.I;
    this.w = this.w +(1/60)*this.alfa;
    this.theta = this.theta + (1/60)*this.w;
    if(dist(300-100*this.l*cos(this.theta),
            250+100*this.l*sin(this.theta),
            300-100*this.l, 250+100*this.d) < 40){
      this.w = 0;
      //console.log('colidiu')
    }
  }
}

class grafico{
  constructor(x, y, largura, altura, tipo, variavel, escala_x, escala_y, titulo_x, titulo_y){
    this.x=x;
    this.y=y;
    this.largura=largura;
    this.altura=altura;
    this.tipo=tipo;
    this.variavel=variavel;
    this.escala_x=escala_x;
    this.escala_y=escala_y;
    this.titulo_x=titulo_x;
    this.titulo_y=titulo_y;
  }
  
  show(){
    stroke(255);
    strokeWeight(2);
    for(let i=1;i<this.variavel.length;i++){
      if(i<300){
        line(this.x+(i-1)*this.escala_x, this.y-map(this.variavel[i-1], 0, PI, 0, this.escala_y), 
             this.x+i*this.escala_x,     this.y-map(this.variavel[i], 0, PI, 0, this.escala_y));
      }
    }
    
    stroke(60,135,80);
    strokeWeight(3);
    line(this.x, this.y, this.x+this.largura, this.y);
    if(this.tipo==0){
      line(this.x, this.y, this.x, this.y-this.altura);
      noStroke();
      textSize(15);
      textAlign(RIGHT);
      fill(60,135,80);
      text(this.titulo_x, this.x-10, this.y-this.altura+10);
    }else{
      line(this.x, this.y-this.altura/2, this.x, this.y+this.altura/2);
      noStroke();
      textSize(15);
      textAlign(RIGHT);
      fill(60,135,80);
      text(this.titulo_x, this.x-10, this.y-this.altura/2+10);
    }
    
    noStroke();
    textSize(15);
    textAlign(RIGHT);
    fill(60,135,80);
    text(this.titulo_y, this.x+this.largura, this.y+20);
  }
  
}

class botao{
  constructor(x, y, largura, altura, texto, fonte, cor, x_cursor){
    this.x=x;
    this.y=y;
    this.largura=largura;
    this.altura=altura;
    this.texto=texto;
    this.fonte=fonte;
    this.cor=cor;
    this.x_cursor=x_cursor;
  }
  show(){
    fill(this.cor);
    stroke(0);
    strokeWeight(2);
    rect(this.x-this.largura/2, this.y-this.altura/2, this.largura, this.altura);
    noStroke();
    textSize(this.fonte);
    textAlign(CENTER);
    fill(0);
    text(this.texto, this.x, this.y+5);
  }
  cursor(){
    triangle(this.x_cursor, this.y-this.altura/2,
             this.x_cursor-15/2, this.y-this.altura/2-15*cos(PI/6), 
             this.x_cursor+15/2, this.y-this.altura/2-15*cos(PI/6));
    stroke(0);
    strokeWeight(2);
    line(this.x_cursor, this.y-this.altura/2, this.x_cursor, this.y+this.altura/2);
  }
}

Pendulo = new pendulo(100, 1, 2000, 10, 0, 0, 200, 0.9, 1e-5, 1);
let distance = new botao(700, 500, 300, 20, "Distance", 0, [120,120,120],700);
let Gconst = new botao(700, 300, 300, 20, "Gravitational Constant", 0, [120,120,120],700);
let mass_activation = new botao(700, 100, 200, 30, "On/Off masses", 18, [100,100,150],0);

function setup() {
  createCanvas(900, 600);
}

function draw() {
  background(50);
  for(let i=0; i<50; i++){
    Pendulo.move();
  }
  Pendulo.show();
  distance.show();
  distance.cursor();
  noStroke();
  textSize(15);
  textAlign(CENTER);
  fill(255);
  text('G='+Pendulo.G.toFixed(8),Gconst.x,Gconst.y+30)
  text('d='+Pendulo.d.toFixed(3),distance.x,distance.y+30)
  Gconst.show();
  Gconst.cursor();
  mass_activation.show();
  //textAlign(LEFT)
  //text('theta: '+Pendulo.theta,50,20)
  //text('w: '+Pendulo.w,50,40)
  //text('alfa: '+Pendulo.alfa,50,60)
  //text('torqueG: '+Pendulo.torqueG,50,80)
}

function mousePressed(){
  if(mouseX>(distance.x-distance.largura/2) && 
             mouseX<(distance.x+distance.largura/2) &&
             mouseY>(distance.y-distance.altura/2) &&
             mouseY<(distance.y+distance.altura/2)){
    Pendulo.d = map(mouseX, distance.x-distance.largura/2, 
                        distance.x+distance.largura/2, 0.6, 1.2);
    distance.x_cursor=mouseX;
  }
  else if(mouseX>(Gconst.x-Gconst.largura/2) && 
             mouseX<(Gconst.x+Gconst.largura/2) &&
             mouseY>(Gconst.y-Gconst.altura/2) &&
             mouseY<(Gconst.y+Gconst.altura/2)){
    Pendulo.G = map(mouseX, Gconst.x-Gconst.largura/2, 
                        Gconst.x+Gconst.largura/2, 5e-6, 1.5e-5);
    Gconst.x_cursor=mouseX;
  }
  else if(mouseX>(mass_activation.x-mass_activation.largura/2) && 
             mouseX<(mass_activation.x+mass_activation.largura/2) &&
             mouseY>(mass_activation.y-mass_activation.altura/2) &&
             mouseY<(mass_activation.y+mass_activation.altura/2) &&
             Pendulo.proximidade==1){
    Pendulo.proximidade = 0;
  }
  else if(mouseX>(mass_activation.x-mass_activation.largura/2) && 
             mouseX<(mass_activation.x+mass_activation.largura/2) &&
             mouseY>(mass_activation.y-mass_activation.altura/2) &&
             mouseY<(mass_activation.y+mass_activation.altura/2) &&
             Pendulo.proximidade==0){
    Pendulo.proximidade = 1;
  }
}