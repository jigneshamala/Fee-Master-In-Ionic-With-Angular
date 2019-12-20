import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-registraion",
  templateUrl: "./registraion.page.html",
  styleUrls: ["./registraion.page.scss"]
})
export class RegistraionPage implements OnInit {
  submitted = false;
  authForm: FormGroup;

  databaseObj: SQLiteObject;
  readonly table_Student: string = "stu";
  readonly table_Fee: string = "fee";
  Name_model = "";
  gender_model = "";
  Clg_name_model = "";
  email_model = "";
  study_in_model = "";
  Mnumber_model = "";
  Address_model = "";
  Cources_model = "";
  Tfee_model = "";
  Afee_model = "";
  myDate: String = new Date().toLocaleDateString();
  readonly database_name: string = "fee.db";
  toast: any;
  mess: any;
  row_data: any = [];
  Name_Item = "";
  Installment_Item = "";
  Name_Id: number;
  Mob: number;
  Name1: any;
  static checkUsername: any;

  constructor(
    private formBuilder: FormBuilder,
    public platform: Platform,
    private sqlite: SQLite,
    private router: Router,
    public toastController: ToastController
  ) {
    // this.platform.ready().then(() => {
    //   this.sqlite.create({
    //     name: this.database_name,
    //     location: 'default'
    //   })
    //     .then((db: SQLiteObject) => {
    //       this.databaseObj = db;
    //       // tslint:disable-next-line: max-line-length
    //       // this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS jignesh (pid INTEGER PRIMARY KEY AUTOINCREMENT , Name varchar(255),Gender varchar(10),cources varchar(15))', [])
    //       // tslint:disable-next-line: max-line-length
    //       this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_Student + ' (ID INTEGER PRIMARY KEY AUTOINCREMENT,name Text,gender Text,college text,study text,email text,mob text,address text,course text,total text,adm text,date DATETIME DEFAULT CURRENT_TIMESTAMP)', []);
    //       // tslint:disable-next-line: max-line-length
    //       this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_Fee + '(ID INTEGER PRIMARY KEY AUTOINCREMENT,STUDENT_ID INTERGET REFERENCES' + this.table_Student + '(ID),name Text,mob Text REFERENCES ' + this.table_Student + '(mob),installtion Text,date DATETIME DEFAULT CURRENT_TIMESTAMP)', []);
    //       //alert(' Database Created! and tabel Created');
    //       this.mess = "Database Created! and tabel Created";
    //     })
    //     .catch(e => {
    //       alert('error ' + JSON.stringify(e));
    //     });
    // }).catch(error => {
    //   console.log(error);
    // });
  }

  ngOnInit() {
    this.Name1 = this.Name_Item;
    this.authForm = this.formBuilder.group(
      {
        name: ["", [
          Validators.maxLength(30),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required]
        ],
        gender: ["", [Validators.required]],
        college: [
          "",
          [
            Validators.maxLength(30),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ]
        ],
        email: ["", [Validators.required, Validators.email]],
        study: ["", [Validators.required]],
        mobile: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern("[0-9]*")
          ]
        ],
        address: [
          "",
          [
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ]
        ],
        cources: [
          "",
          [
            Validators.maxLength(30),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ]
        ],
        total_fee: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
            Validators.pattern("[0-9]*")
          ]
        ],
        addmission_fee: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
            Validators.pattern("[0-9]*")
          ]
        ]

        // password: ['', [Validators.required, Validators.minLength(6)]]
      },
      {}
    );
  }

  // insertRow() {
  //   // tslint:disable-next-line: max-line-length
  //   if (!this.Name_model.length && !this.Clg_name_model.length && !this.email_model.length && !this.Mnumber_model.length && !this.Address_model.length && !this.Cources_model.length && !this.Tfee_model.length && !this.Afee_model.length) {
  //     this.mess="Fill all the Detail";
  //     this.showToast();
  //     return;
  //   }

  //   // "INSERT OR IGNORE INTO Results(AuditID,CriteriaID,ChapterID,Api_key) VALUES("+auditid+","+crit_id+","+current_chap+",`"+apikey+"`)";
  //   // tslint:disable-next-line: max-line-length
  //   this.databaseObj.executeSql('INSERT OR IGNORE INTO ' + this.table_Student + '(name ,gender ,college ,study ,email ,mob ,address ,course ,total ,adm ,date) VALUES("' + this.Name_model + '","' + this.gender_model + '","' + this.Clg_name_model + '","' + this.email_model + '","' + this.study_in_model + '","' + this.Mnumber_model + '","' + this.Address_model + '","' + this.Cources_model + '","' + this.Tfee_model + '","' + this.Afee_model + '","' + this.myDate + '")', [])
  //     .then(() => {
  //      // alert('Row Inserted!');
  //       // this.getRows();
  //       this.mess="Student Detail Register";
  //       this.showToast();
  //       this.Reset();
  //     })
  //     .catch(e => {
  //       console.log('error ' + JSON.stringify(e));
  //       alert('error ' + JSON.stringify(e));
  //     });
  // }

  Show() {
    this.router.navigate(["show"]);
    // this.mess = "data is showing";
    // this.showToast();
  }

  showToast() {
    this.toast = this.toastController
      .create({
        message: this.mess,
        duration: 2000
      })
      .then(toastData => {
        console.log(toastData);
        toastData.present();
      });
  }
  HideToast() {
    this.toast = this.toastController.dismiss();
  }

  Reset() {
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

    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: this.database_name,
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          this.databaseObj
            .executeSql("SELECT ID,name,mob FROM " + this.table_Student, [])
            .then(res => {
              this.row_data = [];
              if (res.rows.length > 0) {
                for (let i = 0; i < res.rows.length; i++) {
                  this.row_data.push(res.rows.item(i));
                  this.Name_Id = res.rows.item(i).ID;
                  this.Name_Item = res.rows.item(i).name;
                  this.Mob = res.rows.item(i).mob;
                  // for (let j = 0; j < res.rows.item().name; j++) {
                  if (res.rows.item(i).name == this.Name_model) {
                    this.Name1 = res.rows.item(i).name;
                    alert(res.rows.item(i).name + " Name is All Ready Taken");
                  }
                }
              }
              // }
            })
            .catch(e => {
              alert("error " + JSON.stringify(e));
            });
        });
    });

    // if (this.Name1 == this.Name_model) {
    //  // this.router.navigateByUrl('/home');
    //   console.log(this.Name_Item +"Name is All Ready Taken");
    //   this.mess(this.Name_Item +"Name is All Ready Taken");
    //   this.Show();
    // }
    // this.mess(this.Name_Item);
    // this.showToast();
    if (this.Name1 != this.Name_model) {
      // "INSERT OR IGNORE INTO Results(AuditID,CriteriaID,ChapterID,Api_key) VALUES("+auditid+","+crit_id+","+current_chap+",`"+apikey+"`)";
      // tslint:disable-next-line: max-line-length
      this.databaseObj
        .executeSql(
          "INSERT OR IGNORE INTO " +
          this.table_Student +
          '(name ,gender ,college ,email ,study ,mob ,address ,course ,total ,adm ,date) VALUES("' +
          this.Name_model +
          '","' +
          this.gender_model +
          '","' +
          this.Clg_name_model +
          '","' +
          this.email_model +
          '","' +
          this.study_in_model +
          '","' +
          this.Mnumber_model +
          '","' +
          this.Address_model +
          '","' +
          this.Cources_model +
          '","' +
          this.Tfee_model +
          '","' +
          this.Afee_model +
          '","' +
          this.myDate +
          '")',
          []
        )
        .then(() => {
          // alert('Row Inserted!');
          // this.getRows();
          //this.mess = "Student Detail Register";
         // this.showToast();
          alert("Student Detail Register");
          this.Reset();
          this.submitted = false;
          this.authForm.reset();
        })
        .catch(e => {
          console.log("error " + JSON.stringify(e));
          alert("error " + JSON.stringify(e));
        });
    }
    this.submitted = false;
    this.authForm.reset();
  }

  ionViewWillEnter() {
    // your code to initialize
    this.submitted = false;
    this.authForm.reset();
  }

  get frm() {
    return this.authForm.controls;
  }
}
