# RPG Spell Search

Na minha mesa de RPG, geralmente precisamos ficar pesquisando no liros as magias que queremos usar, e muitas das vezes, em site que mostram ela, vem com informações diferentes das do livro. Com esse problema em vista, decidi criar esse sistema, onde vc deve preencher um campo com o nome da magia e nisso, ele te retorna a descrição dela, com o dano e o alcance.

## Desafio Atributos

Nesse projeto, tive que estudar e aprender sobre as funções assíncronas, assim como o await e o fetch. Apesar de serem fáceis de se entender, um problema que me desafio bastante foi: Apesar da API me retornar um JSON com os valores, dependendo da magia pesquisada os atributos mudam de nome:

Em determinas magias, a API me retornava esses valores

```Javascript
damage:{
    damage_at_character_level:{
        "0": "1d10",
        "3": "2d10"
    },
    damage_type:{
        "index": "acid"
    }
}
```

Em outras, a API me retornava com um nome de atributo diferente

```Javascript
damage:{
    damage_at_slot_level:{
        "0": "1d8",
        "7": "4d8"
    },
    damage_type:{
        "index": "fire"
    }
}
```

## Solução

Para solucionar esse problema de nomes diferentes de atributos dentro do JSON, eu tive essa solução:

```Javascript
//Esperando a resposta da API
const responseData = await searchApi(nameSpell);

//Desconstruindo os dois atributos dentro do atributo *DAMEGE*
const [damageDatas, damageType] = Object.values(responseData.damage);

//Atribuindo eles a um mesmo objeto, assim, tirando a separação dos atributos
const damageObj = {...damageDatas, ...damageType};

//Converto esse OBJ em um ARRAY
const damageArr = Object.values(damageObj);
```

Não sei se a solução que eu tive para resolver esse problema é a melhor disponível, porém, ela conseguiu retirar esse erro de não achar o atributo que eu procurava inicialmente, por ele mudar de nome.

## Desafio Imagens 

A API não me retorna nenhuma imagem do seu banco, para tornar o site mais usual e atrativo para o usuário, as imagens era necessárias para esse fim.

## Solução

Para conseguir contornar esse problema das imagens não serem enviadas com a API, eu criei e salvei algumas imagens em mesma resolução e tamanho (1080x1080) e com o nome do "index" de cada magia buscada, assim atribui esse nome no JS, assim, alterando a imagem conforme a magia.

```Javascript
//Esperando a resposta da API
const responseData = await searchApi(nameSpell);

//Atribuindo o atributo index a o nome dinâmico da imagem
containerResult.innerHTML = `<img src="spells/${responseData.index}.jpg">`;
```

com isso, consegui resolver o problema de não ter imagens para complementar os cards.

## Site

Para ver ele funcionando, eu utilizei a Netlify para um hospedagem gratuita desse site.

<<<<<<< HEAD
##### 🔗 <a href="https://spellsearch.netlify.app/" target="_blank">RPG Spell Search</a>
=======
##### 🔗 <a href="https://rpgspellsearch.netlify.app/" target="_blank">RPG Spell Search</a>
>>>>>>> dcb3f0fc5fb7681d685db6780675eb54a11167a1
