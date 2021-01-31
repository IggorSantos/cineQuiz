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
import Link from '../src/components/Link'
import Head from 'next/head'
import {useRouter} from 'next/router'

const QuizTitle = styled.h1`
   color:black;
`

export default function Home() {
  const router = useRouter()
  const [name,setName] = React.useState('')
  return (
    <QuizBackground backgroundImage={db.bg}>
    <Head>
     <title>CineQuiz</title>
     <meta key="og:image" name="og:image" content={db.bg} />
    </Head>
    <QuizContainer>
     <QuizLogo />
       <Widget>
        <Widget.Header>
          <QuizTitle>
           CineQuiz
          </QuizTitle>
        </Widget.Header>
        <Widget.Content>
        <form onSubmit={function(event){
          event.preventDefault()
          router.push(`/quiz?name=${name}`)
        }}
        >
        <p>Um quiz sobre cinema</p>
        <Input
          onChange={(event) => setName(event.target.value)}
          placeholder="Digite seu nome"
          value={name}
          name="nomedoJogador"
        />
        <Button type="submit" disabled={name.length === 0}>
           {`Jogar ${name}`}
        </Button>
        </form>
        </Widget.Content>
       </Widget>
       <Widget>
        <Widget.Content>
         <h1>Quizes da galera</h1>
         <ul>
          {db.external.map((linkExterno) => {
            const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
            return(
              <li key={linkExterno}>
               <Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`}>
                 {`${githubUser}/${projectName}`}
               </Widget.Topic>
              </li>
            )
          })}
        </ul>
        </Widget.Content>
       </Widget>
       <Footer />
     </QuizContainer>
    <GitHubCorner projectUrl={"https://github.com/IggorSantos"} />
  </QuizBackground>
  )
}
