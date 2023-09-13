import { Component, OnDestroy } from '@angular/core';
import { GithubService } from "../services/github.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public isLoading = false;

  private readonly loadingSubscription: Subscription;

  constructor(
    private readonly githubService: GithubService,
  ) {
    this.loadingSubscription = this.githubService.requestPending$.subscribe((value) => {
      setTimeout(() => {
        this.isLoading = value;
      })
    })
  }

  ngOnDestroy() {
    if (this.loadingSubscription && !this.loadingSubscription.closed)
      this.loadingSubscription.unsubscribe();
  }
}
