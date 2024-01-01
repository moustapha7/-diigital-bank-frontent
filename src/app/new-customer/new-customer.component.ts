import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  providers: [CustomerService],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit {


  newCustomerFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, private customerService : CustomerService, private router: Router){}


  ngOnInit(): void {

    this.newCustomerFormGroup = this.fb.group({
      nom : this.fb.control(null, [Validators.required,Validators.minLength(3)]),
      email : this.fb.control(null,[Validators.required, Validators.email])
    });
  }

  handleSaveCustomer() {
   let customer:Customer =  this.newCustomerFormGroup.value;
   this.customerService.saveCustomer(customer).subscribe({
    next : data =>{
      alert("Customer saved succesfully");
      this.newCustomerFormGroup.reset();
      this.router.navigateByUrl("/customers");
    },
    //error : err=>{
      //  console.log(err) 
   })
  }

}
