import React, { useContext } from 'react';
import Dropdown from './Dropdown';
import { Route, Switch } from 'react-router-dom';
import { NationalLeft, NationalRight } from './NationalView';
import { ProvincialLeft, ProvincialRight } from './ProvincialView';
import MapContext from '../../map/context';

const MapView = props => {
  const { province, electionYear, setElectionYear } = useContext(MapContext);
  const TH_ELECTION_YEAR = [
    { en: 'election-2562', th: 'ปี 2562' },
    { en: 'election-2557', th: 'ปี 2557' },
    { en: 'election-2554', th: 'ปี 2554' },
    { en: 'election-2550', th: 'ปี 2550' }
  ];

  return (
    <>
      <div className="bar bar__left">
        <ul className="year-choice--list">
          {TH_ELECTION_YEAR.map(({ en, th }) => (
            <li
              className={`year-choice--list-item ${en === electionYear &&
                'year-choice--list-item__active'}`}
              key={en}
              onClick={() => setElectionYear(en)}
            >
              {th}
            </li>
          ))}
          {/* <li className="year-choice--list-item">ปี 2562</li>
          <li className="year-choice--list-item">ปี 2557</li>
          <li className="year-choice--list-item">ปี 2554</li>
          <li className="year-choice--list-item">ปี 2550</li> */}
        </ul>
        <div className="bar--lower__left">
          <Switch>
            <Route path="/" exact component={NationalLeft} />
            <Route path="/province/:province" component={ProvincialLeft} />
          </Switch>
        </div>
      </div>
      <div className="bar bar__right">
        <Dropdown>{province}</Dropdown>
        <div className="bar--lower__right">
          <Switch>
            <Route path="/" exact component={NationalRight} />
            <Route path="/province/:province" component={ProvincialRight} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default MapView;
