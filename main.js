const spellName = document.querySelector('#search');
const buttonSearch = document.querySelector('#search-spell');
const containerResult = document.querySelector('.result-search');

async function searchApi(nameSpell){
    try{
        const response = await fetch('https://www.dnd5eapi.co/api/spells/'+nameSpell);
        const responseData = await response.json();
        return responseData;
    }catch(err){
        console.log(err);
    }
}

async function createCard(nameSpell){
    containerResult.innerHTML = '';

    const responseData = await searchApi(nameSpell);
    const [damageDatas, damageType] = Object.values(responseData.damage);
    const damageObj = {...damageDatas, ...damageType};
    const damageArr = Object.values(damageObj);

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

buttonSearch.addEventListener('click', ()=>{

    const valueSpellName = spellName.value.toLowerCase().trim().replace(' ', '-');

    if(valueSpellName.value == ''){
        containerResult.innerHTML = ''
    }else{
        createCard(valueSpellName);
    }
});


spellName.addEventListener('keypress', (event)=>{

    const valueSpellName = spellName.value.toLowerCase().trim().replace(' ', '-');
    
    if(valueSpellName.value == ''){
        containerResult.innerHTML = ''
    }else if(event.key == 'Enter'){
        createCard(valueSpellName);
    }
});