import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchPaginationComponent } from './search-pagination.component';
import { PaginationService } from '../../services/pagination.service';

describe('SearchPaginationComponent', () => {
  let component: SearchPaginationComponent;
  let fixture: ComponentFixture<SearchPaginationComponent>;
  let mockPaginationService: any;

  beforeEach(async () => {
    mockPaginationService = {
      currentPage$: of(1),
      changeRepositoriesPage: jasmine.createSpy('changeRepositoriesPage'),
      moveToRepositoryPage: jasmine.createSpy('moveToRepositoryPage')
    };

    await TestBed.configureTestingModule({
      declarations: [SearchPaginationComponent],
      providers: [{ provide: PaginationService, useValue: mockPaginationService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current page', () => {
    const pageEl = fixture.nativeElement.querySelector('.page');
    expect(pageEl.textContent).toBe('1');
  });

  it('should call changeRepositoriesPage with true when next page button is clicked', () => {
    const nextPageButton = fixture.nativeElement.querySelector('button:nth-child(4)');
    nextPageButton.click();
    expect(mockPaginationService.changeRepositoriesPage).toHaveBeenCalledWith(true);
  });

  it('should call changeRepositoriesPage with false when previous page button is clicked', () => {
    const prevPageButton = fixture.nativeElement.querySelector('button:nth-child(2)');
    prevPageButton.click();
    expect(mockPaginationService.changeRepositoriesPage).toHaveBeenCalledWith(false);
  });

  it('should call moveToRepositoryPage with true when first page button is clicked', () => {
    const firstPageButton = fixture.nativeElement.querySelector('button:nth-child(1)');
    firstPageButton.click();
    expect(mockPaginationService.moveToRepositoryPage).toHaveBeenCalledWith(true);
  });

  it('should call moveToRepositoryPage with false when last page button is clicked', () => {
    const lastPageButton = fixture.nativeElement.querySelector('button:nth-child(5)');
    lastPageButton.click();
    expect(mockPaginationService.moveToRepositoryPage).toHaveBeenCalledWith(false);
  });
});
