import {
  Injectable,
  CanActivate,
  Inject,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { StarterLinkService } from '../starterLink/starterLink.service';
import { Competition } from '../competition/competition.entity';
import { Grade } from './grade.entity';
import { AuthContext } from 'src/auth/types';

@Injectable()
export class GradeGuard implements CanActivate {
  @Inject()
  private starterLinkService: StarterLinkService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ectx = GqlExecutionContext.create(context);
    const args = ectx.getArgs();
    const ctx = ectx.getContext();

    if (args.data) {
      ctx.competition = args.data.competitionID;
      return true;
    }

    let competitions: Competition[] = [];
    if (args.grades) {
      const starterLinks = await Promise.all(
        args.grades.map((grade) =>
          this.starterLinkService.findOne(grade.starterlinkId),
        ),
      );
      competitions = await Promise.all(
        starterLinks.filter((link) => link).map((link) => link.competition),
      );
      if (competitions.length !== args.grades.length) {
        return false;
      }
    }
    let starterLinkIds: number[] = [];
    if(args.filter && args.filter.starterlinkIds) {
      starterLinkIds = args.filter.starterlinkIds;
    } else if (args.starterlinkIds) {
      starterLinkIds = args.starterlinkIds;
    }

    if (starterLinkIds.length > 0) {
      competitions = await Promise.all(
        starterLinkIds.map(
          async (id) =>
            await this.starterLinkService
              .findOne(id)
              .then(async (link) => link?.competition ?? null),
        ),
      );
    }

    // check if all competitions have the same ids
    const competitionIds = competitions
      .map((c) => c?.id ?? null)
      .filter((id) => id !== null);
    const allSameIds = competitionIds.every((id) => id === competitionIds[0]);

    if (!allSameIds) {
      return false;
    }

    ctx.competition = competitionIds[0];
    return true;
  }

  async canAccess(grades: Grade[], context: AuthContext): Promise<boolean> {
    for (const grade of grades) {
      const starterLink = await grade.starterlink;
      const competition = await starterLink.competition;
      if (context.competition && context.competition !== competition.id) {
        return false;
      }
    }
    return true;
  }
}
