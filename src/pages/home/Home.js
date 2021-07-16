import React, { useEffect, useMemo, useState } from 'react';
import './scss/home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@@/store/actions/profile';
import { Row, Col, Timeline, Card, Tag, Badge, Typography, Progress, Divider, Skeleton } from 'antd';
import listeners from '@@/services/listeners';
const { Title, Text } = Typography;

export default function Home() {
  const dispatch = useDispatch();
  const {  
    name = '',
    splash_image = '',
    splash_intro = '',
    userID = 'manas22@gmail.com',
    tech_skills = {},
    tech_products = {},
    projects = [],
    career_path = [],
   } = useSelector(state => state.profile);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [listenerID, setListenerID] = useState(window.innerWidth);
  const breakEvenpoint = 420;
  const componentDidUnmount = () => {
   listeners.removeWindowResizeListener(listenerID);
  };
  const windowResize = () => {
    setWindowSize(window.innerWidth);
  }
  useEffect(() => {
    dispatch(getProfile(userID));
    let ID = listeners.addWindowResizeListener(windowResize);
    setListenerID(ID);
    return componentDidUnmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const productCardHTML = useMemo(() => {
    return (
      <ul className="productlist">
        {
          tech_products.products.map((product) => {
            return (
              <li className="products">
                <Card>
                    <figure>
                      <img src={product.url} alt={product.title}/>
                      <Divider type="horizontal" />
                        <figcaption>
                          <Title level={4}>{product.title}</Title>
                        </figcaption>
                    </figure>
                  </Card>
              </li>
            )
          })
        }
      </ul>
    );
  }, [tech_products]);
  const careerTimelineHTML = useMemo(() => {
    console.log(windowSize);
    return (
      <Timeline mode={windowSize > breakEvenpoint ? 'alternate': 'left'} className={{"career__line": true}}>
        {
          career_path.map((career) => {
            return (
              <Timeline.Item className={{ "career__stop": true, "career__stop--alternate": (windowSize > breakEvenpoint) }} >
                <Card className={"career__stop-desc"}>
                 <figure>
                    <figcaption>
                      <Title level={3}>{career.org}</Title>
                      <Text code>{career.role}</Text>
                    </figcaption>
                    <img src={career.url} width="50px" alt="Organisation Logo"/>
                </figure> 
                 <section>
                 <p code>{career.role}</p>
                 <p disabled>{career.group}</p>
                 </section> 
                </Card>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    );
  }, [windowSize, career_path]);
  const projectHTML = useMemo(() => {
    return projects.map((prjt) => {
     return (
    <Card>
        <section>
          <figure>
            <img width="75px" src={prjt.company_url} alt="Organisation Logo"></img>
            <figcaption style={{'marginTop': '12px'}}>
              <Title level={3}>{prjt.title}</Title>
            </figcaption>
          </figure>
        </section>
        <Divider type="horizontal" />
        <section>
          <details>
            <summary style={{ 'marginBottom': '10px'}}>
              <span style={{ 'fontSize': '1.4rem', 'fontWeight': '500'}}>Technology</span>
            </summary>
            {
              prjt.technology.map((tech) => {
                return (
                  <Tag color="default">
                      {tech}
                  </Tag>
                )
              })
            }
          </details>
            <p style={{ 'fontSize': '1.4rem', 'fontWeight': '500', 'marginTop' : '30px'}}>
              {prjt.summary}
            </p>
        </section>
    </Card>)
    })
  }, [projects]);
  const skillsCardHTML = useMemo(() => {
    // console.log(tech_skills);
      return tech_skills.skills.map((skillArr) => {
        return (
          <Col className={`${skillArr[0]}`} xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 8, offset: 2}}  sm={{ span: 24, offset: 0}} >
            <Card style={{ marginTop: 16, width: '100%' }}>
              <Title level={3}>{skillArr[0]}</Title>
              <Divider type="horizontal" />
              <ul className="Name">
              {(skillArr[1].map(skill => {
                const yearExp = skill.exp >> 0;
                const monthexp = skill.exp - yearExp;
                return (
                  <li className="skill">
                    {/* <Tag color="#108ee9"> */}
                    <Badge color={'gold'}/>
                    <Text strong>{skill.title}</Text>
                    <Text  code style={{'marginLeft': '10px', 'fontSize': '0.8rem'}}>{yearExp > 0 ? `${yearExp} yrs`: ''} {(monthexp > 0 ? `${(monthexp * 10) >> 0} mnth` : '')}</Text>
                    <Progress percent={skill.rate * 100}  status={skill.running} format={() =>skill.icon } />
                  </li>
                )
              }))}
            </ul>
            </Card>
          </Col>
        )
      });
  }, [tech_skills])
  const TEMPLATE = (
    <section className="homepg">
      <article className="homepg__rowone">
        <Row justify="space-around" align="middle" className="homepg__rowonewrap">
          <Col xs={24} lg={10} sm={12}>
          <section className="rowone-colone">
            {(name ?  
              (
                <img src={splash_image} alt="Author splash"/>
              )
                :
              (<Skeleton.Image active={true}/>)
            )}
            </section>
          </Col>
          <Col xs={20} lg={14} sm={12}>
            <section className="rowone-coltwo">
              {(name ? (
                <>
                  <Title level={2}>
                    Hi My Name is {name}
                    </Title>
                    <Title level={3}>
                      {splash_intro}
                  </Title>
                </>
              ):
              (
                <Skeleton active={true}  width={"100%"}/>
              )
              )}
            </section>
          </Col>
        </Row>
      </article>
      <Divider type="horizontal" />
      <article className="homepg__rowtwo">
        <Row  align="top" className="homepg__rowtwo_colone">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 24, offset: 0}} >
            <Title>Technology Stack </Title>
            {
              (tech_skills.intro) ? 
              (
                <Title level={4}>{tech_skills.intro}</Title>
              )
              :
                (<Skeleton active={true}/>)
            }
          </Col>
        </Row>
        <Row align="top">
            {skillsCardHTML}
        </Row>
      </article>
      <Divider type="horizontal" />
      <article className="homepg__rowthree">
        <Row  align="top">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 24, offset: 0}} >
            <Title>Product/Device Worked on</Title>
            <Title level={4}>{tech_products.intro}</Title>
          </Col>
        </Row>
        <Row align="top">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 24, offset: 0}} >
            {productCardHTML}
          </Col>
        </Row>
      </article>
      <article className="homepg__rowfour">
        <Row  align="top">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 24, offset: 0}} >
            <Title>Industrial Projects</Title>
          </Col>
        </Row>
        <Row align="top">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 24, offset: 0}} >
            {projectHTML}
          </Col>
        </Row>
      </article>
      <article className="homepg__rowfive">
        <Row  align="top">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 24, offset: 0}} >
            <Title>Career Journey</Title>
            <Title level={4}> Coming from Science & Maths background, I starte my career Journey in computer science from College. On completion of Graduation, I moved to corporate world with Samsung R&D </Title>
          </Col>
        </Row>
        <Row align="top">
          <Col xs={{span: 24, push: 0, offset: 0}} md={{ span: 18, push: 3, offset: 0 }} lg={{ span: 20, push: 2, offset: 0 }}  sm={{span: 24, push: 0, offset: 0}} >
            {careerTimelineHTML}
          </Col>
        </Row>
      </article>
    </section>
  );
  return TEMPLATE;
}