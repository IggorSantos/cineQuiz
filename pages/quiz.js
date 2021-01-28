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

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou x perguntas</p>
        <ul>
        {results.map((result) => (
          <li>
           #01 Resultado:
           {result === true ? 'Acertou' : 'Errou'}
          </li>
        ))}

        </ul>
      </Widget.Content>
    </Widget>
  );
}

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
  const [selectedAlternative,setSelectedAlternative] = React.useState(undefined)
  const [isQuestionSubmited,setIsQuestionSubmited] = React.useState(false)
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined

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
           setIsQuestionSubmited(true)
           setTimeout(() => {
             onSubmit()
             setIsQuestionSubmited(false)
             setSelectedAlternative(undefined)
           }, 3 * 1000)

         }}
       >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`
          return(
           <Widget.Topic
              as="label"
              key={alternativeId}
              htmlFor={alternativeId}
            >
            <input
              //style={{ display: 'none'}}
              id={alternativeId}
              name={questionId}
              onChange={() => setSelectedAlternative(alternativeIndex)}
              type="radio"
            />
            {alternative}
           </Widget.Topic>
          )
        })}
       <Button type="submit" disabled={!hasAlternativeSelected}>
        Confirmar
       </Button>
       {isQuestionSubmited && isCorrect && <p>Você acertou</p>}
       {isQuestionSubmited && !isCorrect && <p>Você errou</p>}
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
  const [screenState,setScreenState] = React.useState(screenStates.RESULT)
  const [results,setResults] = React.useState([true,false,true])
  const totalQuestions = db.questions.length
  const [currentQuestion,setCurrentQuestion] = React.useState(0)
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex]

  React.useEffect( () => {
    setTimeout(() => {
      //setScreenState(screenStates.QUIZ)
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

       {screenState === screenStates.RESULT && <ResultWidget results={results} />}
       <Footer />
     </QuizContainer>
    <GitHubCorner projectUrl={"https://github.com/IggorSantos"} />
  </QuizBackground>
  )
}
