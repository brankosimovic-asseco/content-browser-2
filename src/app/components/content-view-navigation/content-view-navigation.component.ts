import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content-view-navigation',
  templateUrl: './content-view-navigation.component.html',
  styleUrls: ['./content-view-navigation.component.scss']
})
export class ContentViewNavigationComponent implements OnInit {
  public crumbs!: string[];
  @Input()  set path(value: string){
    this.crumbs = value.split('/')?.filter(c => c !== '');
  }

  @Output() selectedCrumbEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {;
  }


  public navigateToFolder(folder: string) {
    console.log(folder,'ff');
    // send event to navigation, and then from navigation to overview to rerender the component
    this.selectedCrumbEvent.emit(this.crumbs.slice(0, this.crumbs.indexOf(folder) + 1).join('/'))
  }

}
