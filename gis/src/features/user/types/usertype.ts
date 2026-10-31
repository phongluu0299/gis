
  export type GetUserDTO = {
    userID: number;
    emplID: string;
    fullName: string;
    sex: number | null;
    birthDay: string | null;
    address: string | null;
    phone: string | null;
    randomCode: string | null;
    avatar: string | null;
    active: boolean;
    userName: string;
    password: string | null;
    countLogin: number | null;
    isAdmin: boolean;
}

export type UserFilterDTO = {
    username: string;
    email: string;
    role: string;
  };