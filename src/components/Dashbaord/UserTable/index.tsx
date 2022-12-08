import React, {useCallback, useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';
import {columns} from '../../../domain/users'
import {collection, query, getDocs, orderBy,doc,getDoc} from "firebase/firestore";
import {db} from '../../../App';
import {getAuth} from "firebase/auth";
import {User} from "../index";

type UserTableProps = {
  users: User[]
}
const UserTable = ({users}:UserTableProps) => {

  return (
    <div>
      <DataTable
        columns={columns}
        data={users}
        pagination

      />
    </div>
  )
}

export default React.memo(UserTable)