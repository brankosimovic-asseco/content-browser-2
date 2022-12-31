import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, ObservableInput, Subscription } from 'rxjs';
import { ContentList } from 'src/app/models/content-item-list.model';
import { ContentService } from 'src/app/services/content.service';
import { ContentViewNavigationComponent } from '../content-view-navigation/content-view-navigation.component';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss']
})
export class ContentViewComponent implements OnInit {


  public folderData!: ContentList;
  public currentPageSize: number = 20;
  public currentPage: number = 1;
  public totalPages: number = 1;
  public sortBy!: string;
  public sortOrder!: string;

  public currentFolderId = '';

  public searchQuery!: string;
  public loading!: boolean;
  public currentRoute: string = '';

  private getFolderSubscription!: Subscription;
  private addNewFolderSubscription!: Subscription;

  @ViewChild(ContentViewNavigationComponent) navigation!: ContentViewNavigationComponent;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getFolderData(this.currentRoute);
  }

  private resetPageFilters() {
    this.currentPage = 1;
    this.searchQuery = '';
    this.navigation.clearSearchField();
  }

  private getFolderData(path: string): void {

    this.loading = true;
    let folderObservable = new Observable<ContentList>();

    if(this.searchQuery && this.searchQuery !== '') {
      if(path == '') path = ' ';
      folderObservable = this.contentService.searchFolderByPath(this.searchQuery, path, 'any', this.currentPage, this.currentPageSize, this.sortBy, this.sortOrder);

    } else {
      folderObservable = this.contentService.getFolderDataByPath(path, 'any', this.currentPage, this.currentPageSize, this.sortBy, this.sortOrder);
    }
    this.getFolderSubscription = folderObservable.subscribe((response: ContentList) => {
      this.folderData = response;
      this.currentRoute = path;
      this.totalPages = response.totalPages ?? 1;
      console.log('response', response);
      this.loading = false;
    }, (err) => {
      this.loading = false;
    })

  }

  public handleUploadFilesEvent($event: FileList) {
    console.log(this.currentRoute);
    this.loading = true;
    const documentsToUpload: Array<any> = [];
    this.contentService.getFolderMetadataByPath(this.currentRoute).subscribe((res) => {
      Array.from($event).forEach((f) => {
        documentsToUpload.push(this.contentService.uploadDocuments(res.id, f));
      });
      forkJoin(documentsToUpload).subscribe(() => {
        this.getFolderData(this.currentRoute);
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });

    })
    console.log($event, 'files');

  }

  public handleFolderSelectedEvent($event: string) {
    this.resetPageFilters();
    this.getFolderData($event);
  }

  public hanldeCrumbSelect($event: string) {
    this.resetPageFilters();
    this.getFolderData($event);
    this.currentRoute = $event;
  }

  public handleChangePageSize($event: number) {
    this.currentPageSize = $event;
    this.currentPage = 1;
    this.getFolderData(this.currentRoute);
  }

  public handleAddNewFolder($event: string) {
    this.addNewFolderSubscription = this.contentService.createFolder(this.currentRoute, $event).subscribe(() => {
      console.log('added folder');
      this.getFolderData(this.currentRoute);
    });
  }

  public handlePageChangeEvent($event: number) {
    console.log($event);
    this.currentPage = $event === 1 ? this.currentPage + 1 : this.currentPage - 1;
    this.getFolderData(this.currentRoute)
  }

  public handleFastForwardEvent($event: number) {
    if(this.totalPages == 0 || this.totalPages == 1) return;
    if($event == 0)
      this.currentPage = 1;
    else this.currentPage = this.totalPages ?? 1;

    this.getFolderData(this.currentRoute);
  }

  public handleItemDeleted($event: boolean) {
    if($event) this.getFolderData(this.currentRoute);
    console.log('deleted');
    // FIXME:
    // Open small popup that says item has been deleted
  }

  public handleEnviromentSelect($event: boolean) {
    if($event) this.getFolderData(this.currentRoute);
    // temp fix
    window.location.reload();
    // this.contentService = inject(ContentService);
  }

  public handleSelectSortByMethod($event: string) {
    this.sortBy = $event;
    this.getFolderData(this.currentRoute);
  }

  public handleSelectSortOrder($event: string) {
    this.sortOrder = $event;
    this.getFolderData(this.currentRoute);
  }

  public handleSearchQueryChange($event: string) {
    const q = $event;
    this.searchQuery = q;
    this.getFolderData(this.currentRoute);
  }

  ngOnDestroy() {
    this.getFolderSubscription.unsubscribe();
    this.addNewFolderSubscription.unsubscribe();
  }

}
