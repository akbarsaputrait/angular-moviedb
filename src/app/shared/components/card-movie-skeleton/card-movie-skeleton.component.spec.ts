import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardMovieSkeletonComponent } from './card-movie-skeleton.component';

describe('CardMovieSkeletonComponent', () => {
  let component: CardMovieSkeletonComponent;
  let fixture: ComponentFixture<CardMovieSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMovieSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMovieSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
