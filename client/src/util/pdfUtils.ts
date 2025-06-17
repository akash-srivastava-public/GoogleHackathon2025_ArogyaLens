import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = pdfjsWorker as any;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onload = async function () {
      try {
        const typedArray = new Uint8Array(this.result as ArrayBuffer);
        const pdf = await getDocument(typedArray).promise;

        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }

        resolve(fullText);
      } catch (err) {
        reject(err);
      }
    };
    fileReader.readAsArrayBuffer(file);
  });
};
