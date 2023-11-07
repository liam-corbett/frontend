import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit{

  posts:{_id:string,id:string,name:string, _v:string}[] = [];

  constructor(public postservice: PostServiceService,  private router: Router) {}

  private postsubscription!: Subscription;
  

  ngOnInit() {
    this.postservice.getpost_service();
    this.postsubscription = this.postservice.getUpdateListener()
    .subscribe((posts:{_id:string,id:string,name:string,_v:string}[]) => 
    {
      console.log('Subscription Triggered', posts);
      this.posts = posts;
    });
  }

  ngOnDestroy()
  {
    this.postsubscription.unsubscribe();
  }

  ondelete(fruitid:string)
  {
    this.postservice.deletepost_service(fruitid)
  }

  navigateToAddPage() {
    this.router.navigate(['/add']);
  }


  logout() {
    this.router.navigate(['/']);
  }

}
