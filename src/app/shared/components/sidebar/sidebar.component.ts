import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  olap = ''
  collapseGroup='';

  open :boolean=true;

  offcanvas() {
    if(this.open){
      this.olap = 'active';
      //  $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
      this.collapseGroup = "in hidden-xs visible-xs "
    }else{
      this.olap=''
      this.collapseGroup = ''
    }

    this.open = !this.open;
  };


  sidebarWidth :string = 'openSidebar';

  openNav() {
    this.sidebarWidth = 'openSidebar';
  }
  
  closeNav() {
     this.sidebarWidth = "closeSidebar";
  }

}
