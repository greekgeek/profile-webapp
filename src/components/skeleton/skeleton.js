import React from 'react';
import { Skeleton } from 'antd';
export default function CustomSkeleton(props) {
  console.log(props.loading);
  const TEMPLATE = (
    props.loading ? 
      <>{props.children}</> 
    :
      <Skeleton active />
  );
  return TEMPLATE;
}