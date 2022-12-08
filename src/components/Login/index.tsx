import React, {useCallback, useState} from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import {db} from "../../App";
import {collection, getDocs, setDoc, doc} from 'firebase/firestore'

const Login = () => {

  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const userCollectionsRef = collection(db,'users')


  const handleLogin = useCallback((event:any) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
      const user = userCredential.user
      navigate('/dashboard')
    }).catch((error)=>{
      setError(true)
    })

  },[auth, email, navigate, password])
  return(
    <div>
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="py-1 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Inicia Sesion</h2>

            <div className="mt-12">
              <form onSubmit={handleLogin}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">Correo electronico</div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="Ejemplo: example@gmail.com"
                    onChange={(event) => setEmail(event.target.value)}
                    required/>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Contraseña
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    onChange={(event) => setPassword(event.target.value)}
                    required/>
                </div>
                <div className="mt-10">
                  <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                    Iniciar Sesion
                  </button>
                </div>
              </form>
              <div className="mt-4 w-full flex justify-center items-center">
                {error && <span className="text-red-500">No encontramos ningún registro con esas credenciales</span>}
              </div>

              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                ¿No recuerdas la contraseña? <a className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                                              href="/">Contactanos</a>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center bg-gray-100 flex-1 h-screen">
          <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
            <img src="./images/fef-logo.png" className="rounded-full"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login)