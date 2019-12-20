import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-infromation',
  templateUrl: './infromation.page.html',
  styleUrls: ['./infromation.page.scss'],
})
export class InfromationPage implements OnInit {
  submitted = false;
	authname: FormGroup;
  databaseObj: SQLiteObject;
  readonly table_Student: string = 'stu';
  readonly table_Fee: string = 'fee';
  readonly database_name: string = 'fee.db';
  row_data: any = [];
  row_data_fee: any = [];
  toast: any;
  mess: any;
  Name_Item = '';




  constructor(private formBuilder: FormBuilder,private router: Router, public platform: Platform, private sqlite: SQLite, public toastController: ToastController) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          this.databaseObj.executeSql('SELECT * FROM ' + this.table_Student + ' ORDER BY name ASC', [])
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
          });
      });
  }

  ngOnInit() {

    this.authname = this.formBuilder.group({
            name: ['', [Validators.required]],
        }, {});

  }

  getRows() {
    // const query = 'SELECT * FROM ' + this.table_Fee + ' WHERE name=?';
    // this.databaseObj.executeSql(query, [this.Name_Item]).then((result) => {

    //   if (result.rows.length > 0) {
    //     // tslint:disable-next-line: no-unused-expression
    //     for (let i = 0; i < result.rows.length; i++) {
    //       this.row_data_fee.push(result.rows.item(i));

    //       // name: res.rows.item(i).Name
    //       // gen: res.rows.item(i).Gender;
    //       // console.log('RESULT: ' + JSON.stringify(result.rows.item(i).Name));
    //       // console.log('RESULT: ' + JSON.stringify(result.rows.item(i).Gender));
    //       // console.log('RESULT: ' + JSON.stringify(result.rows.item(i).cources));
    //     }
    //     // this.dataName.push(result.rows.item(Namer));
    //   }
    //   this.Name_Item = null;
    // }, err => {
    //   console.error('Error: ' + err);
    // });

    // let name = this.Name_Item;
    // this.router.navigate(['show-infromation', name]);
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

  onSubmit(value: any): void {
        this.submitted = true;

        // Stop if the form validation has failed
        if (this.authname.invalid) {
            return;
        }
       

        
            // if(this.password==this.password_model){
            //     this.router.navigateByUrl('/home');
            //     console.log(this.password_model);
            // }
        let name = this.Name_Item;
        this.router.navigate(['show-infromation', name]);
        this.submitted=false;
        this.authname.reset();
    }

    ionViewWillEnter(){
   // your code to initialize
       this.submitted = false;
       this.authname.reset();
   }

   get frm() { return this.authname.controls; }
}
