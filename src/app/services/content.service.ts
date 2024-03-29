import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ContentList } from '../models/content-item-list.model';
import camelcaseKeys from 'camelcase-keys';
import { NewFolder } from '../models/new-folder.model';

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
    params = params.append('page-size', pageSize ?? 10);
    params = params.append('page', page ?? 1)
    params = params.append('subfolders', subfolders);
    params = params.append('sort-by', sortBy ?? '');
    params = params.append('sort-order', sortOrder ?? 'acs');
    console.log(params.keys(), 'params', page)
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    return this.http.get<ContentList>(`${this.conentUrl}${this.reponame}/${path}`, {params: params, headers}).pipe(map(r => camelcaseKeys(r, {deep: true})));
  }

  public searchFolderByPath(q: string, path: string, kind?: string, page?: number, pageSize?:number, sortBy?: string, sortOrder?: string, subfolders: boolean = false) {
    let params = new HttpParams();
    params = params.append('page-size', pageSize ?? 10);
    params = params.append('page', page ?? 1)
    params = params.append('subfolders', subfolders);
    params = params.append('sort-by', sortBy ?? '');
    params = params.append('sort-order', sortOrder ?? 'acs');
    params = params.append('q', q);
    params = params.append('search-mode', 'any');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    return this.http.get<ContentList>(`${this.conentUrl}${this.reponame}/${path}/search`, {params: params, headers}).pipe(map(r => camelcaseKeys(r, {deep: true})));
  }
  public searchFolderById() {}
  public getFolderMetadataByPath(path: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    return this.http.get<any>(`${this.conentUrl}${this.reponame}/${path}/metadata`, {headers});
  }
  public getFolderMetadataById() {}
  public updateFolderMetadata() {}
  public deleteFolderById(id: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    return this.http.delete<any>(`${this.conentUrl}${this.reponame}/folders/${id}`, {headers: headers, params: {'delete-content-and-subfolders' : true}});
  }
  public createFolder(path: string, name: string, kind: string = 'folder') {
    const folderBody: NewFolder = {
      kind: kind,
      path: path,
      name: name
    }
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    return this.http.post<any>(`${this.conentUrl}${this.reponame}/folders`, folderBody, {headers: headers});
  }


  //Documents
  public uploadDocuments(id: string, file: any) {
    let formData = new FormData();

    formData.set('content-stream', file);
    formData.set('name', file.name);
    formData.set('media-type', file.type);
    formData.set('filing-case-number', 'test');
    formData.set('filing-case-kind', 'unspecified');
    formData.set('overwrite-if-exists', 'true');


    // console.log(formData.getAll('content'));

    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    return this.http.post<any>(`${this.conentUrl}${this.reponame}/folders/${id}`, formData, {headers: headers});

  }
  public getDocumentMetadata() {}
  public downloadDocument(path: string, fileName: string){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('local_storage_token') ?? '');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: headers
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
