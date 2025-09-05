// src/pages/LandingPage.jsx

import React from 'react';
import Hero from '../components/Hero/Hero';
import PlatformOverview from '../components/PlatformOverview/PlatformOverview';
import FeaturesDemo from '../components/FeaturesDemo/FeaturesDemo';
import Statistics from '../components/Statistics/Statistics';
import CallToAction from '../components/CallToAction/CallToAction';
import Interactive from '../components/Interactive/Interactive';

// Notice there are NO CSS imports here. This component doesn't need them.

const LandingPage = () => {
  return (
    <>
      <Hero />
      <PlatformOverview />
      <FeaturesDemo />
      <Statistics />
      <CallToAction />
      <Interactive />
    </>
  );
};

export default LandingPage;