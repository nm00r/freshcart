import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';

import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { WhishlistService } from 'src/app/core/services/whishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
constructor(private _ProductService:ProductService,private toastr: ToastrService, private _Renderer2:Renderer2, private _cartService:CartService,private _WhishlistService:WhishlistService){}
products:Product[]=[];
pageSize:number=0;
curentPage:number=1;
total:number=0;
wishListData:string[]=[];
ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) =>{
        this.products = response.data;
        this.pageSize = response.metadata.limit
      this.curentPage= response.metadata.currentPage
     this.total=response.results
    }
    });
    this._WhishlistService.getWhishlist().subscribe({
      next:(response)=>{
        const newData= response.data.map((item:any)=>item._id)
        this.wishListData=newData
      }
     })
  }

  addProduct(id :any, element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    
   
    this._cartService.addToCart(id).subscribe({
     next:(response)=>{
    
       this.toastr.success(response.message)
      this._Renderer2.removeAttribute(element, 'disabled');
     },
     error:(err)=>{
       this._Renderer2.removeAttribute(element, 'disabled');
     }
   })
 }
 pageChanged(event:any):void{
  this._ProductService.getProducts(event).subscribe({
    next: (response) =>{
      this.products = response.data;
      this.pageSize = response.metadata.limit
      this.curentPage= response.metadata.currentPage
      this.total=response.results
  }
  });
 }
 addFav(prodId:string|undefined):void{
  this._WhishlistService.addToWishlist(prodId).subscribe({
    next:(response)=>{
     this.toastr.success(response.message)
     this.wishListData= response.data
    }
  })
}
removeFav(prodId:string|undefined):void{
  this._WhishlistService.removeItemWhishlist(prodId).subscribe({
    next:(response)=>{
      this.toastr.success(response.message)
      this.wishListData= response.data
    }
  })
}
}
