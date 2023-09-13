import { Plot } from "@observablehq/plot/src/plot";

/**
 * Simplified model of the Contributor object returned by Github API
 * w = Start of the week as Unix timestamp (seconds since January 1st 1970 UTC)
 * a = Lines added
 * d = Lines deleted
 * c = number of commit
 */
export interface ContributorAPI {
  total: number,
  author: {
    login: string
  },
  weeks: Array<{
    w: number,
    a: number,
    d: number,
    c: number,
  }>
}

export type ImpactPerMonth = { date: any, impact: number }

export interface Contributor {
  avatarUrl: string;
  name: string,
  totalCommit: number,
  totalAddition: number,
  totalDeletion: number,
  impactPerMonthArr: Array<ImpactPerMonth>
  chart: Plot,
}

