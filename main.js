const spellName = document.querySelector('#search');
const buttonSearch = document.querySelector('#search-spell');
const containerResult = document.querySelector('.result-search');

//Função que se conecta com a API
async function searchApi(nameSpell){
    try{
        //Requisição API com o nome da magia
        const response = await fetch('https://www.dnd5eapi.co/api/spells/'+nameSpell);
        //Conversão dos dados
        const responseData = await response.json();
        //Retorno da resposta dada pela API
        return responseData;
    }catch(err){
        console.log(err);
    }
}

//Função que cria os cards com base nos dados da API
async function createCard(nameSpell){
    
    //Limpa o container
    containerResult.innerHTML = '';

    //Mando uma requisição e pego a resposta da API
    const responseData = await searchApi(nameSpell);
    //Desconstruo os sub atributos desse atributo
    const [damageDatas, damageType] = Object.values(responseData.damage);
    //Espalho em um único Objeto
    const damageObj = {...damageDatas, ...damageType};
    //Convert Array
    const damageArr = Object.values(damageObj);

    //Template do card a ser criados com as informações da API
    containerResult.innerHTML = `
    <div class="card">
        <img src="spells/${responseData.index}.jpg">
        <h1>${responseData.name}</h1>
        <p>${responseData.desc}</p>
        <div class="footer-card">
            <span>Damage: ${damageArr[0]}</span>
            <span>Alcance: ${responseData.range}</span>
        </div>
    </div>
    `;
}

//Evento ao clicar no botão de pesquisar
buttonSearch.addEventListener('click', ()=>{

    //Manipulação da string que foi o valor da pesquisa
    const valueSpellName = spellName.value.toLowerCase().trim().replace(' ', '-');

    //Se o campo de pesquisa estiver vazio
    if(spellName.value == ''){
        containerResult.innerHTML = `
        <span class="prompt-warning">
            <h1>Não tem essa magia no meu grimório</h1>
        </span>`;
    }else{
        //Função que cria o card
        createCard(valueSpellName);
    }
});

//Evento ao pressionar ENTER fazer a pesquisa
spellName.addEventListener('keypress', (event)=>{

    //Manipulação da string que foi o valor da pesquisa
    const valueSpellName = spellName.value.toLowerCase().trim().replace(' ', '-');
    
    //Se o campo de pesquisa estiver vazio
    if(spellName.value == ''){
        containerResult.innerHTML = `
        <span class="prompt-warning">
            <h1>Não tem essa magia no meu grimório</h1>
        </span>`;
    }
    //Se pressionar a tecla 'Enter'
    else if(event.key == 'Enter'){
        //Função que cria o card
        createCard(valueSpellName);
    }
});