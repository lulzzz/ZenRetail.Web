import { Component, OnInit, HostListener } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { Product, Brand, Setting } from 'app/shared/models';
import { ProductService } from 'app/services/product.service';
import { Helpers } from 'app/shared/helpers';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    fixedCols: number;
    fitListHeight: string;
    fitListWidth: string;
    featured: Product[];
    sale: Product[];
    news: Product[];
    brands: Brand[];
    
    constructor(private productService: ProductService) {
        this.onResizeChanged(window);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.onResizeChanged(event.target);
    }
    
    get data(): Setting { return Helpers.setting }
    get categories(): any[] { return AppComponent.current.navItems; }

    async ngOnInit() {
        // let pipe = new MyTranslatePipe(this.platformId);
        // let title = pipe.transform(this.data.companyHomeSeo.title);
        // let desc = pipe.transform(this.data.companyHomeSeo.description);
        
        await AppComponent.current.setPage(
            'Home'
            // title, 
            // desc, 
            // environment.hostApi + '/media/logo.png'
        );
        
        if (this.data.homeFeatured) {
            this.featured = await this.productService
                .getFeatured()
                .toPromise();
        }
        if (this.data.homeNews) {
            this.news = await this.productService
                .getNews()
                .toPromise();
        }

        if (this.data.homeDiscount) {
        this.sale = await this.productService
            .getSale()
            .toPromise();
        }

        if (this.data.homeBrand) {
            this.brands = await this.productService
                .getBrands()
                .toPromise();
        }
    }

    onResizeChanged(event: any) {
        const w = event.innerWidth;
        this.resize(w);
    }

    private resize(w: number) {
        this.fixedCols = w < 600 ? 1 : w < 1200 ? 2 : 3;
        this.fitListWidth = (w - this.fixedCols - 1) + 'px';
        this.fitListHeight = (w / this.fixedCols * 1.2) + 'px';
    }
}
