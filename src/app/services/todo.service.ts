import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly ROOT_URL:string = "https://jsonplaceholder.typicode.com/todos";
  readonly todosLimit:string = '?_limit=5'

  constructor(private http:HttpClient) { }

  //Get Todos
  getTodos():Observable<Todo[]> {
  return  this.http.get<Todo[]>(`${this.ROOT_URL}${this.todosLimit}`)
  }//end getTodos()

  //Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.ROOT_URL}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  //Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.ROOT_URL, todo, httpOptions);
  }//end addTodo
  
  //Toggle completed
  toggleCompleted(todo: Todo):Observable<any>{
   const url = `${this.ROOT_URL}/${todo.id}`;
    return this.http.put(url, todo, httpOptions)
  }
}//end export class TodoService
