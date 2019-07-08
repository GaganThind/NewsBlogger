import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggingPageComponent } from './news-page.component';

describe('BloggingPageComponent', () => {
  let component: BloggingPageComponent;
  let fixture: ComponentFixture<BloggingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloggingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloggingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
