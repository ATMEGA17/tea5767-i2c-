import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  host = "http://178.62.36.219";
  port="3000";


  table:any=null; 
  table_data:any = null;
  table_cols:any = null;
  table_cols_l:any = null;
  groups:any;
  status:any;


  //table ipbx
  table_ipbx = ['id','name','extensions','trunks','stockage','exp'];  //the exact mysql table cols
  table_ipbx_l = ['#','Nom','Extensions','Trunks','Stockage','lic EXP'];  //fancy text (follow the order)

  //table extensions
  table_extension = ['id','number','name','first_name','groups','status']; //the exact mysql table cols
  table_extension_l = ['#','Numéro','Nom','Prénom','Groupe','Etat (CO/DIS)'];//fancy text (follow the order)

  constructor(private http: HttpClient) {
    // start by getting ipbx table first 
    this.get_ipbx();
    this._get_all('_groups').then((data)=>this.groups=data);
    this._get_all('status').then((data)=>this.status=data);
   
  }

  
  get_ipbx() {
this._get_all('ipbx').then((data) => {
  
  this.table_cols = this.table_ipbx;
  this.table_cols_l = this.table_ipbx_l;
  
  

  this.table_data = data;
  this.table = 'Ipbx';
  console.log(data);  
})   
  }

  get_extensions(){
    this._get_all('extensions').then((data) => {
  
      this.table_cols = this.table_extension;
      this.table_cols_l = this.table_extension_l;
      
      
    
      this.table_data = data;
      this.table = 'Extensions';
      console.log(data);  
    })   
  }


  _click(id:any) {
    switch(this.table){
      case "Ipbx" : this.ipbx_click(id);break;
      case "Extensions" :  this.extensions_click(id);break;
    }
  }

  ipbx_click(id:any){
    console.log("ipbx click");
    console.log(id);
   this._get_by_id("extensions",id).then((data) => {
    this.table_cols = this.table_extension;
  this.table_cols_l = this.table_extension_l;
  this.table_data = data;
  this.table = 'Extensions';
   });
  }

  extensions_click(id:any){
console.log("extensions click");
//this.get_extensions();
console.log(id);
  }




 


  filter(key:any,value:any) {
    if(this.table=="Extensions") {
      if(key=='groups') {
        
       this.groups.forEach((element:any) => {
        if(element.id == value) {
          value = element.name;

         
        }
       });



      } else if(key=="status") {
        this.status.forEach((element:any) => {
         
          if(element.id == value) {
            value = element.name;

           
          }
         });
      }
    }  


   return value;
 }


 get_td_color(id:any) {

  let r = "white";

   if(this.table=="Ipbx") {
      console.log(id.color);
     r = id.color;
   } else if(this.table=="Extensions") {
    this.status.forEach((element:any) => {
      
      if(element.id == id.status) {
        console.log(element.color)
       r = element.color;

      }

    })

   }

 return r;

 }
 
 _get_all(table:any) {
  return new Promise ( (resolve,reject) => { 
    this.http.get(this.host+':'+this.port+'/get_all/' + table).subscribe(data => {
    resolve(data);
   }, error => { console.log("Uh oh !" ) ; console.error( error) ; reject();})

 });

}

_get_by_id(table:any,id:any) {
 return new Promise ( (resolve,reject) => { 
   this.http.get(this.host+':'+this.port+'/get/' + table+'/'+id).subscribe(data => {
   resolve(data);
  }, error => { console.log("Uh oh !" ) ; console.error( error) ; reject();})

});

}


}
