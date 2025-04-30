import { Component, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PopoverModule } from 'primeng/popover';
import { CommonModule } from '@angular/common';
import { Popover } from 'primeng/popover';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface Member {
  name: string;
  image: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    DrawerModule,
    PopoverModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
  visible: boolean = false;
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  visible4: boolean = false;

  @ViewChild('op') op!: Popover;

  selectedMember: Member | null = null;

  members: Member[] = [
    {
      name: 'Amy Elsner',
      image: 'amyelsner.png',
      email: 'amy@email.com',
      role: 'Owner',
    },
    {
      name: 'Bernardo Dominic',
      image: 'bernardodominic.png',
      email: 'bernardo@email.com',
      role: 'Editor',
    },
    {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png',
      email: 'ioni@email.com',
      role: 'Viewer',
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  showDialog() {
    this.visible = true;
  }

  toggle(event: Event) {
    this.op.toggle(event);
  }

  selectMember(member: Member) {
    this.selectedMember = member;
    this.op.hide();
  }

  confirmPopup(event: Event) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: 'Save your current process?',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Save',
      rejectLabel: 'Cancel',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
