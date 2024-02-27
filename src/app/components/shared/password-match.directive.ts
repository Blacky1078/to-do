import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('passwordFormControl');
    const confirmPassword = control.get('repasswordFormControl');

    if(!password || !confirmPassword){
        return null;
    }else{
        return password.value === confirmPassword.value ? null : {passwordMismatch: true}
    }

    
}