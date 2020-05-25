import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Album } from '../shared/album';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  albums: Album[] = [];

  artist=[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAlbumList()
      .subscribe(res => {
        console.log(res);
        this.albums = res;
      })
      
    this.productService.getArtistName().subscribe(    
      res => {
        this.artist =[... new Set(res.map(data => data.artist))];
      }
    )
  }

}
