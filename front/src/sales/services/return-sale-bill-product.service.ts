import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ReturnSaleBill } from 'src/app/shared_classes_intefaces/returnSaleBill';

@Injectable({
  providedIn: 'root'
})
export class ReturnSaleBillProductService {

  constructor(private http:HttpClient) { }
  _url:string="https://localhost:44338/api/SaleReturnsBills'";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}
  getAll():Observable<ReturnSaleBill[]>{
    return this.http.get<ReturnSaleBill[]>(this._url)
    .pipe(catchError(this.errorHandler));
   }
   getByID(returnSBPId:number):Observable<ReturnSaleBill>{
     return this.http.get<ReturnSaleBill>(this._url+'/'+returnSBPId)
     .pipe(catchError(this.errorHandler));
   }
   insert(returnSBP:ReturnSaleBill):Observable<any>{
     console.log(JSON.stringify(returnSBP));
     return this.http.post<ReturnSaleBill>(this._url,JSON.stringify(returnSBP),this.httpOptions)
     .pipe(catchError(this.errorHandler));
   }
   update(returnSBPId:number,returnSBP:ReturnSaleBill):Observable<any>{
     console.log(JSON.stringify(returnSBP));
    return this.http.put<ReturnSaleBill>(this._url+'/'+returnSBPId,JSON.stringify(returnSBP),this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }
   
   removeD(returnSBPId:number):Observable<any>{
     return this.http.delete<ReturnSaleBill>(this._url+'/'+returnSBPId)
     .pipe(catchError(this.errorHandler));
   }
   
   errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    return throwError(()=>errorMessage);
 }

}
