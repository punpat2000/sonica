import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  imports: [],
  template: `
    <div class="placeholder-container">
      <div class="glass-card placeholder-card">
        <h1 class="placeholder-title">{{ title }}</h1>
        <p class="placeholder-text">{{ description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .placeholder-container {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    
    .glass-card {
      position: relative;
      z-index: 1;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      padding: 3rem;
      max-width: 800px;
      width: 100%;
      text-align: center;
    }
    
    .placeholder-title {
      font-size: 3rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 1.5rem 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
    
    .placeholder-text {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
    }
  `]
})
export class PlaceholderComponent implements OnInit {
  private route = inject(ActivatedRoute);

  title: string = 'Page Title';
  description: string = 'This page is coming soon.';

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.title = data['title'] || this.title;
    this.description = data['description'] || this.description;
  }
}
