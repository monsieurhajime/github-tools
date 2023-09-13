import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as Plot from "@observablehq/plot";
import { Subscription } from "rxjs";

import { GithubService } from "../../services/github.service";
import { Contributor, ContributorAPI, ImpactPerMonth } from "../../models/contributor";

@Component({
  selector: 'repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
})
export class RepositoryDetailsComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public contributors: Array<Contributor> = [];
  public owner = '';
  public repositoryName = '';
  private readonly loadingSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly githubService: GithubService,
  ) {
    this.loadingSubscription = this.githubService.requestPending$.subscribe((value) => {
      this.isLoading = value;
    })
  }

  ngOnInit() {
    this.owner = this.route.snapshot.params['owner'];
    this.repositoryName = this.route.snapshot.params['repo'];

    this.githubService.getContributors(this.owner, this.repositoryName)
      .then(response => {
        const contributorsApi = response.data;
        const contributors: Array<Contributor> = [];

        for (let i = 0; i < contributorsApi.length; ++i) {
          const contribution = this.calculateContribution(contributorsApi[i]);
          const name = contributorsApi[i].author.login;
          const avatarUrl = contributorsApi[i].author.avatar_url;
          const chart = this.createChart(contribution.impactPerMonthArr);

          contributors.push({
            ...contribution,
            avatarUrl,
            name,
            chart,
          })
        }

        this.contributors = contributors.sort((a, b) => b.totalCommit - a.totalCommit);
      });
  }

  ngOnDestroy() {
    if (this.loadingSubscription && !this.loadingSubscription.closed)
      this.loadingSubscription.unsubscribe();
  }

  private createChart(impactPerMonthArr: Array<ImpactPerMonth>): any {
    let xDomain;

    /**
     * Plot tries to draw a line between multiple dates.
     * If there is only a single contribution, the date will not appears
     * We are creating a range to make the graph prettier and make the x-axis work correctly
     */
    if (impactPerMonthArr.length === 1) {
      const singleDate = new Date(impactPerMonthArr[0].date);
      const startDate = new Date(singleDate);
      startDate.setMonth(singleDate.getMonth() - 1);
      const endDate = new Date(singleDate);
      endDate.setMonth(singleDate.getMonth() + 1);
      xDomain = [startDate, endDate];
    }

    return Plot.plot({
      marginTop: 20,
      marginRight: 20,
      marginBottom: 30,
      marginLeft: 40,
      grid: true,
      style: "background: #BDCDD6; border-radius: 0 0 8px 8px",
      x: xDomain ? { domain: xDomain } : {},
      marks: [
        Plot.lineY(impactPerMonthArr, {
          x: "date",
          y: "impact",
          stroke: "#db6d28",
          strokeWidth: xDomain ? 10 : 2,
        }),
      ]
    })
  }

  private calculateContribution(contributor: ContributorAPI): any {
    const weeks = contributor.weeks;
    const impactPerMonthArr: Array<ImpactPerMonth> = [];
    let totalCommit = 0;
    let totalAddition = 0;
    let totalDeletion = 0;

    for (let i = weeks.length - 1; i > 0 && totalCommit < 100; --i) {
      if (weeks[i].c > 0) {
        impactPerMonthArr.push({ date: (new Date(weeks[i].w * 1000)), impact: weeks[i].a + weeks[i].d });
        totalCommit += weeks[i].c;
        totalAddition += weeks[i].a;
        totalDeletion += weeks[i].d;
      }
    }

    return {
      totalCommit,
      totalAddition,
      totalDeletion,
      impactPerMonthArr,
    }
  }
}
