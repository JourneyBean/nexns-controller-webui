import { IUser } from "../user";

export interface IVariable {
  readonly id: number;
  readonly user?: IUser["id"];
  name: string;
  text: string;
  readonly val: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}
