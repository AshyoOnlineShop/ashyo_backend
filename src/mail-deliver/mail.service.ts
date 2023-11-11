import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from "@nestjs/common";
import { Stuff } from "../stuff/model/stuff.model";

@Injectable()
export class DeliverMailService{
    constructor (private mailerService: MailerService){}

    async sendUserConfirmation(user: Stuff): Promise<void>{
        const url = `${process.env.API_HOST}/deliver-auth/activate/${user.activation_link}`
        // console.log(url);
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Welcome to Ashyo App! Confirm your Email!",
            template: "./confirmation",
            context: {
                name: user.first_name,
                url
            },
        })
    }
}