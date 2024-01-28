import { requestControllerApi } from "../request";
import { IUser } from "../user/types";
import {
  IDomain,
  IZone,
  IRRset,
  IRecordData,
  IDomainDump,
  IRRsetDump,
} from "./types";

/* domain */

export function requestGetDomainsOfUser(userId: IUser["id"]) {
  return requestControllerApi<IDomain[]>("get", "domain", {
    params: { user: userId },
  });
}

export function requestRetrieveDomain(domainId: IDomain["id"]) {
  return requestControllerApi<IDomain>("get", "domain", { pk: domainId });
}

export function requestCreateDomainOfUser(
  domain: IDomain,
  userId: IUser["id"]
) {
  domain.user = userId;
  return requestControllerApi<IDomain>("post", "domain", { data: domain });
}

export function requestUpdateDomain(domain: IDomain) {
  return requestControllerApi<IDomain>("put", "domain", {
    pk: domain.id,
    data: domain,
  });
}

export function requestDeleteDomain(domain: IDomain) {
  return requestControllerApi<null>("delete", "domain", { pk: domain.id });
}

export function requestApplyDomain(domainId: IDomain["id"]) {
  return requestControllerApi<null>("post", "domain", {
    pk: domainId,
    action: "apply",
  });
}

/* zone */

export function requestListZoneOfDomain(domainId: IDomain["id"]) {
  return requestControllerApi<IZone[]>("get", "zone", {
    params: { domain: domainId },
  });
}

export function requestRetrieveZone(zoneId: IZone["id"]) {
  return requestControllerApi<IZone>("get", "zone", { pk: zoneId });
}

export function requestCreateZoneOfDomain(
  zone: IZone,
  domainId: IDomain["id"]
) {
  zone.domain = domainId;
  return requestControllerApi<IZone>("post", "zone", { data: zone });
}

export function requestUpdateZone(zone: IZone) {
  return requestControllerApi<IZone>("put", "zone", {
    pk: zone.id,
    data: zone,
  });
}

export function requestBatchPushZoneOfDomain(
  zones: IZone[],
  domainId: IDomain["id"]
) {
  return requestControllerApi<IZone[]>("put", "zone", {
    action: "bulk-update",
    params: {
      domain: domainId,
    },
    data: zones,
  });
}

export function requestDeleteZone(zone: IZone) {
  return requestControllerApi<null>("delete", "zone", { pk: zone.id });
}

/* rrset */

// export function requestListRRsetsOfZone(zoneId: IZone["id"]) {
//   return requestControllerApi<IRRset[]>("get", "rrset", {
//     params: { zone: zoneId },
//   });
// }

export function requestRetrieveRRset(rrsetId: IRRset["id"]) {
  return requestControllerApi<IRRset>("get", "rrset", { pk: rrsetId });
}

export function requestCreateRRsetOfZone(rrset: IRRset, zoneId: IZone["id"]) {
  rrset.zone = zoneId;
  return requestControllerApi<IRRset>("post", "rrset", { data: rrset });
}

export function requestUpdateRRset(rrset: IRRset) {
  return requestControllerApi<IRRset>("put", "rrset", {
    pk: rrset.id,
    data: rrset,
  });
}

export function requestDeleteRRset(rrset: IRRset) {
  return requestControllerApi<null>("delete", "rrset", { pk: rrset.id });
}

export function requestListRRsetOfZone(zoneId: IZone["id"]) {
  return requestControllerApi<IRRset[]>("get", "rrset", {
    params: { zone: zoneId, detail: true },
  });
}

export function requestBatchPushRRsetDumpOfZone(
  rrsets: IRRsetDump[],
  zoneId: IZone["id"]
) {
  return requestControllerApi<IZone[]>("put", "rrsets", {
    action: "bulk-update",
    params: {
      zone: zoneId,
    },
    data: rrsets,
  });
}

/* record data */

// export function requestListRecordDataOfRRset(rrsetId: IRRset["id"]) {
//   return requestControllerApi<IRecordData[]>("get", "record", {
//     params: { rrset: rrsetId },
//   });
// }

export function requestRetrieveRecordData(recordDataId: IRecordData["id"]) {
  return requestControllerApi<IRecordData>("get", "record", {
    pk: recordDataId,
  });
}

export function requestCreateRecordDataOfRRset(
  recordData: IRecordData,
  rrsetId: IRRset["id"]
) {
  recordData.rrset = rrsetId;
  return requestControllerApi<IRecordData>("post", "record", {
    data: recordData,
  });
}

export function requestUpdateRecordData(recordData: IRecordData) {
  return requestControllerApi<IRecordData>("put", "record", {
    pk: recordData.id,
    data: recordData,
  });
}

export function requestDeleteRecordData(recordData: IRecordData) {
  return requestControllerApi<null>("delete", "record", { pk: recordData.id });
}

export function requestDumpDomain(domainId: IDomain["id"]) {
  return requestControllerApi<IDomainDump>("get", "domain", {
    action: "dump",
    pk: domainId,
  });
}
