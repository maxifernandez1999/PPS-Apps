import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilCosasLindasPage } from './perfil-cosas-lindas.page';

describe('PerfilCosasLindasPage', () => {
  let component: PerfilCosasLindasPage;
  let fixture: ComponentFixture<PerfilCosasLindasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilCosasLindasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilCosasLindasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
