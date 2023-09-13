import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { GithubService } from '../../services/github.service';
import { PaginationService } from '../../services/pagination.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockGithubService: any;
  let mockPaginationService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockGithubService = {
      getRepositories: jasmine.createSpy('getRepositories')
    };
    mockPaginationService = {
      navigateTo: jasmine.createSpy('navigateTo')
    };
    mockActivatedRoute = {
      queryParams: of({ search: 'test', page: 2 })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: GithubService, useValue: mockGithubService },
        { provide: PaginationService, useValue: mockPaginationService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should initialize repositories from the URL query parameters', () => {
    fixture.detectChanges();
    expect(component.searchControl.value).toBe('test');
    expect(mockGithubService.getRepositories).toHaveBeenCalledWith('test', 2);
  });

  it('should navigate to the correct page on search', () => {
    component.searchControl.setValue('newSearch');
    component.onSearch(new Event('submit'));
    expect(mockPaginationService.navigateTo).toHaveBeenCalledWith('newSearch');
  });
});
