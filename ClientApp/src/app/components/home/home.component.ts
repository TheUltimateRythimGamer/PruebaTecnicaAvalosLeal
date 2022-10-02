import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 2000);
  }

  public Add(id: number) {
    this.router.navigateByUrl('detail/' + id)
  }

}
