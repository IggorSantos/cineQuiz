import React from 'react'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({ dbExterno }){
  return(
    <div>
     <QuizScreen />
      <pre style={{ color:'black' }}>
        {JSON.stringify(dbExterno.questions, null, 4)}
       </pre>
    </div>
  )
}

export async function getServerSideProps(context){
  const dbExterno = await fetch('https://aluraquiz-css.omariosouto.vercel.app/api/db')
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
      .catch((err) => {
      console.error(err);
      });

    console.log('dbExterno', dbExterno);
    // console.log('Infos que o Next da para nós', context.query.id);
  return{
    props:{
      dbExterno,
    }
  }
}
