import { Component, OnInit , ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'ToDo';
  hideButtons:boolean = false;
  show:boolean = false;
  index:any;
  tasksArray:any[] = [];
   ngOnInit(){
    if(localStorage.getItem("Tasks")){
      this.tasksArray = JSON.parse(localStorage.getItem("Tasks"));
    }
  }
  showForm(){
    this.show = true;
    this.hideButtons = true;
  }
  sendData(e){
    console.log(this.index);
    if(e.target.parentNode.children[1].value == ''){
      alert('todo is empty');
    }
    else if(this.index === undefined){
    let todoString = e.target.parentNode.children[1].value;
    let priorityString = e.target.parentNode.children[3].value;
    this.tasksArray.push({todo:todoString,prio:priorityString});
    localStorage.setItem('Tasks',JSON.stringify(this.tasksArray));
    this.show = false;
    this.hideButtons = false;
    }
    else if(this.index !== undefined){
      let todoString = e.target.parentNode.children[1].value;
      let priorityString = e.target.parentNode.children[3].value;
      this.tasksArray[this.index] = {todo:todoString,prio:priorityString};
      localStorage.setItem('Tasks',JSON.stringify(this.tasksArray));
      this.show = false;
      this.hideButtons = false;
      this.index = undefined;
    }
  }
  removeItem(e){
    let value = e.target.parentNode.parentNode.parentNode.children[0].innerHTML;
    let index = this.tasksArray.findIndex(x => x.todo === value); 
    this.tasksArray.splice(index,1);
    localStorage.setItem("Tasks",JSON.stringify(this.tasksArray));
    this.tasksArray = JSON.parse(localStorage.getItem("Tasks"));
  }
  filterCards(x){
    const output = <any>document.querySelector(".cards").children;
    for(let i = 0;i<this.tasksArray.length;i++){
      
      if(x == "all"){
          output[i].style.display = "flex";
      }
      else if(output[i].children[1].children[0].classList != x){
        output[i].style.display = "none";
      }
      else{
        output[i].style.display = "flex";
      }
  }
  }
  editItem(e){
    // let output = <any>document.querySelector(".cards");
    let value = e.target.parentNode.parentNode.parentNode.children[0].innerHTML;
    this.index = this.tasksArray.findIndex(x => x.todo === value);
    this.showForm();
  }

}

