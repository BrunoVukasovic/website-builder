import { PageSegment } from '../../../models';

export interface CurrentSegment extends PageSegment {
  position: number;
  content: string;
  type: 'text' | 'image';
  shouldEdit?: boolean;
  shouldMoveUp?: boolean;
  shouldMoveDown?: boolean;
  shouldDelete?: boolean;
}

export const initialCurrentSegment: CurrentSegment = {
  position: 0,
  content: '',
  type: 'text',
};
