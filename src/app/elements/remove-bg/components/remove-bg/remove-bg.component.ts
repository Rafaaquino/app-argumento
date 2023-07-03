import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { RemoveBgService } from '../../service/remove-bg.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-remove-bg',
  templateUrl: './remove-bg.component.html',
  styleUrls: ['./remove-bg.component.css']
})
export class RemoveBgComponent implements OnInit {
  imageSrc: any | ArrayBuffer | null = null ;
  backgroundRemovedImageSrc: any | ArrayBuffer | null = null;
  downloadedImageSrc: any | ArrayBuffer | null = null;
  imgFile: any;
  loading: boolean = false
  isload: boolean = false;
  isDraggingOver = false;

  constructor(
    private removeBgService: RemoveBgService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;
    console.log("entrou no onFileDrop");

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      this.imgFile = file
      this.previewImage(file);
      this.removeBackground();
    }

  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = true;
    console.log("entrou no onDragOver");
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;
    console.log("entrou no onDragOver");
  }

  private previewImage(file: File) {
    console.log("file", file);
    this.imgFile = file
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
      this.removeBackground();
      this.loading = true
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
        this.loading = false;
        this.isload = true;
      }, (error) => {
        this.loading = false;
        console.log('Erro ao remover o plano de fundo:', error);

        if(error.status == 402){
          this.showError("Conta sem crédito");
        }
        else if (error.status == 400) {
          this.showError("Tamanho da imagem muito grande!");
        }
        else {
          this.showError("Ocorreu um erro ao ler a imagem");
        }

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

  restart() {
    this.isload = false;
  }

  showError(msg: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: msg});
  }

  aroundMath(valor: number){
    const pixels = (valor / 1024);
    return Math.round(pixels);
  }

}


