import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ContentList } from '../models/content-item-list.model';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public baseUrl = JSON.parse(localStorage.getItem('content_enviroments') ?? '[]')?.find((e: any) => e.isActive)?.url ?? 'https://dev.dbranch.asee.dev/v1';
  public conentUrl = `${this.baseUrl}/content/` // this will take from the env select
  public reponame = 'reponame';

  constructor(private http: HttpClient) { }

  //Folders
  public getFolderDataByPath(path: string, kind?: string, page?: number, pageSize?:number, sortBy?: string, sortOrder?: string, subfolders: boolean = false):Observable<ContentList> {
    let params = new HttpParams();
    params = params.append('kind', kind ?? 'any');
    params = params.append('page-size', pageSize ?? 10);
    params = params.append('page', page ?? 1)
    params = params.append('subfolders', subfolders);
    params = params.append('sort-by', sortBy ?? '');
    params = params.append('sort-order', sortOrder ?? 'acs');
    console.log(params.keys(), 'params', page)
    return this.http.get<ContentList>(`${this.conentUrl}${this.reponame}/${path}`, {params: params}).pipe(map(r => camelcaseKeys(r, {deep: true})));
  }

  public searchFolderByPath(q: string, path: string, kind?: string, page?: number, pageSize?:number, sortBy?: string, sortOrder?: string, subfolders: boolean = false) {
    let params = new HttpParams();
    params = params.append('kind', kind ?? 'any');
    params = params.append('page-size', pageSize ?? 10);
    params = params.append('page', page ?? 1)
    params = params.append('subfolders', subfolders);
    params = params.append('sort-by', sortBy ?? '');
    params = params.append('sort-order', sortOrder ?? 'acs');
    params = params.append('q', q);
    params = params.append('search-mode', 'any');
    return this.http.get<ContentList>(`${this.conentUrl}${this.reponame}/${path}/search`, {params: params}).pipe(map(r => camelcaseKeys(r, {deep: true})));
  }
  public searchFolderById() {}
  public getFolderMetadataByPath() {}
  public getFolderMetadataById() {}
  public updateFolderMetadata() {}
  public deleteFolderById(id: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    return this.http.delete<any>(`${this.conentUrl}${this.reponame}/folders/${id}`, {headers: headers, params: {'delete-content-and-subfolders' : true}});
  }
  public createFolder() {}


  //Documents
  public uploadDocuments() {}
  public getDocumentMetadata() {}
  public downloadDocument(path: string, fileName: string){
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(`${this.conentUrl}${this.reponame}${path}/${fileName}`,httpOptions);
  }
  public deleteDocumentById(id: string) {
    // add authorization
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    return this.http.delete<any>(`${this.conentUrl}${this.reponame}/documents/${id}`, {headers: headers});
  }

}
