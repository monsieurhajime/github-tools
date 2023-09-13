import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { GithubService } from '../services/github.service';

const activatedRouteMock = {
  snapshot: {
    queryParams: { search: 'sampleSearch', page: 1 }
  }
};

@Component({
  selector: 'app-header',
  template: ''
})
class AppHeaderStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockGithubService: any;

  beforeEach(async () => {
    const mockObservable = new BehaviorSubject<boolean>(false);
    mockGithubService = {
      requestPending$: mockObservable
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent, AppHeaderStubComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: GithubService, useValue: mockGithubService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to true when requestPending$ emits true', fakeAsync(() => {
    expect(component.isLoading).toBeFalse();
    mockGithubService.requestPending$.next(true);
    tick(1);
    expect(component.isLoading).toBeTrue();
  }));

  it('should unsubscribe from loadingSubscription on ngOnDestroy', () => {
    const subscriptionSpy = spyOn(component['loadingSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });
});
