import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContributionDetailsComponent } from './contribution-details.component';

describe('ContributionDetailsComponent', () => {
  let component: ContributionDetailsComponent;
  let fixture: ComponentFixture<ContributionDetailsComponent>;
  let mockPlot: any;

  beforeEach(async () => {
    mockPlot = document.createElement('div');

    await TestBed.configureTestingModule({
      declarations: [ContributionDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContributionDetailsComponent);
    component = fixture.componentInstance;

    component.avatarUrl = 'mockAvatarUrl';
    component.name = 'mockName';
    component.chart = mockPlot;
    component.totalCommit = 5;
    component.totalAddition = 50;
    component.totalDeletion = 20;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render avatar, name, commits, additions, and deletions', () => {
    fixture.detectChanges();

    const avatarElem = fixture.debugElement.query(By.css('.contributor img')).nativeElement;
    expect(avatarElem.src).toContain('mockAvatarUrl');

    const nameElem = fixture.debugElement.query(By.css('.contributor h2')).nativeElement;
    expect(nameElem.textContent).toContain('mockName');

    const commitElem = fixture.debugElement.query(By.css('.contributor .commit')).nativeElement;
    expect(commitElem.textContent).toContain('5 commits');

    const additionElem = fixture.debugElement.query(By.css('.contributor .addition')).nativeElement;
    expect(additionElem.textContent).toContain('50 ++');

    const deletionElem = fixture.debugElement.query(By.css('.contributor .deletion')).nativeElement;
    expect(deletionElem.textContent).toContain('20 --');
  });

  it('should append chart to chartContainer after view init', () => {
    fixture.detectChanges();

    const appendChildSpy = spyOn(component.chartContainer.nativeElement, 'appendChild').and.callThrough();
    component.ngAfterViewInit();

    expect(appendChildSpy).toHaveBeenCalledWith(mockPlot);
  });
});
