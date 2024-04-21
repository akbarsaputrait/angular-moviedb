import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselMovieComponent } from './carousel-movie.component';

describe('CarouselMovieComponent', () => {
  let component: CarouselMovieComponent;
  let fixture: ComponentFixture<CarouselMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselMovieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
