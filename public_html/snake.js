 //===========CONSTANTES PARA CONTROLAR O MOVIMENTO DA COBRA=============//
const MOV_LEFT = 1;
const MOV_RIGHT = 2;
const MOV_UP = 3;
const MOV_DOWN = 4;

var mov_flag = 0;
var moveContinuos = null;//Controle da função de andar só( Repeat )-- setTimeout("funcao1()", "1000");

var velocity = 190; //Quanto maior mais lento.
var topo = 500;
var left = 150;
var increment=50;//mostrando de quantos e quantos pixels a cobra vai andar
var id_auto = 0;

var celulas = new Array();
var pontuacao = 0;


//.......................................................................
               

//==================CAPTURANDO EVENTOS DO TECLADO========================//
document.addEventListener("keydown", function(e){ 
    if(e.keyCode===37){ 
         
            clearTimeout(moveContinuos);
            /*Verifica se está se movendo para DIREITA
              Se estiver não pode MOVER PARA ESQUERDA
              Então continua a se mover para DIREITA.
            */           
            if(mov_flag != MOV_RIGHT){
                    move2Left();
            }else {
                    move2Right();
            }
        

    }else
    if(e.keyCode===39){

            clearTimeout(moveContinuos);
            /*Verifica se está se movendo para ESQUERDA
              Se estiver não pode MOVER PARA DIREITA
              Então continua a se mover para ESQUERDA.
            */ 
            if(mov_flag != MOV_LEFT){
            move2Right();
            }else{
                    move2Left();
            }


    }else
    if(e.keyCode===38){

            clearTimeout(moveContinuos);
            /*Verifica se está se movendo para BAIXO
              Se estiver não pode MOVER PARA CIMA
              Então continua a se mover para BAIXO.
            */ 
           
            if(mov_flag != MOV_DOWN){
                    move2Up();  
            } else {
                    move2Down();
            }                 

    }else
    if(e.keyCode===40){
            clearTimeout(moveContinuos);
            /*Verifica se está se movendo para CIMA
              Se estiver não pode MOVER PARA BAIXO
              Então continua a se mover para CIMA.
            */ 
            
            if(mov_flag != MOV_UP){
                    move2Down();
            }else {
                    move2Up();
            }
     }
  
});
//.......................................................................

//================FUNÇÕES DO GAME (LÓGICA)===============================//

//CRIANDO A COBRA
function createSnake(){
    //cabeça da cobra
    var cabeca = document.createElement("div");//criar uma div
    var divId = document.createAttribute("id");// criando um id para a div
    var divClass = document.createAttribute("class");//criando a classe da div
    divClass.value = "snake";//setando o valor da classe
    divId.value = id_auto;// setando o valor do id
    cabeca.setAttributeNode(divId);//atribuindo a classe  
    cabeca.setAttributeNode(divClass);
    cabeca.setAttribute("style"," border:2px solid white; width:50px;height:50px;background:black;top:500px;left:150px;position:absolute");
    
    //segundo quadrado da cobra
    var t1 = document.createElement("div");
    var divId1 = document.createAttribute("id");
    var divClass1 = document.createAttribute("class");
    divClass1.value = "snake";
    id_auto = id_auto + 1;
    divId1.value = id_auto;
    adicionarAoArray(id_auto);
    t1.setAttributeNode(divId1);
    t1.setAttributeNode(divClass1);
    t1.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black;top:500px;left:100px;position:absolute");
    
    //terceiro quadrado da cobra
    var t2 = document.createElement("div");
    var divId2 = document.createAttribute("id");
    var divClass2 = document.createAttribute("class");
    divClass2.value = "snake";
    id_auto = id_auto + 1;
    divId2.value = id_auto;
    adicionarAoArray(id_auto);
    t2.setAttributeNode(divId2);
    t2.setAttributeNode(divClass2);
    t2.setAttribute("style", "border:2px solid white; width:50px;height:50px;background:black;top:500px;left:50px;position:absolute");
    
    // adicionando tudo ao html
    var snake = document.getElementById('paiDaSnake');//pegando a div do index e colocando as 3 divs dentro
    //document.body.appendChild(cabeca);
    //document.body.appendChild(t1);
    //document.body.appendChild(t2);
    
    snake.appendChild(cabeca);
    snake.appendChild(t1);
    snake.appendChild(t2);
   
}

function inicializa(){ 
    createCookieRandon();
    createSnake();
    move2Right(); // Movimento padrão para inicar o jogo. 
    
}

//........................................................................
//------------------------Crescimento da snake--------------------------------------//
//----------------------------------------------------------------------//

function adicionarAoArray(id){
    var tam = celulas.length;
    
    celulas[tam] = id;
//toda vez que comer um biscoito ele vai adicionar um indice ao array
}

/*MÉTODO RECEBE A POS X, Y E O ID DA CELULA QUE DESEJA SER MOVIDA*/
function moverCelula(x,y,id){
   
    var pescoco = document.getElementById(id);
    var estadox = document.getElementById(id).offsetLeft; 
    var estadoy = document.getElementById(id).offsetTop;
    
    if(pescoco !== null){
    pescoco.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black; top:"+y+"px; left: "+x+"px; position:absolute;");
    }
     moverCelula(estadox, estadoy, id+1);
} 

function criarNovaCelula(){
   
    var ultimaCelula = document.getElementById(celulas.length);
  
    //criando a div no javaScript para jogar no html
    var novaCelula = document.createElement("div");// <div></div>
    //
    var celulaID = document.createAttribute("id");//id=""
    var celulaClass = document.createAttribute("class");//class=""
    id_auto = id_auto + 1;
    celulaID.value = id_auto;//id="id_auto"
    celulaClass.value ="snake";//class="snake"
    adicionarAoArray(id_auto);
    novaCelula.setAttributeNode(celulaID);
    novaCelula.setAttributeNode(celulaClass);
   
    //Recuperando informações da ultima celula
    var l = ultimaCelula.offsetLeft;
    var t = ultimaCelula.offsetTop;

    //Setando a posição inicial para essa nova célula.
    novaCelula.setAttribute("style","width:50px;height:50px;background:black;top:"+t+"px;left:"+l+"px;position:absolute");

    var snake = document.getElementById('paiDaSnake');
    snake.appendChild(novaCelula);
}
// ------MOvimentos-----------------------------------------------------------//
function move2Left(){
     
    mov_flag = MOV_LEFT;
     
    //ARMAZENANDO O ESTADO DA DIV CABEÇA
    var estadox = document.getElementById('0').offsetLeft;
    var estadoy = document.getElementById('0').offsetTop;

    //MOVENDO A DIV PRINCIPAL (CABEÇA);
    left=left-increment; 
    var cabeca = document.getElementById("0");
    cabeca.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black;top:"+topo+"px;left:"+left+"px;position:absolute");
     
    //CHECANDO TODAS COLISÕES
    checkCollisions(cabeca, document.getElementById('esquerda')); 
    checkCollisionsOnCookie(cabeca, document.getElementsByClassName('cookie')[0] ); 
    collisionYourSelf();
    
    //rechamando o metodo
    //recebe uma funcao e um tempo em milisegundos para chama-la
    
    
    moveContinuos = setTimeout('move2Left();', velocity);
    moverCelula(estadox, estadoy, 1);
   
}

function move2Right(){
    
    mov_flag = MOV_RIGHT;
    
    //ARMAZENANDO O ESTADO DA DIV CABEÇA
    var estadox = document.getElementById('0').offsetLeft;
    var estadoy = document.getElementById('0').offsetTop;
    
    //MOVENDO A DIV PRINCIPAL
    left=left+increment;   
    var div = document.getElementById("0");
    div.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black;top:"+topo+"px;left:"+left+"px;position:absolute");
    
    //CHECKANDO COLISOES
    checkCollisions(div, document.getElementById('direita') );
    checkCollisionsOnCookie(div, document.getElementsByClassName('cookie')[0]);
    collisionYourSelf();
    
    moveContinuos = setTimeout('move2Right();', velocity);
    moverCelula(estadox, estadoy, 1);
    
}

function move2Up(){
    
    mov_flag = MOV_UP;
    
    //ARMAZENANDO O ESTADO DA DIV CABEÇA
    var estadox = document.getElementById('0').offsetLeft;
    var estadoy = document.getElementById('0').offsetTop;
   
    //MOVENDO A DIV PRINCIPAL
    topo = topo-increment;
    var div = document.getElementById("0");
    div.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black;top:"+topo+"px;left:"+left+"px;position:absolute");
    
    //CHECKANDO COLISÕES
    checkCollisions(div, document.getElementById('cima') ); 
    checkCollisionsOnCookie(div, document.getElementsByClassName('cookie')[0] ); 
    collisionYourSelf();
    
    moveContinuos = setTimeout('move2Up();', velocity);
    moverCelula(estadox, estadoy, 1);
    breakControls();
}

function move2Down(){
    
    mov_flag = MOV_DOWN;
     
    //ARMAZENANDO O ESTADO DA DIV CABEÇA
    var estadox = document.getElementById('0').offsetLeft;
    var estadoy = document.getElementById('0').offsetTop;
    
    //MOVENDO DIV PRINCIPAL.
    topo = topo+increment;
    var div = document.getElementById("0");
    div.setAttribute("style"," border:2px solid white; width:50px;height:50px;background:black;top:"+topo+"px;left:"+left+"px;position:absolute");
    
    //CHECKANDO COLISÕES
    checkCollisions(div, document.getElementById('baixo') );
    checkCollisionsOnCookie(div, document.getElementsByClassName('cookie')[0]);
    collisionYourSelf();
    moveContinuos = setTimeout('move2Down();', velocity);
    moverCelula(estadox, estadoy, 1);
    breakControls();
}
//........................................................................
//------------------------COLISÕES--------------------------------------//
//----------------------------------------------------------------------//
function getPositions(obj){
  //recebe um objeto e retorna suas posicoes
  var posLeft = obj.offsetLeft;
  var posTop = obj.offsetTop;
  var width = obj.offsetWidth; 
  var height = obj.offsetHeight;
  return [ // o -4 ESTÁ ALI, PROVAVELMENTE POR CAUSA DA BORDA INSERIDA QUE É DE 2PX ENTÃO DA 2 EM CIMA E 2 EM BAIXO.
    [posLeft, posLeft + width-4], // posicao esquerda, posiçao esquerda + largura
    [posTop, posTop + height-4]   // posicao cima, posicao cima+altura;
  ];
}
//Algoritimo de comparação dos objetos
function comparePositions(p1, p2) {
  
  var x1 = p1[0] < p2[0] ? p1 : p2; //  SE obj1.posLeft <  obj2.posLeft ENTAO x1 = objeto 1
  var x2 = p1[0] < p2[0] ? p2 : p1; //  SE obj1.posleft <  obj2.posLeft ENTAO X2 = objeto 2
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false; // SE (obj1.posLeft + altura) > obj2.posLeft  OU obj1.posLeft === obj2.posLeft ENTAO true SENAO false.
  
 
}

function checkCollisions(obj1, obj2) {
  
  var pos = getPositions(obj1);

  var pos2 = getPositions(obj2);
  var horizontalMatch = comparePositions(pos[0], pos2[0]);
  var verticalMatch = comparePositions(pos[1], pos2[1]);
  var match = horizontalMatch && verticalMatch;
  if (match) {
   
   var lugarColisao = obj2.getAttribute('id');//obj2.attr('id');
        //window.location.href = 'index.html';
    
   // Troca a posição da Cobra ao Colidir com as bordas.
   switch(lugarColisao){
       case 'cima':          
          topo = document.getElementById('baixo').offsetTop - 10;        
       break;
       
       case 'baixo':         
          topo = document.getElementById('cima').offsetTop +10;
       break;
       
       case 'esquerda':
          left = document.getElementById('direita').offsetLeft -10;     
       break;
       
       case 'direita':            
          left = document.getElementById('esquerda').offsetLeft+10;                   
       break;
   }
    
   
  }
}

function checkCollisionsOnCookie(cobra, cookie){
 
  var pos = getPositions(cobra);
  var pos2 = getPositions(cookie);
  
  var horizontalMatch = comparePositions(pos[0], pos2[0]);
  var verticalMatch = comparePositions(pos[1], pos2[1]);
  var match = horizontalMatch && verticalMatch;
  if (match) {
        destroyCookie(cookie.getAttribute('id'));
         
         createCookieRandon();
         //criação de celula
         criarNovaCelula();
         velocity = velocity - 3;
         pontuacao +=10;
         //innerhtml inseri um conteudo dentro de uma tag que no caso é pontuacao
         document.getElementById('pontuacao').innerHTML = "Pontos: "+ pontuacao;
         //innerHTML();
  }
  
  
}

function collisionYourSelf(){
   
    var pos = getPositions(document.getElementById('0')); 
   
   for(var i = 1; i<=celulas.length; i++){
       
       var pos2 = getPositions(document.getElementById(i)); 
       var horizontalMatch = comparePositions(pos[0], pos2[0]);
       var verticalMatch = comparePositions(pos[1], pos2[1]);
       var match = horizontalMatch && verticalMatch;
        if (match) {
        
              alert('GAME OVER -- Você fez '+pontuacao+' pontos!');
              window.location.href = "index.html";
              
              return false;//pra no ficar dando muitos game over
              break;//pra no ficar dando muitos game over
        } 
   }
     
  
}

//........................................................................
//------------------------Randon Cookie--------------------------------------//
//----------------------------------------------------------------------//

function createCookieRandon(){ 
    
    var posicoesWidth = new Array();
    var posicoesHeight = new Array();
    
    var alturaJanela = window.innerHeight;
    var larguraJanela = window.innerWidth;
    var topCookie = 0;
    var leftCookie = 0;
    
    // Gera Numeros multiplos de 50 e coloca em um array
    var indice1 = 0;
    for (var i = 100; i<= larguraJanela; i += 50){
       
        posicoesWidth[indice1] = i;
        indice1++;
    }
    
    var indice2 = 0;
    for (var i = 100; i<= alturaJanela; i += 50){
       
        posicoesHeight[indice2] = i;
        indice2++;
    }
    
    //-3 e´para nao criar fora da area do jogo
    var i = getRandomInt(0, posicoesWidth.length-3);
    leftCookie = posicoesWidth[i];
    
    var i2 = getRandomInt(0, posicoesHeight.length-3);
    topCookie = posicoesHeight[i2];
    
    //gerando um id randonico.
    var rndID = getRandomInt(50, 100);
    
    var cookie = document.createElement("div");
    var cookieId = document.createAttribute("id");
    var cookieClass = document.createAttribute('class');
    
    
    cookieId.value = rndID;
    cookieClass.value = 'cookie';
    
    cookie.setAttributeNode(cookieId);
    cookie.setAttributeNode(cookieClass);
    
    cookie.setAttribute("style","boder 2px solid green;width:50px;height:50px;background:green;top:"+topCookie+"px;left:"+leftCookie+"px;position:absolute");
    
    
    document.body.appendChild(cookie);
    
     
}

function destroyCookie(id){
    var cookie = document.getElementById(id);
    var paiDoCookie = document.getElementById('cenario');
    paiDoCookie.removeChild(cookie);
    
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//parar a cobra quando estiver fora da tela
/*
 function headIsVisible(){                               //vai pegar a posicao do elemento que peguei pelo id
    var direita = document.getElementById('direita').offsetLeft;
    var esquerda = document.getElementById('esquerda').offsetLeft;
    var cima = document.getElementById('cima').offsetTop;
    var baixo = document.getElementById('baixo').offsetTop;
    
    var cabecaLeft = document.getElementById('0').offsetLeft;
    var cabecaTop = document.getElementById('0').offsetTop;
    
    var status = 'Direita: '+direita+" Esquerda"+esquerda;
    status += "\n cabeça x "+cabecaLeft;
    
    if(cabecaLeft > esquerda && cabecaLeft < direita || (cabecaTop < baixo) && (cabecaTop > cima && cabecaTop != cima )){
        alert("Cabeça: "+cabecaTop + " Barreira Cima: "+ cima+"\nCabeça: "+cabecaTop+" Barreira baixo:"+baixo);
        return  true;
        
    }else{
        return  false;
        
    }
}
*/