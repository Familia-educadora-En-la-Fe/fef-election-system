import React, {useCallback, useEffect, useState} from 'react'
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../App";
import {User} from "../Dashbaord";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<boolean>(false)
  const [errorMssg, setErrorMssg] = useState<string>('')
  const [inputQuif, setInputQuif] = useState<string>('')
  const [users, setUser] = useState<User[]>([])


  const getUsers = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUser([])
    let noneVoted = 0
    let vote = 0
    querySnapshot.forEach((doc) => {
      if (!doc.data().voted) {
        noneVoted++
      } else {
        vote++
      }
      const isUser = {
        id: doc.id,
        name: doc.data().name,
        area: doc.data().area,
        quif: doc.data().quif,
        voted: (doc.data().voted ? 'Si' : 'No'),
        rol: doc.data().rol,
      }
      setUser(user => [...user, isUser])
    });
  }, [])

  useEffect(() => {
    getUsers()
  }, [])

  const handleQuifs = useCallback(async (e: any) => {
    e.preventDefault()
    let exists = false
    let alreadyVoted = false
    users.forEach((doc) => {
        if (doc.quif === inputQuif) {
          exists = true
          if(doc.voted === 'Si'){
            alreadyVoted = true
          }
        }
      });

    if (exists && !alreadyVoted) {
      console.log('YA PUEDES VOTAR')
      return navigate(`/votacion/${inputQuif}`)
    }

    if(exists && alreadyVoted){
      setErrorMssg('Lo sentimos este CUIF ya ha votado')
      setError(true)
      return
    }

    setErrorMssg('Lo sentimos este CUIF no esta activo')
    setError(true)
    return

  }, [inputQuif])

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="lg:w-full xl:max-w-screen-sm">
          <div className="py-12 lg:bg-white lg:px-12 -ml-96 just">
          </div>
          <div className="flex flex-row justify-center">
            <img src="./images/fef-logo.png" className="rounded-full" width="150" height="150"/>
          </div>

          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl ">
            <h2 className="ml-10 text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Ingresa tu QUIF </h2>

            <div className="mt-12">
              <form>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">CUIF</div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Ejemplo: PASCH9810FEF"
                    onChange={(e) => setInputQuif(e.target.value)}
                    required/>
                </div>
                <div className="mt-10">
                  <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg" onClick={handleQuifs}>
                    Iniciar
                  </button>

                </div>
              </form>
              <div className="mt-4 w-full flex justify-center items-center">
                {error &&
                    <span className="text-red-500">{errorMssg}</span>}
              </div>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                ¿No recuerdas tu CUIF? <a className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                                          href="mailto:contact@contacto.com">Contactanos</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Home)