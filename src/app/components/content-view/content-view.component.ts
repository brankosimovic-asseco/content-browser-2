import { Component, OnInit } from '@angular/core';
import { ContentList } from 'src/app/models/content-item-list.model';
import { ContentService } from 'src/app/services/content.service';

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

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getFolderData(this.currentRoute);
  }

  public getFolderData(path: string): void {

    this.contentService.getFolderDataByPath(path, 'any', this.currentPage, this.currentPageSize, this.sortBy, this.sortOrder).subscribe((response) => {
      console.log(response);
      this.folderData = response;
      this.currentRoute = path;
      this.totalPages = response.totalPages ?? 1;
    });
  }

  public getSearchData(q: string, path: string) {
    // if the path is an empty stirng the search method returns nothing
    if(path == '') path = ' ';
    this.contentService.searchFolderByPath(q, path, 'any', this.currentPage, this.currentPageSize, this.sortBy, this.sortOrder).subscribe((response) => {
      console.log(response);
      this.folderData = response;
      this.currentRoute = path;
      this.totalPages = response.totalPages ?? 1;
    });
  }

  public handleFolderSelectedEvent($event: string) {
    console.log($event);
    this.currentPage = 1;
    this.getFolderData($event);
  }

  public hanldeCrumbSelect($event: string) {
    console.log($event);
    this.currentPage = 1;
    this.getFolderData($event);
    this.currentRoute = $event;
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
    if(q === '')
      this.getFolderData(this.currentRoute);
    else
      this.getSearchData(q, this.currentRoute);

  }

}
