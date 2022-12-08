import React, {useCallback, useEffect, useState} from 'react'
import {getAuth, signOut} from "firebase/auth";
import UserTable from "./UserTable";
import StatsCard from "./StatsCard";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../App";


export type User = {
  id: string,
  area: string,
  quif: string,
  voted:string,
  rol: string,
}

const Dashboard = () => {
  const auth = getAuth()
  const handleOnClick = useCallback(() => {
    return signOut(auth)
  }, [auth])

  const [users, setUser] = useState<User[]>([])
  const [missing, setMissing] = useState<number>(0)
  const [hasVoted, setHasVoted] = useState<number>(0)

  const getUsers = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUser([])
    let noneVoted = 0
    let vote = 0
    querySnapshot.forEach((doc) => {
      if(!doc.data().voted){
        noneVoted++
      }else{
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
      setMissing(noneVoted)
      setHasVoted(vote)
      setUser(user => [...user, isUser])
    });

  },[auth])

  useEffect(()=>{
    getUsers()
  },[])
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end mt-4">
          <div
            className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
            onClick={handleOnClick}>
            <button className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600">Cerrar Sesion</button>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-4">
          <StatsCard title="Faltan por Votar" value={missing} />
          <StatsCard title="Votaron" value={hasVoted}/>
        </div>
        <div className="mx-8">
          <UserTable users={users}/>
        </div>
      </div>
    </>);
}

export default React.memo(Dashboard)