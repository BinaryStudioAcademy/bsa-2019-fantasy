import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './styles.scss';

interface LeagueTableI {
    columns: Array<{}>;
    data: Array<{}>;
    title: string;
}

export const LeagueTable: React.SFC<LeagueTableI> = ({ columns, data, title }) => (
    <div className="league-table paper mb-6">
        <h3 className="title">{title}</h3>
        <ReactTable data={data} columns={columns} showPagination={false} minRows={0} />
    </div>
);
