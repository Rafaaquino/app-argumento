import { Injectable } from '@angular/core';
import { urlConfig } from '../config/url.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class RemoveBgService {

  private api_key = environment.api_key; //chave de API Remove.bg
  host = urlConfig.host; //host api
  apiUrl = urlConfig.url_removebg; //URL Remove.bg


  constructor(private http: HttpClient){ }

  removeBackground(image: File): Observable<Blob> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.api_key
    });

    const formData = new FormData();
    formData.append('image_file_b64', image);

    return this.http.post(this.host + this.apiUrl, formData, { headers: headers, responseType: 'blob' });
  }

  downloadImage(imageUrl: string): Observable<Blob> {
    const headers = new HttpHeaders();

    return this.http.get(imageUrl, { headers: headers, responseType: 'blob' });
  }
}
