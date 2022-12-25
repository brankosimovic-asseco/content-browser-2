import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Output() addNewFolderEvent = new EventEmitter<string>();
  @Output() uploadFilesEvent = new EventEmitter<FileList>();

  @Output() changedSearchQueryEvent = new EventEmitter<string>();

  @ViewChild('search') input!: ElementRef;

  @ViewChild('newFolderButton') newFolderButton!: ElementRef;
  @ViewChild('newFolderForm') newFolderForm!: ElementRef;

  @ViewChild('uploadButton') uploadButton!: ElementRef;
  @ViewChild('uploadForm') uploadForm!: ElementRef;

  public newFolderNameControl = new FormControl('');
  public fileUploadControl = new FormControl('');
  public fileList  = [];

  public showNewFolderDialog: boolean = false;
  public showUploadDialog: boolean = false;

  public searchQueryChanged = new Subject<any>();

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {
    this.updateSearchQuery();
    this.renderer.listen('window', 'click', (event: Event) => {
      /**
       * If we didn't click on the new folder button or dropdown form close the dropdown
       * we also have to include the dropdown children in the check with the include method
       */
      if(event.target !== this.newFolderButton.nativeElement
        && event.target !== this.newFolderForm?.nativeElement
        && !Array.from(this.newFolderForm?.nativeElement.children ?? [])?.includes(event.target)){
          this.showNewFolderDialog = false;
      }

      if(event.target !== this.uploadButton.nativeElement
        && event.target !== this.uploadForm?.nativeElement
        && !Array.from(this.uploadForm?.nativeElement.children ?? [])?.includes(event.target)){
          this.showUploadDialog = false;
      }


    })
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

  public updateFiles($event: any) {
    this.fileList = Array.from($event).map((f: any) => f.name) as never[];
  }

  public addNewFolder(folderName: any) {
    // emit event
    console.log(folderName)
    this.addNewFolderEvent.emit(folderName);
    this.showNewFolderDialog = false;
  }

  public uploadNewFiles(files: any) {
    console.log(files);
    this.uploadFilesEvent.emit(files);
    this.showUploadDialog = false;
    this.fileList = [];
  }

  public toggleNewFolderDialog() {
    this.showNewFolderDialog = !this.showNewFolderDialog;
    this.newFolderNameControl.setValue('');
  }

  public toggleUploadDialog() {
    this.showUploadDialog = !this.showUploadDialog;
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
