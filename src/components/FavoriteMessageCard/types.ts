export interface Author {
  name: string;
  surname: string;
  email: string;
  avatar?: string;
}

export interface ToMessageUser {
  name: string;
  surname: string;
  email: string;
  avatar?: string;
}

export interface Doc {
  img: string;
}

export interface EmailCardType {
  author: Author;
  to: ToMessageUser[];
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  date: string;
  doc?: Doc;
  flag?: string;
}
