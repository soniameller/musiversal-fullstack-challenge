import { JsonMusician } from '@shared-utils';
import Musician from '../database/models/musician';
import Schedule from '../database/models/schedule';
import Service from '../database/models/service';

export const fetchEnabledMusicians = async (): Promise<JsonMusician[]> => {
  try {
    const dbMusicians = await Musician.findAll({
      include: [
        {
          model: Schedule,
          attributes: ['dateTime'],
        },
        {
          model: Service,
          attributes: ['name'],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    return dbMusicians.map((musician) => musician.customJson);
  } catch (error) {
    console.error('Error fetching musicians from the database:', error);
    throw new Error('Failed to fetch musicians');
  }
};
