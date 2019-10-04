import React from 'react';
import { DeleteCell, EditableCell } from '../../Tables/antTables/helperCells';
import { timeDifference } from '../../../helpers/utility';
import { Icon, Button } from 'antd';
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
    },
    {
      title: 'Action',
      rowKey: 'action',
      render: (text, record) =>
        <Button onClick={() => editColumn(record)}>
          <Icon style={{ fontSize: '16px', color: '#08c' }} type="edit" className="isoEditIcon"  />
        </Button>
    }
  ];
}

export { createColumns };
