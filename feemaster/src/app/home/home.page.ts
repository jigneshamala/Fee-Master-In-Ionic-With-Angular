import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
 
  databaseObj: SQLiteObject;
  readonly database_name: string = 'fee.db';
  readonly table_Student: string = 'stu';
  readonly table_Fee: string = 'fee';
  toast: any;
  mess: any;

  subscribe: any;
  constructor(private router: Router, public platform: Platform, public statusBar: StatusBar, private sqlite: SQLite, public toastController: ToastController) {

    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/home', true) && this.router.url === '/home') {
        // tslint:disable-next-line: no-unused-expression
       // navigator.app.exitApp();
       navigator['app'].exitApp();
       
      }
    });
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
          this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_Student + ' (ID INTEGER PRIMARY KEY AUTOINCREMENT,name Text,gender Text,college text,study text,email text,mob text,address text,course text,total text,adm text,date DATETIME DEFAULT CURRENT_TIMESTAMP)', []);
          // tslint:disable-next-line: max-line-length
          this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_Fee + '(ID INTEGER PRIMARY KEY AUTOINCREMENT,STUDENT_ID INTERGET REFERENCES ' + this.table_Student + '(ID),name Text,mob Text REFERENCES ' + this.table_Student + '(mob),installtion Text,date DATETIME DEFAULT CURRENT_TIMESTAMP)', []);
         // alert(' Database Created! and tabel Created');
          // this.mess = 'Database Created! and Table Created!';
          // this.showToast();
        })
        .catch(e => {
          alert('error ' + JSON.stringify(e));
        });
    }).catch(error => {
      console.log(error);
    });
    // this.statusBar.overlaysWebView(true);
    // set status bar to white

    this.statusBar.backgroundColorByHexString('#7044ff');
    this.statusBar.styleLightContent();

  }
  // let status bar overlay webview


  Student_Information() {
    this.router.navigate(['infromation']);
  }

  Student_Registration() {
    this.router.navigate(['registraion']);
  }

  Fee_Master() {
    this.router.navigate(['feemaster']);
  }

  Search_Master() {
    this.router.navigate(['search']);
  }

  About() {
    this.router.navigate(['about']);
  }

  Contact() {
    //
     this.router.navigate(['contact']);

  }

  showToast() {
    this.toast = this.toastController.create({
      message: this.mess,
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast() {
    this.toast = this.toastController.dismiss();
  }

  // email

 

   // Send a text message using default options


}
