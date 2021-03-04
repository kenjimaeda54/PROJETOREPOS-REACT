import           React              from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'; 

import Principal    from './Paginas/Principal';
import Repositorio  from './Paginas/Repositorio';

export default function Rotas(){
    //Estou usando repositorio:repositorio porque nossa API não e diretamente o repostiorio
    // ela tem propridade no caso e repos/Facebok.
    return( 
      <BrowserRouter>
         <Switch>
           <Route exact path="/" component={Principal}/>
           <Route exact path="/repositorio/:repositorio" component={Repositorio}/>
         </Switch>
      </BrowserRouter>
    );
}