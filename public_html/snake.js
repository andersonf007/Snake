 //===========CONSTANTES PARA CONTROLAR O MOVIMENTO DA COBRA=============//
const MOV_LEFT = 1;
const MOV_RIGHT = 2;
const MOV_UP = 3;
const MOV_DOWN = 4;

var mov_flag = 0;
var moveContinuos = null;//Controle da função de andar só( Repeat )-- setTimeout("funcao1()", "1000");

var velocity = 190; //Quanto maior mais lento.
var topo = 500;
var left = 500;
var increment=50;
var id_auto = 0;

var celulas = new Array();
var prev_x = 0;
var prev_y = 0;
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
    var cabeca = document.createElement("div");
    var divId = document.createAttribute("id");
    var divClass = document.createAttribute("class");
    divClass.value = "snake";
    divId.value = id_auto;
    cabeca.setAttributeNode(divId);
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
    
    var snake = document.getElementById('paiDaSnake');
    snake.appendChild(cabeca);
    snake.appendChild(t1);
    snake.appendChild(t2);
    $('#pontuacao').html('Pontos: 0');
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
}



/*MÉTODO RECEBE A POS X, Y E O ID DA CELULA QUE DESEJA SER MOVIDA*/
function moverCelula(x,y,id){
   
    console.log(x+"-"+y+" Para o ID"+id);
    var pescoco = document.getElementById(id);
    var estadox = $('#'+id).position().left;
    var estadoy = $('#'+id).position().top;
    //console.log(pescoco);
    if(pescoco != null){
    pescoco.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black; top:"+y+"px; left: "+x+"px; position:absolute;");
    }
     moverCelula(estadox, estadoy, id+1);
} 


function criarNovaCelula(){
    // console.log("Id automático "+celulas.length);
    var ultimaCelula = $('#'+celulas.length);
  
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
   
    //Recuperando indormações da ultima celula
    var l = ultimaCelula.position().left;
    var t = ultimaCelula.position().top;

    //Setando a posição inicial para essa nova célula.
    // OBs.. Config. válida para o movivento para direita.
    l = l + 50;
    novaCelula.setAttribute("style","width:50px;height:50px;background:black;top:"+t+"px;left:"+l+"px;position:absolute");

    var snake = document.getElementById('paiDaSnake');
    snake.appendChild(novaCelula);
}
// ------MOvimentos-----------------------------------------------------------//
function move2Left(){
    mov_flag = MOV_LEFT;
       
    //ARMAZENANDO O ESTADO DA DIV CABEÇA
    var estadox = $('#0').position().left;
    var estadoy = $('#0').position().top;
 /***********************************************************************************************************************/  
 
    
    //MOVENDO A DIV PRINCIPAL (CABEÇA);
    left=left-increment; 
    var div = document.getElementById("0");
    div.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black;top:"+topo+"px;left:"+left+"px;position:absolute");
    
 /***********************************************************************************************************************/  
 
    //CHECANDO TODAS COLISÕES
    checkCollisions(div, $('#esquerda'));
    checkCollisionsOnCookie(div, $('.cookie')[0]);
    collisionYourSelf();
 /***********************************************************************************************************************/ 
    moveContinuos = setTimeout('move2Left();', velocity);
    moverCelula(estadox, estadoy, 1);
    
}

function move2Right(){

    mov_flag = MOV_RIGHT;
    //ARMAZENANDO O ESTADO DA DIV CABEÇA
    var estadox = $('#0').position().left;
    var estadoy = $('#0').position().top;
    /***********************************************************************************************************************/  

    left=left+increment;   
    var div = document.getElementById("0");
    div.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black;top:"+topo+"px;left:"+left+"px;position:absolute");
    checkCollisions(div, $('#direita'));
    // O cookie recuperado sempre no indice 0 pois ele é o unico na página.
    checkCollisionsOnCookie(div, $('.cookie')[0]);
    collisionYourSelf();
     moveContinuos = setTimeout('move2Right();', velocity);
    moverCelula(estadox, estadoy, 1);
    
}

function move2Up(){

    mov_flag = MOV_UP;
    
    //ARMAZENANDO O ESTADO DA DIV CABEÇA
    var estadox = $('#0').position().left;
    var estadoy = $('#0').position().top;

    topo = topo-increment;
    var div = document.getElementById("0");
    div.setAttribute("style","border:2px solid white; width:50px;height:50px;background:black;top:"+topo+"px;left:"+left+"px;position:absolute");
    checkCollisionsOnCookie(div, $('.cookie')[0]);
    checkCollisions(div, $('#cima'));
    // O cookie recuperado sempre no indice 0 pois ele é o unico na página.
    
    collisionYourSelf();
    moveContinuos = setTimeout('move2Up();', velocity);
    moverCelula(estadox, estadoy, 1);
    
}

function move2Down(){

    mov_flag = MOV_DOWN;

     //ARMAZENANDO O ESTADO DA DIV CABEÇA
    var estadox = $('#0').position().left;
    var estadoy = $('#0').position().top;
    
    topo = topo+increment;
    var div = document.getElementById("0");
    div.setAttribute("style"," border:2px solid white; width:50px;height:50px;background:black;top:"+topo+"px;left:"+left+"px;position:absolute");
    
    checkCollisions(div, $('#baixo'));
    // O cookie recuperado sempre no indice 0 pois ele é o unico na página.
    checkCollisionsOnCookie(div, $('.cookie')[0]);
    collisionYourSelf();
    moveContinuos = setTimeout('move2Down();', velocity);
    moverCelula(estadox, estadoy, 1);
    
}
//........................................................................
//------------------------COLISÕES--------------------------------------//
//----------------------------------------------------------------------//
function getPositions(obj){
  var $objselected = $(obj);
  var pos = $objselected.position();
  var width = $objselected.width();
  var height = $objselected.height();
  return [
    [pos.left, pos.left + width], // posicao esquerda, posiçao esquerda + largura
    [pos.top, pos.top + height]   // posicao cima, posicao cima+altura;
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
   
   var lugarColisao = obj2.attr('id');
        //window.location.href = 'index.html';
    
   // Troca a posição da Cobra ao Colidir com as bordas.
   switch(lugarColisao){
       case 'cima':          
           topo = $('#baixo').position().top;
	             
       break;
       case 'baixo':
          // alert("Colidiu com a parte de baixo");
           topo = $('#cima').position().top;         
       break;
       case 'esquerda':
          // alert("Colidiu com a Esquerda");
          left = $('#direita').position().left;         
       break;
       case 'direita':       
           //alert("Colidiu com a Direita");
          left = $('#esquerda').position().left;                  
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
        destroyCookie($(cookie).attr('id'));
         
         createCookieRandon();
         //criação de celula
         criarNovaCelula();
         velocity = velocity - 5;
         pontuacao +=1;
         $('#pontuacao').html("Pontos: "+pontuacao); 
  }
  
  
}

function collisionYourSelf(){
   var pos = getPositions($('#0')); // Pegando o elemento cabeça.
   var gameover = false;
   for(var i = 1; i<=celulas.length; i++){
       
       var pos2 = getPositions($('#'+i));
       var horizontalMatch = comparePositions(pos[0], pos2[0]);
       var verticalMatch = comparePositions(pos[1], pos2[1]);
       var match = horizontalMatch && verticalMatch;
        if (match) {
        
              alert('GAME OVER -- Você fez '+pontuacao+' pontos!');
            
              window.location.href = "index.html";
              return false;
        } 
   }
     
  
}

//........................................................................
//------------------------Randon Cookie--------------------------------------//
//----------------------------------------------------------------------//

function createCookieRandon(){
    var alturaJanela = window.innerHeight;
    var larguraJanela = window.innerWidth;
    var topCookie = 0;
    var leftCookie = 0;
    topCookie = getRandomInt(50, alturaJanela - 100);
    leftCookie = getRandomInt(50, larguraJanela - 150);
    
    rndID = getRandomInt(50, 100);
    
    var cookie = document.createElement("div");
    var cookieId = document.createAttribute("id");
    var cookieClass = document.createAttribute('class');
    
    
    cookieId.value = rndID;
    cookieClass.value = 'cookie';
    
    cookie.setAttributeNode(cookieId);
    cookie.setAttributeNode(cookieClass);
    
    cookie.setAttribute("style","width:50px;height:50px;background:green;top:"+topCookie+"px;left:"+leftCookie+"px;position:absolute");
    
    
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

function killSnake(){
    var snake = document.getElementById('paiDaSnake');
    var cenario = document.getElementById('cenario');
    cenario.removeChild(snake);
    alert('Matou a cobra.');
}