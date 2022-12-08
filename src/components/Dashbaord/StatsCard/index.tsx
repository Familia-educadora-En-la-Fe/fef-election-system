import React from 'react'


type StatsCardProps = {
  title: string,
  value: number,
}
const StatsCard = ({title,value}:StatsCardProps) => {
  return(
    <div className="border-2 border-gray-300 p-2 m-2 rounded w-96 shadow">
      <div className="flex flex-col">
        <p className="flex flex-row justify-center">{title}</p>
        <p className="flex flex-row justify-center">{value}</p>
      </div>
    </div>
  );
}

export default React.memo(StatsCard)