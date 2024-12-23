import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

// Initialize OpenTelemetry tracing
const tracerProvider = new WebTracerProvider();

// Add a Span Processor and Exporter
tracerProvider.addSpanProcessor(
  new BatchSpanProcessor(new ConsoleSpanExporter())
);

// Register the Tracer Provider with global OpenTelemetry APIs
tracerProvider.register();

// Initialize automatic instrumentation
getWebAutoInstrumentations();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
