import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enviroment-select',
  templateUrl: './enviroment-select.component.html',
  styleUrls: ['./enviroment-select.component.scss']
})
export class EnviromentSelectComponent implements OnInit {

  public tokenInput!: FormControl;
  public isTokenExpired!: boolean;
  public enviroments!: Array<any>;

  @Output() enviromentSelectEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    this.enviroments = JSON.parse(localStorage.getItem('content_enviroments') ?? '[]');
    if(this.enviroments.length === 0)
      this.enviroments = environment.contentEnviroments;
    this.tokenInput = new FormControl(localStorage.getItem('local_storage_token') ?? '');
    this.tokenInput.valueChanges.subscribe((value) => {
      console.log(value);
      localStorage.setItem('local_storage_token', value);
      this.validateToken();
    })
    this.validateToken();
  }

  public setActiveEnviroment(enviroment: any) {
    this.enviroments.forEach(e => e.isActive = false);
    this.enviroments.find(env => env.name === enviroment.name).isActive = true;
    localStorage.setItem('content_enviroments', JSON.stringify(this.enviroments));
    this.enviromentSelectEvent.emit(true);

  }

  private validateToken() {
    const token = localStorage.getItem('local_storage_token');
    if(!token || token === '') return;
    const decoded = jwt_decode(token ?? '') as any;
    const expireTimestamp = decoded["exp"];
    if(expireTimestamp) {
      this.isTokenExpired = new Date(expireTimestamp * 1000) < new Date();
    }

  }

}
