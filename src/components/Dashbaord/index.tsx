import React, {useCallback} from 'react'
import {getAuth, signOut} from "firebase/auth";
import UserTable from "./UserTable";

const Dashboard = () => {

  const auth = getAuth()

  const handleOnClick = useCallback(() => {
    return signOut(auth)
  }, [auth])

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
        <div className="mx-24">
          <UserTable/>
        </div>
      </div>
    </>);
}

export default React.memo(Dashboard)