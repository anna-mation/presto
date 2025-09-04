import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import LogoutButton from '../components/LogoutButton';
import NewPresentationButton from '../components/NewPresentationButton';

import { useContext, Context } from '../context';
import PresentationCard from '../components/PresentationCard';
import { getDataStore, setDataStore } from '../helpers';
import styled from 'styled-components';

const DashboardFormat = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
`;

const DashboardHeader = styled.div`
  display: flex;
  min-height: 70px;
  background-color: #0c6dfd;
  font-size: 2em;
  padding-left: 10px;
  padding-top: 3px;
  color: white;
  justify-content: space-between; 
`;

const DashboardRightHeader = styled.div`
  position: relative; 
`;

const DashboardSlides = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledPresentationButton = styled(NewPresentationButton)`
  display: flex;
  position: absolute; 
`;

const StyledLogoutButton = styled(LogoutButton)`
  display: flex;
  position: absolute; 
`;

const Dashboard = () => {
  const { getters, setters } = useContext(Context);
  const token = getters.token;
  const setErrorMsg = setters.setErrorMsg;
  const [store, setStore] = useState({});

  // Creates a new presentation on the dashboard
  const addPresentation = async (title, desc, thumbnail) => {
    // Make new presentation store object
    const idList = Object.keys(store);
    const newId = idList.length !== 0 ? Number(idList[idList.length - 1]) + 1 : 0;

    const info = {
      slides: [{ backgroundColor: ['', ''] }],
      title,
      desc,
      thumbnail,
      history: [],
      defaultBackgroundColor: ['#ffffff', '']
    };
    const newObj = {};
    newObj[newId] = info;
    const newStore = { ...store, ...newObj };

    await setDataStore(newStore, setErrorMsg, token);
    setStore(newStore);
  };

  // Initalises store on load
  useEffect(() => {
    const initStore = async () => {
      const res = await getDataStore(setErrorMsg, token);
      setStore(res);
    };
    initStore();
  }, []);

  if (token === null) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <DashboardHeader>
        Dashboard
        <br />
        <DashboardRightHeader>
          {/* Passing the addPresentation function as the prop onPresentationCreate */}
          <StyledPresentationButton
            name='create-presentation'
            onPresentationCreate={addPresentation}
            setErrorMsg={setErrorMsg}
          />
          <StyledLogoutButton name='logout' />
        </DashboardRightHeader>
      </DashboardHeader>
      <DashboardFormat>
        <DashboardSlides>
          {/* Renders project list if store has been initialised */}
          {store &&
            Object.keys(store).map((id) => (
              <PresentationCard name='presentation' key={id} projectId={id} projects={store} />
            ))}
        </DashboardSlides>
      </DashboardFormat>
    </>
  );
};

export default Dashboard;
