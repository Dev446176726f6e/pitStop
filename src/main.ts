import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { bigIntMiddleware } from "./common/services/bigIntMiddleware";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.API_PORT || 3001;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  app.use(bigIntMiddleware());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle("Pitstop Service Center API")
    .setDescription("The API documentation for Pitstop CRM")
    .setVersion("1.0")
    // .addBearerAuth() // Add JWT Auth to Swagger UI
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  await app.listen(PORT, () => {
    console.log(`Server working at http://localhost:${PORT}`);
  });
}
bootstrap();
