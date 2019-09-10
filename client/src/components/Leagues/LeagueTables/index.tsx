import React from 'react';
import ReactTable from 'react-table';
import cn from 'classnames';
import 'react-table/react-table.css';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

interface LeagueTableI {
  columns: {}[];
  data: {}[];
  title: { id?: string; title: string };
}

export const LeagueTable: React.SFC<LeagueTableI> = ({
  columns,
  data,
  title
}: LeagueTableI) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.profile.user);

  return (
    <div
      className={cn(styles['league-table'], 'bg-white', 'p-6', 'mb-6', 'rounded')}
      id={title.id}
    >
      <h3 className={cn(styles.title, 'text-secondary', 'mb-6')}>{title.title}</h3>
      <ReactTable
        data={data}
        columns={columns}
        showPagination={false}
        minRows={0}
        noDataText={t('LeaguesPage.noDataText')}
        getTrProps={(state, rowInfo) => {
          if (rowInfo.row.user && user && rowInfo.row.user.id === user.id) {
            return {
              style: {
                background: '#81e6d9'
              }
            }
          }
          else {
            return {}
          }
        }
        }
      />
    </div>
  )
};
