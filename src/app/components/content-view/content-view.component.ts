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

  public currentFolderId = '';

  public currentRoute: string = '';

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getFolderData(this.currentRoute);
  }

  public getFolderData(path: string): void {

    this.contentService.getFolderDataByPath(path, 'any', this.currentPage, this.currentPageSize).subscribe((response) => {
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

}
