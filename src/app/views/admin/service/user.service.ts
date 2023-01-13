import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  get():Observable<any>{
    return this.http.get(this.baseUrl + 'users/findAll',{
      responseType: "json",
    })
  }

  getFilePdf():Observable<any>{
    const token = 'my JWT';
    const headers = new HttpHeaders().set('authorization','Bearer '+token);
    return this.http.get(this.baseUrl + 'users/exportToPdfALL',
    {headers, responseType: 'blob'}
    )
  }

  // getPost(data: any): Observable<any> {
  //   var headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   });
  //   const urlPost = this.baseUrl + 'users/findAllWithPaginationAndFilter';
  //   return this.http.post<any>(urlPost,data, { headers});
  // }

  post(search: any): Observable<any> {
    let bodyString = JSON.stringify(search);
    // console.log(bodyString) // Stringify payload
    var headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        });
    return this.http.post(
      this.baseUrl + 'users/findAllWithPaginationAndFilter',
      bodyString, { headers}
    );
  }

  getPage(
    page: number | undefined,
    size: number | undefined,
    search: any
  ): Observable<any> {
    let bodyString = JSON.stringify(search); // Stringify payload
    console.log(bodyString);

    return this.http.get(
      this.baseUrl + 
        'users/findAllWithPagination?page=' +
        page +
        '&size=' +
        size,
      {
        responseType: 'json',
      }
    );
  }

  add(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'users/';
    return this.http.post<any>(urlPost,data, { headers});
  }

  edit(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'users/';
    return this.http.put<any>(urlPost,data, { headers});
  }

  delete(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(this.baseUrl + 'users/deleteById?id=' + id);
  }

  download(): Observable<any>{
    return this.http.get(
      this.baseUrl + 'users/exportToPdfALL',{
        responseType: 'blob',
      }
    );
  }
}
