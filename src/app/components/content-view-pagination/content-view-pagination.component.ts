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

  ngOnInit(): void {
  }

  public previousPage() {
    if(this.currentPage == 1) return
    this.changePage(-1);
  }
  public nextPage() {
    if(this.currentPage == this.totalPages) return
    this.changePage(1);
  }

  public fastForward(){

  }
  public rewind() {}

  private changePage(direction: number) {
    this.changePageEvent.emit(direction);
  }

}
