
let botao = document.querySelector("#botao");

botao.addEventListener('click', function(event){
  

    event.preventDefault();

    let altura = Number(document.querySelector("#Altura").value);
    altura = altura / 100
    let peso = Number(document.querySelector("#Peso").value);
    let idade = Number(document.querySelector('#Idade').value);
    let sexo = document.querySelector('input[name="Sexo"]:checked')?.value;
    let atividade = document.querySelector('input[name="ATV"]:checked')?.value;
    let objetivo = document.querySelector('input[name="OBJ"]:checked')?.value;


    let valorImc = calculoIMC(peso, altura);
    document.querySelector("#resultadoimc").innerText = valorImc.toFixed(2);
    let valorTmb = calculoTMB(peso, altura, idade, sexo);
    document.querySelector("#resultadotmb").innerText = ("O valor da sua taxa metabolica basal é: ") +valorTmb.toFixed(2);
    let valorGetd = calculoGETD(atividade, valorTmb);
    document.querySelector("#resultadogetd").innerText = ("O valor do seu gasto energético diario é: ") + valorGetd.toFixed(2);
    let valorAjuste = calculoAjuste(objetivo, valorGetd);
    document.querySelector("#resultadoajuste").innerText = ("Você deve consumir a seguinte quantidade de calorias diárias: ") + valorAjuste.toFixed(2);
    let macros = calculoMacros (objetivo, valorAjuste);
    document.querySelector("#resultadomacrop").innerText = ("A quantidade de proteinas que deve consumir é :") + macros.prot.toFixed(0);

    if( valorImc < 18.5){
        document.querySelector("#resultadoimc").innerText = ("Seu imc é: " + valorImc.toFixed(2) + " Abaixo do peso!.")
    } else if(valorImc > 18.4 && valorImc < 25.0){
        document.querySelector("#resultadoimc").innerText = ("Seu imc é: " + valorImc.toFixed(2) + " Peso normal!.")
    } else if(valorImc >= 25.0 && valorImc < 30){
        document.querySelector("#resultadoimc").innerText = ("Seu imc é: " + valorImc.toFixed(2) + " Sobrepeso!.")
    } else if( valorImc >= 30 && valorImc < 40){
        document.querySelector("#resultadoimc").innerText = ("Seu imc é: " + valorImc.toFixed(2) + " Obesidade!.")
    } else if(valorImc > 40){
        document.querySelector("#resultadoimc").innerText = ("Seu imc é: " + valorImc.toFixed(2) + " Obesidade grave!.")
    }
    else{
        document.querySelector("#resultadoimc").innerText = ("Não foi possível calcular seu IMC.")
    }
})
    
    
    function calculoIMC(peso, altura){
        let imc = peso / (altura * altura);
        return imc
    }

    
    function calculoTMB(peso, altura, idade, sexo){
        altura = altura * 100
        let TMB;
        if(sexo == "Feminino"){
            TMB = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade)
            return TMB
        } else{
            TMB = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade)
            return TMB
        }
    }


    
    function calculoGETD(atividade, TMB){

        let getd;
        if(atividade == "Nenhum")
        {
        getd = TMB * 1.2;
        return getd 
        }else if(atividade == "Leve"){
            getd = TMB * 1.375;
            return getd 
        }else if(atividade == "Moderada"){
            getd = TMB * 1.55;
            return getd 
        }else{
            getd = TMB * 1.725;
            return getd 
        }
    }
    
    function calculoAjuste(objetivo, valorGetd){
    
        let ajuste;
        if(objetivo == "Emagrecimento")
        {
            ajuste = valorGetd - 400;
            return ajuste
        } else if(objetivo == "Manutenção"){
            ajuste = valorGetd ;
            return ajuste
        }else{
            ajuste = valorGetd + 300;
            return ajuste
        }
    }

    function calculoMacros (objetivo, valorAjuste){
        
        let proteina;
        let carboidrato;
        let gordura;
        if(objetivo == "Emagrecimento")
        {
            proteina = (valorAjuste * 0.25) / 4
            carboidrato = (valorAjuste * 0.50) / 4
            gordura = (valorAjuste  * 0.25) / 9
        
        } else if(objetivo == "Manutenção"){
            proteina = (valorAjuste  * 0.25) / 4
            carboidrato = (valorAjuste  * 0.45) / 4
            gordura = (valorAjuste  * 0.30) / 9
        } else{
            proteina = (valorAjuste  * 0.30) / 4
            carboidrato = (valorAjuste  * 0.40) / 4
            gordura = (valorAjuste  * 0.30) / 9
        }

        return {
            prot: proteina,
            carbo: carboidrato,
            gord: gordura
        };
    }
