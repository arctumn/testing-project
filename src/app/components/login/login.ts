import { ChangeDetectionStrategy, Component, inject, Inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ServerOption } from '../../models/server';
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
      name: ['',[Validators.required]],
      password: ['',[Validators.required]],
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
    throw new Error('Method not implemented.');
  }


}
