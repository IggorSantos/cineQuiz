import styled from 'styled-components'
import db from '../../../db.json'
import Widget from '../../components/widget'
import Footer from '../../components/footer'
import GitHubCorner from '../../components/githubCorner'
import QuizBackground from '../../components/quizBackground'
import QuizLogo from '../../components/quizLogo'
import QuizContainer from '../../components/quizContainer'
import Input from '../../components/input'
import Button from '../../components/button'
import AlternativesForm from '../../components/alternativesForm'
import BackLinkArrow from '../../components/backLinkArrow'
import Link from 'next/link'

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/*}{results.reduce((somatorioAtual, resultAtual) =>{
            const isAcerto = resultAtual === true
            if(isAcerto){
              return somatorioAtual + 1
            }
            return somatorioAtual
          }, 0)} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
          </p>
        <ul>
        {results.map((result,index) => (
          <li key={`result__${result}`}>
           #{index + 1} Resultado:
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
  addResult,
 }) {
  const questionId = `question__${questionIndex}`
  const [selectedAlternative,setSelectedAlternative] = React.useState(undefined)
  const [isQuestionSubmited,setIsQuestionSubmited] = React.useState(false)
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined

  return(
    <Widget>
     <Widget.Header>
     <BackLinkArrow href="/"/>
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
       <AlternativesForm
         onSubmit={(event) => {
           event.preventDefault()
           setIsQuestionSubmited(true)
           setTimeout(() => {
             addResult(isCorrect)
             onSubmit()
             setIsQuestionSubmited(false)
             setSelectedAlternative(undefined)
           }, 3 * 1000)

         }}
       >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`
          const alternativeStatus = isCorrect ? 'SUCESS' : 'ERROR'
          const isSelected = selectedAlternative === alternativeIndex
          return(
           <Widget.Topic
              as="label"
              key={alternativeId}
              htmlFor={alternativeId}
              data-selected={isSelected}
              data-status={isQuestionSubmited && alternativeStatus}
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
      </AlternativesForm>
     </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}
export default function Home({ externalQuestions,externalBg }) {
  const [screenState,setScreenState] = React.useState(screenStates.LOADING)
  const [results,setResults] = React.useState([])
  const totalQuestions = externalQuestions.length
  const [currentQuestion,setCurrentQuestion] = React.useState(0)
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex]
  const bg = externalBg

  function addResult(result){
    setResults([
      ...results,
      result,
    ])
  }

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
    <QuizBackground backgroundImage={bg}>
     <QuizContainer>
      <QuizLogo />
       {screenState === screenStates.QUIZ && (
         <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmit}
          addResult={addResult}
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
