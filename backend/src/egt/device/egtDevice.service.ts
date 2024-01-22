import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGTDevice } from './egtDevice.entity';
import { Repository } from 'typeorm';
import { Competition } from 'src/base/competition/competition.entity';
import { EGTDeviceAggregationMode } from './egtDevice.types';

@Injectable()
export class EGTDeviceService {
  @InjectRepository(EGTDevice)
  private egtDeviceRepository: Repository<EGTDevice>;

  create(device: EGTDevice): Promise<EGTDevice> {
    return this.egtDeviceRepository.save(device);
  }

  findOne(id: number): Promise<EGTDevice> {
    return this.egtDeviceRepository.findOneBy({ id });
  }

  findForCompetition(id: number): Promise<EGTDevice[]> {
    return this.egtDeviceRepository
      .createQueryBuilder('device')
      .leftJoin('device.competition', 'competition')
      .where('competition.id = :id', { id })
      .getMany();
  }

  async initCompetition(competition: Competition): Promise<void> {
    const promises: Promise<EGTDevice>[] = [];
    // create for each device a new entity
    const horizontalBar = new EGTDevice();
    horizontalBar.competition = Promise.resolve(competition);
    horizontalBar.device = 0;
    promises.push(this.create(horizontalBar));

    const floor = new EGTDevice();
    floor.competition = Promise.resolve(competition);
    floor.device = 1;
    promises.push(this.create(floor));

    const rings = new EGTDevice();
    rings.competition = Promise.resolve(competition);
    rings.device = 2;
    promises.push(this.create(rings));

    const vault = new EGTDevice();
    vault.competition = Promise.resolve(competition);
    vault.device = 3;
    vault.inputs = 2;
    vault.aggregationMode = EGTDeviceAggregationMode.MAX;
    vault.overrides = [
      {
        aggregationMode: EGTDeviceAggregationMode.AVG,
        category: 6,
        inputs: 2,
      },
      {
        aggregationMode: EGTDeviceAggregationMode.AVG,
        category: 7,
        inputs: 2,
      },
      {
        aggregationMode: EGTDeviceAggregationMode.AVG,
        category: 8,
        inputs: 2,
      },
    ];
    promises.push(this.create(vault));

    const parallelBars = new EGTDevice();
    parallelBars.competition = Promise.resolve(competition);
    parallelBars.device = 4;
    promises.push(this.create(parallelBars));

    await Promise.all(promises);
  }
}
