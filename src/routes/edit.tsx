import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import Form from '../components/Form';
import { getMedicineById } from '../service';

export const loader = (queryClient: QueryClient) => {
  return async ({ params }: LoaderFunctionArgs) => {
    const query = getMedicineById(Number(params.medicineId));
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
};

const Edit = () => {
  return <Form mode="edit" />;
};

export default Edit;
