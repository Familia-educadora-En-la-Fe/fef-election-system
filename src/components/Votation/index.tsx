import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {collection, doc, getDocs, query, where,updateDoc} from "firebase/firestore";
import {db} from "../../App";
import {User} from "../Dashbaord";
import Swal from 'sweetalert2'

export type candidate = {
  id: string,
  names: string,
  votes: number,
}

const Votation = () => {

  const { quif } = useParams();
  const [candidates, setCandidates] = useState<candidate[]>([])
  const [user, setUser] = useState<User>()
  const [selected, setSelected] = useState<string>('')
  const navigate = useNavigate()

  const getCandidates = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "candiadates"));
    setCandidates([])

    querySnapshot.forEach((doc) => {
      const isCandidate = {
        id: doc.id,
        names: doc.data().names,
        votes: doc.data().votes,
      }
      setCandidates(cand => [...cand, isCandidate])
    });
  }, [])

  const getUser = useCallback(async () => {
    const q = await query(collection(db, "users"), where("quif", "==", quif));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const isUser = {
        id: doc.id,
        name: doc.data().name,
        area: doc.data().area,
        quif: doc.data().quif,
        voted: (doc.data().voted ? 'Si' : 'No'),
        rol: doc.data().rol,
      }

      setUser(isUser)
    });
  }, [])

  useEffect(()=>{
    getUser().catch(()=>{
      navigate('/')
    })
    getCandidates().catch(e => console.log(e))

  },[])

  useEffect(() => {
    if(user?.voted === 'Si'){
      Swal.fire(
        'Lo sentimos!',
        'Este QUIF ya voto!',
        'error'
      ).then(()=>{
        navigate('/')
      })
    }

  },[user])

  const handleVote = useCallback(async (e: any) => {
    e.preventDefault()
    if(selected === '' || selected === undefined || selected === null){
      return Swal.fire(
        'Lo sentimos!',
        'Debes seleccionar un candidato!',
        'error'
      )
    }
    if(user === undefined || user === null){
      return Swal.fire(
        'Lo sentimos!',
        'Este QUIF no existe!',
        'error'
      ).then(()=>{
        navigate('/')
      })
    }

    Swal.fire({
      title: 'Estas apunto de votar por '+ selected ,
      text: "Una vez que votes, no podras cambiarlo ¿Estas segur@?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        candidates.forEach(cand => {
          if(cand.names === selected){
            updateDoc(doc(db, "candiadates", cand.id), {
              votes: cand.votes + 1
            })
          }
        })
        Swal.fire('Exito!', 'Hemos registrado tu voto.', 'success').then(()=>{
          const userVote = doc(db, "users", user.id);
          updateDoc(userVote, {voted: true});
          navigate('/')
        })
      }
    })
  },[selected])

  const handleSelect =useCallback((e: any) => {
    setSelected(e.target.value)
  },[selected])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center mt-2">
        <img src="./images/fef-logo.png" className="rounded-full" width="150" height="150"/>
      </div>
      <div className="flex justify-center items-center mx-6 mt-2">
        <div className="">
          <div className="mt-12">
            <div className="flex flex-row justify-center">
              <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Hola! {user?.name} </h2>
            </div>
            <p className="text-center text-2xl text-indigo-900 font-display">Estas son las opciones para la votación de presidencia Regional!</p>
            <div className="mt-12">
              <form>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    {candidates.map((candidate) => (
                      <div className="flex flex-row justify-start text-2xl mt-2" key={candidate.id}>
                        <div className="flex flex-row align-middle h-full w-full">
                          <input type="radio" id={candidate.id} name="candidate" value={candidate.names} onClick={handleSelect} className="w-6 h-6 mt-1" required/>
                          <label className="ml-2" htmlFor={candidate.id}>{candidate.names}</label>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
                <div className="mt-10">
                  <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg" onClick={handleVote}>
                    Votar
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default React.memo(Votation);