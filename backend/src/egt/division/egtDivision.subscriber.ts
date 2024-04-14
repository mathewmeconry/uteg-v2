import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import {
  EGTDivision,
  EGTDivisionPubSub,
  EGTDivisionPubSubEvents,
} from './egtDivision.entity';

@EventSubscriber()
export class EGTDivisionSubscriber
  implements EntitySubscriberInterface<EGTDivision>
{
  listenTo() {
    return EGTDivision;
  }

  afterInsert(event: InsertEvent<EGTDivision>): void | Promise<any> {
    EGTDivisionPubSub.publish(EGTDivisionPubSubEvents.CREATE, event.entity);
  }

  afterUpdate(event: UpdateEvent<EGTDivision>): void | Promise<any> {
    EGTDivisionPubSub.publish(EGTDivisionPubSubEvents.UPDATE, event.entity);
  }

  beforeUpdate(event: UpdateEvent<EGTDivision>): void | Promise<any> {
    if (event.databaseEntity.state !== event.entity.state) {
      event.entity.lastStateTransition = new Date();
    }
  }
}
