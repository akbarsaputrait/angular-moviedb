import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieIndexComponent } from './index.component';

describe('MovieIndexComponent', () => {
  let component: MovieIndexComponent;
  let fixture: ComponentFixture<MovieIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
