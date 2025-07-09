import { Injectable } from '@angular/core';
import { ServerOption } from '../models/ServerOption';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private defaultServers: ServerOption[] = [{
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
    online: true
  }]
  private servers: BehaviorSubject<ServerOption[]> = new BehaviorSubject(this.defaultServers)
  constructor() { }
  resetServers(){
    this.servers.next(this.defaultServers)
  }
  getAllServers():BehaviorSubject<ServerOption[]>{
    return this.servers
  }
  addServer(server:ServerOption){
    this.servers.next([...this.servers.getValue(),server])
  }
  updateServerState(serverName:string,state:boolean):boolean{
    const serverIndex = this.findServer(serverName)
    if(!serverIndex)
      return false
    const currentServers = this.servers.getValue()
    currentServers[serverIndex].online = state;
    this.servers.next(currentServers)
    return true
  }
  private findServer(name:string):number | undefined {
    const currentServers = this.servers.getValue()
    for (let serverIndex = 0; serverIndex < currentServers.length; serverIndex++) {
      const element = currentServers[serverIndex];
      if(element.name == name)
        return serverIndex
    }
    return
  }
}
