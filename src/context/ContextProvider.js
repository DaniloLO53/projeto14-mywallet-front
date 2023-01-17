import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import ContextSignup from './ContextSignup';

function ContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const data = ContextSignup();

  const context = useMemo(() => ({
    loading,
    setLoading,
    ...data,
  }), [loading, setLoading, data]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
