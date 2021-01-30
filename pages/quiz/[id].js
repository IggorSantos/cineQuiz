import React from 'react'

export default function QuizDaGaleraPage(props){
  return(
    <div>
      <pre style={{ color:'black' }}>
        {JSON.stringify(props, null, 4)}
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
