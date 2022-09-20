import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilCosasFeasPage } from './perfil-cosas-feas.page';

describe('PerfilCosasFeasPage', () => {
  let component: PerfilCosasFeasPage;
  let fixture: ComponentFixture<PerfilCosasFeasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilCosasFeasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilCosasFeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
