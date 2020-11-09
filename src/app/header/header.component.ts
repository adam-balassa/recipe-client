import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { disappear } from '../animations/animation';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [disappear(400, 0, 'Y', 'fade'), disappear(400, -100, 'Y', 'disappear')]
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  isLoading = false;
  modalOpen = false;
  streetKitchenUrl = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  open(): void {
    this.modalOpen = true;
  }

  close(): void {
    this.modalOpen = false;
  }

  download(): void {
    this.isLoading = true;
    this.subscription = this.api.addSKRecipe(this.streetKitchenUrl).subscribe(recipe => {
      this.modalOpen = false;
      this.isLoading = false;
      this.router.navigate(['/recipe', recipe.id]);
    }, error => this.isLoading = false);
  }

  next(): void {
    this.modalOpen = false;
    this.router.navigateByUrl('/new');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
