import React, { useEffect,useState } from 'react';
import API from '../../Servicos/index';

function Principal ({match}){
  
//CUIDADO AO CHAMAR API , para garantir que foi chamada todoa coloca o enderço
// da pasta neste casso e index. Se não fosse um APi não precisaria.

  const [primeiro,setPrimeiro] = useState({});
  const [segundo,setSegundo] = useState([]);
  const [loading,setLoading] = useState(true);

useEffect(()=>{
   async function carregar(){
       const pegar = decodeURIComponent(match.params.repositorio);
       
       const [dados1,dados2] = await Promise.all([
            API.get( `/repos/${pegar}` ),//get porque recebo de  um endereço do saite,getItem estou pegando de um item de Apiou função
            API.get(`/repos/${pegar}/issues`,{
                params:{
                  per_page:5,
                  state:"open",
                }
            }) 
       ])
       setPrimeiro(dados1);
       setSegundo(dados2); 
       setLoading(false);    
       console.log(dados1)
       console.log(dados2);
    }
  
  carregar();
}, [match.params.repositorio]);

    return(
     <h1>Salve</h1>
    );
}

export default Principal;