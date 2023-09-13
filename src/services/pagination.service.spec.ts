import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [PaginationService]
    });

    service = TestBed.inject(PaginationService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should navigate to the first page when moveToRepositoryPage is called with true', () => {
    service['currentPage'].next(2);
    spyOn(service, 'navigateTo');
    service.moveToRepositoryPage(true);
    expect(service.navigateTo).toHaveBeenCalledWith('', 1);
  });

  it('should navigate to the last page when moveToRepositoryPage is called with false', () => {
    service['lastPage'] = 5;
    spyOn(service, 'navigateTo');
    service.moveToRepositoryPage(false);
    expect(service.navigateTo).toHaveBeenCalledWith('', service['lastPage']);
  });

  it('should increment page when changeRepositoriesPage is called with true', () => {
    spyOn(service, 'navigateTo');
    service.changeRepositoriesPage(true);
    expect(service.navigateTo).toHaveBeenCalledWith('', 2);
  });

  it('should decrement page when changeRepositoriesPage is called with false', () => {
    service['currentPage'].next(2);
    spyOn(service, 'navigateTo');
    service.changeRepositoriesPage(false);
    expect(service.navigateTo).toHaveBeenCalledWith('', 1);
  });

  it('should navigate using the router', () => {
    const spy = spyOn(router, 'navigate');
    service.navigateTo('test', 1);
    expect(spy).toHaveBeenCalled();
  });

  it('should not navigate for invalid search query and page', () => {
    const spy = spyOn(router, 'navigate');
    service.navigateTo(null);
    service.navigateTo('', 101);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update lastSearchQuery and currentPage based on the searchResult', () => {
    const searchResult = {
      data: {
        total_count: 20
      }
    };
    service.updatePagination('test', searchResult, 2);
    expect(service['lastSearchQuery']).toBe('test');
    expect(service['currentPage'].value).toBe(2);
  });
});
