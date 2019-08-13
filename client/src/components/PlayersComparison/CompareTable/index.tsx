import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

interface CompareTableI {
  columns: {}[];
  data: {}[];
  title: string;
}

const CompareTable: React.SFC<CompareTableI> = ({ columns, data, title }) => (
  <div className='main-compare-table'>
    <ReactTable data={data} columns={columns} showPagination={false} minRows={0} />
    <div className='main-compare-table-header text-m uppercase text-center font-bold text-gray-400 my-2'>
      {title}
    </div>
  </div>
);

export default CompareTable;
