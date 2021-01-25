import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/widget'
import Footer from '../src/components/footer'
import GitHubCorner from '../src/components/githubCorner'
import QuizBackground from '../src/components/quizBackground'
import Link from 'next/link'

/*const Background = styled.div`
   background-image: url(${db.bg});
   flex:1;
   background-size:cover;
   background-position:center;
`*/

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
const Button = styled.button`
   width:200px;
   height:30px;
   background-color: ${({ theme }) => theme.colors.primary};;
   margin-top:20px;
`
const Input = styled.input`
   width:200px;
   height:30px;
 `

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
     <QuizContainer>
       <Widget>
        <Widget.Header>
          <h1>CineQuiz</h1>
        </Widget.Header>
        <Widget.Content>
          <p>Um quiz sobre cinema</p>
          <Button>
           <Link href="/">
             Voltar
           </Link>
          </Button>
        </Widget.Content>
       </Widget>
       <Widget>
        <Widget.Content>
         <h1>Quizes da galera</h1>
         <p>bla bla bla bla bla bla</p>
        </Widget.Content>
       </Widget>
       <Footer />
     </QuizContainer>
    <GitHubCorner projectUrl={"https://github.com/IggorSantos"} />
  </QuizBackground>
  )
}
