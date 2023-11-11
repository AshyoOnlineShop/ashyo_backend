import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DeliverMailService } from "./mail.service";



@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get<string>("MAILER_HOST"),
                    secure: false,
                    auth: {
                        user: config.get<string>("MAILDEV_USER"),
                        pass: config.get<string>("MAILDEV_PASS")
                    },
                },
                defaults: {
                    from: `"Ashyo" <${config.get("MAILER_HOST")}>`
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    _adapter: new HandlebarsAdapter(),
                    get adapter() {
                        return this._adapter;
                    },
                    set adapter(value) {
                        this._adapter = value;
                    },
                    template: 'confirmation',
                    options: {
                        strict: true
                    },
                },
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [DeliverMailService],
    exports: [DeliverMailService]
})
export class DeliverMailModule {}