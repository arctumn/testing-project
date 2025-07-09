import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent,ReactiveFormsModule],
      providers: [provideZonelessChangeDetection(),
        {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Register',() => {
    it('Should have created a form with 2 controls', () => {
      expect(component.registerForm).toBeDefined()
      expect(component.registerForm.controls['username']).toBeDefined()
      expect(component.registerForm.controls['password']).toBeDefined()
    })

    it('Should require username and password', () => {
      component.registerForm.markAsDirty()
      fixture.detectChanges()
      const compiledElement = fixture.nativeElement as HTMLElement
      const username = compiledElement.querySelector('#username-required-error')?.textContent?.trim()
      const password = compiledElement.querySelector('#password-required-error')?.textContent?.trim()
      expect(username).toBe('The username field is required')
      expect(password).toBe('The password field is required')
    })
  })
});
