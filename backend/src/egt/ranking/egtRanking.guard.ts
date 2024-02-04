import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class EGTRankingGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const args = ctx.getArgs()

        if(args.competitionID) {
            ctx.getContext().competition = args.competitionID
            return true
        }

        return false
    }
}