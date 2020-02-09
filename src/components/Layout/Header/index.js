import React from 'react';

import SelectLanguage from '../../../components/SelectLanguage';

const Header = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px'}}>
      <div>Logo</div>
      <SelectLanguage/>
    </div>
  )
}

export default Header;