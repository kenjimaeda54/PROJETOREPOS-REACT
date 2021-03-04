import React, { useEffect } from "react";
import { Container, Form, SubmitButton, List, Button } from "./estilos";
import { FaGithub, FaPlus, FaSpinner, FaList, FaTrash } from "react-icons/fa";
import { useState, useCallback } from "react";

import API from "../../Servicos";

function Principal() {
  const [newRepo, setNewRepo] = useState("");
  const [formulario, setFormulario] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);

  //atualizar
  useEffect(() => {
    const consultar = localStorage.getItem("key");
    if (consultar) {
      setFormulario(JSON.parse(consultar));
    }
  }, []);

  //salvar os dados//atenção aqui e sempre um array,porque caso vcoê colocar outro
  //falar ele vai setar e apagar o anterior,não tem logica,tem que ser um array
  //ou lista,assim sempre que colcoar um novo falar vai armazenar com outro
  //adiconado
  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(formulario));
  }, [formulario]);

  const enviar = useCallback(
    (e) => {
      e.preventDefault();

      async function enviado() {
        setLoading(true);
        setAlerta(null);
        try {
          if (newRepo === "") {
            throw new Error("você precisa digitar algo");
          }
          const response = await API.get(`repos/${newRepo}`); //newRepo posivelmente e do API.
          console.log(response.data); //aqui você encherga o api, repos e da Api
          const verificar = formulario.find((repo) => repo.name === newRepo);
          if (verificar) {
            throw new Error("Repositorio duplicado");
          }
          const data = {
            name: response.data.full_name,
          };
          setFormulario([...formulario, data]);
          setNewRepo("");
        } catch (error) {
          setAlerta(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      enviado();
    },
    [newRepo, formulario]
  );

  const deletar = useCallback(
    (item) => {
      const filtro = formulario.filter((r) => r.name !== item);
      setFormulario(filtro);
    },
    [formulario]
  );

  function estado(e) {
    setNewRepo(e.target.value);
    setAlerta(null);
  }

  return (
    <Container>
      <h1>
        <FaGithub color="black" size="14px" />
        Repositorios
      </h1>

      <Form onSubmit={enviar} error={alerta}>
        <input
          type="text"
          placeholder="Adicone o repositorio"
          value={newRepo}
          onChange={estado}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size="14px" />
          ) : (
            <FaPlus color="#FFF" size="14px" />
          )}
        </SubmitButton>
      </Form>
      <List>
        {formulario.map((item) => (
          //buton para deletar tem que ficar dentro do span cuidado,motivo
          //e que para deletar você vai comparar o valor do map com o do filtro;
          // cuidado com a formatação em css as vezes são suas tags em posições erradas
          <li key={item.name}>
            <span>
              <Button
                onClick={() => {
                  deletar(item.name);
                }}
              >
                <FaTrash size="14" color="#0d2636" />
              </Button>
              {item.name}
            </span>
            <FaList size="14" />
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Principal;
