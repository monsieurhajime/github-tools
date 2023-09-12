import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Repository } from "../models/repository";
import { formatDateForDisplay } from "../utils/format-date-for-display";
import { formatNumber } from "../utils/format-number";

@Injectable({ providedIn: 'root' })
export class RepositoryStateService {
  private repositories = new BehaviorSubject<Array<Repository>>([]);
  public repositories$ = this.repositories.asObservable();

  public setRepositories(searchResult: any): void {
    this.repositories.next(searchResult.data.items.map((item: any) => {
      return {
        avatarUrl: item.owner?.avatar_url,
        description: item.description,
        fullName: item.full_name,
        id: item.id,
        language: item.language,
        lastUpdate: formatDateForDisplay(item.updated_at),
        stargazersCount: formatNumber(item.stargazers_count),
        topics: item.topics,
      }
    }));
  }
}
