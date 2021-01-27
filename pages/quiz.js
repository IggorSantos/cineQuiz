import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/widget'
import Footer from '../src/components/footer'
import GitHubCorner from '../src/components/githubCorner'
import QuizBackground from '../src/components/quizBackground'
import QuizLogo from '../src/components/quizLogo'
import QuizContainer from '../src/components/quizContainer'
import Input from '../src/components/input'
import Button from '../src/components/button'
import Link from 'next/link'

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

export default function Home() {
  console.log(db.questions)
  return (
    <QuizBackground backgroundImage={db.bg}>
     <QuizContainer>
      <QuizLogo />
       <Widget>
        <Widget.Header>
          <h3>
           Pergunta
           1
           de
           {`${db.questions.length}`}
           </h3>
        </Widget.Header>
        <img
         alt="Descrição"
         style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
         }}
         src="https://placehold.it/400x400"
        />
        <Widget.Content>
          <h2>
           Titulo
          </h2>
          <p>
           Descrição
          </p>
          <Button>
           Confirmar
          </Button>
        </Widget.Content>
       </Widget>
       <LoadingWidget />
       <Footer />
     </QuizContainer>
    <GitHubCorner projectUrl={"https://github.com/IggorSantos"} />
  </QuizBackground>
  )
}
