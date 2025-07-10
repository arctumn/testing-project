import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { User } from '../../models/User';
import { ServerOption } from '../../models/ServerOption';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit, OnDestroy {
  user!:User
  servers!: WritableSignal<ServerOption[]>
  selectedServer!: Signal<ServerOption | null>
  destroy$: Subject<void> = new Subject()
  loginService$ = inject(LoginService)
  loading:WritableSignal<boolean> = signal(false)
  router = inject(Router)
  ngOnInit(){
    this.user = JSON.parse(sessionStorage.getItem("user") || "{}") as User;
    this.servers = signal([])
    this.selectedServer = computed(() => this.servers().find(server => server.id == this.user.server) || null)
    this.loadServers()
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  loadServers(){
    this.loading.set(true)
    this.loginService$.getAllServers().pipe(takeUntil(this.destroy$))
    .subscribe(servers => {
      this.servers.set(servers)
      this.loading.set(false)
    })
  }
  logout() {
    sessionStorage.removeItem("user")
    this.router.navigateByUrl("/login")
  }
}
