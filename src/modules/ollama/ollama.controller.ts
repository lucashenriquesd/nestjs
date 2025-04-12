import { Controller, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OllamaService } from './ollama.service';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) { }

  @Post('stream')
  @Sse()
  generate(@Body() body: { model: string; prompt: string }): Observable<MessageEvent> {
    const { model, prompt } = body;
    return this.ollamaService.generateStream(model, prompt);
  }
}
