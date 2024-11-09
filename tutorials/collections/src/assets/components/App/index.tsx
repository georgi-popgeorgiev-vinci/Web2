import './App.css'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'


function App() {
  return (
    <div className="page">
      <Header title="We love pizza" version={0+1}/>
      <Main />
      <Footer />
    </div>
  );
}

export default App;

  
