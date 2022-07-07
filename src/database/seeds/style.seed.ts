import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Style } from 'src/styles/entities/style.entity';
import { StyleEnum } from 'src/styles/styles.enum';

export default class CreateStyle implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(Style, 'Style')
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Style)
        .values([
          { id: StyleEnum.minimalism, name: 'minimalism' },
          { id: StyleEnum.vintage, name: 'vintage' },
          { id: StyleEnum.military, name: 'military' },
          { id: StyleEnum.punk, name: 'punk' },
          { id: StyleEnum.casual, name: 'casual' },
          { id: StyleEnum.street, name: 'street' },
          { id: StyleEnum.normcore, name: 'normcore' },
          { id: StyleEnum.modern, name: 'modern' },
          { id: StyleEnum.dandy, name: 'dandy' },
          { id: StyleEnum.classic, name: 'classic' },
          { id: StyleEnum.workwear, name: 'workwear' },
        ])
        .execute();
    }
  }
}