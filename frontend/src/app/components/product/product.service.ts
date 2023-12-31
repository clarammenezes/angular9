import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {Product} from './product.model';
import {catchError, EMPTY, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({ //decorator que diz que a classe pode ser injetada em outras classes
    providedIn: 'root'
})
export class ProductService {

    baseUrl = "http://localhost:4200/products"

    constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, 'X', { //mensagem, ação, configuração)
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-success']
        })
    }

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product).pipe (
            //pipe é usado para encadear operadores
            map(obj => obj),
            catchError((e) => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.showMessage('Ocorreu um erro!', true)
        return EMPTY
    }

    read(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl)
    }

    readById(id: number): Observable<Product> {
        const url = `${this.baseUrl}/${id}`
        return this.http.get<Product>(url)
    }

    update(product: Product): Observable<Product> {
        const url = `${this.baseUrl}/${product.id}`
        return this.http.put<Product>(url, product)
    }

    delete(id: number): Observable<Product> {
        const url = `${this.baseUrl}/${id}`
        return this.http.delete<Product>(url)
    }
}
