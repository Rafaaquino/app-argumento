import { Component, OnInit } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-extract-text',
  templateUrl: './extract-text.component.html',
  styleUrls: ['./extract-text.component.css']
})
export class ExtractTextComponent implements OnInit {
  selectedImage: any | File;
  extractedText: string = '';
  isProcessing = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
      this.extractedText = "";
    }
  }

  async extractText(): Promise<void> {

    const worker = await createWorker({
      logger: m => console.log(m)
    });

    try {
      await worker.loadLanguage('por');
      await worker.initialize('por');
      const { data: { text } } = await worker.recognize(this.selectedImage);
      console.log(text);
      this.extractedText = text;
    } catch (error) {
      console.error('Erro ao extrair texto:', error);
    } finally {
      await worker.terminate();
      this.isProcessing = false;
    }
  }

}
