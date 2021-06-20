import { Component, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { ModalManager } from 'ngb-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent {
  title = 'Test';
  @ViewChild('myModal') myModal: any;
  private modalRef: any;

  form:FormGroup;

  constructor(private modalService: ModalManager, private userService: UserService) {
    this.buildForm();
   }

  // Modal
  openModal(){
    this.modalRef = this.modalService.open(this.myModal, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
  })
  }

  closeModal(){
    this.modalService.close(this.modalRef);
    this.form.reset()
  }

  // Form
  private buildForm(){
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      doc: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required])
    })
  }

  // Resources
  saveUser(data){
    console.log(data);
    
    this.userService.createUser(data).subscribe((data) => {
      alert('Usuario creado con exito');
      this.closeModal();
      
    }, error => {
      console.log(error.status);
    })
    this.closeModal();
  }
  
}
