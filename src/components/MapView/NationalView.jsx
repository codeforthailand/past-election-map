import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import MapContext from '../../map/context';
import _ from 'lodash';
import Overview from './Overview';
import PartyList from './PartyList';

import novoteImage from '../../images/NoVote.svg';

const NationalLeft = () => {
  return <></>;
};
const NationalRight = () => {
  const { setProvince, CountryTopoJson, electionYear, quotaData } = useContext(
    MapContext
  );
  const [nationalProps, setNationalProps] = useState([]);
  const is2550Year = electionYear === 'election-2550';
  const numCandidate = nationalProps.length;
  const winnerQuota = is2550Year
    ? quotaData.reduce((acc, cur) => acc + cur.quota, 0)
    : numCandidate;
  let isNoVote;
  console.log('national view');
  console.log(electionYear);

  useEffect(() => {
    setProvince('ประเทศไทย');
  }, []);

  useEffect(() => {
    if (CountryTopoJson.length === 0) return;

    const nationalProps = CountryTopoJson.objects[electionYear].geometries.map(
      geo => geo.properties
    );
    console.log(nationalProps);
    setNationalProps(nationalProps);
  }, [CountryTopoJson, electionYear]);

  console.log(quotaData);

  let byPartySorted = [];
  if (electionYear === 'election-2550') {
  } else {
    const byParty = _.groupBy(nationalProps, ({ result }) => {
      if (!result) {
        isNoVote = true;
        return 'การเลือกตั้งเป็นโมฆะ';
      }
      const winner = result.reduce(function(prev, current) {
        return prev.score > current.score ? prev : current;
      });
      return winner.party;
    });

    for (let [party, winnerResult] of Object.entries(byParty)) {
      byPartySorted.push({ party, candidate: winnerResult.length });
    }
    byPartySorted.sort((a, b) => b.candidate - a.candidate);
  }

  // {party: "พลังประชาชน", candidate: 72}
  // 1: {party: "ประชาธิปัตย์", candidate: 54}
  // 2: {party: "ชาติไทย", candidate: 16}
  // 3: {party: "เพื่อแผ่นดิน", candidate: 10}
  // 4: {party: "รวมใจไทยชาติพัฒนา", candidate: 2}
  // 5: {party: "มัชฌิมาธิปไตย", candidate: 2}
  // 6: {party: "ประชาราช", candidate: 1}
  return (
    <div className="national-view">
      <h1 className="national-view--header">
        {numCandidate} เขต {winnerQuota} คน
      </h1>

      {isNoVote ? (
        <NovoteDisplay />
      ) : (
        <div>
          <PartyList byPartySorted={byPartySorted} />
          <Overview waffleData={byPartySorted} />
        </div>
      )}
    </div>
  );
};

const Container = styled.div`
  width: 258px;
  height: 400px;
  margin: 0 auto;
  border-top: 1px solid #222222;
  margin-top: 20px;
  padding-top: 27px;
`;

const WarnText = styled.h1`
  color: #da3731;
  font-family: 'The MATTER';
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 36px;
  text-align: center;
`;

const ExplainText = styled.p`
  color: #000000;
  font-family: 'Noto Sans Thai';
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.5rem;
  text-align: left;
`;

const NovoteDisplay = () => {
  return (
    <Container>
      <img src={novoteImage} width="257" height="159" />
      <WarnText>การเลือกตั้งเป็นโมฆะ</WarnText>
      <ExplainText>
        เนื่องจากเกิดการชุมนุมปิดคูหาเลือกตั้ง
        ทำให้ไม่สามารถเลือกตั้งพร้อมกันได้ทั่วประเทศในวันเดียวกัน
        ตามที่กำหนดไว้ในรัฐธรรมนูญ
      </ExplainText>
    </Container>
  );
};

export { NationalLeft, NationalRight, NovoteDisplay };
