const divDoPokemon = document.querySelector(".apis");
const botao = document.querySelector(".button");
const procurarPokemon = document.querySelector("#pokemon");

async function buscarPokemon(nome) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    const data = await response.json();

    console.log(data);

    if (response.status === 400) {
      throw new Error(`Erro ${response.status}: Pokemon não encontrado`);
    }
    
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const pokemon = {
      id: data.id,
      nome: capitalize(data.name),
      imagem: data.sprites.front_default,
      forca: data.stats[1].base_stat,
      vida: data.stats[0].base_stat,
      defesa: data.stats[2].base_stat,
      tipo: data.types.map((t => capitalize(t.type.name))).join(", "),
    };

    divDoPokemon.innerHTML = `
    <h2>${pokemon["nome"]}</h2>
    <img src="${pokemon["imagem"]}" alt="${pokemon["nome"]}"/>
    <p><strong>Vida:</strong> ${pokemon["vida"]}</p>
    <p><strong>Força:</strong> ${pokemon["forca"]}</p>
    <p><strong>Defesa:</strong> ${pokemon["defesa"]}</p>
    <p><strong>Tipo:</strong> ${pokemon["tipo"]}</p>
    `;
  } catch (error) {
    console.error(`Erro ao achar o pokemon: ${error}`);
  }
}
buscarPokemon("pikachu");

botao.addEventListener("click", function (event) {
  event.preventDefault();

  const nomeDoPokemon = procurarPokemon.value.toLowerCase();
  buscarPokemon(nomeDoPokemon);

  procurarPokemon.value = "";
  procurarPokemon.focus();
});

