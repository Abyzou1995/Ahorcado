// Lista de palabras segun categoria y dificultad aumenta con indices mas altos
const paises =["Peru","Bolivia","Chile","Brasil","Argentina","Australia","Afganistan","Alemania","Finlandia","Indonesia","Luxemburgo","Venezuela"]
const animales =["gato","oso","toro","mono","abeja","avispa","ballena","canguro","elefante","cocodrilo","mariposa","murcielago","camaleon"]
const ropa=["botas","falda","polo","bata","camiseta","pantalon","zapatos","vestido","corbata","chaqueta","calcetines","sudadera"]
//declaracion de variables
let categorias="";
let dificultades="";
let palabraGuiones="";
let palabra="";
let palabrat="";
let contador=0;
let vidas=6;
let bandera=false;
let bandera1=false;
//Funcion para seleccion la palabra secreta
function seleccionar(cat,dif,ca1,ca2,ca3){
 let grupo=[];
 let palabrita="";
 switch(cat){//casos de categoria
        case "paises":
            grupo=ca1;
        break;
        case "animales":  
            grupo=ca2;
        break;  
        case "ropa" :
            grupo=ca3;
        break;
    }
    let indice=grupo.length;
 switch(dif){//casos de dificultad
    case "basico":
        palabrita=grupo[Math.floor(Math.random()*indice/3)];
    break;
    case "intermedio":
        palabrita=grupo[Math.floor(4+Math.random()*indice/3)];
    break;
    case "dificil" :
        palabrita=grupo[Math.floor(8+Math.random()*indice/3)];
    break;
        } 
    return palabrita;
};
//Funcion del boton Iniciar
document.querySelector("#iniciar").addEventListener("click",()=>{
    categorias = document.querySelector('#categorias').value;//obtener valor de categoria. formulario
    dificultades = document.querySelector('#dificultades').value;//obtener valor de dificultad,formulario
    palabra=seleccionar(categorias,dificultades,paises,animales,ropa);//obtener palabra secreta
    palabrat=palabra;//palabra para comprar en ingreso de palabra
    palabraGuiones=palabra.replace(/./g, " _");//reemplazar palabra por " _"s, 
    document.querySelector("#salida").innerHTML=palabraGuiones;//mostrar la palabra en guiones  
    contador=0;//inicializar contador
    vidas=6;//inicializar vidas
    document.getElementById("notificacion").src=`css/qoo_mal${vidas}.gif`;//gif de abeja muestra el inicio
    bandera=false;//bandera de ingresar letra
    bandera1=false;//bandera de ingresar palabra
    document.getElementById("ahorcado").src=`ahorcado_img/ahorcado_${vidas}.png`;// imagen ahorcado inicial
    document.getElementById("noti").src=`css/s_inicio.mp3`;//sonido de inicio de juego
});
//Funcion del boton ingreso de letra
document.querySelector("#verifica").addEventListener("click",()=>{
 const letra=document.querySelector("#letra").value;//obtener la letra ingresada
 if (vidas>0 && bandera==false && palabra!="" &&letra!=""){//condiciones para que el ingreso de letra sea valido  
 let coincidencias=palabraGuiones.length;//maximo de coincidencias
 contador=0;//inicializar contador
 for (const i in palabra){//recorrer tantas veces la longitud de la palabra
    const palabrita=Array.from(palabraGuiones) //convertir la palabra en guiones en arreglo 
    if(letra.toLowerCase()==palabra[i].toLowerCase()){//comparar la letra ingresada
        contador++;//aumenta el contador si coinciden
        let sound=Math.floor(Math.random()*2);//generador aleatorio de sonidos si aciertas
        document.getElementById("noti").src=`css/s_correcto${sound}.mp3`;//generar el recurso de sonido
        document.getElementById("noti").autostart=`true`;//inicio automatico del sonido
        let bien=Math.floor(Math.random()*4);//generador aleatorio del gif
        document.getElementById("notificacion").src=`css/qoo_bien${bien}.gif`;//generar el recursos del gif
        palabrita[2*i+1]=letra.toLowerCase();//Reemplazar los guiones con las letras que coinciden
        palabraGuiones=palabrita.toString();//Convertir el arreglo en string
        palabraGuiones=palabraGuiones.replace(/,/g,"")//reemplazar las "comas" con espacios vacios
        document.querySelector("#salida").innerHTML=palabraGuiones;//mostrar la palabra actualizada con guiones       
    }       
    if (palabraGuiones[2*i+1]!="_"){
        coincidencias=coincidencias-2;//verificar cuantos guiones quedan en la palabra con guiones
    } 
    }
    if (coincidencias==0){//Si ya no quedan guiones en la palabra con guiones "ganamos"
        document.getElementById("notificacion").src=`css/qoo_ganaste.gif`;//mostrar el gif ganador
        document.getElementById("noti").src=`css/s_ganador.mp3`;//sonido ganador
        document.getElementById("noti").autostart=`true`;//reproduccion automatica
        bandera=true;//bandera para detener intentos en ingresar letra
        bandera1=true;//bandera para detener intentos  en ingresar palabra
    }
    if (contador==0){//si el contador de letras q coinciden es cero
        vidas--;//nuestras vidas disminuyen
        let sonido=Math.floor(Math.random()*2);//generar numero para alerta de sonido de fallo
        document.getElementById("notificacion").src=`css/qoo_mal${vidas}.gif`;//gif de fallo
        document.getElementById("ahorcado").src=`ahorcado_img/ahorcado_${vidas}.png`;//imagen de ahorcado cambia
        document.getElementById("noti").src=`css/s_incorrecto${sonido}.mp3`;//sonido de fallo
        document.getElementById("noti").autostart=`true`;//reproduccion automatica del sonido
        document.querySelector("#salida").innerHTML=palabraGuiones;//mostrar la palabra con guiones
        if (vidas==0){//si nos quedamos sin vidas "perdemos"
            document.getElementById("noti").src=`css/s_perdedor.mp3`;//sonido perdedor
            document.getElementById("noti").autostart=`true`;//reproduccion automatica
        //funcion para mostrar la palabra completa en guiones
            let palabrota=Array.from(palabra)//arreglo de la palabra
            let mostrar=[]
        for (const i in palabra){//recorremos la longitud de la palabra
            mostrar[2*i+1]=palabrota[i];//reemplazamos guiones con letras de la palabra
            mostrar[2*i]=" ";//generamos espacios entre letras de la palabra
        }
        muestra=mostrar.toString();//convertimos a string
        muestra=muestra.replace(/,/g,"")//reemplazamos las comas por espacios vacios
        document.querySelector("#salida").innerHTML=muestra;//mostrar la palabra completa
        }
    }
  }
 document.querySelector("#letra").value="";//limpiamos la entrada de texto para reiniciar
});
//Funcion del boton ingreso de palabra
document.querySelector("#verifica1").addEventListener("click",()=>{
    const escrito=document.querySelector("#completo").value;//obtener valor de la palabra ingresada
 if (vidas>0 && bandera1==false && palabra!="" && escrito!=""){//condiciones para que la entrada de palabra sea valida
 if (escrito.toUpperCase()==palabrat.toUpperCase()){//Si las palabras son iguales "ganaste"
        document.getElementById("noti").src=`css/s_ganador.mp3`;//sonido ganador
        document.getElementById("noti").autostart=`true`;//autoplay
        document.getElementById("notificacion").src=`css/qoo_ganaste.gif`;//gif ganador
        bandera1=true;//bandera para detener intentos en ingresar letra
        bandera=true;//bandera para detener intentos en ingresar palabra
        //funcion para mostrar la palabra completa en guiones
        let palabrota=Array.from(palabrat);//arreglo de la palabra
        let mostrar=[];
        for (const i in palabrat){//recorrer la palabra
            mostrar[2*i+1]=palabrota[i];//reemplazamos guiones con letras de la palabra
            mostrar[2*i]=" ";//reemplazamos espacios entre letras de la palabra
        }
        muestra=mostrar.toString();//convertir a string
        muestra=muestra.replace(/,/g,"")//reemplazamos las comas por espacios vacios
        document.querySelector("#salida").innerHTML=muestra;//mostrar la palabra completa
 }
 else{// si no coincide "perdemos"
        document.getElementById("noti").src=`css/s_perdedor.mp3`;//sonido perdedor
        vidas=0;//perdemos todas nuestras vidas
        document.getElementById("ahorcado").src=`ahorcado_img/ahorcado_${vidas}.png`;//imagen de ahorcado final
        document.getElementById("notificacion").src=`css/qoo_mal${vidas}.gif`;//gif de perdedor
        bandera1=true;//bandera para detener intentos en ingresar letra
        bandera=true;//bandera para detener intentos en ingresar palabra
        //funcion para mostrar la palabra completa en guiones
        let palabrota=Array.from(palabrat);//arreglo de la palabra
        let mostrar=[];
        for (const i in palabrat){//recorrer la palabra
            mostrar[2*i+1]=palabrota[i];//reemplazamos guiones con letras de la palabra
            mostrar[2*i]=" ";//reemplazamos espacios entre letras de la palabra
        }
        muestra=mostrar.toString();//convertir a string
        muestra=muestra.replace(/,/g,"")//reemplazamos las comas por espacios vacios
        document.querySelector("#salida").innerHTML=muestra;//mostrar la palabra completa
 }
 }
   document.querySelector("#completo").value="";//limpiamos la entrada de texto para reiniciar
});


