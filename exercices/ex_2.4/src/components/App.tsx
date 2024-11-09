import Cinema from "./Cinema";
import PageTitle from "./PageTitle";
import { Movie } from "../type"
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const moviesCinema1: Movie[] = [
    {
      title: "HAIKYU-THE DUMPSTER BATTLE",
      director: "Susumu Mitsunaka",
    },
    {
      title: "GOODBYE JULIA",
      director: "Mohamed Kordofani",
    },
    {
      title: "INCEPTION",
      director: "Christopher Nolan",
    },
    {
      title: "PARASITE",
      director: "Bong Joon-ho",
    },
  ];

  const cinema2Name = "UGC Toison d'Or";

  const moviesCinema2: Movie[] = [
    {
      title: "THE WATCHERS",
      director: "Ishana Night Shyamalan",
    },
    {
      title: "BAD BOYS: RIDE OR DIE",
      director: "Adil El Arbi, Bilall Fallah",
    },
    {
      title: "TENET",
      director: "Christopher Nolan",
    },
    {
      title: "THE IRISHMAN",
      director: "Martin Scorsese",
    },
  ];

  return (
    <div>
      <Header urlLogo = "https://www.istockphoto.com/fr/vectoriel/la-valeur-de-divertissement-cin%C3%A9matographique-ic%C3%B4nes-gm950472954-259433344?searchscope=image%2Cfilm ">
        <h1>Les cinémas</h1>
      </Header>

      <main className="page-content">
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movies={moviesCinema1} />

      <Cinema name={cinema2Name} movies={moviesCinema2} />
      </main>

      <Footer urlLogo = "https://www.istockphoto.com/fr/vectoriel/la-valeur-de-divertissement-cin%C3%A9matographique-ic%C3%B4nes-gm950472954-259433344?searchscope=image%2Cfilm ">
        <h1>Les cinémas</h1>
      </Footer>
    </div>
  );
};

export default App;