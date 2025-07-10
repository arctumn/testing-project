import { ChangeDetectionStrategy, Component, inject, Inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ServerOption } from '../../models/ServerOption';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit, OnDestroy {

  loginForm!:FormGroup
  destroy$: Subject<void> = new Subject()
  formBuilder = inject(FormBuilder)
  serverService = inject(LoginService)
  router = inject(Router)
  serverOptions: WritableSignal<ServerOption[]> = signal([])

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      server: [1,[Validators.required]]
    })
    this.serverService.getAllServers()
    .pipe(takeUntil(this.destroy$))
    .subscribe(options => {
      this.serverOptions.set(options)
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  
  navigateToRegister() {
    this.router.navigateByUrl("/register")
  }
  login() {
    sessionStorage.setItem("user", JSON.stringify(this.loginForm.value))
    this.router.navigateByUrl("/dashboard")
  }


}
