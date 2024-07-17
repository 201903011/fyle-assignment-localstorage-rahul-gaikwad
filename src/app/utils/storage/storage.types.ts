import { User } from "src/app/models";
import { AppTheme } from "src/app/services/theme";

type StorageObjectMap = {
    appSession: {
        user: string;
        token: string;
    };
    appTheme: AppTheme;
    userDataList: User[];
};

export type StorageObjectType = 'appSession' | 'appTheme' | 'userDataList';

export type StorageObjectData<T extends StorageObjectType> = {
    type: T;
    data: StorageObjectMap[T];
};
