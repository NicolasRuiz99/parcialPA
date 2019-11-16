import React,{Component} from 'react';
import imagen from './cryptomonedas.png';

import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

class App extends Component {

  state = {
    resultado:[],
    cargando:false,
  }

  componentDidMount (){
    this.consultarAPI();
  }

  consultarAPI = async (cripto='BTC',moneda='USD') => {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

    this.setState ({
      cargando: true
    })
    const resp = await fetch (url);
    const resultado = await resp.json();
    this.setState ({
      cargando: false
    })

    const res = resultado.DISPLAY[cripto]
    const res2 = res[moneda]

    this.setState ({
      resultado : res2,
    })
  }

  render (){
    return (
      <div className="container">
          <div className="row">
              <div className="one-half column">
                  <img src={imagen} alt="imagen criptomonedas" className="logotipo" />
              </div>
              <div className="one-half column">
                  <h1>Cotiza Criptomonedas al Instante</h1>
                  {(this.state.cargando) ? <Spinner /> : <Cotizacion resultado={this.state.resultado} />}
                
  
             </div>
          </div>
          <Formulario consultarAPI={this.consultarAPI}/>
          
      </div>
    );
  }
  
}

export default App;
