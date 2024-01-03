import { Resolver } from "@nestjs/graphql";
import { EGTLineup } from "./egtLineup.entity";
import { UseGuards } from "@nestjs/common";
import { EGTLineupGuard } from "./egtLineup.guard";
import { RoleGuard } from "src/auth/guards/role.guard";

@Resolver(EGTLineup)
@UseGuards(EGTLineupGuard, RoleGuard)
export class EGTLineupResolver {
    
}