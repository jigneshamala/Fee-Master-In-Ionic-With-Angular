import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  databaseObj: SQLiteObject;
  readonly table_Student: string = 'stu';
  readonly table_Fee: string = 'fee';
  readonly database_name: string = 'fee.db';
  row_data: any = [];
  toast: any;
  mess: any;
  Name_Item = '';
  Installment_Item = '';
  myDate: String = new Date().toLocaleDateString();
  Name_Id: number;
  Mob: number;
  Name1: any;
  submitted = false;
  authname: FormGroup;
  Name_delect: any;

  constructor(private formBuilder: FormBuilder, public alertController: AlertController, public platform: Platform, private sqlite: SQLite, private router: Router, public toastController: ToastController) {
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


  public buttonClicked = false; // Whatever you want to initialise it as

  ngOnInit() {

    this.authname = this.formBuilder.group({
            name: ['', [Validators.required]],
        }, {});


  }

  search() {

    const name = this.Name_Item;
    this.router.navigate(['show-infromation', name]);

  }

 delect() {
            this.Name_delect = this.Name_Item;
            this.databaseObj.executeSql('DELETE FROM ' + this.table_Student + ' WHERE name=? ', [this.Name_Item])
              .then(res => {
              });
            this.databaseObj.executeSql('DELETE FROM ' + this.table_Fee + ' WHERE name=?', [this.Name_Item])
              .then(res => {
              })
              .catch(e => console.log(e));
            this.ionViewWillEnter();
            alert(JSON.stringify(this.Name_delect) +" Record is Deleted");
  }

  edit() {
    const name = this.Name_Item;
    this.router.navigate(['student-update', name]);
  }

  showall() {

    this.router.navigate(['show']);
    // this.mess="data is showing";
    // this.showToast();
  }

  async delectall() {

    const alert = await this.alertController.create({
      header: 'Are You Sure ?',
      subHeader: 'All Store Record Will Be Delected',
      cssClass: 'myalert',
      inputs: [
        {
          name: 'pass',
          placeholder: 'Enter Password',
          type: 'password',


        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            // this.mess = 'Cancel';
            // this.showToast();
          }
        }, {
          text: 'Delect',
          cssClass: 'delect',
          handler: (Values) => {
            this.Name1 = '1234';
            if (this.Name1 === Values.pass) {
              this.databaseObj.executeSql('DELETE FROM ' + this.table_Student + '')
                .then(res => {
                  console.log(res);
                  // this.getData();
                  // this.mess = 'Delete Records';
                  // this.showToast();
                });
              this.databaseObj.executeSql('DELETE FROM ' + this.table_Fee + '')
                .then(res => {
                  // console.log(res);
                  // this.getData();
                  // this.mess = 'Delete Records';
                  // this.showToast();
                })
                .catch(e => console.log(e));
              console.log('Confirm delect');
              this.mess = 'All Record Are Delected';
              this.showToast();
              this.ionViewWillEnter();
            } else {
              console.log('Password is wrong');
              this.mess = 'Password is wrong';
              this.showToast();
            }
          }
        }
      ],
    });

    await alert.present();
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
        if (value === 'search') {
            console.log('You click search');
            const name = this.Name_Item;
            this.router.navigate(['show-infromation', name]);
           // this.edit();
        }
        if (value === 'edit') {
            console.log('You click Edit');
            this.edit();
        }
        if (value === 'delect') {
            console.log('you click delect');
            this.delect();
        }



            // if(this.password==this.password_model){
            //     this.router.navigateByUrl('/home');
            //     console.log(this.password_model);
            // }

        this.submitted = false;
        this.authname.reset();

    }

    fetchData() {
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
          // this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_Student + ' (ID INTEGER PRIMARY KEY AUTOINCREMENT,name Text,gender Text,college text,study text,email text,mob text,address text,course text,total text,adm text,date DATETIME DEFAULT CURRENT_TIMESTAMP)', []);
          // tslint:disable-next-line: max-line-length
          // this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_Fee + '(ID INTEGER PRIMARY KEY AUTOINCREMENT,STUDENT_ID INTERGET REFERENCES ' + this.table_Student + '(ID),name Text,mob Text REFERENCES ' + this.table_Student + '(mob),installtion Text,date DATETIME DEFAULT CURRENT_TIMESTAMP)', []);
          // alert(' Database Created! and tabel Created');
          this.databaseObj.executeSql('SELECT ID,name,mob FROM ' + this.table_Student, [])
            .then((res) => {
              this.row_data = [];
              if (res.rows.length > 0) {
                for (let i = 0; i < res.rows.length; i++) {
                  this.row_data.push(res.rows.item(i));
                  this.Name_Id = res.rows.item(i).ID;
                 // this.Name_Item = res.rows.item(i).name;
                  this.Mob = res.rows.item(i).mob;
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

    

    ionViewWillEnter() {
   // your code to initialize
       this.submitted = false;
       this.authname.reset();
       this.fetchData();
   }

   get frm() { return this.authname.controls; }


}
