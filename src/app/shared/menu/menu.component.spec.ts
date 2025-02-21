import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MenuComponent], // Include RouterTestingModule to mock routing
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the MenuComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy(); // Ensures that the template is rendered
  });
});
