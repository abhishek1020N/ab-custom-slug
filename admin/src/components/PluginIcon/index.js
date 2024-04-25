/**
 *
 * PluginIcon
 *
 */

import React from 'react';
import { Key } from "@strapi/icons";


const PluginIcon = () => {
  const theme = localStorage.getItem('STRAPI_THEME');
  const iconStyle = {
    // color: theme ==='light' ?  '' : 'rgb(240, 240, 255)',
    // backgroundColor: theme ==='light' ?  '' : 'rgb(240, 240, 255)',
  };

  return <Key style={iconStyle} />;
};

export default PluginIcon;
