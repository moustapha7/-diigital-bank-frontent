import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  providers:  [ CustomerService ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {



  customers! :  Observable<Array<Customer>>;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined;
  constructor (private customerService : CustomerService, private fb : FormBuilder){}


  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
        keyword : this.fb.control("")
    });

    this.customers  = this.customerService.getCustomers().pipe(
      catchError(err=>{
        this.errorMessage = err.message;
       return throwError(err);
      })
    );
    // this.customerService.getCustomers().subscribe(data=>{
    //   this.customers = data;
    // },error=>{
    //   this.errorMessage = error;    });
  }

  handleSearchCustomers() {

      let kw = this.searchFormGroup?.value.keyword;
      this.customers  = this.customerService.searchCustomers(kw).pipe(
        catchError(err=>{
          this.errorMessage = err.message;
         return throwError(err);
        })
      );
  }

  handleDeleteCustomer(c : Customer) {
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp) =>{
        alert("Customer deleted succesfully");

        this.handleSearchCustomers();
      },
      error : err =>{
        console.log(err);
      }
    });
  }

}
