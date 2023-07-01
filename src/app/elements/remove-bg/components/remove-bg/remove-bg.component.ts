import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { RemoveBgService } from '../../service/remove-bg.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-remove-bg',
  templateUrl: './remove-bg.component.html',
  styleUrls: ['./remove-bg.component.css']
})
export class RemoveBgComponent implements OnInit {
  imageSrc: any | ArrayBuffer | null = null ;
  backgroundRemovedImageSrc: any | ArrayBuffer | null = null;
  downloadedImageSrc: any | ArrayBuffer | null = null;
  isDraggingOver = false;

  constructor(private removeBgService: RemoveBgService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      this.previewImage(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeBackground() {
    if (!this.imageSrc) {
      return;
    }

    this.removeBgService.removeBackground(this.imageSrc)
      .subscribe((response: Blob) => {

        this.backgroundRemovedImageSrc = URL.createObjectURL(response);
        this.downloadedImageSrc = this.sanitizer.bypassSecurityTrustUrl(this.backgroundRemovedImageSrc);
        console.log('img', response, "url", this.backgroundRemovedImageSrc);
        this.downloadBackgroundRemovedImage();
      }, (error) => {
        console.log('Erro ao remover o plano de fundo:', error);
      });
  }

  downloadBackgroundRemovedImage() {
    if (!this.backgroundRemovedImageSrc) {
      return;
    }

    this.removeBgService.downloadImage(this.backgroundRemovedImageSrc)
      .subscribe((response: Blob) => {
        this.downloadedImageSrc = this.sanitizer.bypassSecurityTrustUrl(this.backgroundRemovedImageSrc);
        saveAs(response, 'imagem_sem_background.png');
        console.log(response)
      }, (error) => {
        console.log('Erro ao fazer o download da imagem sem o background:', error);
      });
  }

}


