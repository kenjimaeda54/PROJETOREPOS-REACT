import React, { useEffect, useState } from "react";
import API from "../../Servicos/index";
import { Container, Owner, IssuesList, BackButton, Loading } from "./estilos";
import { FaArrowLeft } from "react-icons/fa";

function Principal({ match }) {
  //CUIDADO AO CHAMAR API , para garantir que foi chamada todoa coloca o enderço
  // da pasta neste casso e index. Se não fosse um APi não precisaria.
  const [primeiro, setPrimeiro] = useState({});
  const [segundo, setSegundo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const pegar = decodeURIComponent(match.params.repositorio);
      const [dados1, dados2] = await Promise.all([
        API.get(`/repos/${pegar}`),
        API.get(`/repos/${pegar}/issues`, {
          params: {
            per_page: 5,
            state: "open",
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
  }, [match.params.repositorio]);

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
  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft size="14px" />
      </BackButton>
      <Owner>
        <img src={primeiro.owner.avatar_url} alt={primeiro.owner.login} />
        <h1>{primeiro.name}</h1>
        <p> {primeiro.description}</p>
      </Owner>
      <IssuesList>
        {segundo.map((issue) => (
          <li key={String(issue.id)}>
            <a href={issue.html_url}>{issue.title}/</a>
            <div>
              <strong>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}

                <p>{issue.user.login}</p>
              </strong>
            </div>
          </li>
        ))}
      </IssuesList>
    </Container>
  );
}

export default Principal;
