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

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
 }) {
  const questionId = `question__${questionIndex}`
  return(
    <Widget>
     <Widget.Header>
       <h3>
        {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
     </Widget.Header>
     <img
      alt="Descrição"
      style={{
       width: '100%',
       height: '150px',
       objectFit: 'cover',
      }}
      src={question.image}
     />
     <Widget.Content>
       <h2>
        {question.title}
       </h2>
       <p>
        {question.description}
       </p>
       <form
         onSubmit={(event) => {
           event.preventDefault()
           onSubmit()
         }}
       >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`
          return(
           <Widget.Topic
              as="label"
              htmlFor={alternativeId}
            >
            <input
              //style={{ display: 'none'}}
              id={alternativeId}
              name={questionId}
              type="radio"
            />
            {alternative}
           </Widget.Topic>
          )
        })}
       <Button>
        Confirmar
       </Button>
      </form>
     </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}
export default function Home() {
  const [screenState,setScreenState] = React.useState(screenStates.LOADING)
  const totalQuestions = db.questions.length
  const [currentQuestion,setCurrentQuestion] = React.useState(0)
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex]

  React.useEffect( () => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  function handleSubmit(){
    const nextQuestion = questionIndex + 1
    if(nextQuestion < totalQuestions){
      setCurrentQuestion(questionIndex + 1)
    }else{
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
     <QuizContainer>
      <QuizLogo />
       {screenState === screenStates.QUIZ && (
         <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmit}
        />
      )}
       {screenState === screenStates.LOADING && <LoadingWidget />}

       {screenState === screenStates.RESULT && <div>Você acertou x questões</div>}
       <Footer />
     </QuizContainer>
    <GitHubCorner projectUrl={"https://github.com/IggorSantos"} />
  </QuizBackground>
  )
}
