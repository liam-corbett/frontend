import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service';
import { Router } from '@angular/router';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  constructor(public postservice: PostServiceService, private router: Router) {}


  onaddpost(postform: NgForm) {
    if (postform.invalid)
    {
      alert('Invalid!')
      return
    }
    //alert(postform.value.enteredID+':'+postform.value.enteredName)

    this.postservice.addpost_service(postform.value.enteredID,postform.value.enteredName)
    postform.resetForm
    this.router.navigate(['/display']);
  }

  navigateToDisplayPage() {
    this.router.navigate(['/display']);
  }


  logout() {
    this.router.navigate(['/']);
  }

}
