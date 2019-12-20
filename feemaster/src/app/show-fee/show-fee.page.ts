import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-show-fee',
  templateUrl: './show-fee.page.html',
  styleUrls: ['./show-fee.page.scss'],
})
export class ShowFeePage implements OnInit {

  databaseObj: SQLiteObject;
  readonly table_Student: string = 'stu';
  readonly table_Fee: string = 'fee';
  readonly database_name: string = 'fee.db';
  row_data: any = [];
  toast: any;
  mess:any;

  constructor(public platform: Platform,private sqlite: SQLite,public toastController: ToastController) { 

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          // tslint:disable-next-line: max-line-length
          // this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS jignesh (pid INTEGER PRIMARY KEY AUTOINCREMENT , Name varchar(255),Gender varchar(10),cources varchar(15))', [])
          // tslint:disable-next-line: max-line-length
          //this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_Student + ' (ID INTEGER PRIMARY KEY AUTOINCREMENT,name Text,gender Text,college text,study text,email text,mob text,address text,course text,total text,adm text,date DATETIME DEFAULT CURRENT_TIMESTAMP)', []);
          // tslint:disable-next-line: max-line-length
         // this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_Fee + '(ID INTEGER PRIMARY KEY AUTOINCREMENT,STUDENT_ID INTERGET REFERENCES ' + this.table_Student + '(ID),name Text,mob Text REFERENCES ' + this.table_Student + '(mob),installtion Text,date DATETIME DEFAULT CURRENT_TIMESTAMP)', []);
          // alert(' Database Created! and tabel Created');
          this.databaseObj.executeSql('SELECT * FROM ' + this.table_Fee + ' ORDER BY ID DESC', [])
          .then((res) => {
            this.row_data = [];
            if (res.rows.length > 0) {
              for (let i = 0; i < res.rows.length; i++) {
                this.row_data.push(res.rows.item(i));
              }
            }
            
          })
          .catch(e => {
            alert('error ' + JSON.stringify(e));
          });
        })
        .catch(e => {
          alert('error ' + JSON.stringify(e));
        });
    }).catch(error => {
      console.log(error);
    });
    
  }

  howToast() {
    this.toast = this.toastController.create({
      message: this.mess,
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast(){
    this.toast = this.toastController.dismiss();
  }

  ngOnInit() {
  }

}
