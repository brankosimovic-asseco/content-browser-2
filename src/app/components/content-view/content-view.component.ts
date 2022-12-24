import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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

  public currentRoute: string = '';

  @ViewChild(ContentViewNavigationComponent) navigation!: ContentViewNavigationComponent;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getFolderData(this.currentRoute);
  }

  public getFolderData(path: string): void {

    if(this.searchQuery && this.searchQuery !== '') {
      if(path == '') path = ' ';
      this.contentService.searchFolderByPath(this.searchQuery, path, 'any', this.currentPage, this.currentPageSize, this.sortBy, this.sortOrder).subscribe((response) => {
        console.log(response);
        this.folderData = response;
        this.currentRoute = path;
        this.totalPages = response.totalPages ?? 1;
      });
    } else {
      this.contentService.getFolderDataByPath(path, 'any', this.currentPage, this.currentPageSize, this.sortBy, this.sortOrder).subscribe((response) => {
        console.log(response);
        this.folderData = response;
        this.currentRoute = path;
        this.totalPages = response.totalPages ?? 1;
      });
    }


  }

  public handleFolderSelectedEvent($event: string) {
    console.log($event);
    this.currentPage = 1;
    this.searchQuery = '';
    this.navigation.clearSearchField();
    this.getFolderData($event);
  }

  public hanldeCrumbSelect($event: string) {
    console.log($event);
    this.currentPage = 1;
    this.searchQuery = '';
    this.navigation.clearSearchField();
    this.getFolderData($event);
    this.currentRoute = $event;
  }

  public handleChangePageSize($event: number) {
    this.currentPageSize = $event;
    this.getFolderData(this.currentRoute);
  }

  public handlePageChangeEvent($event: number) {
    console.log($event);
    this.currentPage = $event === 1 ? this.currentPage + 1 : this.currentPage - 1;
    this.getFolderData(this.currentRoute)
  }

  public handleItemDeleted($event: boolean) {
    if($event) this.getFolderData(this.currentRoute);
    console.log('deleted');
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

}
