import React, {useState} from 'react'
const Home = () => {
  const [error, setError] = useState<boolean>(false)
  const [errorMssg,setErrorMssg] = useState<string>('')

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="lg:w-full xl:max-w-screen-sm">
          <div className="py-12 lg:bg-white lg:px-12 -ml-96">
          </div>

          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl ">
            <h2 className="ml-10 text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Ingresa tu QUIF </h2>

            <div className="mt-12">
              <form >
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">QUIF</div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="Ejemplo: PASCH9810FEF"
                    required/>
                </div>
                <div className="mt-10">
                  <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                    Iniciar
                  </button>

                </div>
              </form>
              <div className="mt-4 w-full flex justify-center items-center">
                {error && <span className="text-red-500">{errorMssg}</span>}
              </div>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                ¿No recuerdas tu QUIF? <a className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                                           href="/login">Contactanos</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Home)