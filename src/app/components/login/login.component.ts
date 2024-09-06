import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  isloading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  get email() {
    return this.loginForm.controls["email"];
  }
  get password() {
    return this.loginForm.controls["password"];
  }

  loginUser() {
    this.isloading = true;
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.loginUser({ email, password }).subscribe(
        (response: any) => {
          this.messageService.add({
            key: "bc",
            severity: "success",
            summary: "Success",
            detail: "User logged in Successfully.",
          });
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("isLogged", "true");
          sessionStorage.setItem("token", response.data.token);
          this.router.navigate(["/home"]);
          this.isloading = false;
        },
        (err) => {
          this.messageService.add({
            key: "bc",
            severity: "error",
            summary: "Failure",
            detail: "Invalid Password or Email.",
          });
          this.isloading = false;
        }
      );
    } else {
      this.messageService.add({
        key: "bc",
        severity: "error",
        summary: "Failure",
        detail: "Enter Valid Password or Email.",
      });
    this.isloading = false;
    }
  }
}
