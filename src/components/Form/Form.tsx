import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { drugs, category } from '../../lib/constant';
import { editMedicine, getMedicineById, saveMedicine } from '../../service';
import FormInput from '../FormInput';
type Props = {
  mode: 'edit' | 'create';
};

const createSchema = z.object({
  medicineName: z.string(),
  displayName: z
    .string()
    .min(4, 'Must be at least 4 characters')
    .max(20, 'Can be maximum 20 characters'),
  price: z.number(),
  category: z.string(),
  code: z
    .string()
    .min(4, 'Must be at least 4 characters')
    .max(20, 'Can be maximum 20 characters'),
});

type CreateSchemaType = z.infer<typeof createSchema>;

const Form = ({ mode }: Props) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(createSchema),
  });
  const params = useParams();

  const { data: getByIdData } = useQuery({
    ...getMedicineById(Number(params.medicineId)),
    enabled: mode === 'edit',
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: editMutateAsync } = useMutation(editMedicine().queryFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['medicine']);
      navigate('/dashboard');
    },
  });

  const { mutateAsync: createMutateAsync } = useMutation(
    saveMedicine().queryFn,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['medicine']);
        navigate('/dashboard');
      },
    },
  );

  const onSubmit = (data: CreateSchemaType) => {
    const input = {
      ...data,
    };
    if (mode === 'edit' && getByIdData?.content.id) {
      const editData = {
        ...input,
        id: getByIdData?.content.id,
      };
      toast.promise(editMutateAsync(editData), {
        loading: 'updating data',
        success: 'Data updated successfully',
        error: 'Error',
      });
    } else {
      toast.promise(createMutateAsync(input), {
        loading: 'Saving data',
        success: 'data saved successfully',
        error: 'Error',
      });
    }
  };

  const medicineName = watch('medicineName');

  React.useEffect(() => {
    if (mode !== 'edit') return;
    reset(getByIdData?.content);
  }, [getByIdData?.content, mode, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 max-w-md mx-auto bg-white p-4 rounded shadow-md"
    >
      <h2 className="text-4xl text-slate-700 mb-4 mt-4">Create</h2>
      <FormInput label="Medicine Name" message={errors.medicineName?.message}>
        <select {...register('medicineName')} className="input">
          {drugs.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </FormInput>
      {medicineName ? (
        <>
          <FormInput label="DisplayName" message={errors.displayName?.message}>
            <input type="text" {...register('displayName')} className="input" />
          </FormInput>
          <FormInput label="Code" message={errors.code?.message}>
            <input type="text" {...register('code')} className="input" />
          </FormInput>
          <FormInput label="Price" message={errors.price?.message}>
            <input
              type="number"
              {...register('price', {
                valueAsNumber: true,
              })}
              className="input"
            />
          </FormInput>
          <FormInput label="Category" message={errors.category?.message}>
            <select {...register('category')} className="input">
              {category.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </FormInput>
        </>
      ) : null}

      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
