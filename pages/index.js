import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/widget'
import Footer from '../src/components/footer'
import GitHubCorner from '../src/components/githubCorner'
import QuizBackground from '../src/components/quizBackground'
import QuizLogo from '../src/components/quizLogo'
import Head from 'next/head'
import {useRouter} from 'next/router'

export const QuizContainer = styled.div`
   width: 100%;
   max-width: 350px;
   padding-top: 45px;
   margin: auto 10%;
   @media screen and (max-width: 500px) {
     margin: auto;
     padding: 15px;
   }
`

export default function Home() {
  const router = useRouter()
  const [name,setName] = React.useState('')
  return (
    <QuizBackground backgroundImage={db.bg}>
    <Head>
     <title>CineQuiz</title>
     <meta property="og:image" content="https://somos.lojaiplace.com.br/wp-content/uploads/2020/01/cinema-CRED-iStock_Roman-Valiev-1068x712.jpg" />
    </Head>
    <QuizContainer>
     <QuizLogo />
       <Widget>
        <Widget.Header>
          <h1>CineQuiz</h1>
        </Widget.Header>
        <Widget.Content>
        <form onSubmit={function(event){
          event.preventDefault()
          router.push(`/quiz?name=${name}`)
        }}
        >
        <p>Um quiz sobre cinema</p>
        <input
          onChange={function(event){
          setName(event.target.value)
        }}
        placeholder="Digite seu nome"
        />
        <button type="submit" disabled={name.length === 0}>
           Jogar
           {name}
        </button>
        </form>
        </Widget.Content>
       </Widget>
       <Widget>
        <Widget.Content>
         <h1>Quizes da galera</h1>
         <p>Em construção</p>
        </Widget.Content>
       </Widget>
       <Footer />
     </QuizContainer>
    <GitHubCorner projectUrl={"https://github.com/IggorSantos"} />
  </QuizBackground>
  )
}
