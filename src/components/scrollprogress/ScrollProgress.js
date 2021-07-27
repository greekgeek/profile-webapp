import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import listeners from '@@/services/listeners';  
import './scss/scrollProgress.scss';

export default function ScrollProgress() {
  const [listenerID, setListenerID] = useState(window.innerWidth);
  const [scrollY, setScrollY] = useState(0);
  const [inStyle, setInlineStyle] = useState({});
  const componentDidUnmount = useCallback(() => {
    listeners.removeWindowResizeListener(listenerID);
  }, [listenerID]);
  const rootEle = document.querySelector("#root");
  const windowResize = (scroll) => {
    const total = rootEle.scrollHeight - rootEle.offsetHeight;
    if ((total | 0) === 0) setScrollY(0);
    else {
      // console.log('Scroll', total, rootEle.scrollTop);
      setScrollY((rootEle.scrollTop / total) * 100);
    }
    // console.log(scrollY);
  }
  useEffect(function() {
    setInlineStyle({
      'transform': `translateX(-${100 - parseInt(scrollY)}%)`
    });
  }, [scrollY]);
  useEffect(function() {
    let ID = listeners.addWindowScrollListener(windowResize);
    setListenerID(ID);
    return componentDidUnmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const TEMPLATE = (
    <div className="scrollProgress">
      <div className="scrollProgress__progress" style={inStyle}></div>
    </div>
  )
  return TEMPLATE;
}