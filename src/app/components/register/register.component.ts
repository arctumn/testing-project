import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  formBuilder = inject(FormBuilder)
  registerForm!: FormGroup
  router = inject(Router)

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8)]]
    })
  }
  ngOnDestroy(): void {
    
  }
  register() {
    sessionStorage.setItem("user", JSON.stringify(this.registerForm.value))
    this.router.navigateByUrl("/login")
  }
}
