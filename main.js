const spellName = document.querySelector('#search');
const buttonSearch = document.querySelector('#search-spell');
const containerResult = document.querySelector('.result-search');

async function searchApi(nameSpell){
    try{
        const response = await fetch('https://www.dnd5eapi.co/api/spells/'+nameSpell);
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    }catch(err){
        console.log(err);
    }
}

async function createCard(nameSpell){
    containerResult.innerHTML = '';

    const responseData = await searchApi(nameSpell);

    containerResult.innerHTML = `
    <div class="card">
        <img src="spells/${responseData.name}.jpg">
        <h1>${responseData.name}</h1>
        <p>${responseData.desc}</p>
        <div class="footer-card">
            <span>Damage: ${responseData.damage.damage_at_slot_level[3]}</span>
            <span>Area: ${responseData.area_of_effect.size}</span>
        </div>
    </div>
    `;
}

buttonSearch.addEventListener('click', ()=>{

    const valueSpellName = spellName.value.toLowerCase().trim().replace(' ', '-');

    if(spellName.value == ''){
        containerResult.innerHTML = ''
    }else{
        createCard(valueSpellName);
    }
});