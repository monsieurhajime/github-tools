import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from "@angular/core";
import { BehaviorSubject, of } from 'rxjs';

import { RepositoryListComponent } from './repository-list.component';
import { RepositoryStateService } from '../../services/repository-state.service';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'search-pagination',
  template: ''
})
class MockSearchPaginationComponent {}

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let mockRepositoryStateService: any;
  let mockGithubService: any;

  beforeEach(async () => {
    mockRepositoryStateService = {
      repositories$: of([{ fullName: 'mockOwner/mockRepo', avatarUrl: '', stargazersCount: 0, description: '', topics: [], language: '', lastUpdate: '' }])
    };

    mockGithubService = {
      requestPending$: new BehaviorSubject<boolean>(false),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RepositoryListComponent, MockSearchPaginationComponent],
      providers: [
        { provide: RepositoryStateService, useValue: mockRepositoryStateService },
        { provide: GithubService, useValue: mockGithubService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
  });

  it('should initialize with repositories from the state service', () => {
    fixture.detectChanges();
    expect(component.repositoryList.length).toBe(1);
    expect(component.repositoryList[0].fullName).toBe('mockOwner/mockRepo');
  });

  it('should handle loading state', () => {
    expect(component.isLoading).toBeFalse();
    mockGithubService.requestPending$.next(true);
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const repoSubscriptionSpy = spyOn(component['repositorySubscription'], 'unsubscribe');
    const loadingSubscriptionSpy = spyOn(component['loadingSubscription'], 'unsubscribe');

    component.ngOnDestroy();
    expect(repoSubscriptionSpy).toHaveBeenCalled();
    expect(loadingSubscriptionSpy).toHaveBeenCalled();
  });

  it('should generate correct repository link', () => {
    const link = component.getRepositoryLink('mockOwner/mockRepo');
    expect(link).toEqual(['mockOwner', 'mockRepo']);
  });

  it('should render repositories correctly', () => {
    fixture.detectChanges();
    const repositoryElement = fixture.debugElement.nativeElement.querySelector('.repository');
    expect(repositoryElement).toBeTruthy();
    expect(repositoryElement.querySelector('strong').textContent).toContain('mockOwner/mockRepo');
  });
});
