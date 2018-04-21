import { Component } from '@angular/core';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    parallelogram = [
        { 
            url: '/assets/img/1.18MeshMagnaliumPowder.jpg', 
            text: '1.18 Mesh Magnalium Powder',
            id: 1
        }, { 
            url: '/assets/img/2.40MeshMagnaliumPowder.jpg', 
            text: '2.40 Mesh Magnalium Powder',
            id: 2,
        }, {
            url: '/assets/img/2.Grade2MagnesiumPowder.jpg', 
            text: 'Grade 2 Magnalium Powder',
            id: 3,
        }, { 
            url: '/assets/img/4.80MeshMagnaliumPowder.jpg', 
            text: '4.80 Mesh Magnalium Powder',
            id: 4,
        }, { 
            url: '/assets/img/5.100MeshMagnaliumPowder.jpg', 
            text: '5.100 Mesh Magnalium Powder',
            id: 5,
        },
    ];
    private productIndex = 0;
    selectProduct(productIndex) {
    console.log(productIndex);
    this.productIndex = productIndex;
    }
}
