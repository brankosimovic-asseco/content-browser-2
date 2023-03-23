import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentList } from 'src/app/models/content-item-list.model';
import { ContentItem, ContentItemKind } from 'src/app/models/content-item.model';
import * as mime from 'mime'
import { ContentService } from 'src/app/services/content.service';
@Component({
  selector: 'app-content-view-table',
  templateUrl: './content-view-table.component.html',
  styleUrls: ['./content-view-table.component.scss']
})
export class ContentViewTableComponent implements OnInit {


  public mime = mime;
  public isOverviewOpen = false;
  public isDeleteOpen = false;
  public itemData: any;

  public selectedItem: any;

  public selectedItems: number[] = [];

  constructor(private contentService: ContentService) {
   }

  @Output() folderSelectedEvent = new EventEmitter<string>();
  @Output() itemDeletedEvent = new EventEmitter<boolean>();

  @Input() contentData!: ContentList;

  ngOnInit(): void {

  }

  public selectItem(item?: ContentItem) {
    if(item?.kind === ContentItemKind.Document) return;
    const newPath = (item?.path?.substring(1)+ '/' + item?.name+ '/');
    this.folderSelectedEvent.emit(newPath);
  }

  public downloadFile(item: ContentItem) {
    this.contentService.downloadDocument(item.path ?? '', item.name ?? '').subscribe((data) => {

      console.log(data);
      let dataType = data.type;
      let binaryData = [];
      binaryData.push(data);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      if (item.name)
        downloadLink.setAttribute('download', item.name);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  public tryDelete(item: ContentItem) {
    // if item is folder delete document by id, else delete folder
      this.isDeleteOpen = true;
      this.itemData =  Object.entries(item);
      this.selectedItem = item;
      console.log(this.selectedItem,'test!');
  }

  public deleteItem(item: ContentItem) {
    item = this.selectedItem;
    console.log(this.selectedItem, item, 'test2!');
    // if item is folder delete document by id, else delete folder
    if(item.kind === ContentItemKind.Folder) {
      this.contentService.deleteFolderById(item.id ?? '').subscribe(() => {
        this.itemDeletedEvent.emit(true);
      });
    } else {
      this.contentService.deleteDocumentById(item.id ?? '').subscribe(() => {
        this.itemDeletedEvent.emit(true);
      });
    }
    this.isDeleteOpen = false;
  }

  public openInfoDialog(item: ContentItem) {
    console.log('item', item);
    this.isOverviewOpen = true;
    this.itemData =  Object.entries(item);
    console.log(this.itemData);
  }

  public closeInfoDialog() {
    this.isOverviewOpen = false;
    this.isDeleteOpen = false;
  }

  public getDocumentKindColor(mediaType: string) {
    let className = '';
    console.log(mime.getExtension(mediaType), mediaType);
    switch (mime.getExtension(mediaType)) {
      case 'pdf':
        className = 'red'
        break;
      case 'docx':
        className = 'blue'
        break;
      default:
        break;
    }
    return className;
  }

  public copyToClipboard(text: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', (text));
      e.preventDefault();
      document.removeEventListener('copy', ()=> {});
    });
    document.execCommand('copy');
  }

  public toggleItem(index: number) {
    if(this.selectedItems.includes(index)) {
      const indexToDelete = this.selectedItems.indexOf(index);
      this.selectedItems.splice(indexToDelete,1);
    } else {
      this.selectedItems.push(index);
    }

  }

}
