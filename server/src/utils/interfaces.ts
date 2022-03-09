export interface IContact {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  favorite: boolean
  id: string
}

export interface IContacts extends Array<IContact> {}

export interface IFav extends IContacts {}

export interface IDeleted extends IContacts {}