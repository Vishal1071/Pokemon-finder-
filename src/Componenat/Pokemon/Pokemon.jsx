import './Pokemon.css'
import { useState, useEffect } from 'react'
import axios from 'axios'



function Pokemon() {
  const [pokidata, setPokidata] = useState([]);
  const [loding, setLoding] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_API_KEY;

  const fechPokemon = async () => {
    try {
      const res = await axios.get(API);
      setLoding(false);
      console.log(res.data);

      const detailpokemon = res.data.results.map(async (curpokemon) => {
        const res = await axios.get(curpokemon.url);
        return res.data;
      });

      const detailRespomses = await Promise.all(detailpokemon)
      setPokidata(detailRespomses);
      console.log(detailRespomses);

    } catch (error) {
      setError(error.response.status);
      setLoding(false);
    }
  }

  useEffect(() => {
    fechPokemon();
  }, [])

  const searchData = pokidata.filter((curpokemon) =>
    curpokemon.name.toLowerCase().includes(search.toLowerCase()))

  if (loding) {
    return (
      <div>
        <h1>Loding....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error: ${error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="main-poki">

        <h1>Get pokemon</h1>
        <div className="pokemon-serch">
          <input type="text"
            placeholder='search Pokemon'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="pokemon-cards">
          <ul className='cards'>
            {
              searchData.map((lol) => {
                return (
                  <li className='pokemon-card' key={lol.id}>
                    <img src={lol.sprites.other.dream_world.front_default} alt={lol.name} className='pokemon-image' />
                    <h1 className='pokemon-name'>{lol.name}</h1>
                    <div className="pokemon-info pokemon-highlight">
                      <p>
                        {pokidata[0]?.types.map((cur) => cur.type.name).join(", ")}
                      </p>
                    </div>
                    <div className="grid-three-color">
                      <p className='pokemon-infos'>
                        <span> Height:</span>{lol.height}
                      </p>
                      <p className='pokemon-infos'>
                        <span> Weight:</span>{lol.weight}
                      </p>
                      <p className='pokemon-infos'>
                        <span>Speed: </span>{lol.stats.find(stat => stat.stat.name === "speed")?.base_stat}
                      </p>
                      <p className='pokemon-infos'>
                        <span>Abilitie: </span>{lol.abilities[0]?.ability.name}
                      </p>

                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>

      </div>
    </>
  )
}

export default Pokemon
