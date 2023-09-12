import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PaginationService } from "../../services/pagination.service";

@Component({
  selector: 'search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.scss'],
})
export class SearchPaginationComponent implements OnDestroy {
  public page = 1;

  private readonly subscription: Subscription;

  constructor(
    private readonly paginationService: PaginationService,
  ) {
    this.subscription = this.paginationService.currentPage$.subscribe((page) => {
      this.page = page;
    })
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed)
      this.subscription.unsubscribe();
  }

  public onChangePage(nextPage: boolean): void {
    this.paginationService.changeRepositoriesPage(nextPage);
  }

  public onLimitPage(firstPage: boolean): void {
    this.paginationService.moveToRepositoryPage(firstPage)
  }
}
