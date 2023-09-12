import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GithubService } from "../../services/github.service";

@Component({
  selector: 'repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
})
export class RepositoryDetailsComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly githubService: GithubService,
  ) {
  }

  ngOnInit() {
    const owner = this.route.snapshot.params['owner'];
    const repositoryName = this.route.snapshot.params['repo'];

    this.githubService.getContributors(owner, repositoryName)
      .then(response => {
      console.log(response);
    });
  }
}
