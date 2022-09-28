import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

import { deleteMedicine } from '../../service';

type Props = {
  id: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal = ({ id, setShowModal }: Props) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(deleteMedicine().queryFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['medicine']);
      setShowModal(false);
    },
  });

  const handleDelete = () => {
    toast.promise(mutateAsync(id), {
      loading: 'Deleting data',
      success: 'Data deleted successfully',
      error: 'Error',
    });
  };
  return (
    <div className="max-w-lg rounded mx-auto w-full bg-white shadow px-8 py-6 grid">
      <h2 className="text-2xl text-slate-700 font-bold">
        Are you sure you want to delete this item?
      </h2>
      <p className="text-slate-600 my-2 text-lg">
        Please press <span className=" font-semibold">Okay</span> if you want to
        proceed
      </p>

      <div className="flex gap-6 mt-16 justify-end">
        <button className="button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
        <button
          className="button bg-red-500 hover:bg-red-600 focus:ring-red-500"
          onClick={handleDelete}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
