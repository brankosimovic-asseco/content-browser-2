import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-content-view-navigation',
  templateUrl: './content-view-navigation.component.html',
  styleUrls: ['./content-view-navigation.component.scss']
})
export class ContentViewNavigationComponent implements OnInit {
  public crumbs!: string[];
  @Input()  set path(value: string){
    this.crumbs = value.split('/')?.filter(c => c !== '' && c !== " ");
  }

  @Output() selectedCrumbEvent = new EventEmitter<string>();
  @Output() selectedSortByMethod = new EventEmitter<string>();
  @Output() selectedSortOrder = new EventEmitter<string>();

  @Output() changedSearchQueryEvent = new EventEmitter<string>();

  @ViewChild('search') input!: ElementRef;

  public searchQueryChanged = new Subject<any>();

  constructor(private cdr: ChangeDetectorRef) {
    this.updateSearchQuery();
  }

  ngOnInit(): void {;
  }


  public navigateToFolder(folder: string) {
    console.log(folder,'ff');
    // send event to navigation, and then from navigation to overview to rerender the component
    this.selectedCrumbEvent.emit(this.crumbs.slice(0, this.crumbs.indexOf(folder) + 1).join('/'))
  }

  public selectSortByChange($event: Event) {
    const value = ($event?.target as HTMLTextAreaElement).value;
    this.selectedSortByMethod.emit(value);
  }

  public selectSortOrderChange($event: Event) {
    const value = ($event?.target as HTMLTextAreaElement).value;
    this.selectedSortOrder.emit(value);
  }

  public clearSearchField() {
    console.log(this.input);
    if(this.input)
      this.input.nativeElement.value = '';

  }

  private updateSearchQuery() {
    this.searchQueryChanged.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe((event) => {
      // emit event to view;
      const searchQuery = (event.target as HTMLTextAreaElement).value;
      console.log(searchQuery);
      this.changedSearchQueryEvent.emit(searchQuery);
    });
  }

}
