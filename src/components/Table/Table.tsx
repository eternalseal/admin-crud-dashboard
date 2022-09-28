import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import React from 'react';
import { Link } from 'react-router-dom';

import { BaseDatumType } from '../../service';
import DeleteModal from '../DeleteModal/DeleteModal';
import Modal from '../Modal';

type Props = {
  data: BaseDatumType[];
};

const Table = ({ data }: Props) => {
  const columnHelper = createColumnHelper<BaseDatumType>();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(NaN);
  const columns = [
    columnHelper.accessor((row) => row.medicineName, {
      id: 'medicineName',
      header: 'Medicine Name',
    }),
    columnHelper.accessor((row) => row.displayName, {
      id: 'displayName',
      header: 'Display Name',
    }),
    columnHelper.accessor((row) => row.category, {
      id: 'category',
      header: 'Category',
    }),
    columnHelper.accessor((row) => row.code, {
      id: 'code',
      header: 'Code',
    }),
    columnHelper.accessor((row) => row.price, {
      id: 'price',
      header: 'Price',
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        const { row } = info;
        const handleDelete = () => {
          setDeleteId(row.original.id);
          setShowDeleteModal(true);
        };
        return (
          <div className="flex gap-4">
            <Link
              to={`/medicine/${row.original.id}`}
              className="text-violet-700 font-bold p-1"
            >
              Edit
            </Link>
            <button
              type="button"
              className="text-red-500 font-bold p-1"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="table__container mt-6">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none relative'
                            : ' relative',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal setShowModal={setShowDeleteModal} showModal={showDeleteModal}>
        <DeleteModal id={deleteId} setShowModal={setShowDeleteModal} />
      </Modal>
    </div>
  );
};

export default Table;
