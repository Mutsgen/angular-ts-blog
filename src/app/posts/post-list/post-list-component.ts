import { Component, OnInit,OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../post.service";

@Component({
  selector:"app-post-list",
  templateUrl:"./post-list-component.html",
  styleUrls:["./post-list-component.css"]
})

export class PostListComponent implements OnInit{
  newTitle = ""
  newContent = ""
  posts:Post[] = []
  // private postsSub:Subscription

  constructor(public postService:PostsService){

  }
  onDeletePost(id:number){
     this.postService.deletePost(id)
  }

  onOpen(id:number){
    this.newTitle = this.posts[id].title
    this.newContent = this.posts[id].content
    this.posts[id].isEdited = true
  }
  onEdit(id:number){
    this.postService.editPost(id,this.newTitle,this.newContent)
  }
 
  ngOnInit(){
    this.posts = this.postService.getPosts()
    // this.postsSub = 
    this.postService.getPostUpdateListener()
      .subscribe((posts:Post[])=>{
        this.posts = posts
      })
  }

  // ngOnDestroy() {
  //   this.postsSub.unsubscribe()
  // }
}
