import { Link } from "react-router-dom";
import { getAllPokemons } from "../slice/pokemonSlice";
import { useSelector } from "react-redux";

const List = () => {
  const pokemons = useSelector(getAllPokemons);
  return (
    <div>
      <h1>Pokemon List</h1>

      {/* add here the list of pokemons... */}
      <ul>
        {pokemons.map((item) => (
          <li key={item.id}>
            <Link to={`/pokemon/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
