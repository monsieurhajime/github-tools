import { Injectable } from "@angular/core";
import { Octokit } from "octokit";
import {
  BehaviorSubject,
  catchError,
  delay,
  firstValueFrom,
  from,
  mergeMap,
  Observable,
  of,
  retry,
  retryWhen,
  throwError
} from "rxjs";
import { RepositoryStateService } from "./repository-state.service";
import { PaginationService } from "./pagination.service";

@Injectable({ providedIn: 'root' })
export class GithubService {
  private requestPending = new BehaviorSubject<boolean>(false);
  public requestPending$ = this.requestPending.asObservable();


  private octokit = new Octokit({ auth: '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' });

  constructor(
    private readonly repositoryStateService: RepositoryStateService,
    private readonly paginationService: PaginationService,
  ) {
  }

  public getRepositories(searchQuery: string | null, page = 1): void {
    if (searchQuery != null && searchQuery !== '' && page <= 100) {
      this.requestPending.next(true);
      const query = 'q=' + searchQuery + '&per_page=10&page=' + page.toString();
      this.queryRepositories(query)
        .then((searchResult: any) => {
          this.paginationService.updatePagination(searchQuery, searchResult, page);
          this.requestPending.next(false);
          this.repositoryStateService.setRepositories(searchResult);
        })
    }
  }

  public async getContributors(owner: string, repositoryName: string): Promise<any> {
    const contributors$ = this.queryContributors(owner, repositoryName);
    return await firstValueFrom(contributors$);
  }

  private queryContributors(owner: string, repositoryName: string, retries = 4): Observable<any> {
    if (retries <= 0) {
      return throwError(() => new Error('Max retries reached'));
    }

    return from(this.octokit.request(`GET /repos/{owner}/{repo}/stats/contributors`, {
      owner,
      repo: repositoryName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }))
      .pipe(
        mergeMap(response => {
          if (response.status === 202) {
            return of(null).pipe(
              delay(2000),
              mergeMap(() => this.queryContributors(owner, repositoryName, retries - 1))
            );
          }
          return of(response);
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private async queryRepositories(query: string): Promise<any> {
    return await this.octokit.request(`GET /search/repositories?${query}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  }
}
