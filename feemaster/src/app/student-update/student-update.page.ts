import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.page.html',
  styleUrls: ['./student-update.page.scss'],
})
export class StudentUpdatePage implements OnInit {

  submitted = false;
  authForm: FormGroup;

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
  Name_model = '';
  gender_model = '';
  Clg_name_model = '';
  email_model = '';
  study_in_model = '';
  Mnumber_model = '';
  Address_model = '';
  Cources_model = '';
  Tfee_model = '';
  Afee_model = '';

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,private Arouter: ActivatedRoute , public platform: Platform,private sqlite: SQLite,private router: Router,public toastController: ToastController) {
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
          const querys = 'SELECT * FROM ' + this.table_Student + ' WHERE name=?';
          this.databaseObj.executeSql(querys, [this.name]).then((res) => {
            this.row_data = [];
            if (res.rows.length > 0) {
              for (let i = 0; i < res.rows.length; i++) {
                this.row_data.push(res.rows.item(i));
                this.Name_model = res.rows.item(0).name;
                this.gender_model=res.rows.item(0).gender;
                this.Clg_name_model = res.rows.item(0).college;
                this. email_model = res.rows.item(0).email;
                this. study_in_model =res.rows.item(0).study;
                this. Mnumber_model = res.rows.item(0).mob;
                this. Address_model = res.rows.item(0).address;
                this. Cources_model = res.rows.item(0).course;
                this. Tfee_model = res.rows.item(0).total;
                this.Afee_model = res.rows.item(0).adm;
                this.student_adm = parseInt(res.rows.item(0).adm);
                this.student_total = parseInt(res.rows.item(0).total);
              }
            }

          });
        }).catch(error => {
          console.log(error);
        });
      });
   }

  ngOnInit() {
    //this.Name1 = this.Name_Item;
    this.authForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      gender: ['', [Validators.required]],
      college: ['', [Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      study: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      address: ['', [Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      cources: ['', [Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      total_fee: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      addmission_fee: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[0-9]*')]]

      // password: ['', [Validators.required, Validators.minLength(6)]]
    }, {});
  }

  updateRow(){
          // tslint:disable-next-line: max-line-length
          this.databaseObj.executeSql('UPDATE ' + this.table_Student + ' SET gender=?,college=?,email=?,study=?,mob=?,address=?,course=?,total=?,adm=? WHERE name=?',[this.gender_model,this.Clg_name_model,this.email_model,this.study_in_model,this.Mnumber_model,this.Address_model,this.Cources_model,this.Tfee_model,this.Afee_model,this.name])
          .then(() => {
            // alert('Row Inserted!');
             // this.getRows();
            //  this.mess="Student Detail Update";
            //  this.showToast();
            alert(this.name + " Detail Update");
             this.Reset();
           })
           .catch(e => {
             console.log('error ' + JSON.stringify(e));
             alert('error ' + JSON.stringify(e));
           });
  }
  Show(){
    this.router.navigate(['show']);
    // this.mess="data is showing";
    // this.showToast();
  }

  showToast() {
    this.toast = this.toastController.create({
      message: this.mess,
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  Reset(){
    this.Name_model = null;
    this.gender_model = null;
    this.Clg_name_model = null;
    this.email_model = null;
    this.study_in_model = null;
    this.Mnumber_model = null;
    this.Address_model = null;
    this.Cources_model = null;
    this.Tfee_model = null;
    this.Afee_model = null;
   }

   onSubmit(value: any): void {
    this.submitted = true;

    // Stop if the form validation has failed
    if (this.authForm.invalid) {
      return;
    }
    this.updateRow();
    this.submitted=false;
    this.authForm.reset();
}

ionViewWillEnter(){
// your code to initialize
   this.submitted = false;
   this.authForm.reset();
}

  get frm() { return this.authForm.controls; }
}
