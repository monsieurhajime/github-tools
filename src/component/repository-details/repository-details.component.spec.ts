import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { RepositoryDetailsComponent } from './repository-details.component';
import { GithubService } from '../../services/github.service';
import { ContributionDetailsModule } from '../contribution-details/contribution-details.module';

describe('RepositoryDetailsComponent', () => {
  let component: RepositoryDetailsComponent;
  let fixture: ComponentFixture<RepositoryDetailsComponent>;
  let mockGithubService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockGithubService = {
      requestPending$: new BehaviorSubject<boolean>(false),
      getContributors: jasmine.createSpy('getContributors').and.returnValue(Promise.resolve({
        data: [{
          author: {
            login: 'mockAuthor',
            avatar_url: 'mockAvatarUrl'
          },
          weeks: [{ w: 0, a: 0, d: 0, c: 0 }]
        }]
      }))
    };

    mockActivatedRoute = {
      snapshot: {
        params: { owner: 'mockOwner', repo: 'mockRepo' }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ContributionDetailsModule],
      declarations: [RepositoryDetailsComponent],
      providers: [
        { provide: GithubService, useValue: mockGithubService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should initialize with the correct owner and repository name', () => {
    fixture.detectChanges();
    expect(component.owner).toEqual('mockOwner');
    expect(component.repositoryName).toEqual('mockRepo');
  });

  it('should fetch and process contributors on initialization', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockGithubService.getContributors).toHaveBeenCalledWith('mockOwner', 'mockRepo');
    expect(component.contributors[0].name).toEqual('mockAuthor');
  });

  it('should handle loading state', () => {
    expect(component.isLoading).toBeFalse();
    mockGithubService.requestPending$.next(true);
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const subscriptionSpy = spyOn(component['loadingSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });
});
