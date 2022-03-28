const fetchPokemon = () =>{
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if(res.status != 200 || pokeName == ''){
            console.log(res);
            let msj = document.getElementById("screen");
            msj.innerHTML = '<p class="title">POKEDEX</p><p id="info">Intenta de nuevo</p>';
            document.getElementById("wait").style.display = "block";
            document.getElementById("pokeData").style.display = "none";
        }
        else{
            return res.json();
        }
    }).then((data) =>{
        if(data){
            console.log(data);

            let pokeData = {
                nombre : data.name,
                tipo: data.types[0].type.name,
                imagen : data.sprites.front_default,
                estads : data.stats,
                movs : data.moves
            };
            pokeImage(pokeData);
        }
    });
   
}

const pokeImage = (pokeData) => {
    const screen = document.getElementById("screen");
    const pwait = document.getElementById("wait");
    const pokeDataTable = document.getElementById("pokeData");  
    const pname = document.getElementById("name");
    const ptype = document.getElementById("type");
    const pstats = document.getElementById("stats");
    const pmovs = document.getElementById("movs");

    let estadisticas = "<ul>";
    let movimientos = "<ul>";

    for(let i = 0; i < pokeData.estads.length;i++){
        estadisticas += "<li>" + pokeData.estads[i].stat.name + " => " + pokeData.estads[i].base_stat + "</li>";
    }

    for(let i = 0; i < pokeData.movs.length ; i++){
        movimientos += "<li>" + pokeData.movs[i].move.name + "</li>";
    }


    screen.innerHTML = `<img src=${pokeData.imagen} alt="pokemon" id="img-pokemon">`;
    pwait.style.display = "none";
    pokeDataTable.style.display = "block";
    pname.innerHTML = pokeData.nombre;
    ptype.innerHTML = pokeData.tipo;
    pstats.innerHTML = `${estadisticas}</ul>`;
    pmovs.innerHTML = `${movimientos}</ul>`;


}
