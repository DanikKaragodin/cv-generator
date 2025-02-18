import { IDs } from '@common/types/IDs';

export const addItemID = (item_IDs: IDs[], setItem: React.Dispatch<React.SetStateAction<IDs[]>>) => {
    const maxId = item_IDs.reduce((max, current) => {
        return current.id > max ? current.id : max;
    }, 0);
    console.log(item_IDs, 'maxID', maxId);
    const newItem: IDs = { id: maxId + 1 };
    setItem([...item_IDs, newItem]);
};

export const removeItemID = (id: number, item_IDs: IDs[], setItem: React.Dispatch<React.SetStateAction<IDs[]>>) => {
    // Фильтруем проекты, чтобы удалить тот, который имеет заданный id
    const updatedItem_IDs = item_IDs.filter((item_ID: IDs) => item_ID.id !== id);
    setItem(updatedItem_IDs);
};
