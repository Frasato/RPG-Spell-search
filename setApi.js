

async function requestMonster(id){
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${id}`);
    if(!response.ok){
        throw new Error(`
            ${response.status} - ${response.statusText}`);
    }

    const convertResponse = await response.json();
    return convertResponse;
}

async function renderMonster(monsterId){
    const monster = await requestMonster(monsterId);
    console.log(monster);
}

renderMonster('acid-splash');