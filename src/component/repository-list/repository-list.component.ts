import { Component, OnDestroy, OnInit } from "@angular/core";
import { RepositoryStateService } from "../../services/repository-state.service";
import { Repository } from "../../models/repository";
import { Subscription } from "rxjs";

@Component({
  selector: 'repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit, OnDestroy {
  public repositoryList: Array<Repository> = [];
  private subscription = new Subscription();

  constructor(
    private readonly repositoryStateService: RepositoryStateService,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.repositoryStateService.repositories$.subscribe(
      (repositories: Array<Repository>) => {
        this.repositoryList = repositories;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed)
      this.subscription.unsubscribe();
  }

  getRepositoryLink(fullName: string): Array<string> {
    return fullName.split('/');
  }
}
