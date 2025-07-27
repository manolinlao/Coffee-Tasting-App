import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { tastingEvents, tastingStores } from '../../api/tasting/model';
import { authStores } from '../../shared/model/authModel';
import { TastingCard } from '../../shared/components/TastingCard';
import { NoEntries } from './NoEntries';
import { ListHeader } from './ListHeader';

export const TastingList = () => {
  const entries = useUnit(tastingStores.$tastingList);
  const getTastings = useUnit(tastingEvents.getTastings);
  const user = useUnit(authStores.$user);

  useEffect(() => {
    if (user) {
      getTastings(user.id);
    }
  }, [getTastings, user]);

  return (
    <div style={{ padding: '2rem' }}>
      {entries.length === 0 ? (
        <NoEntries />
      ) : (
        <div>
          <ListHeader />
          <div className="flex flex-col">
            {entries.map((entry) => (
              <TastingCard tastingEntry={entry} key={entry.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
