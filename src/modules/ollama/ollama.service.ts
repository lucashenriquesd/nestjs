import { Injectable, MessageEvent } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { Readable } from 'stream';

@Injectable()
export class OllamaService {
  constructor(private readonly httpService: HttpService) { }

  generateStream(model: string, prompt: string): Observable<MessageEvent> {
    return new Observable<MessageEvent>((observer) => {
      this.httpService
        .post(
          'http://ollama:11434/api/generate',
          { model, prompt },
          { responseType: 'stream' },
        )
        .subscribe({
          next: (axiosResponse) => {
            const readable: Readable = axiosResponse.data;

            let buffer = '';

            readable.on('data', (chunk: Buffer) => {
              buffer += chunk.toString('utf8');

              const lines = buffer.split('\n');
              buffer = lines.pop() ?? '';

              for (const line of lines) {
                if (!line.trim()) continue;

                try {
                  const json = JSON.parse(line);

                  observer.next({ data: json.response });

                  if (json.done) {
                    observer.complete();
                  }
                } catch (err) {
                }
              }
            });

            readable.on('end', () => observer.complete());
            readable.on('error', (err: any) => observer.error(err));
          },
          error: (err) => {
            console.error('Error from Ollama request:', err);
            observer.error(err);
          },
        });
    });
  }
}
