import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  SoftRemoveEvent,
  RecoverEvent,
} from 'typeorm';
import {
  EGTStarterLink,
  EGTStarterLinkPubSub,
  EGTStarterLinkPubSubEvents,
} from './egtStarterLink.entity';

@EventSubscriber()
export class EGTStarterLinkSubscriber
  implements EntitySubscriberInterface<EGTStarterLink>
{
  listenTo() {
    return EGTStarterLink;
  }

  afterInsert(event: InsertEvent<EGTStarterLink>): void | Promise<any> {
    EGTStarterLinkPubSub.publish(
      EGTStarterLinkPubSubEvents.CREATE,
      event.entity,
    );
  }

  afterUpdate(event: UpdateEvent<EGTStarterLink>): void | Promise<any> {
    EGTStarterLinkPubSub.publish(
      EGTStarterLinkPubSubEvents.UPDATE,
      event.entity,
    );
  }

  afterSoftRemove(event: SoftRemoveEvent<EGTStarterLink>): void | Promise<any> {
    EGTStarterLinkPubSub.publish(
      EGTStarterLinkPubSubEvents.DELETE,
      event.entity,
    );
  }

  afterRecover(event: RecoverEvent<EGTStarterLink>): void | Promise<any> {
    EGTStarterLinkPubSub.publish(
      EGTStarterLinkPubSubEvents.CREATE,
      event.entity,
    );
  }
}
