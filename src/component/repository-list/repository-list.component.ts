import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { RepositoryStateService } from "../../services/repository-state.service";
import { Repository } from "../../models/repository";
import { GithubService } from "../../services/github.service";

@Component({
  selector: 'repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public repositoryList: Array<Repository> = [];
  private repositorySubscription = new Subscription();
  private readonly loadingSubscription: Subscription;

  constructor(
    private readonly repositoryStateService: RepositoryStateService,
    private readonly githubService: GithubService,
  ) {
    this.loadingSubscription = this.githubService.requestPending$.subscribe((value) => {
      this.isLoading = value;
    })
  }

  ngOnInit(): void {
    this.repositorySubscription = this.repositoryStateService.repositories$.subscribe(
      (repositories: Array<Repository>) => {
        this.repositoryList = repositories;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.repositorySubscription && !this.repositorySubscription.closed)
      this.repositorySubscription.unsubscribe();
    if (this.loadingSubscription && !this.loadingSubscription.closed)
      this.loadingSubscription.unsubscribe();
  }

  getRepositoryLink(fullName: string): Array<string> {
    return fullName.split('/');
  }
}
