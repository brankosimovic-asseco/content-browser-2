import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content-view-pagination',
  templateUrl: './content-view-pagination.component.html',
  styleUrls: ['./content-view-pagination.component.scss']
})
export class ContentViewPaginationComponent implements OnInit {

  constructor() { }

  @Input() currentPage!: number;
  @Input() totalPages!: number;

  @Output() changePageEvent = new EventEmitter<number>();
  @Output() changePageSizeEvent = new EventEmitter<number>();
  @Output() fastForwardPageEvent = new EventEmitter<number>();

  ngOnInit(): void {
  }

  public previousPage() {
    if(this.currentPage == 1) return
    this.changePage(-1);
  }
  public nextPage() {
    if(this.currentPage == this.totalPages || this.totalPages === 0) return
    this.changePage(1);
  }

  public fastForward(){

  }
  public rewind() {}

  public changePageSize($event: Event) {
    const pageSize = ($event?.target as HTMLTextAreaElement).value;
    this.changePageSizeEvent.emit(+pageSize);
  }

  public fastForwardToLastPage() {
    this.fastForwardPageEvent.emit(1);
  }

  public fastForwardToFirstPage() {
    this.fastForwardPageEvent.emit(0);
  }

  private changePage(direction: number) {
    this.changePageEvent.emit(direction);
  }


}
