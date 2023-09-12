import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { GithubService } from "../../services/github.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { PaginationService } from "../../services/pagination.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public searchControl = new FormControl<string>('');

  private routeSubscription: Subscription;

  constructor(
    private readonly githubService: GithubService,
    private readonly paginationService: PaginationService,
    private readonly route: ActivatedRoute,
  ) {
    this.routeSubscription = this.route.queryParams
      .subscribe((params) => this.initRepositoriesFromUrl(params))
  }

  public initRepositoriesFromUrl(params: any): void {
    let currentPage = 1;
    let searchQuery = '';

    const savedPage = params['page'];
    if (savedPage)
      currentPage = +savedPage;

    const savedSearch = params['search'];
    if (savedSearch)
      searchQuery = savedSearch;

    if (searchQuery !== '') {
      this.searchControl.setValue(searchQuery);
      this.githubService.getRepositories(searchQuery, currentPage);
    }
  }

  public onSearch(event: Event) {
    event.preventDefault();
    this.paginationService.navigateTo(this.searchControl.value)
  }
}
