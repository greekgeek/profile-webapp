import React, { useMemo } from 'react';
import {Link} from "react-router-dom"
import './scss/nav.scss';
import { Divider } from 'antd';

export default function Nav(props) {
  const linkHTML = useMemo(() => {
    return props.routes.map((nav) => {
      return (
        <li className="nav-list__items">
          <Link key={nav.title} to={nav.path}>{nav.title}</Link>
          <Divider type="vertical" />
        </li>
      )
    })
  }, [props.routes])
  const TEMPLATE = (
    <nav className='nav'>
        <Link to="/home" className="nav-logo">
          <img className="icon" src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Home Icon"/>
        </Link>
        <ul className="nav-list">
          {linkHTML}
        </ul>
    </nav>
  )
  return TEMPLATE;
}