import './App.css'

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movie1Title = "Film 1 - DeBrouckère";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckère";
  const cinema1Movie2Director = "Director B";

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";

  return (
    <div>
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} 
              movie1Name={cinema1Movie1Title} 
              movie1Director={cinema1Movie1Director} 
              movie2Name={cinema1Movie2Title} 
              movie2Director={cinema1Movie2Director} />

      <Cinema name={cinema2Name}
              movie1Name={cinema2Movie1Title} 
              movie1Director={cinema2Movie1Director} 
              movie2Name={cinema2Movie2Title} 
              movie2Director={cinema2Movie2Director} />
    </div>
  );
};

const PageTitle = (props: { title: string }) => {
  return <h1>{props.title}</h1>;
}


const Cinema = (props: { name: string, movie1Name : string, movie1Director : string
                         movie2Name : string, movie2Director : string
 }) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <ul>
        <li>
          <strong>{props.movie1Name}</strong> - Réalisateur :{" "}
          {props.movie1Director}
        </li>
        <li>
          <strong>{props.movie2Name}</strong> - Réalisateur :{" "}
          {props.movie2Director}
        </li>
      </ul>
    </div>
  );
 }

export default App;

