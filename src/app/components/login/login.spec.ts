import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  const mockServerService  = {
    getAllServers: jasmine.createSpy().and.returnValue(of([
      { name: "Portugal", id: 1, online: true }
    ]))
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login,ReactiveFormsModule],
      providers: [provideZonelessChangeDetection(),{
        provide: LoginService, useValue: mockServerService
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe("No Servers", () => {
    it('Should have a message saying "No server available, please try again later."', () => {
      component.serverOptions.set([])
      fixture.detectChanges()

      const compiledElement = fixture.nativeElement as HTMLElement
      const query = compiledElement.querySelector('#empty-servers')?.textContent
      expect(query).toBe('No server available, please try again later.')
    })
  })
  describe("Login Form", () => {
    it('Should have 1 option on the server selector', () => {
      fixture.detectChanges()

      const compiledElement = fixture.nativeElement as HTMLElement
      const query = [...compiledElement.getElementsByTagName("option")]
      expect(query.length).toBe(1)
    })

    it('Should have an  option with the name "Portugal - Available"', () => {
      fixture.detectChanges()

      const compiledElement = fixture.nativeElement as HTMLElement
      const query = [...compiledElement.getElementsByTagName("option")][0]
      expect(query.text).toBe('Portugal - Available')
    })

    it('Expected the form to be fullfiled with the formGroup updated values', async () => {
      component.loginForm.patchValue({
        name: 'Pedro',
        password: 'Lopes',
        server: 1
      });
      fixture.detectChanges()
      const compiledElement = fixture.nativeElement as HTMLElement
      const nameInput = compiledElement.querySelector("#name") as HTMLInputElement
      const passwordInput = compiledElement.querySelector("#password") as HTMLInputElement
      const serverSelect = compiledElement.querySelector("#server") as HTMLSelectElement
      expect(nameInput.value).toBe('Pedro')
      expect(passwordInput.value).toBe('Lopes')
      expect(serverSelect.value).toBe('1')
    })
  })
});
