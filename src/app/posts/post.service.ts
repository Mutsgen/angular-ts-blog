import { Injectable } from "@angular/core"
import { Subject } from "rxjs"

import { Post } from "./post.model"

@Injectable({providedIn:'root'})
export class PostsService{
    private posts:Post[] = []
    private postUpdated = new Subject<Post[]>()

    getPosts(){
        return [...this.posts]
    }

    getPostUpdateListener(){
        return this.postUpdated.asObservable()
    }

    addPost(title:string, content:string){
        const post: Post = {title:title, content:content,isEdited:false}
        this.posts.push(post)
        this.postUpdated.next([...this.posts])
    }

    deletePost(id:number){
        this.posts = this.posts.filter(function(post,index){
            return index !=id
        })
        this.postUpdated.next([...this.posts])
    }

    editPost(id:number,title:string,content:string){
        // this.posts[id].isEdited = true
        // this.posts[i] = {title:title, content:content,isEdited:false}
        // this.posts.map((post,index)=>{
        //     console.log(post,index);
            
        //     if(index==id){
        //         console.log(id);  
        //         console.log(id,title,content);
        //         this.posts[index] = {title:title, content:content,isEdited:false}
        //     }
        // })
        this.posts[id] = {title:title, content:content,isEdited:false}
        console.log(this.posts);
        
        this.postUpdated.next([...this.posts])
    }
}