import React, { useEffect, useState } from "react";
import API from "../../Servicos/index";
import {
  Container,
  Owner,
  IssuesList,
  BackButton,
  Loading,
  Allpage,
  StateButton,
} from "./estilos";
import { FaArrowLeft } from "react-icons/fa";

function Principal({ match }) {
  //CUIDADO AO CHAMAR API , para garantir que foi chamada todoa coloca o enderço
  // da pasta neste casso e index. Se não fosse um APi não precisaria.
  const [primeiro, setPrimeiro] = useState({});
  const [segundo, setSegundo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [listEstado, setListEstado] = useState([
    { state: "all", label: "Todas", active: true },
    { state: "closed", label: "Fechado", active: false },
    { state: "open", label: "Abertos", active: false },
  ]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    async function estado() {
      const pegar = decodeURIComponent(match.params.repositorio);
      const resposta = await API.get(`/repos/${pegar}/issues`, {
        params: {
          page, //page vai setar o nome page da APi.
          per_page: 5,
          state: listEstado[filter].state,
        },
      });
      setSegundo(resposta.data);
    }

    estado();
  }, [match.params.repositorio, page, listEstado, filter]);

  useEffect(() => {
    async function carregar() {
      const pegar = decodeURIComponent(match.params.repositorio);
      const [dados1, dados2] = await Promise.all([
        API.get(`/repos/${pegar}`),
        API.get(`/repos/${pegar}/issues`, {
          params: {
            per_page: 5,
            state: listEstado.find((r) => r.active).state,
          },
        }),
      ]);
      setPrimeiro(dados1.data);
      setSegundo(dados2.data);
      setLoading(false);
      console.log(dados1.data);
      console.log(dados2.data);
    }

    carregar();
  }, [match.params.repositorio, listEstado]);

  function verficarEstado(acao) {
    setPage(acao === "voltar" ? page - 1 : page + 1);
  }

  function verificaEstado(index) {
    setFilter(index);
  }

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  // nosso metodo para comunicar o html com API esta em assync então leva um tempo
  // para pegar a resposta,por isso precisa colocar if(loading)... Enquanto estvier
  //carregando os dados não renderiza o html,"owner" é da API
  //em ative={...} active e nome da props
  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft sizer="14px" />
      </BackButton>
      <Owner>
        <img src={primeiro.owner.avatar_url} alt={primeiro.owner.login} />
        <h1>{primeiro.name}</h1>
        <p>{primeiro.description}</p>
      </Owner>
      <StateButton active={filter}>
        {listEstado.map((item, index) => (
          <button
            type="button"
            onClick={() => {
              verificaEstado(index);
            }}
          >
            {item.label}
          </button>
        ))}
      </StateButton>
      <IssuesList>
        {segundo.map((issues) => (
          <li key={String(issues.id)}>
            <img src={issues.user.avatar_url} alt={issues.user.login} />
            <div>
              <strong>
                <a href={issues.html_url}>{issues.title}/</a>
                {issues.labels.map((labels) => (
                  <span key={String(labels.id)}>{labels.name}</span>
                ))}
              </strong>
            </div>
          </li>
        ))}
      </IssuesList>
      <Allpage>
        <button
          type="button"
          onClick={() => verficarEstado("voltar")}
          disabled={page < 2}
        >
          Voltar
        </button>
        <button type="button" onClick={() => verficarEstado("proximo")}>
          Proximo
        </button>
      </Allpage>
    </Container>
  );
}

export default Principal;
