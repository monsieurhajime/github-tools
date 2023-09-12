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

  private readonly subscription: Subscription;

  constructor(
    private readonly githubService: GithubService,
  ) {
    this.subscription = this.githubService.requestPending$.subscribe((value) => {
      this.isLoading = value;
    })
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed)
      this.subscription.unsubscribe();
  }
}
