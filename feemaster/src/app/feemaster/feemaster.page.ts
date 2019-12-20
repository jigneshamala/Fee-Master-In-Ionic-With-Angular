import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-feemaster',
  templateUrl: './feemaster.page.html',
  styleUrls: ['./feemaster.page.scss'],
})
export class FeemasterPage implements OnInit {

   submitted = false;
	authname: FormGroup;

  databaseObj: SQLiteObject;
  readonly table_Student: string = 'stu';
  readonly table_Fee: string = 'fee';
  readonly database_name: string = 'fee.db';
  row_data: any = [];
   row_datas: any = [];
  toast: any;
  mess: any;
  Name_Item = '';
  Installment_Item = '';
  myDate: String = new Date().toLocaleDateString();
  Name_Id: number;
  Mob: number;
  name_display:any;


  constructor(private formBuilder: FormBuilder, public platform: Platform, private sqlite: SQLite, private router: Router, public toastController: ToastController) {
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
          this.databaseObj.executeSql('SELECT * FROM ' + this.table_Student + ' ORDER BY name ASC'  , [])
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

  ngOnInit() {

    this.authname = this.formBuilder.group({
            name: ['', [Validators.required]],
            Installment:['',[Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[0-9]*')]]
        }, {});

  }

  insertRowFee() {
    // if (!this.Name_Item && !this.Installment_Item.l && !this.Mob.length && !this.Mnumber_model.length && !this.Address_model.length && !this.Cources_model.length && !this.Tfee_model.length && !this.Afee_model.length) {
    //   this.mess="Fill all the Detail";
    //   this.showToast();
    //   return;
    // }

    // "INSERT OR IGNORE INTO Results(AuditID,CriteriaID,ChapterID,Api_key) VALUES("+auditid+","+crit_id+","+current_chap+",`"+apikey+"`)";
    // tslint:disable-next-line: max-line-length
    // this.databaseObj.executeSql('INSERT OR IGNORE INTO ' + this.table_Fee + '(STUDENT_ID,name,mob,installtion,date) VALUES("' + this.Name_Id + '","' + this.Name_Item + '","' + this.Mob + '","' + this.Installment_Item + '","' + this.myDate + '")', [])
    //   .then(() => {
    //    // alert('Row Inserted!');
    //     // this.getRows();
    //     this.mess ='Fee Insert';
    //     this.showToast();
    //     this.Reset();
    //   })
    //   .catch(e => {
    //     console.log('error ' + JSON.stringify(e));
    //     alert('error ' + JSON.stringify(e));
    //   });
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

  ShowFee() {
    this.router.navigate(['show-fee']);
  }

  Reset() {
    this.Name_Item = null;
    this.Installment_Item = null;
  }

   onSubmit(value: any): void {
        this.submitted = true;

        // Stop if the form validation has failed
        if (this.authname.invalid) {
            return;
        }

        
          // tslint:disable-next-line: max-line-length
        this.databaseObj.executeSql('INSERT OR IGNORE INTO ' + this.table_Fee + '(STUDENT_ID,name,mob,installtion,date) VALUES("' + this.Name_Id + '","' + this.Name_Item + '","' + this.Mob + '","' + this.Installment_Item + '","' + this.myDate + '")', [])
      .then(() => {
       // alert('Row Inserted!');
        // this.getRows();
        // this.mess = "Fee Insert";
        // this.showToast();
      
         alert(" Fee Installment is Insert");
        this.Reset();
      })
      .catch(e => {
        console.log('error ' + JSON.stringify(e));
        alert('error ' + JSON.stringify(e));
      });
        
        

            // if(this.password==this.password_model){
            //     this.router.navigateByUrl('/home');
            //     console.log(this.password_model);
            // }
        // const name = this.Name_Item;
        // this.router.navigate(['show-infromation', name]);
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
