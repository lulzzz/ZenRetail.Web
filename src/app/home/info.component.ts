import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { Setting } from 'app/shared/models';
import { Helpers } from 'app/shared/helpers';

@Component({
  selector: 'app-info',
  styles: [``],
  templateUrl: 'info.component.html'
})
export class InfoComponent implements OnInit {

  get data(): Setting { return Helpers.setting }

  ngOnInit(): void {
    // let pipe = new MyTranslatePipe(this.platformId);
    // let title = pipe.transform(this.data.companyInfoSeo.title);
    // let description = pipe.transform(this.data.companyInfoSeo.description);
    AppComponent.current.setPage(
      'Information'
      // title,
      // description,
      // '/media/logo.png'
    );
  }
}
