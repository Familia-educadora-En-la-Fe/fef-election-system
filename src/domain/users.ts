
export const columns:any = [
  {
    name: 'Nombre',
    selector: (row: { name: any; })=> row.name,
  },
  {
    name: 'Email',
    selector:  (row: { email: any; })=> row.email,
  },
  {
    name: 'QUIF',
    selector:  (row: { quif: any; })=> row.quif,
  },
  {
    name: 'Voto',
    selector:  (row: { voted: any; })=> row.voted,
  },
];