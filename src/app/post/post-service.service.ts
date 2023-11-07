import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private postsdisplay: {_id: string, id: string, name: string, _v: string}[] = [];
  private updatedpostdisplay= new Subject<{_id:string,id:string,name:string,_v:string}[]>();

  constructor(private http: HttpClient) { }

  addpost_service(pid:string, pname:string)
  {
    this.http.post<{message:string,post:any}>('https://localhost:3008/api/posts',{id:pid,name:pname})
    .subscribe((thepost) => 
    {
      this.postsdisplay.push(thepost.post);
      this.updatedpostdisplay.next([...this.postsdisplay]);
    })
  }

  getpost_service() {
    this.http.get<{ message: string, posts: any[] }>('https://localhost:3008/api/posts')
        .subscribe((thepost) => {
            console.log('Response from server:', thepost);
            if (Array.isArray(thepost.posts)) {
                this.postsdisplay = thepost.posts;
                this.updatedpostdisplay.next([...this.postsdisplay]);
            } else {
                console.log("Else: thepost.posts is not an array");
            }
        });
}




deletepost_service(postid: string) {
  const authToken = this.getAuthToken();

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });

  this.http.delete(`https://localhost:3008/api/posts/${postid}`, { headers })
    .subscribe(() => {
      const updatedpostsdeleted = this.postsdisplay.filter(post => post._id !== postid);
      this.postsdisplay = updatedpostsdeleted;
      this.updatedpostdisplay.next([...this.postsdisplay]);
    });
}

private getAuthToken(): string {

  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    return authToken;
  } else {
    console.error('Authentication token not found or expired');
    return '';
  }
}


  getUpdateListener()
  {
    return this.updatedpostdisplay.asObservable();
  }
}
