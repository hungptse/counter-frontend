import React from 'react';
import { DeleteCell } from '../../Tables/antTables/helperCells';
import { timeDifference } from '../../../helpers/utility';
function createColumns(editColumn, deleteColumn) {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      rowKey: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      rowKey: 'name'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: value => <p>{new Date(value).toLocaleString()}</p> 
    },
    {
      title: 'Action',
      rowKey: 'action',
      render: (text, record) =>
        <span>
          <DeleteCell
            onDeleteCell={() => {
              deleteColumn(record);
            }}
          />
        </span>
    }
  ];
}

export { createColumns };
