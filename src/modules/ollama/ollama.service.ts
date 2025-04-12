import { Injectable, MessageEvent } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom  } from 'rxjs';
import { Readable } from 'stream';

@Injectable()
export class OllamaService {
  constructor(private readonly httpService: HttpService) { }

  async onModuleInit() {
    try {
      const res = await firstValueFrom(
        this.httpService.post('http://ollama:11434/api/generate', {
          model: 'gemma3:1b',
          prompt: 'ping',
          stream: false
        })
      );

      if (res.status === 200 && res.data?.response) {
        console.log('Ollama is reachable and responded.');
      } else {
        console.warn('Ollama responded but unexpectedly:', res.status, res.data);
      }
    } catch (err: any) {
      console.error('Failed to connect to Ollama:', err.message ?? err);
    }
  }

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
