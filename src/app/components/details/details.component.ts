import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule , CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
 constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService, private _Renderer2:Renderer2,private  _cartService:CartService,
  private toastr: ToastrService
 ){}

 productId!: string|null;
 productDetails: any= null;

 ngOnInit(): void {
     this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       this.productId= params.get('id')
      }
     });
    this._ProductService.getProductDetails(this.productId).subscribe({
      next:({data})=>{
       this.productDetails = data;
      },
    });
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

 productDetailsOption: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 6000,
  autoplaySpeed: 1000,  
  navSpeed: 700,
  navText: ['', ''],
 items:1,
  nav: true
}
}
