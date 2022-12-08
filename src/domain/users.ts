
export const columns:any = [
  {
    name: 'Nombre',
    selector: (row: { name: any; })=> row.name,
    sortable: true,

  },
  {
    name: 'Area',
    selector:  (row: { area: any; })=> row.area,
    sortable: true,
  },
  {
    name: 'QUIF',
    selector:  (row: { quif: any; })=> row.quif,
    sortable: true,

  },
  {
    name: 'Voto',
    selector:  (row: { voted: any; })=> row.voted,
    sortable: true,

  },
];