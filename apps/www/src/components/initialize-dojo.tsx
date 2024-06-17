'use client';

import React, { useEffect } from 'react';

import { useDojo } from '~/lib/hooks';

/* eslint-disable import/no-default-export -- need for dynamic imports */

const InitializeDojo = () => {
  const { initialize } = useDojo();
  useEffect(() => {
    void initialize();
  }, [initialize]);
  return <div className='text-transparent'>a</div>;
};

export default InitializeDojo;
