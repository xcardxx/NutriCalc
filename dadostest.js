
let formulario = document.querySelector("#informacoes")

formulario.addEventListener('submit', function(event){
  

    event.preventDefault();

    let nome = document.querySelector("#Nome").value;
    let altura = Number(document.querySelector("#Altura").value);
    altura = altura / 100
    let peso = Number(document.querySelector("#Peso").value);
    let idade = Number(document.querySelector('#Idade').value);
    let sexo = document.querySelector('input[name="Sexo"]:checked')?.value;
    let atividade = document.querySelector('input[name="ATV"]:checked')?.value;
    let objetivo = document.querySelector('input[name="OBJ"]:checked')?.value;


    let valorImc = calculoIMC(peso, altura);
    let valorTmb = calculoTMB(peso, altura, idade, sexo);
    let valorGetd = calculoGETD(atividade, valorTmb);
    let valorAjuste = calculoAjuste(objetivo, valorGetd);
    let macros = calculoMacros (objetivo, valorAjuste);
    let classificacaoImc = "";
    
    if( valorImc < 18.5){
         classificacaoImc = " Abaixo do peso.";
    } else if(valorImc > 18.4 && valorImc < 25.0){
         classificacaoImc = "Peso normal.";
    } else if(valorImc >= 25.0 && valorImc < 30){
        classificacaoImc = "Sobrepeso.";
    } else if( valorImc >= 30 && valorImc < 40){
         classificacaoImc = "Obesidade.";
    } else if(valorImc > 40){
         classificacaoImc = "Obesidade grave.";
    }
    else{
         classificacaoImc ="Não foi possível calcular.";
    }

    let textoResultado = `\  
        ==================================================
                 RELATÓRIO DE AVALIAÇÃO NUTRICIONAL        
        ==================================================

        [DADOS DO PACIENTE]
        • Nome: ${nome}
        • Idade: ${idade} anos
        • Altura: ${altura} m
        • Peso: ${peso} kg
        \

        [COMPOSIÇÃO CORPORAL]
        • Índice de Massa Corporal (IMC): ${valorImc.toFixed(2)} kg/m²
        Status/Classificação: ${classificacaoImc}
        \
        
        [METABOLISMO E ENERGIA]
        • Taxa Metabólica Basal (TMB): ....... ${valorTmb.toFixed(2)} kcal
        • Gasto Energético Diário (GETD): .... ${valorGetd.toFixed(2)} kcal
        \

        [PLANEJAMENTO DIETÉTICO]
        • Meta de Consumo Diário: ............ ${valorAjuste.toFixed(2)} kcal
        • Meta de Macronutrientes:
        - Proteínas:  ${macros.prot.toFixed(0)}g
        - Carboidratos:  ${macros.carbo.toFixed(0)}g
        - Gorduras:  ${macros.gord.toFixed(0)}g
        
        ==================================================   `;

    document.querySelector("#resultadoGeral").innerText = textoResultado;

    document.querySelector(".resposta").style.display = "flex";
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

    function download(){
        const baixar = document.getElementById("resultadoGeral");
        setTimeout(() => {
        html2pdf().from(baixar).set({ margin: 15 }).save();
    }, 500);
    }

    
        let btnLimpar = document.querySelector("#botaoreset");
        let meuFormulario = document.querySelector("#informacoes");

        btnLimpar.addEventListener('click', function() {
            meuFormulario.reset();
            document.querySelector(".resposta").style.display = "none";
        })
        
