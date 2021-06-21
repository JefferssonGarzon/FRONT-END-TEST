import { Component, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { ModalManager } from 'ngb-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserComponent } from './user/user.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent {
  title = 'Test';

  @ViewChild('myModal') myModal: any;
  @ViewChild('modalConfirm') modalConfirm: any;

  @ViewChild(UserComponent) userC: UserComponent;

  private modalRef: any;

  form:FormGroup;

  constructor(private modalService: ModalManager, private userService: UserService) {
    this.buildForm();
   }

  // Modal
  openModal(){
    this.modalRef = this.modalService.open(this.myModal, {
      size: "sm",
      modalClass: 'myModal',
      hideCloseButton: true,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
  })
  }

  closeModal(){
    this.modalService.close(this.modalRef);
    this.form.reset()
  }

  openModalConfirm(){
    this.modalRef = this.modalService.open(this.modalConfirm, {
      size: "sm",
      modalClass: 'modalConfirm',
      hideCloseButton: true,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
    })
  }

  closeModalConfirm(){
    this.modalService.close(this.modalRef);
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
      // alert('Usuario creado con exito');
      this.closeModal();
      this.openModalConfirm();
      this.userC.getUsers();
      
    }, error => {
      console.log(error.status);
    })
    this.closeModal();
  }
  
}
