import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './styles.scss';

interface LeagueTableI {
    columns: Array<{}>;
    data: Array<{}>;
    title: { id: string; title: string };
}

export const LeagueTable: React.SFC<LeagueTableI> = ({ columns, data, title }) => (
    <div className="league-table bg-white p-6 mb-6 rounded" id={title.id}>
        <h3 className="title text-secondary mb-6">{title.title}</h3>
        <ReactTable data={data} columns={columns} showPagination={false} minRows={0} />
    </div>
);
