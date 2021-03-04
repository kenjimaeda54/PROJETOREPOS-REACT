import React from 'react';
import {Container,Form,SubmitButton} from './estilos';
import {FaGithub, FaPlus, FaSpinner} from 'react-icons/fa';
import {useState,useCallback}  from 'react';


import API from '../../Servicos';


function Principal() {
    
  const [newRepo,setNewRepo] = useState('');
  const [formulario,setFormulario] = useState([]);  
  const [loading,setLoading] = useState(false);
    
 const enviar = useCallback((e)=>{
       e.preventDefault();
       
       async function enviado(){
         setLoading(true);
         try{
           const response = await API.get(`repos/${newRepo}`);//newRepo posivelmente e do API.
           console.log(response.data);//aqui você encherga o api, repos e da Api
           const data = {
             name: response.data.full_name,
           }       
             setFormulario([...formulario,data]); 
            setNewRepo('');
           }catch(error){
                console.log(error)
        }finally{
            setLoading(false);
        }
     }
   enviado(); 
},[newRepo,formulario]);

function estado(e){
   setNewRepo(e.target.value);
   
}
  
    return ( 
        <Container>
       
        <h1><FaGithub color="black" size="14px"/>Repositorios</h1>
        
        <Form onSubmit={enviar}>
        
        <input type="text" 
        placeholder="Adicone o repositorio" 
        value={newRepo} 
        onChange={estado}/> 
        
        <SubmitButton loading={loading? 1 : 0}>
         {loading?( 
        <FaSpinner color="#FFF" size="14px"/>  
         ):(
        <FaPlus color="#FFF" size="14px"/> 
         )}
        </SubmitButton>  
        
         </Form>
       
        </Container>    
    );
}

export default Principal;