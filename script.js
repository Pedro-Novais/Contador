//Coletando os elementos HTML
const view_num = document.querySelector('#container-num');
const btn_stop = document.querySelector('#button-stop');
const btn_start = document.querySelector('#button-start');

let progress = document.querySelector('#progress-bar');
let width;

const body = document.querySelector('body');

let i = 0;
let exec = 0;
let interval;
let identy;

const div_alert = document.createElement('div');
div_alert.classList.add('dialog');
body.appendChild(div_alert);

//Estado inicial dos botões
btn_stop.classList.add('buttons-state');
btn_start.classList.add('buttons');

btn_start.addEventListener("click", verifield)

btn_stop.addEventListener("click", stop)

function maxLengthCheck(object){
    if (object.value.length > object.maxLength);
      object.value = object.value.slice(0, object.maxLength);
}

function verifield(){
    if(exec == 0){
        exec = 1;
        let input = document.querySelector('#choose-count').value;
        view_num.innerText = input;
        if(input<0){
            let verIf = 0;
            style(div_alert, verIf)
            pop();
            exec = 0;
            view_num.innerText = "";
            return false
        }
        if(input==""){
            let verIf = 1;
            style(div_alert, verIf)
            pop();
            exec = 0;
            view_num.innerText = "";
            return false
        }
        if(i==0){
            btn_stop.classList.remove('buttons-state');
            btn_stop.classList.add('buttons');
            btn_start.classList.remove('buttons');
            btn_start.classList.add('buttons-state');

            let verIf = 2;
            style(div_alert, verIf)
            i=1;
            progressBar(input);
            input--;
            interval = setInterval(() =>{
            if(input!=-1){
                view_num.innerText = input;
                input--;
            }
            if(input==-1){
                i = 0;
                exec = 0;
                div_alert.classList.add('dialog');

                btn_stop.classList.remove('buttons');
                btn_stop.classList.add('buttons-state');
                btn_start.classList.remove('buttons-state');
                btn_start.classList.add('buttons');

                setTimeout(barBack, 500);
                clearInterval(interval)
                clearInterval(identy)
            }
        }, 1000);
    }}
}

function style(a,b){
    if(b==0){
        a.innerText="Digite algum número maior que zero!";
    }else if(b==1){
        a.innerText="Digite algum número para prosseguir!";
    }else{
        a.classList.remove('dialog');
    }
    a.style.textTransform='uppercase';
}

function stop(){
    btn_stop.classList.remove('buttons');
    btn_stop.classList.add('buttons-state');
    btn_start.classList.remove('buttons-state');
    btn_start.classList.add('buttons');

    clearInterval(interval)
    clearInterval(identy)
    setTimeout(barBack, 500);
    exec = 0;
    i = 0;
    div_alert.classList.add('dialog');
}

function pop(){
    $( function() {
        $( ".dialog" ).dialog({
          draggable: false,
          modal: true,
          title: "ATENÇÃO!",
          show: {
            effect: "fade",
            duration: 500
          },
          hide: {
            effect: "fade",
            duration: 250
          }
        });
        $( "#button-start" ).on( "click", function() {
          $( ".dialog" ).dialog( "open" );
          $( ".dialog" ).dialog( "destroy" );
        });
      });
    }

function progressBar(time){
    let velocity = (time / 100) * 1000;
    width = 100;
    identy = setInterval(scene, velocity);
    function scene(){
        if(width <= 0){
            clearInterval(identy)
        }else{
            width--;
            progress.style.width = width + '%';
        }
    }
}

function barBack(){
    progress.style.width="100%"
}