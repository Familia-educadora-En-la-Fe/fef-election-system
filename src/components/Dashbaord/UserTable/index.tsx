import React, {useCallback, useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';
import {columns} from '../../../domain/users'
import {collection, query, getDocs, orderBy,doc,getDoc} from "firebase/firestore";
import {db} from '../../../App';
import {getAuth} from "firebase/auth";

type User = {
  id: string,
  email: string,
  quif: string,
  voted:string,
  rol: string,
}
const UserTable = () => {

  const [users, setUser] = useState<User[]>([])
  const auth = getAuth()

  const getUsers = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUser([])
    querySnapshot.forEach((doc) => {
      console.log('users',doc.id, " => ", doc.data());
      const isUser = {
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        quif: doc.data().quif,
        voted: doc.data().voted,
        rol: doc.data().rol,
      }
      setUser(user => [...user, isUser])
    });

  },[auth])

  useEffect(()=>{
    getUsers()
  },[])


  return (
    <div>
      <DataTable
        columns={columns}
        data={users}
      />
    </div>
  )
}

export default React.memo(UserTable)