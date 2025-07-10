import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { User } from '../../models/User';
import { LoginService } from '../../services/login.service';
import { firstValueFrom, of } from 'rxjs';
import { ServerOption } from '../../models/ServerOption';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let loginServiceMock  = {
    getAllServers: jasmine.createSpy().and.returnValue(of([
      { name: "Portugal", id: 1, online: true} as ServerOption
    ]))
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideZonelessChangeDetection(),
        {provide: LoginService, useValue: loginServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user name when the user is logged in', () => {
    const user = { username: 'Pedro'} as User
    component.user.set(user);
    fixture.detectChanges();
    const natElement = fixture.nativeElement as HTMLElement;
    const userNameElement = natElement.querySelector('h1')
    expect(userNameElement?.textContent?.trim()).toBe("Hello, Pedro")
  })
  
  describe('Display servers',() => {
     it('should call loadServers on init', () => {
      spyOn(component, 'loadServers').and.callThrough();
      component.ngOnInit();
      expect(component.loadServers).toHaveBeenCalled();
    })
    it('should display "We are fetching you current server please wait." while loading', () => {
      component.loading.set(true)
      fixture.detectChanges();
      const natElement = fixture.nativeElement as HTMLElement;
      const paragraphElement = natElement.querySelector("p")
      expect(paragraphElement?.textContent?.trim()).toBe('We are fetching you current server please wait.')
    })
    it('should display "You are connected to server Portugal" when the servers are loaded', async () => {
      const user = { username: 'Pedro', server:1 } as User
      component.user.set(user)
      const servers = await firstValueFrom(loginServiceMock.getAllServers()) as ServerOption[]
      component.servers.set(servers)
      fixture.detectChanges()
      const natElement = fixture.nativeElement as HTMLElement
      const paragraphText = natElement.querySelector("p")?.textContent?.trim()
      expect(paragraphText).toBe('You are connected to server Portugal')
    })
   
  })

});
