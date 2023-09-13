import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Plot } from "@observablehq/plot/src/plot";

@Component({
  selector: 'contribution-details',
  templateUrl: './contribution-details.component.html',
  styleUrls: ['./contribution-details.component.scss'],
})
export class ContributionDetailsComponent implements AfterViewInit {
  @Input() avatarUrl: string = '';
  @Input() name: string = '';
  @Input() chart: Plot | null = null;
  @Input() totalCommit = 0;
  @Input() totalAddition = 0;
  @Input() totalDeletion = 0;
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  ngAfterViewInit() {
    this.chartContainer.nativeElement.appendChild(this.chart);
  }
}
