import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }
  edit = false;
  url;
  preview = false;
  accountInformation = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'John@gmail.com',
    cell: '1-800-626-0106',
    officePhone: '1-800-626-0106',
    bre: '1-800-626-0106',
    fax: '1-800-626-0106',
    website: 'www.agentcloud.com'
  }

  ngOnInit() {
  }

  save(form){
    this.edit = false;
    this.accountInformation = form;
    console.log(form);
  }
  
  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      this.preview = true;
    }
  }
}
