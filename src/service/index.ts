export type BaseDatumType = {
  id: number;
  medicineName: string;
  code: string;
  displayName: string;
  category: string;
  price: number;
};

const KEY = 'medicine' as const;

const returnData = <TData>(status: number, data: any) => {
  return {
    status,
    content: data as TData,
  };
};

export const getAllMedicine = () => {
  return {
    queryFn(): Promise<{
      status: number;
      content: Array<BaseDatumType>;
    }> {
      return new Promise((resolve, _reject) => {
        const data = localStorage.getItem(KEY);
        if (data == null) {
          const returnValue = returnData<Array<BaseDatumType>>(200, []);
          resolve(returnValue);
        } else {
          const parsedData = JSON.parse(data) as Array<BaseDatumType>;
          const returnValue = returnData<Array<BaseDatumType>>(200, parsedData);
          resolve(returnValue);
        }
      });
    },
    queryKey: ['medicine'],
  };
};

export const getMedicineById = (id: number) => {
  return {
    queryFn() {
      return new Promise<{
        status: number;
        content: BaseDatumType;
      }>((resolve, reject) => {
        const data = localStorage.getItem(KEY);
        if (data == null) {
          reject(`Medicine with id${id} not found`);
        } else {
          const obj = JSON.parse(data);
          if (Array.isArray(obj)) {
            const item = obj.find((val) => val.id === id);
            if (item) {
              const returnValue = returnData<BaseDatumType>(
                200,
                item as BaseDatumType,
              );
              resolve(returnValue);
            } else {
              reject(`Medicine with id${id} not found`);
            }
          } else {
            reject('Malformed Data');
          }
        }
      });
    },
    queryKey: ['medicine', id],
  };
};

export const saveMedicine = () => {
  return {
    queryFn(input: Omit<BaseDatumType, 'id'>) {
      return new Promise<{ status: number; content: BaseDatumType[] }>(
        (resolve, reject) => {
          const data = localStorage.getItem(KEY);
          // no entry must create one
          if (data == null) {
            const medicineData: BaseDatumType[] = [
              {
                ...input,
                id: 1,
              },
            ];
            localStorage.setItem(KEY, JSON.stringify(medicineData));
            const returnValue = returnData<BaseDatumType[]>(201, medicineData);
            resolve(returnValue);
          } else {
            const parsedData = JSON.parse(data) as BaseDatumType[];
            parsedData.push({
              ...input,
              id: parsedData.length + 1,
            });
            localStorage.setItem(KEY, JSON.stringify(parsedData));
            const returnValue = returnData<BaseDatumType[]>(201, parsedData);
            resolve(returnValue);
          }
        },
      );
    },
  };
};

export const editMedicine = () => {
  return {
    queryFn(input: BaseDatumType) {
      return new Promise<{ status: number; content: BaseDatumType }>(
        (resolve, reject) => {
          const data = localStorage.getItem(KEY);
          // no entry must create one
          if (data == null) {
            reject(`Medicine with id${input.id} not found`);
          } else {
            const obj = JSON.parse(data);
            if (Array.isArray(obj)) {
              const itemIndex = obj.findIndex((val) => val.id === input.id);
              if (itemIndex > -1) {
                obj.splice(itemIndex, 1, input);
                localStorage.setItem(KEY, JSON.stringify(obj));
                const returnValue = returnData<BaseDatumType>(200, input);
                resolve(returnValue);
              } else {
                reject(`Medicine with id${input.id} not found`);
              }
            } else {
              reject('Malformed Data');
            }
          }
        },
      );
    },
  };
};
export const deleteMedicine = () => {
  return {
    queryFn(input: number) {
      return new Promise<{ status: number; content: BaseDatumType[] }>(
        (resolve, reject) => {
          const data = localStorage.getItem(KEY);
          // no entry with id throw error
          if (data == null) {
            const returnValue = returnData<string>(400, 'Not Found');
            reject(returnValue);
          } else {
            const parsedData = JSON.parse(data) as BaseDatumType[];
            const newData = parsedData.filter((val) => val.id !== input);
            localStorage.setItem(KEY, JSON.stringify(newData));
            const returnValue = returnData<BaseDatumType[]>(201, newData);
            resolve(returnValue);
          }
        },
      );
    },
  };
};
