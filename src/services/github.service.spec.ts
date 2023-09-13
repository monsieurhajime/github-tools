import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GithubService } from './github.service';
import { RepositoryStateService } from './repository-state.service';
import { PaginationService } from './pagination.service';

describe('GithubService', () => {
  let service: GithubService;
  let mockOctokit: any;
  let mockRepositoryStateService: any;
  let mockPaginationService: any;

  beforeEach(() => {
    mockOctokit = {
      request: jasmine.createSpy('request')
    };
    mockRepositoryStateService = {
      setRepositories: jasmine.createSpy('setRepositories')
    };
    mockPaginationService = {
      updatePagination: jasmine.createSpy('updatePagination')
    };

    TestBed.configureTestingModule({
      providers: [
        GithubService,
        { provide: RepositoryStateService, useValue: mockRepositoryStateService },
        { provide: PaginationService, useValue: mockPaginationService }
      ]
    });

    service = TestBed.inject(GithubService);
    (service as any).octokit = mockOctokit;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not make a request if searchQuery is null or empty', () => {
    service.getRepositories(null);
    service.getRepositories('');
    expect(mockOctokit.request).not.toHaveBeenCalled();
  });

  it('should make a request and set repositories when searchQuery is valid', async () => {
    const mockResult = { data: 'mockData' };
    mockOctokit.request.and.returnValue(Promise.resolve(mockResult));

    service.getRepositories('angular', 1);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockOctokit.request).toHaveBeenCalled();
    expect(mockPaginationService.updatePagination).toHaveBeenCalled();
    expect(mockRepositoryStateService.setRepositories).toHaveBeenCalledWith(mockResult);
  });

  /**
   * Jasmine has a max timeout of 5 seconds
   * One way to test 202 responses would be to extend the timeout to 10 seconds
   * But then it would make the tests unnecessarily long. Find another way to test this.
   */
});
