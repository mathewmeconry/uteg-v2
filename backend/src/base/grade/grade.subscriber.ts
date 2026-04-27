import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Grade, GradePubSub, GradePubSubEvents } from './grade.entity';

@EventSubscriber()
export class GradeSubscriber implements EntitySubscriberInterface<Grade> {
  listenTo() {
    return Grade;
  }

  afterInsert(event: InsertEvent<Grade>): void | Promise<any> {
    GradePubSub.publish(GradePubSubEvents.CREATE, event.entity);
  }

  afterUpdate(event: UpdateEvent<Grade>): void | Promise<any> {
    GradePubSub.publish(GradePubSubEvents.UPDATE, event.entity);
  }
}
