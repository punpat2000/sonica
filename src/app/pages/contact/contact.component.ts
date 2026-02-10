import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InitialsPipe } from '../../pipes/initials.pipe';

export interface TeamMember {
  name: string;
  role: string;
  email?: string;
  imageUrl?: string;
  /** URL to this person's digital business card. */
  businessCardUrl?: string;
}

@Component({
  selector: 'app-contact',
  imports: [NgOptimizedImage, InitialsPipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly email = 'info@sonica.co.th';
  readonly phone = '+66 81 754 4363';
  readonly phoneTel = 'tel:+66817544363';

  readonly teamMembers: TeamMember[] = [
    {
      name: $localize`:@@contact.team.pisut.name:Pisut Punvichartkul`,
      role: $localize`:@@contact.team.pisut.role:General Manager`,
      email: 'ppisut@gmail.com',
      imageUrl: 'images/contact/pisut.webp',
      businessCardUrl: 'https://pisut.sonica.co.th',
    },
    {
      name: $localize`:@@contact.team.saint.name:Pattradanai Punvichartkul (Saint)`,
      role: $localize`:@@contact.team.saint.role:Sales & Technical Support`,
      email: 'pattradanai@sonica.co.th',
      imageUrl: 'images/contact/saint.webp',
      businessCardUrl: 'https://saint.sonica.co.th',
    },
    {
      name: $localize`:@@contact.team.little.name:Nuthanicha Pasithbhattarabhorn (Little)`,
      role: $localize`:@@contact.team.little.role:Marketing`,
      email: 'nuthanicha@sonica.co.th',
      imageUrl: 'images/contact/little.webp',
      businessCardUrl: 'https://little.sonica.co.th',
    },
  ];

  readonly socialLinks = [
    { href: 'https://www.facebook.com/sonica.thailand', ariaLabel: 'Facebook', iconPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { href: 'https://www.linkedin.com/company/sonica-thailand', ariaLabel: 'LinkedIn', iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { href: 'https://www.youtube.com/@SonicaThailand', ariaLabel: 'YouTube', iconPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  ];
}
