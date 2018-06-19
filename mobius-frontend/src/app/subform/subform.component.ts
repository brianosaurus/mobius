import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-subform',
  templateUrl: './subform.component.html',
  styleUrls: ['./subform.component.sass']
})

export class SubformComponent implements OnInit {
  @Input() email: string;
  @Input() id: number;

  private amount: number;

  @Output() onFormResult = new EventEmitter<any>();

  constructor(public tokenAuthService:Angular2TokenService, private usersService:UsersService) { }

  ngOnInit() {
  }

  onSubFormSubmit() {
    this.usersService.sendToUser(this.tokenAuthService, this.id, this.amount).subscribe(
      res => {
        if (res.status == 204) {
          alert('funds sent');
          this.onFormResult.emit({sent: "yes"});
        }
      },

      err => {
        debugger;
        alert("error sending");
      }
    )
  }

}
