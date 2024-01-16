import { IDomain } from "@/modules/name";

export function getHomePageUrl() {
  return "/";
}

export function getNewDomainPageUrl() {
  return "/domain/new";
}

export function getDomainPageUrl(domainId: IDomain["id"]) {
  return `/domain/${domainId}`;
}

export function getRecordPageUrl(domainId: IDomain["id"]) {
  return `/record/${domainId}`;
}

export function getZonePageUrl(domainId: IDomain["id"]) {
  return `/zone/${domainId}`;
}

export function getVariablePageUrl() {
  return "/variable";
}
