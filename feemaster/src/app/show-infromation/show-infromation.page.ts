import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-show-infromation',
  templateUrl: './show-infromation.page.html',
  styleUrls: ['./show-infromation.page.scss'],
})
export class ShowInfromationPage implements OnInit {
  databaseObj: SQLiteObject;
  readonly table_Student: string = 'stu';
  readonly table_Fee: string = 'fee';
  readonly database_name: string = 'fee.db';
  row_data: any = [];
  row_data_fee: any = [];
  toast: any;
  mess: any;
  name: any;
  install: any;
  row_data_all: any=[];
  total:any;
  sum: any;
  student_adm : any;
  student_total: any;
  paid:any;
  unpaid:any;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, public platform: Platform, private sqlite: SQLite, private Arouter: ActivatedRoute, public toastController: ToastController) {
    this.name = this.Arouter.snapshot.paramMap.get('name');
    // this.mess = (this.name + ' ' + 'jignesh');
    // this.showToast();
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          const querys = 'SELECT * FROM ' + this.table_Student + ' WHERE name=? ';
          this.databaseObj.executeSql(querys, [this.name]).then((res) => {
            this.row_data = [];
            if (res.rows.length > 0) {
              for (let i = 0; i < res.rows.length; i++) {
                this.row_data.push(res.rows.item(i));
                this.student_adm = parseInt(res.rows.item(0).adm);
                this.student_total = parseInt(res.rows.item(0).total);
              }
            }

          });
          const query = 'SELECT * FROM ' + this.table_Fee + ' WHERE name=?';
          this.databaseObj.executeSql(query, [this.name]).then((result) => {

            if (result.rows.length > 0) {
              // tslint:disable-next-line: no-unused-expression
              for (let i = 0; i < result.rows.length; i++) {
                this.row_data_fee.push(result.rows.item(i));

                // name: res.rows.item(i).Name
                // gen: res.rows.item(i).Gender;
                // this.install = result.rows.item(i).installtion;
                // this.mess = JSON.stringify(this.install);
                // this.showToast();
                // console.log('RESULT: ' + JSON.stringify(result.rows.item(i).Name));
                // console.log('RESULT: ' + JSON.stringify(result.rows.item(i).Gender));
                // console.log('RESULT: ' + JSON.stringify(result.rows.item(i).cources));
              }
              // this.dataName.push(result.rows.item(Namer));
            }
            this.name = null;
          }, err => {
            console.error('Error: ' + err);
          });
          const queryt = 'SELECT SUM(installtion) AS installtion FROM ' + this.table_Fee + ' WHERE name=?';
          this.databaseObj.executeSql(queryt, [this.name]).then(result => {
            if (result.rows.length > 0) {

               this.install = parseInt(result.rows.item(0).installtion);
              // this.sum=parseInt(result.rows.item(0).adm);
              //  this.total = this.install - this.student_adm;
               // tslint:disable-next-line: radix
               this.paid = this.install + this.student_adm;
               this.unpaid = this.student_total - this.paid;
              //  this.mess = JSON.stringify(this.install);
              //  this.showToast();

            }
            this.name = null;
          }, err => {
            console.error('Error: ' + err);
          });
          // tslint:disable-next-line: max-line-length
        })
        .catch(e => {
          alert('error ' + JSON.stringify(e));
        });
    }).catch(error => {
      console.log(error);
    });
  }
  itemTotal() {
    for (const total of this.install) {
      this.sum = this.sum + total.installment;
      this.mess = this.sum;
      this.showToast();
    }
  }

  ngOnInit() {
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

}
