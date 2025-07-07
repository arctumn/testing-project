import { TestBed } from '@angular/core/testing';

import { LoginService } from './login';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Login Service', () => {
  let service: LoginService;
  const defaultServers = [{
    name: "Portugal",
    id: 1,
    online:true
  }, {
    name: 'Spain',
    id: 2,
    online:false
  },
  {
    name: "France",
    id: 3,
    online: true}
  ]
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(LoginService);
    service.resetServers()
  });
  function getCurrentServers() {
    return service.getAllServers().getValue()
  }
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('ResetServers', () => {
    it('Should always default to default servers when a reset happens', () => {
      const currentServers = getCurrentServers()
      expect(currentServers).toEqual(defaultServers)
    })
  })
  describe('GetServers', () =>  {
    it('Should return the current available servers', () =>  {
      const currentServers = getCurrentServers()
      expect(currentServers).toEqual(defaultServers)
    })
    it('There must always be the default servers', () => {
      const currentServers = getCurrentServers()
      expect(currentServers).not.toEqual([])
    })
  })
  describe('AddServer', () => {
    const ukServer = {name:"UK",id:4,online:true}
    it('Should append a new server to the list', () => {
      service.addServer(ukServer)
      const currentServers = getCurrentServers()
      expect(currentServers).toEqual([...defaultServers,ukServer])
    }),
    it('Should have more servers than the default ones', () => {
      service.addServer(ukServer)
      const currentServers = getCurrentServers()
      expect(currentServers).not.toEqual(defaultServers)
    })
  })
});
