import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private currentPage = new BehaviorSubject<number>(1);
  public currentPage$ = this.currentPage.asObservable();

  private lastSearchQuery = '';
  private lastPage = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  public moveToRepositoryPage(firstPage: boolean): void {
    if (firstPage && this.currentPage.value !== 1)
      this.navigateTo(this.lastSearchQuery, 1);
    if (!firstPage && this.currentPage.value !== this.lastPage)
      this.navigateTo(this.lastSearchQuery, this.lastPage);
  }

  public changeRepositoriesPage(nextPage: boolean): void {
    if (nextPage)
      this.navigateTo(this.lastSearchQuery, this.currentPage.value + 1)
    else if (!nextPage && this.currentPage.value > 1)
      this.navigateTo(this.lastSearchQuery, this.currentPage.value - 1);
  }

  public updatePagination(searchQuery: string, searchResult: any, page: number): void {
    this.setLastPage(searchResult.data.total_count);
    this.lastSearchQuery = searchQuery;
    this.currentPage.next(page);
  }

  public navigateTo(searchQuery: string | null, page = 1): void {
    if (searchQuery !== null && searchQuery !== '' && page <= 100) {
      this.router.navigate(
        ['/'],
        {
          relativeTo: this.route,
          queryParams: { search: searchQuery, page },
          queryParamsHandling: 'merge',
        });
    }
  }

  // Only the first 1000 results are available, so the max last page is 100
  private setLastPage(totalRepository: number): void {
    const lastPage = Math.round(totalRepository / 10);
    if (lastPage === 0)
      this.lastPage = 1;
    else if (lastPage >= 100)
      this.lastPage = 100;
    else
      this.lastPage = lastPage;
  }
}
