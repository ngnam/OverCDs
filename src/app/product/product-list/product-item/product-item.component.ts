import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/shared/album';
import { CartService } from 'src/app/shared/cart.service';
import { NavService } from 'src/app/shared/nav.service';
import { ProductService } from 'src/app/shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  albums = [];
  searchInput = '';
  @Input() page;
  @Output() pageChanged = new EventEmitter<number>();

  constructor(
    private cartService: CartService,
    private navService: NavService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productService.getAlbumList(this.page).subscribe((res) => {
      console.log(res);
      this.albums = res;
    });
    this.getSearchInput();
    this.route.params.subscribe((res) => {
      console.log(res['page']);
      this.pageChanged.emit(res['page']);
    });
  }

  addItemToCart(id: string): void {
    const item = this.albums.find((ele) => ele.id === id);
    this.cartService.addItemsToCart(item, 1);
  }

  getSearchInput() {
    this.navService.inputSearchChanged.subscribe((res) => {
      this.searchInput = res;
    });
  }
}
