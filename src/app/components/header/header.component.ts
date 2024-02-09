import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import {MatIconModule} from '@angular/material/icon'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router){}
  ngOnInit() {
      this.items = [
          {
              label: 'Coding',
              icon: 'pi pi-fw pi-file',
              items: [
                  {
                      label: 'Front-end',
                      icon: 'pi pi-fw pi-plus',
                      items: [
                          {
                              label: 'Angular',
                              icon: 'pi pi-fw pi-bookmark'
                          },
                          {
                              label: 'React JS',
                              icon: 'pi pi-fw pi-video'
                          }
                      ]
                  },
                  {
                      label: 'Back-end',
                      icon: 'pi pi-fw pi-trash',
                      items: [
                        {
                          label: 'Python',
                          icon:'',
                        },
                        {
                          label: 'Rust',
                          icon: ''
                        }
                      ]
                  },
                  {
                      label: 'Networking',
                      icon: 'pi pi-fw pi-external-link',
                      items:[
                        {
                          label: 'API TestTools',
                          icon: ''
                        },
                        {
                          label:'Postman',
                          icon:''
                        }
                      ]
                  }
              ]
          },
          {
              label: 'Projects',
              icon: '',
              items: [
                  {
                      label: 'Automotive Car Display Project',
                      icon: 'pi pi-car'
                  },
                  {
                      label: 'Instagram Clone',
                      icon: 'pi pi-instagram'
                  },
                  {
                      label: 'Wahtsapp Clone',
                      icon: 'pi pi-whatsapp'
                  },
                  {
                      label: 'Facebook Clone',
                      icon: 'pi pi-facebook'
                  }
              ]
          },
          {
              label: 'Users',
              icon: 'pi pi-fw pi-user',
              items: [
                  {
                      label: 'New',
                      icon: 'pi pi-fw pi-user-plus'
                  },
                  {
                      label: 'Delete',
                      icon: 'pi pi-fw pi-user-minus'
                  },
                  {
                      label: 'Search',
                      icon: 'pi pi-fw pi-users',
                      items: [
                          {
                              label: 'Filter',
                              icon: 'pi pi-fw pi-filter',
                              items: [
                                  {
                                      label: 'Print',
                                      icon: 'pi pi-fw pi-print'
                                  }
                              ]
                          },
                          {
                              icon: 'pi pi-fw pi-bars',
                              label: 'List'
                          }
                      ]
                  }
              ]
          },
          {
              label: 'Events',
              icon: 'pi pi-fw pi-calendar',
              items: [
                  {
                      label: 'Edit',
                      icon: 'pi pi-fw pi-pencil',
                      items: [
                          {
                              label: 'Save',
                              icon: 'pi pi-fw pi-calendar-plus'
                          },
                          {
                              label: 'Delete',
                              icon: 'pi pi-fw pi-calendar-minus'
                          }
                      ]
                  },
                  {
                      label: 'Archieve',
                      icon: 'pi pi-fw pi-calendar-times',
                      items: [
                          {
                              label: 'Remove',
                              icon: 'pi pi-fw pi-calendar-minus'
                          }
                      ]
                  }
              ]
          },
      ];
  }


}
