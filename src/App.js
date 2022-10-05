import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { graphql } from "@octokit/graphql";


function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true)

async function repo() {
  const { repository } = await graphql(
    /* 아래는 요청할 쿼리가 들어가는 영역 */
    `
    {
      viewer {
        login
      }
      repository(owner: "codestates-seb", name: "agora-states-fe") {
        discussions(first: 10) {
          edges {
            node {
              title
              url
              author {
                resourcePath
              }
              bodyText
            }
          }
        }
      }
    }
  `,
    {
      headers: {
        authorization: `token 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`,
      },
    }
  );
  return repository;
}

useEffect(() => {
  repo()
  .then(res => {
    setData(res.discussions.edges)
    setIsLoading(false)
  })
}, [])

return (
  <div className="App">
    {isLoading? "loading..." : data.map((el, index) => {
      return <li key = {index}>
        <a href={el.node.url}>{el.node.title}</a>
        <span>{el.node.author.resourcePath}</span>
        <div>{el.node.author.login}</div>
        <p>{el.node.bodyText}</p>
      </li>
    })}
  </div>
);
}

export default App;