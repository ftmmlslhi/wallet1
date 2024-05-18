import { Module } from "@nestjs/common";
import { prismaService } from "./prisma.service";

@Module({
    controllers: [],
    providers: [prismaService],
    exports: [prismaService],
})
export class PrismaModule{}