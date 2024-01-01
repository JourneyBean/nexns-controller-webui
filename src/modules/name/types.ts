import { RecordType } from "../dns/types";
import { IUser } from "../user/types";

export interface IDomain {
  readonly id: number;
  user: IUser["id"];
  domain: string;
  description: string;
  mname: string;
  rname: string;
  serial: string;
  refresh: number;
  retry: number;
  expire: number;
  ttl: number;
  enable_dnssec: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface IZone {
  readonly id: number;
  domain: IDomain["id"];
  name: string;
  rules: string[];
  order: number;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface IRRset {
  readonly id: number;
  zone: IZone["id"];
  name: string;
  description: string;
  type: RecordType;
  order: number;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface IRecordData {
  readonly id: number;
  rrset: IRRset["id"];
  ttl: number;
  data: string;
  order: number;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface IRRsetDump extends IRRset {
  records: IRecordData[];
}

export interface IZoneDump extends IZone {
  rrsets: IRRsetDump[];
}

export interface IDomainDump {
  domain: IDomain;
  zones: IZoneDump[];
}
